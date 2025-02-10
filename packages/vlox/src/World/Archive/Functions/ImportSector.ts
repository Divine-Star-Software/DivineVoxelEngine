import { Sector, SectorData } from "../../index";
import { ArchivedSectorData } from "../Archive.types";
import { ImportedSector } from "../Classes/ImportedSector";

type RunData = {
  version?: number;
};

export default function ImportSector(
  archivedSector: ArchivedSectorData,
  archiveData: RunData
): SectorData {
  const sector = new Sector(Sector.CreateNew(), [
    archivedSector.location[0],
    archivedSector.location[1],
    archivedSector.location[2],
  ]);


  sector.loadFlags(archivedSector.flags);
  sector.loadTimestamps(archivedSector.timestamps);

  const importedSector = new ImportedSector(archivedSector);

  for (const importedSection of importedSector.sections) {
    const archivedSection = importedSection.section;
    const section = sector.sections[importedSection.sectionIndex];
    archivedSection.flags && section.loadFlags(archivedSection.flags);

    if (!ArrayBuffer.isView(archivedSection.buffers.buried)) {
      for (let i = 0; i < section.buried.length; i++) {
        section.buried[i] = archivedSection.buffers.buried || 0;
      }
    } else {
      for (let i = 0; i < section.buried.length; i++) {
        section.buried[i] = archivedSection.buffers.buried[i];
      }
    }
    if (!ArrayBuffer.isView(archivedSection.buffers.voxelMap)) {
      for (let i = 0; i < section.voxelMap.length; i++) {
        section.voxelMap[i] = archivedSection.buffers.voxelMap || 0;
      }
    } else {
      for (let i = 0; i < section.voxelMap.length; i++) {
        section.voxelMap[i] = archivedSection.buffers.voxelMap[i];
      }
    }
    if (!ArrayBuffer.isView(archivedSection.buffers.dirtyMap)) {
      for (let i = 0; i < section.dirtyMap.length; i++) {
        section.dirtyMap[i] = archivedSection.buffers.dirtyMap || 0;
      }
    } else {
      for (let i = 0; i < section.dirtyMap.length; i++) {
        section.dirtyMap[i] = archivedSection.buffers.dirtyMap[i];
      }
    }

    for (let i = 0; i < section.ids.length; i++) {
      section.ids[i] = importedSection.getId(i);
      section.level[i] = importedSection.getLevel(i);
      section.light[i] = importedSection.getLight(i);
      section.secondary[i] = importedSection.getSecondary(i);
      section.state[i] = importedSection.getState(i);
      section.mod[i] = importedSection.getMod(i);
    }
  }

  sector.setBitFlag(Sector.FlagIds.stored, true);
  return sector;
}
