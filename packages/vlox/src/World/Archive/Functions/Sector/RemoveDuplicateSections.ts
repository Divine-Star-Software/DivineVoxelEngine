import { BinaryBuffer } from "../../../../Util/BinaryBuffer";
import { ArchivedSectionData, ArchivedSectorData } from "../../Types/index";
import { uint16To4CharString } from "../Shared/IntToString";
import { lightSegments } from "../Shared";

function compareSection(
  section1: ArchivedSectionData,
  section2: ArchivedSectionData
) {
  if (Object.keys(section1).length != Object.keys(section2).length)
    return false;
  if (
    Object.keys(section1.buffers).length != Object.keys(section2.buffers).length
  )
    return false;
  if (
    section1.palettes &&
    section2.palettes &&
    Object.keys(section1.palettes).length !=
      Object.keys(section2.palettes).length
  )
    return false;
  if (section1.palettes && !section2.palettes) return false;
  if (!section1.palettes && section2.palettes) return false;

  if (section1.palettes) {
    if (section1.palettes.id && section2.palettes?.id) {
      if (!BinaryBuffer.Compare(section1.palettes.id, section2.palettes.id))
        return false;
    } else if (
      (!section1.palettes.id && section2.palettes?.id) ||
      (section1.palettes.id && !section2.palettes?.id)
    )
      return false;

    if (section1.palettes.secondary && section2.palettes?.secondary) {
      if (
        !BinaryBuffer.Compare(
          section1.palettes.secondary,
          section2.palettes.secondary
        )
      )
        return false;
    } else if (
      (!section1.palettes.secondary && section2.palettes?.secondary) ||
      (section1.palettes.secondary && !section2.palettes?.secondary)
    )
      return false;

    if (section1.palettes.level && section2.palettes?.level) {
      if (
        !BinaryBuffer.Compare(section1.palettes.level, section2.palettes.level)
      )
        return false;
    } else if (
      (!section1.palettes.level && section2.palettes?.level) ||
      (section1.palettes.level && !section2.palettes?.level)
    )
      return false;

    if (section1.palettes.light && section2.palettes?.light) {
      for (const segment of lightSegments) {
        if (
          section1.palettes.light?.[segment] &&
          section2.palettes.light?.[segment]
        ) {
          if (
            !BinaryBuffer.Compare(
              section1.palettes.light[segment],
              section2.palettes.light[segment]
            )
          )
            return false;
        } else if (
          (!section1.palettes.light[segment] &&
            section2.palettes.light[segment]) ||
          (section1.palettes.light[segment] &&
            !section2.palettes.light[segment])
        )
          return false;
      }
    } else if (!section1.palettes.light && section2.palettes?.light)
      return false;
  }

  if (section1.buffers.id && section2.buffers.id) {
    if (!BinaryBuffer.Compare(section1.buffers.id, section2.buffers.id))
      return false;
  } else if (
    (!section1.buffers.id && section2.buffers.id) ||
    (section1.buffers.id && !section2.buffers.id)
  )
    return false;

  if (section1.buffers.secondary && section2.buffers.secondary) {
    if (
      !BinaryBuffer.Compare(
        section1.buffers.secondary,
        section2.buffers.secondary
      )
    )
      return false;
  } else if (
    (!section1.buffers.secondary && section2.buffers.secondary) ||
    (section1.buffers.secondary && !section2.buffers.secondary)
  )
    return false;

  if (section1.buffers.light && section2.buffers?.light) {
    for (const segment of lightSegments) {
      if (
        section1.buffers.light?.[segment] &&
        section2.buffers.light?.[segment]
      ) {
        if (
          !BinaryBuffer.Compare(
            section1.buffers.light[segment],
            section2.buffers.light[segment]
          )
        )
          return false;
      } else if (
        (!section1.buffers.light[segment] && section2.buffers.light[segment]) ||
        (section1.buffers.light[segment] && !section2.buffers.light[segment])
      )
        return false;
    }
  } else if (
    (!section1.buffers.light && section2.buffers?.light) ||
    (section1.buffers.light && !section2.buffers?.light)
  )
    return false;

  if (section1.buffers.level && section2.buffers?.level) {
    if (!BinaryBuffer.Compare(section1.buffers.level, section2.buffers.level))
      return false;
  } else if (
    (!section1.buffers.level && section2.buffers?.level) ||
    (section1.buffers.level && !section2.buffers?.level)
  )
    return false;

  return true;
}

export function RemoveDuplicateSections(sector: ArchivedSectorData) {
  const sectionsLength = sector.sections.length;
  const sections: ArchivedSectionData[] = <ArchivedSectionData[]>(
    sector.sections
  );
  const newSections: (ArchivedSectionData | string)[] = [];
  const added = new Set<number>();
  const duplicates = new Map<ArchivedSectionData, number[]>();
  for (let i = 0; i < sectionsLength; i++) {
    const sectionA = sections[i];
    newSections[i] = sectionA;
    if (added.has(i)) continue;
    for (let j = 0; j < sectionsLength; j++) {
      if (i == j) continue;
      if (added.has(j)) continue;
      const sectionB = sections[j];

      if (compareSection(sectionA, sectionB)) {
        let array = duplicates.get(sectionA);
        if (!array) {
          array = [i];
          added.add(i);
          duplicates.set(sectionA, array);
        }
        added.add(j);
        array.push(j);
      }
    }
  }

  const duplicateSections: Record<string, ArchivedSectionData> = {};

  let dupIndex = 0;
  for (const [section, indexes] of duplicates) {
    const key = uint16To4CharString(dupIndex);
    duplicateSections[key] = section;
    for (const index of indexes) {
      newSections[index] = key;
    }
    dupIndex++;
  }
  sector.sections = newSections;
  sector.duplicates ??= {};
  sector.duplicates.sections = duplicateSections;
}
