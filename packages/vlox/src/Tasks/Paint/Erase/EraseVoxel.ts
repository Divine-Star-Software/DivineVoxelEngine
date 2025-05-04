import { EngineSettings as ES } from "../../../Settings/EngineSettings.js";
import { VoxelUpdateTask } from "../../VoxelUpdateTask.js";
import { canUpdate, updateArea } from "../Common.js";
import {
  PowerRemove,
  PowerUpdate,
} from "../../Propagation/Power/PowerUpdate.js";
import { VoxelUpdateData } from "../../../Tasks/Tasks.types.js";
import type { LocationData } from "../../../Math/Location";
const tasks = new VoxelUpdateTask();

export function EraseVoxel(
  location: LocationData,
  updateData: VoxelUpdateData
) {
  const [dimension, x, y, z] = location;
  if (!canUpdate(x, y, z, updateData)) return;
  tasks.setOriginAt(location);
  let voxel = tasks.sDataCursor.getVoxel(x, y, z);
  if (!voxel) return;
  const foundPower = voxel.getPower();
  voxel.ids[voxel._index] = 0;
  voxel.level[voxel._index] = 0;
  voxel.secondary[voxel._index] = 0;
  voxel.light[voxel._index] = 0;
  voxel.updateVoxel(1);
  updateArea(tasks, x, y, z, x, y, z);

  voxel = tasks.sDataCursor.getVoxel(x, y, z)!;

  if (ES.doPower) {
    if (foundPower > -1) {
      voxel.setLevel(foundPower);
      tasks.power.remove.push(x, y, z);
      PowerRemove(tasks);
      PowerUpdate(tasks);
    }
  }

  tasks.bounds.markDisplayDirty();
}
