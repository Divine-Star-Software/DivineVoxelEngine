import { WorldSpaces } from "../../../World/WorldSpaces";
import { UpdateTask } from "../../../Tasks/Update/UpdateTask";
import { WorldRegister } from "../../../World/WorldRegister";
import { ChunkCursor } from "../../../World/Cursor/ChunkCursor";
import { ChunkHeightMap } from "../../../World/Chunk/ChunkHeightMap";
import { EngineSettings } from "../../../Settings/EngineSettings";
import { RGBUpdate } from "./RGBUpdate";
const chunkCursor = new ChunkCursor();
export function WorldRGB(task: UpdateTask) {
  if (!EngineSettings.doLight()) return false;
  WorldRegister.setDimension(task.origin[0]);
  const column = WorldRegister.column.get(
    task.origin[1],
    task.origin[2],
    task.origin[3]
  );

  if (!column) {
    console.error(
      `Tried running world rgb on a column that does not exist ${task.origin.toString()}`
    );
    return false;
  }

  let maxX = WorldSpaces.chunk.bounds.x + column.position[0];
  let maxZ = WorldSpaces.chunk.bounds.z + column.position[2];
  for (let i = 0; i < column.chunks.length; i++) {
    const chunk = column.chunks[i];
    if (!chunk) continue;
    chunkCursor.setChunk(chunk);
    let [minY, maxY] = ChunkHeightMap.setChunk(chunk).getMinMax();
    const cx = column.position[0];
    const cy = column.position[1] + i * WorldSpaces.chunk.getHeight();
    const cz = column.position[2];
    if (Math.abs(minY) == Infinity && Math.abs(maxY) == Infinity) continue;
    for (let y = cy + minY; y <= cy + maxY; y++) {
      for (let z = cz; z < maxZ; z++) {
        for (let x = cx; x < maxX; x++) {
          const voxel = chunkCursor.getVoxel(x, y, z);
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
