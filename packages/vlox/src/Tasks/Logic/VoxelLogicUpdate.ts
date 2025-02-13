import { LocationData } from "../../Math";
import { VoxelUpdateTask } from "../../Tasks/VoxelUpdateTask";
import { WorldRegister } from "../../World/WorldRegister";
import { WorldSpaces } from "../../World/WorldSpaces";
import { SectionCursor } from "../../World/Cursor/SectionCursor";
import { VoxelLogicRegister } from "../../Voxels/Logic/VoxelLogicRegister";
import { VoxelTagIds } from "../../Voxels/Data/VoxelTag.types";
import { RGBRemove, RGBUpdate } from "../../Tasks/Propagation";
import { CardinalNeighbors3D } from "../../Math/CardinalNeighbors";
const sectionCursor = new SectionCursor();
export function VoxelLogicUpdate(
  task: VoxelUpdateTask,
  location: LocationData
) {
  task.setOriginAt(location);

  const sector = WorldRegister.sectors.getAt(location);

  if (!sector) {
    console.warn(
      `Could not run logic update sector at ${location} does not exist`
    );
    return false;
  }

  const section = sector.getSection(location[1], location[2], location[3]);

  if (!section) {
    console.warn(
      `Could not run logic update sector at ${location}.  Section does not exist`
    );
    return false;
  }

  const [minY, maxY] = section.getLogicMinMax();

  const [cx, cy, cz] = section.position;
  const slice = WorldSpaces.section.bounds.x * WorldSpaces.section.bounds.z;
  const startY = minY * slice;
  const endY = (maxY + 1) * slice;
  sectionCursor.setSection(section);

  for (let i = startY; i < endY; i++) {
    if (!(i % slice)) {
      const y = i / slice;
      if (!section.isLogicSliceDirty(y)) {
        i += slice - 1;
        continue;
      }
    }

    if (!section.ids[i] || !section.getVoxelLogicDirty(i)) continue;
    const voxel = sectionCursor.getVoxelAtIndex(i);
    const x = cx + sectionCursor._voxelPosition.x;
    const y = cy + sectionCursor._voxelPosition.y;
    const z = cz + sectionCursor._voxelPosition.z;

    const logic = VoxelLogicRegister.voxels[section.ids[i]];

    if (!logic) continue;
    if (logic.hasTag(VoxelTagIds.isLightSource)) {
      const lightSource = logic.getTagValue(VoxelTagIds.isLightSource, voxel);
      if (lightSource) {
        task.rgb.update.push(x, y, z);
      } else {
        for (const n of CardinalNeighbors3D) {
          const nx = n[0] + x;
          const ny = n[1] + y;
          const nz = n[2] + z;
          const nVoxel = task.nDataCursor.getVoxel(nx, ny, nz);
          if (!nVoxel) continue;
          if (nVoxel.hasRGBLight()) {
            task.rgb.remove.push(nx, ny, nz);
          }
        }
      }
    }
  }

  RGBRemove(task);
  RGBUpdate(task);

  section.logicDirtyMap.fill(0);
  section.logicDirty.fill(0);
  section.setLogicDirty(false);
  section.setLogicUpdateInProgress(false);

  task.bounds.markSectionsAsDirty();
}
