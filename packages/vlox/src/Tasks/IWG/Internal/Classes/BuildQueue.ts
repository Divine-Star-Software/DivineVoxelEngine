import { LocationData } from "../../../../Math";
import { TaskTool } from "../../../../Tools/Tasks/TasksTool";
import { WorldSpaces } from "../../../../World/WorldSpaces";

export class BuildQueue {
  hash = new Set();
  sections: LocationData[] = [];

  constructor(public tasks: TaskTool) {}

  add(data: LocationData) {
    const key = WorldSpaces.hash.hashXYZ(data[1], data[2], data[3]);
    if (this.hash.has(key)) return false;
    this.hash.add(key);

    this.sections.push(data);
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
  }

  run(limit = 25) {
    let count = 0;
    while (this.sections.length) {
      const vec = this.sections.shift()!;
      const [dimension, x, y, z] = vec;
      this.tasks.build.section.run([dimension, x, y, z]);
      this.hash.delete(WorldSpaces.hash.hashXYZ(x, y, z));
      count++;
      if (count > limit) break;
    }
  }
}
