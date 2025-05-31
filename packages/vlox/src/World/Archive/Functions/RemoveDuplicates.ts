import { ArchivedSectionData, ArchivedSectorData } from "../Types/index";
import { uint16To4CharString } from "./Shared";

function traverseSection(source: any, target: any) {
  if (typeof source == "object" && typeof target == "object") {
    if (Object.keys(source).length != Object.keys(target).length) return false;
  }
  for (const key in source) {
    if (!(key in target)) return false;

    const sourceValue = source[key];
    const targetValue = target[key];

    if (
      !ArrayBuffer.isView(sourceValue) &&
      typeof sourceValue === "object" &&
      sourceValue !== null &&
      !ArrayBuffer.isView(targetValue) &&
      typeof targetValue == "object" &&
      targetValue !== null
    ) {
      if (!traverseSection(sourceValue, targetValue)) return false;
      continue;
    }

    if (
      typeof sourceValue === "number" ||
      typeof sourceValue === "string" ||
      typeof targetValue === "number" ||
      typeof targetValue === "string"
    ) {
      if (sourceValue !== targetValue) return false;
      continue;
    }

    if (
      sourceValue instanceof Uint8Array ||
      sourceValue instanceof Uint16Array
    ) {
      if (!(targetValue instanceof sourceValue.constructor)) return false;
      if (sourceValue.length !== (targetValue as any).length) return false;
      let target = targetValue as Uint8Array;
      for (let i = 0; i < target.length; i++) {
        if (sourceValue[i] != target[i]) return false;
      }
    }
  }

  return true;
}

export function compareSection(
  section1: ArchivedSectionData,
  section2: ArchivedSectionData
) {
  return traverseSection(section1, section2);
}

export function RemoveDuplicates(data: ArchivedSectorData) {
  const duplicateSectionMap = new Map<
    ArchivedSectionData,
    [sectionIndex: number, duplicateIndex: number]
  >();

  let duplicateSections: ArchivedSectionData[] = [];

  for (let i = 0; i < data.sections.length; i++) {
    for (let j = i + 1; j < data.sections.length; j++) {
      const section1 = data.sections[i];
      const section2 = data.sections[j];
      if (typeof section1 == "string" || typeof section2 == "string") continue;
      let index = -1;
      if (compareSection(section1, section2)) {
        if (duplicateSectionMap.has(section2)) {
          index = duplicateSectionMap.get(section2)![1];
        } else {
          let found = false;
          for (let k = 0; k < duplicateSections.length; k++) {
            if (compareSection(section1, duplicateSections[k])) {
              index = k;
              found = true;
            }
          }
          if (!found) {
            duplicateSections.push(section1);
            index = duplicateSections.length - 1;
          }
        }

        duplicateSectionMap.set(section1, [i, index]);
      }
    }
  }

  const sections: Record<string, ArchivedSectionData> = {};
  for (let i = 0; i < data.sections.length; i++) {
    const section = data.sections[i] as ArchivedSectionData;
    if (duplicateSectionMap.has(section)) {
      const [, dupIndex] = duplicateSectionMap.get(section)!;
      const id = uint16To4CharString(dupIndex);
      data.sections[i] = id;
      sections[id] = section;
    }
  }
  data.duplicates = {
    sections,
  };
}
