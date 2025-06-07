import { WorldSpaces } from "../../../WorldSpaces";
import { Sector, SectorData } from "../../../index";
import { ArchivedSectorData } from "../../Types/index";
import { ImportedSector } from "../../Classes/ImportedSector";
import { Vector3Like } from "@amodx/math";

type RunData = {
  version?: number;
};

export default function ImportSector(
  archivedSector: ArchivedSectorData,
  archiveData: RunData
): SectorData {
  const sector = new Sector();

  sector.setBuffer(Sector.CreateNewBuffer());
  sector.position[0] = archivedSector.position.x;
  sector.position[1] = archivedSector.position.y;
  sector.position[2] = archivedSector.position.z;

  sector.loadFlags(archivedSector.flags);
  sector.loadTimestamps(archivedSector.timestamps);

  const importedSector = new ImportedSector(archivedSector);

  const position = Vector3Like.Create();
  for (const importedSection of importedSector.sections) {
    const archivedSection = importedSection.section;
    const section = sector.sections[importedSection.sectionIndex];
    archivedSection.flags && section.loadFlags(archivedSection.flags);
    section.dirtyMap.fill(0xff);
    for (let i = 0; i < section.ids.length; i++) {
      section.ids[i] = importedSection.getId(i);
      section.level[i] = importedSection.getLevel(i);
      section.light[i] = importedSection.getLight(i);
      section.secondary[i] = importedSection.getSecondary(i);

      if (section.ids[i] !== 0 || section.secondary[i] !== 0) {
        section.setHasVoxel(
          WorldSpaces.voxel.getPositionFromIndex(i, position).y - 1,
          true
        );
      }
    }
  }

  sector.setBitFlag(Sector.FlagIds.stored, true);
  return sector;
}
