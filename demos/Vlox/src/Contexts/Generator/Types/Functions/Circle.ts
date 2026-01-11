
import { Distance2D } from "@amodx/math";
import { BrushTool } from "@divinevoxel/vlox/Tools/Brush/Brush";
export function GenerateCircle(
  brush:BrushTool,
  voxel: string,
  sx: number,
  sy: number,
  sz: number,
  radius: number,
  skipCenter = false,
  noDestory = false
) {
  let rx = sx - radius;
  let rz = sz - radius;

  brush.setId(voxel);
  const dataTool = brush.dataCursor;
  for (let ix = rx; ix <= sx + radius; ix++) {
    for (let iz = rz; iz <= sz + radius; iz++) {
      if (skipCenter) {
        if (ix == sx && iz == sz) continue;
      }
      if (noDestory) {
        const voxel = dataTool.getVoxel(ix,sy,iz);
        if (voxel) {
          if (voxel.isAir() && voxel.getLevelState() == 1) continue;
          if (voxel.isRenderable()) continue;
        }
      }
      if (Distance2D(ix, sx, iz, sz) < radius) {
        brush.setXYZ(ix, sy, iz).paint();
      }
    }
  } 
}
