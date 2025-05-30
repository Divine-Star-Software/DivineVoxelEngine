import { PaintVoxelTemplateTask, VoxelUpdateData } from "../../Tasks.types";
import { VoxelUpdateTask } from "../../VoxelUpdateTask";
import { canUpdate, updateArea } from "../Common";
import { VoxelTemplateRegister } from "../../../Templates/VoxelTempateRegister";
import { RawVoxelData } from "../../../Voxels/Types/Voxel.types";
import { Vec3Array } from "@amodx/math";
import { IVoxelTemplateData } from "../../../Templates/VoxelTemplates.types";

const tasks = new VoxelUpdateTask();
const raw: RawVoxelData = [0, 0, 0, 0];
export default function PaintVoxelTemplate(
  dimension: number,
  [ox, oy, oz]: Vec3Array,
  templateData: IVoxelTemplateData<any>,
  updateData: VoxelUpdateData
) {
  const voxelTemplate = VoxelTemplateRegister.create(templateData);
  tasks.setOriginAt([dimension, ox, oy, oz]);

  const { x: sx, y: sy, z: sz } = voxelTemplate.bounds.size;

  for (let x = 0; x < sx; x++) {
    for (let y = 0; y < sy; y++) {
      for (let z = 0; z < sz; z++) {
        const tx = ox + x;
        const ty = oy + y;
        const tz = oz + z;
        const index = voxelTemplate.getIndex(x, y, z);
        if (voxelTemplate.isAir(index)) continue;
        if (!canUpdate(tx, ty, tz, updateData)) continue;
        if (!tasks.sDataCursor.inBounds(tx, ty, tz)) continue;
        const voxel = tasks.sDataCursor.getVoxel(tx, ty, tz);
        if (!voxel) continue;
        voxelTemplate.getRaw(index, raw);
        if (raw[0] == 0) continue;
        raw[1] = 0;
        voxel.setRaw(raw);
        voxel.updateVoxel(0);
      }
    }
  }

  updateArea(tasks, ox, oy, oz, ox + sx, oy + sy, oz + sz);
}
