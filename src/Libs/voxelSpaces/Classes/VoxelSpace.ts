type Vector3 = { x: number; y: number; z: number };
//Objects
export class VoxelSpace {
 static simpleCubeHash(space: VoxelSpace) {
  space._position.x =
   (space._position.x >> space._boundsPower2.x) << space._boundsPower2.x;
  space._position.y =
   (space._position.y >> space._boundsPower2.y) << space._boundsPower2.y;
  space._position.z =
   (space._position.z >> space._boundsPower2.z) << space._boundsPower2.z;
  return space._position;
 }
 static getIndex(position: Vector3, bounds: Vector3) {
  return position.x + position.y * bounds.x + position.z * bounds.z * bounds.y;
 }
 static WholeVec3 = { x: 1, y: 1, z: 1 };
 static spatialHash(
  space: VoxelSpace,
  parentSpace: VoxelSpace,
  divisor: Vector3 = VoxelSpace.WholeVec3
 ) {
  const parentPosition = parentSpace.getPositionXYZ(
   space._position.x,
   space._position.y,
   space._position.z
  );
  space._hashedPosition.x =
   Math.abs(space._position.x - parentPosition.x) / divisor.x;
  space._hashedPosition.y =
   Math.abs(space._position.y - parentPosition.y) / divisor.y;
  space._hashedPosition.z =
   Math.abs(space._position.z - parentPosition.z) / divisor.z;
  return space._hashedPosition;
 }

 _position = { x: 0, y: 0, z: 0 };
 _hashedPosition = { x: 0, y: 0, z: 0 };
 _bounds = { x: 0, y: 0, z: 0 };
 _boundsPower2 = { x: 0, y: 0, z: 0 };
 _boundsSet = false;

 constructor(
  public data: {
   getPosition: (space: VoxelSpace) => Vector3;
   getIndex: (space: VoxelSpace) => number;
  }
 ) {}

 getVolume() {
  return this._bounds.x * this._bounds.y * this._bounds.z;
 }

 getArea() {
  return this._bounds.x * this._bounds.z;
 }

 setXYZ(x: number, y: number, z: number) {
  this._position.x = x;
  this._position.y = y;
  this._position.z = z;
  this.getPosition();
  return this;
 }

 setXZ(x: number, z: number) {
  this._position.x = x;
  this._position.z = z;
  this.getPosition();
  return this;
 }

 setCubeBounds(bounds: Vector3) {
  if (this._boundsSet) return;
  this._boundsPower2.x = bounds.x;
  this._boundsPower2.y = bounds.y;
  this._boundsPower2.z = bounds.z;
  this._bounds.x = 2 ** this._boundsPower2.x;
  this._bounds.y = 2 ** this._boundsPower2.y;
  this._bounds.z = 2 ** this._boundsPower2.z;
  this._boundsSet = true;
  return this;
 }

 setBounds(bounds: Vector3) {
  if (this._boundsSet) return;
  this._bounds.x = bounds.x;
  this._bounds.y = bounds.y;
  this._bounds.z = bounds.z;
  this._boundsSet = true;
  return this;
 }

 getPosition() {
  return this.data.getPosition(this);
 }

 getIndex() {
  return this.data.getIndex(this);
 }

 getPositionXYZ(x: number, y: number, z: number) {
  return this.setXYZ(x, y, z).data.getPosition(this);
 }

 getIndexXYZ(x: number, y: number, z: number) {
  return this.setXYZ(x, y, z).data.getIndex(this);
 }

 getKeyXYZ(x: number, y: number, z: number) {
  return this.setXYZ(x, y, z).getKey();
 }

 getKey() {
  return `${this._position.x}-${this._position.y}-${this._position.z}`;
 }
}
