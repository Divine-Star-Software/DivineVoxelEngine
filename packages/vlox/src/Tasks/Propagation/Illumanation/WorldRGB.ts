import { WorldSpaces } from "../../../World/WorldSpaces";
import { VoxelUpdateTask } from "../../VoxelUpdateTask";
import { WorldRegister } from "../../../World/WorldRegister";
import { SectionCursor } from "../../../World/Cursor/SectionCursor";
import { EngineSettings } from "../../../Settings/EngineSettings";
import { RGBUpdate } from "./RGBUpdate";
const sectionCursor = new SectionCursor();
export function WorldRGB(task: VoxelUpdateTask) {
  if (!EngineSettings.doLight) return false;
  const sector = WorldRegister.sectors.get(
    task.origin[0],
    task.origin[1],
    task.origin[2],
    task.origin[3]
  );

  if (!sector) {
    console.error(
      `Tried running world rgb on a sector that does not exist ${task.origin.toString()}`
    );
    return false;
  }

  let maxX = WorldSpaces.section.bounds.x + sector.position[0];
  let maxZ = WorldSpaces.section.bounds.z + sector.position[2];
  for (let i = 0; i < sector.sections.length; i++) {
    const section = sector.sections[i];
    if (!section) continue;
    sectionCursor.setSection(section);
    let [minY, maxY] = section.getMinMax();
    const cx = sector.position[0];
    const cy = sector.position[1] + i * WorldSpaces.section.bounds.y;
    const cz = sector.position[2];
    if (Math.abs(minY) == Infinity && Math.abs(maxY) == Infinity) continue;
    for (let y = cy + minY; y <= cy + maxY; y++) {
      for (let x = cx; x < maxX; x++) {
        for (let z = cz; z < maxZ; z++) {
          const voxel = sectionCursor.getVoxel(x, y, z);
          if (!voxel || voxel.isAir()) continue;
          if (voxel.isLightSource()) {
            task.rgb.update.push(x, y, z);
          }
        }
      }
    }
  }

  RGBUpdate(task);
}
