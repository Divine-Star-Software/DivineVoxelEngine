import { BoundsMinMaxData } from "@amodx/math/Geomtry/Bounds/BoundsInterface";
import { DataCursorInterface } from "../../../Voxels/Cursor/DataCursor.interface";
import { FullVoxelTemplate } from "../FullVoxelTemplate";
import { Flat3DIndex } from "@amodx/math";

export default function CreateFullTemplate(
  dataCursor: DataCursorInterface,
  bounds: BoundsMinMaxData,
  storeLight = false
) {
  const { x: sx, y: sy, z: sz } = bounds.min;
  const { x: ex, y: ey, z: ez } = bounds.max;
  const template = FullVoxelTemplate.CreateNew([ex - sx, ey - sy, ez - sz]);
  const index = Flat3DIndex.GetXZYOrder();
  index.setBounds(template.bounds.x, template.bounds.y, template.bounds.z);

  for (let x = sx; x < ex; x++) {
    for (let y = sy; y < ey; y++) {
      for (let z = sz; z < ez; z++) {
        if (!dataCursor.inBounds(x, y, z)) continue;
        const voxel = dataCursor.getVoxel(x, y, z);
        if (!voxel) continue;
        const vIndex = index.getIndexXYZ(x - sx, y - sy, z - sz);
        template.ids[vIndex] = voxel.ids[voxel._index];
        template.level[vIndex] = voxel.level[voxel._index];
        template.secondary[vIndex] = voxel.secondary[voxel._index];
        if (storeLight) template.light[vIndex] = voxel.light[voxel._index];
      }
    }
  }

  return template;
}
