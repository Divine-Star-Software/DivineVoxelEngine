import { EngineSettings as ES } from "../../../Settings/EngineSettings.js";
import { PaintVoxelTask, VoxelUpdateData } from "../../Tasks.types.js";
import { VoxelUpdateTask } from "../../VoxelUpdateTask.js";
import { canUpdate, updateArea, updatePowerTask } from "../Common.js";
import { PowerUpdate } from "../../Propagation/Power/PowerUpdate.js";
import type { LocationData } from "../../../Math/Location";
import { RawVoxelData } from "../../../Voxels/Types/Voxel.types.js"

const tasks = new VoxelUpdateTask();

export function PaintVoxel(
  location: LocationData,
  raw: RawVoxelData,
  updateData: VoxelUpdateData
) {
  const [dimension, x, y, z] = location;
  if (!canUpdate(x, y, z, updateData)) return;
  tasks.setOriginAt(location);
  let voxel = tasks.sDataCursor.getVoxel(x, y, z);
  if (!voxel) return;

  raw[1] = 0;
  voxel = tasks.sDataCursor.getVoxel(x, y, z)!;
  voxel.setRaw(raw);
  voxel.updateVoxel(0);

  updateArea(tasks, x, y, z, x, y, z);

  if (ES.doPower) {
    if (
      voxel.tags["dve_can_be_powered"] ||
      voxel.tags["dve_is_power_source"] ||
      voxel.tags["dve_can_carry_power"] ||
      voxel.tags["dve_can_hold_power"]
    ) {
      updatePowerTask(tasks);
      tasks.power.update.push(x, y, z);
      PowerUpdate(tasks);
    }
  }
}
