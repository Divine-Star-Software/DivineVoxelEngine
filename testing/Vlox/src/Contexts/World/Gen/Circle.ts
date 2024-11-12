
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
  const dataTool = brush._dt;
  for (let ix = rx; ix <= sx + radius; ix++) {
    for (let iz = rz; iz <= sz + radius; iz++) {
      if (skipCenter) {
        if (ix == sx && iz == sz) continue;
      }
      if (noDestory) {
        if (dataTool.loadInAt(ix, sy, iz)) {
          if (dataTool.isAir() && dataTool.getLevelState() == 1) continue;
          if (dataTool.isRenderable()) continue;
        }
      }
      if (Distance2D(ix, sx, iz, sz) < radius) {
        brush.setXYZ(ix, sy, iz).paint();
      }
    }
  }
}
