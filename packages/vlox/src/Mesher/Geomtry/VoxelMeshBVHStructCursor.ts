export class VoxelMeshBVHStructCursor {
  get minX() {
    return this.data[this.trueIndex];
  }
  get minY() {
    return this.data[this.trueIndex + 1];
  }
  get minZ() {
    return this.data[this.trueIndex + 2];
  }
  get maxX() {
    return this.data[this.trueIndex + 4];
  }
  get maxY() {
    return this.data[this.trueIndex + 5];
  }
  get maxZ() {
    return this.data[this.trueIndex + 6];
  }
  get voxelIndex() {
    return this.data[this.trueIndex + 3];
  }
  get active() {
    return this.data[this.trueIndex + 3];
  }
  get nodeType() {
    return this.data[this.trueIndex + 7];
  }

  trueIndex = 0;

  private index = 0;

  setIndex(index: number) {
    this.trueIndex = index * 8;
  }
  constructor(public data: Float32Array) {}
  setActive() {
    this.data[this.trueIndex + 3] = 1;
  }
  setVoxelIndex(value: number) {
    this.data[this.trueIndex + 3] = value;
  }
  setInnerNode() {
    this.data[this.trueIndex + 7] = 1;
  }
  setGeomtryNode() {
    this.data[this.trueIndex + 7] = 2;
  }
  updateMin(x: number, y: number, z: number) {
    const ix = this.trueIndex;
    const iy = this.trueIndex + 1;
    const iz = this.trueIndex + 2;
    if (x < this.data[ix] || this.data[ix] == -Infinity) {
      this.data[ix] = x;
    }
    if (y < this.data[iy] || this.data[iy] == -Infinity) {
      this.data[iy] = y;
    }
    if (z < this.data[iz] || this.data[iz] == -Infinity) {
      this.data[iz] = z;
    }
  }
  updateMax(x: number, y: number, z: number) {
    const ix = this.trueIndex + 4;
    const iy = this.trueIndex + 5;
    const iz = this.trueIndex + 6;
    if (x > this.data[ix] || this.data[ix] == -Infinity) {
      this.data[ix] = x;
    }
    if (y > this.data[iy] || this.data[iy] == -Infinity) {
      this.data[iy] = y;
    }
    if (z > this.data[iz] || this.data[iz] == -Infinity) {
      this.data[iz] = z;
    }
  }
}
