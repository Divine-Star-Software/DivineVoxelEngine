import { Vector3Like } from "@amodx/math";
import { Flat3DIndex } from "@amodx/math/Volumes";

const alignToPowerOf2 = (value: number, powerOf2: number) => {
  const mask = (1 << powerOf2) - 1;
  return value & ~mask;
};

//Objects
export abstract class VoxelSpace {
  static index = Flat3DIndex.GetXZYOrder();
  static simpleCubeHash(space: VoxelSpace) {
    space._position.x = alignToPowerOf2(
      space._position.x,
      space.boundsPower2.x
    );
    space._position.y = alignToPowerOf2(
      space._position.y,
      space.boundsPower2.y
    );
    space._position.z = alignToPowerOf2(
      space._position.z,
      space.boundsPower2.z
    );
    return space._position;
  }

  static getPositionFromIndex(
    position: Vector3Like,
    bounds: Vector3Like,
    index: number
  ) {
    this.index.setBounds(bounds.x, bounds.y, bounds.z);
    const newPosition = this.index.getXYZ(index);
    position.x = newPosition[0];
    position.y = newPosition[1];
    position.z = newPosition[2];

    return position;
  }

  static getIndex(position: Vector3Like, bounds: Vector3Like) {
    this.index.setBounds(bounds.x, bounds.y, bounds.z);
    return this.index.getIndexVec3(position);
  }

  static WholeVec3 = Vector3Like.Create(1, 1, 1);
  static spatialHash(
    space: VoxelSpace,
    parentSpace: VoxelSpace,
    divisor: Vector3Like = VoxelSpace.WholeVec3
  ) {
    const parentPosition = parentSpace.getPositionXYZ(
      space._position.x,
      space._position.y,
      space._position.z
    );
    space._hashedPosition.x = space._position.x - parentPosition.x / divisor.x;
    space._hashedPosition.y = space._position.y - parentPosition.y / divisor.y;
    space._hashedPosition.z = space._position.z - parentPosition.z / divisor.z;
    return space._hashedPosition;
  }

  _position = Vector3Like.Create();
  _hashedPosition = Vector3Like.Create();
  bounds = Vector3Like.Create();
  boundsPower2 = Vector3Like.Create();
  _boundsSet = false;

  constructor() {}

  log = false;

  abstract getPosition(): Vector3Like;
  abstract getIndex(): number;
  abstract getPositionFromIndex(index: number): Vector3Like;

  getVolume() {
    return this.bounds.x * this.bounds.y * this.bounds.z;
  }

  getArea() {
    return this.bounds.x * this.bounds.z;
  }

  getHeight() {
    return this.bounds.y;
  }

  getWidth() {
    return this.bounds.x;
  }

  getDepth() {
    return this.bounds.z;
  }

  setXYZ(x: number, y: number, z: number) {

    this._position.x = x;
    this._position.y = y;
    this._position.z = z;

    this.getPosition();


    return this;
  }

  setCubeBounds(bounds: Vector3Like) {
    if (this._boundsSet) return;
    this.boundsPower2.x = bounds.x;
    this.boundsPower2.y = bounds.y;
    this.boundsPower2.z = bounds.z;
    this.bounds.x = 2 ** this.boundsPower2.x;
    this.bounds.y = 2 ** this.boundsPower2.y;
    this.bounds.z = 2 ** this.boundsPower2.z;
    this._boundsSet = true;
    return this;
  }

  setBounds(bounds: Vector3Like) {
    if (this._boundsSet) return;
    this.bounds.x = bounds.x;
    this.bounds.y = bounds.y;
    this.bounds.z = bounds.z;
    this._boundsSet = true;
    return this;
  }

  getPositionXYZ(x: number, y: number, z: number) {
    this.setXYZ(x, y, z);
    return this._position;
  }

  getIndexXYZ(x: number, y: number, z: number) {
    return this.setXYZ(x, y, z).getIndex();
  }

  getKey() {
    return `${this._position.x}_${this._position.y}_${this._position.z}`;
  }

  getKeyXYZ(x: number, y: number, z: number) {
    return this.setXYZ(x, y, z).getKey();
  }
}
