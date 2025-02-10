import { LocationData } from "../../../Math";
import { TaskTool } from "../../../Tools/Tasks/TasksTool";
import { WorldSpaces } from "../../../World/WorldSpaces";
const pool: LocationData[] = [];
export abstract class TickQueue {
  hash = new Set();
  sections: LocationData[] = [];

  constructor(public tasks: TaskTool) {}

  add(dimension: number, x: number, y: number, z: number) {
    const key = WorldSpaces.hash.hashXYZ(x, y, z);
    if (this.hash.has(key)) return false;
    this.hash.add(key);
    const location: LocationData = pool.length ? pool.shift()! : [0, 0, 0, 0];
    location[0] = dimension;
    location[1] = x;
    location[2] = y;
    location[3] = z;
    this.sections.push(location);
  }
  sort(x: number, y: number, z: number) {
    const sections = this.sections;
    const sx = x,
      sy = y,
      sz = z;
    let i = sections.length,
      j,
      temp,
      ax,
      ay,
      az,
      bx,
      by,
      bz,
      distA,
      distB;

    while (i > 1) {
      for (j = 1; j < i; j++) {
        (ax = sections[j - 1][1]),
          (ay = sections[j - 1][2]),
          (az = sections[j - 1][3]);
        (bx = sections[j][1]), (by = sections[j][2]), (bz = sections[j][3]);

        distA = (ax - sx) ** 2 + (ay - sy) ** 2 + (az - sz) ** 2;
        distB = (bx - sx) ** 2 + (by - sy) ** 2 + (bz - sz) ** 2;

        if (distA > distB) {
          temp = sections[j - 1];
          sections[j - 1] = sections[j];
          sections[j] = temp;
        }
      }
      i--;
    }
    return sections;
  }

  abstract runTask(section: LocationData): void;

  run(limit = 25) {
    let count = 0;
    while (this.sections.length) {
      const vec = this.sections.shift()!;
      const [, x, y, z] = vec;
      this.runTask(vec);
      this.tasks.build.section.run(vec);
      this.hash.delete(WorldSpaces.hash.hashXYZ(x, y, z));
      count++;
      pool.push(vec);
      if (count > limit) break;
    }
  }
}
