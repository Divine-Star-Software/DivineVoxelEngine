import { WorldCursor } from "../../World/Cursor/WorldCursor";
import { Vec3Array, Vector3Like } from "@amodx/math";
import { WorldSpaces } from "../../World/WorldSpaces";
import { LocationData } from "../../Math";

 export class TaskMap {
  _map: boolean[] = [];
  get size() {
    return this._map.length;
  }
  origin = Vector3Like.Create();
  start(x: number, y: number, z: number) {
    this._map.length = 0;
    this.origin.x = x;
    this.origin.y = y;
    this.origin.z = z;
  }
  has(x: number, y: number, z: number) {
    return (
      this._map[
        Vector3Like.HashXYZ(
          x - this.origin.x,
          y - this.origin.y,
          z - this.origin.z
        )
      ] !== undefined
    );
  }
  add(x: number, y: number, z: number) {
    this._map[
      Vector3Like.HashXYZ(
        x - this.origin.x,
        y - this.origin.y,
        z - this.origin.z
      )
    ] = true;
  }
  delete(x: number, y: number, z: number) {
    //@ts-ignore
    this._map[
      Vector3Like.HashXYZ(
        x - this.origin.x,
        y - this.origin.y,
        z - this.origin.z
      )
    ] = undefined;
  }
  clear() {
    this._map.length = 0;
  }
} 

const NegativeInfinityVec3 = Vector3Like.Create(
  -Infinity,
  -Infinity,
  -Infinity
);
const InfinityVec3 = Vector3Like.Create(Infinity, Infinity, Infinity);

class UpdatedBounds {
  min = Vector3Like.Clone(InfinityVec3);
  max = Vector3Like.Clone(NegativeInfinityVec3);

  constructor(public _task: UpdateTask) {}

  reset() {
    Vector3Like.Copy(this.min, InfinityVec3);
    Vector3Like.Copy(this.max, NegativeInfinityVec3);
  }

  update(x: number, y: number, z: number) {
    if (x < this.min.x) this.min.x = x;
    if (y < this.min.y) this.min.y = y;
    if (z < this.min.z) this.min.z = z;
    if (x > this.max.x) this.max.x = x;
    if (y > this.max.y) this.max.y = y;
    if (z > this.max.z) this.max.z = z;
  }

  getSections() {
    const minSectionPos = WorldSpaces.section.getPositionXYZ(
      this.min.x - 1,
      this.min.y - 1,
      this.min.z - 1
    );
    const minX = minSectionPos.x;
    const minY = minSectionPos.y;
    const minZ = minSectionPos.z;
    const maxSectionPos = WorldSpaces.section.getPositionXYZ(
      this.max.x + 1,
      this.max.y + 1,
      this.max.z + 1
    );
    const maxX = maxSectionPos.x;
    const maxY = maxSectionPos.y;
    const maxZ = maxSectionPos.z;
    const sectionPositions: Vec3Array[] = [];
    for (let x = minX; x <= maxX; x += WorldSpaces.section.bounds.x) {
      for (let y = minY; y <= maxY; y += WorldSpaces.section.bounds.y) {
        for (let z = minZ; z <= maxZ; z += WorldSpaces.section.bounds.z) {
          if (!this._task.nDataCursor.inBounds(x, y, z)) continue;
          sectionPositions.push([x, y, z]);
        }
      }
    }

    return sectionPositions;
  }
}
export class UpdateTask {
  flow = new FlowQueues();
  rgb = new LightQueue();
  sun = new LightQueue();

  bounds = new UpdatedBounds(this);
  sDataCursor = new WorldCursor();
  nDataCursor = new WorldCursor();
  origin: LocationData;
  setOrigin(origin: LocationData) {
    this.sDataCursor.setFocalPoint(...origin);
    this.nDataCursor.setFocalPoint(...origin);
    this.origin = origin;
    this.rgb.removeMap.start(origin[1], origin[2], origin[3]);
    this.sun.removeMap.start(origin[1], origin[2], origin[3]);
    this.rgb.updateMap.start(origin[1], origin[2], origin[3]);
    this.sun.updateMap.start(origin[1], origin[2], origin[3]);
    this.flow.update.map.start(origin[1], origin[2], origin[3]);
    this.flow.remove.map.start(origin[1], origin[2], origin[3]);
    this.flow.remove.noRemoveMap.start(origin[1], origin[2], origin[3]);

    this.clear();
  }
  clear() {
    this.rgb.clear();
    this.sun.clear();
    this.flow.clear();
    this.bounds.reset();
  }
}

class FlowQueues {
  update = {
    queue: <number[][]>[],
    map: new TaskMap(),
  };
  remove = {
    queue: <number[][]>[],
    map: new TaskMap(),
    noRemoveMap: new TaskMap(),
  };
  clear() {
    this.update.queue.length = 0;
    this.update.map.clear();
    this.remove.queue.length = 0;
    this.remove.map.clear();
    this.remove.noRemoveMap.clear();
  }
}

class LightQueue {
  update: number[] = [];
  remove: number[] = [];
  removeMap = new TaskMap();
  updateMap = new TaskMap();

  clear() {
    this.update.length = 0;
    this.remove.length = 0;
    this.removeMap.clear();
    this.updateMap.clear();
  }
}
