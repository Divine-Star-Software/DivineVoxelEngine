import { LocationData } from "../../Math";
import { WorldSpaces } from "../../World/WorldSpaces";
import { DimensionSegment } from "../Dimensions/DimensionSegment";
const pool: LocationData[] = [];
export class TaskSegment {
  _hash = new Set();
  nodes: LocationData[] = [];

  waitingFor = 0;
  clear() {}

  _taskCount = 0;

  _task = new Map<number, LocationData>();

  constructor(
    public dimension: DimensionSegment,
    public generationTask: boolean
  ) {}

  _getLocationData(dimension: number, x: number, y: number, z: number) {
    const location: LocationData = pool.length ? pool.shift()! : [0, 0, 0, 0];
    location[0] = dimension;
    location[1] = x;
    location[2] = y;
    location[3] = z;
    return location;
  }

  completeTask(id: number) {
    const locationData = this._task.get(id);
    if (!locationData) return false;
    this._hash.delete(
      WorldSpaces.hash.hashXYZ(
        locationData[1],
        locationData[2],
        locationData[3]
      )
    );
    this._task.delete(id);
    pool.push(locationData);
    this.waitingFor--;

    return true;
  }

  addTask(x: number, y: number, z: number) {
    const id = this._taskCount;
    this._task.set(id, this._getLocationData(this.dimension.id, x, y, z));
    this._taskCount++;
    this.waitingFor++;
    return id;
  }

  has(x: number, y: number, z: number) {
    return this._hash.has(WorldSpaces.hash.hashXYZ(x, y, z));
  }

  add(x: number, y: number, z: number) {
    const key = WorldSpaces.hash.hashXYZ(x, y, z);
    if (this._hash.has(key)) return false;
    this._hash.add(key);
    const location = this._getLocationData(this.dimension.id, x, y, z);
    this.nodes.push(location);
  }

  sort(x: number, y: number, z: number) {
    const sections = this.nodes;
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

  *run(): Generator<LocationData> {
    while (this.nodes.length) {
      const vec = this.nodes.shift()!;
      const key = WorldSpaces.hash.hashXYZ(vec[1], vec[2], vec[3]);
      this._hash.delete(key);
      yield vec;

      pool.push(vec);
    }
  }
}
