import { VisitAll } from "@divinevoxel/core/Math";

import { BrushTool } from "@divinevoxel/foundation/Default/Tools/Brush/Brush";
import { GenerateCircle } from "./Circle";

const start = { x: 0, y: 0, z: 0 };
const end = { x: 0, y: 0, z: 0 };

export function GenerateTree(
  brush: BrushTool,
  sx: number,
  sy: number,
  sz: number,
  logId: string,
  leafId: string
) {
  const height = ((Math.random() * 15) >> 0) + 5;

  const rx = ((sx - 5 + Math.random() * 10) >> 0) + 1;

  const rz = ((sz - 5 + Math.random() * 10) >> 0) + 1;

  start.x = sx;
  start.y = sy;
  start.z = sz;

  end.x = rx;
  end.y = sy + height;
  end.z = rz;

  brush.setId(logId);
  let c = 0;
  let canGen = true;
  const voxels = VisitAll(start, end, (x, y, z) => {
    c++;
    if (brush._dt.loadInAt(x, y, z)) {
      if (brush._dt.getLevelState() > 0) {
        canGen = false;
      }
    }
    if (c > 50) {
      end.x = x;
      end.y = y;
      end.z = z;
      return false;
    }
    return true;
  });
  if (!canGen) return false;

  for (let i = 0; i < voxels.length; i += 3) {
    const x = voxels[i];
    const y = voxels[i + 1];
    const z = voxels[i + 2];
    brush.setXYZ(x, y, z).paint();
  }

  let capHeight = ((Math.random() * 10) >> 0) + 1;
  if (capHeight < 4) capHeight = 4;
  let i = capHeight;
  let radius = 1;

  while (i--) {
    brush.setId(logId);
    if (i == capHeight - 1) {
      brush.setId(leafId);
    }
    brush.setXYZ(end.x, end.y + i, end.z).paint();
    GenerateCircle(brush, leafId, end.x, end.y + i, end.z, radius, true, true);
    radius++;
  }
}
