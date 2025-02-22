import { WorldSpaces } from "../../World/WorldSpaces";
import { LocationData } from "../../Math";
import { WorldCursor } from "../../World/Cursor/WorldCursor";
import { DimensionSegment } from "./DimensionSegment";
import { WorldRegister } from "../../World/WorldRegister";
import { Vec3Array, Vector3Like } from "@amodx/math";
import { VoxelTickUpdate } from "../Voxels/Ticks/VoxelTickUpdate"
import { PriorityQueue } from "../../Util/PriorityQueue";
import { VoxelUpdate } from "../Voxels/Behaviors";
const NegativeInfinityVec3 = Vector3Like.Create(
  -Infinity,
  -Infinity,
  -Infinity
);
const InfinityVec3 = Vector3Like.Create(Infinity, Infinity, Infinity);
const tempPosition = Vector3Like.Create();
class UpdatedBounds {
  displayMin = Vector3Like.Clone(InfinityVec3);
  displayMax = Vector3Like.Clone(NegativeInfinityVec3);
  dimension = 0;

  start(dimension?: number) {
    this.dimension = dimension || 0;
    Vector3Like.Copy(this.displayMin, InfinityVec3);
    Vector3Like.Copy(this.displayMax, NegativeInfinityVec3);
  }

  updateDisplay(x: number, y: number, z: number) {
    if (x < this.displayMin.x) this.displayMin.x = x;
    if (y < this.displayMin.y) this.displayMin.y = y;
    if (z < this.displayMin.z) this.displayMin.z = z;
    if (x > this.displayMax.x) this.displayMax.x = x;
    if (y > this.displayMax.y) this.displayMax.y = y;
    if (z > this.displayMax.z) this.displayMax.z = z;
  }

  markDisplayDirty() {
    if (
      this.displayMax.x == -Infinity ||
      this.displayMax.y == -Infinity ||
      this.displayMax.z == -Infinity
    )
      return false;
    if (
      this.displayMin.x == Infinity ||
      this.displayMin.y == Infinity ||
      this.displayMin.z == Infinity
    )
      return false;
    const minSectionPos = WorldSpaces.section.getPosition(
      this.displayMin.x - 1,
      this.displayMin.y - 1,
      this.displayMin.z - 1,
      tempPosition
    );
    const minX = minSectionPos.x;
    const minY = minSectionPos.y;
    const minZ = minSectionPos.z;
    const maxSectionPos = WorldSpaces.section.getPosition(
      this.displayMax.x + 1,
      this.displayMax.y + 1,
      this.displayMax.z + 1,
      tempPosition
    );
    const maxX = maxSectionPos.x;
    const maxY = maxSectionPos.y;
    const maxZ = maxSectionPos.z;

    for (let x = minX; x <= maxX; x += WorldSpaces.section.bounds.x) {
      for (let z = minZ; z <= maxZ; z += WorldSpaces.section.bounds.z) {
        for (let y = minY; y <= maxY; y += WorldSpaces.section.bounds.y) {
          if (!WorldSpaces.world.inBounds(x, y, z)) continue;
          const sector = WorldRegister.sectors.get(this.dimension, x, y, z);
          if (!sector) continue;
          const section = sector.getSection(x, y, z);
          if (!section.canRender()) continue;
          section.incrementTick(section._Ticks.displayDirty);
        }
      }
    }
  }
}

export class DimensionSimulation {
  private cursor = new WorldCursor();
  nDataCursor = new WorldCursor();
  sDataCursor = new WorldCursor();
  bounds = new UpdatedBounds();

  updateQueue = new PriorityQueue<VoxelUpdate>();


  constructor(public dimension: DimensionSegment) {}

  setOrigin(x: number, y: number, z: number) {
    this.cursor.setFocalPoint(this.dimension.id, x, y, z);
    this.nDataCursor.setFocalPoint(this.dimension.id, x, y, z);
    this.sDataCursor.setFocalPoint(this.dimension.id, x, y, z);
  }

  getVoxelForUpdate(x: number, y: number, z: number) {
    const voxel = this.cursor.getVoxel(x, y, z);
    if (!voxel)
      throw new Error(
        `Tried to run tick update on voxel that does not exist at [${x} ${y} ${z}]`
      );
    return voxel;
  }

  scheduleUpdate(
    type: string,
    x: number,
    y: number,
    z: number,
    delay: number,
    data = null
  ) {
    const active = this.dimension.activeSectors.get(x, y, z);
    if (!active)
      throw new Error(
        `Tried to schedule a voxel update on a non loaded active sector`
      );
    const update = new VoxelTickUpdate(type, x, y, z, data);
    active.tickQueue.addTick(update, delay);
  }
}
