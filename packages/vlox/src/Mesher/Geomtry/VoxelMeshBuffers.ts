export class VoxelVertexBuffer {
  _buffers: Float32Array[] = [];
  sectorSize = 0;
  constructor(
    public vertexFloatSize: number,
    public sectorVertexSize: number,
    startingSectorSize = 8
  ) {
    this.sectorSize = vertexFloatSize * sectorVertexSize;
    for (let i = 0; i < startingSectorSize; i++) {
      this._buffers.push(new Float32Array(this.sectorSize));
    }
  }

  currentArray: Float32Array;
  curentIndex = 0;
  _index = 0;

  setIndex(index: number) {
    this._index = index;

    const bufferIndex = Math.floor(
      (index * this.vertexFloatSize) / this.sectorSize
    );

    if (!this._buffers[bufferIndex])
      this._buffers[bufferIndex] = new Float32Array(this.sectorSize);

    this.curentIndex =
      (index * this.vertexFloatSize - bufferIndex * this.sectorSize) /
      this.vertexFloatSize;
    this.currentArray = this._buffers[bufferIndex];
  }
}

export class VoxelIndiceBuffer {
  _buffers: Uint32Array[] = [];

  constructor(
    public sectorSize: number,
    startingSectorSize = 8
  ) {
    for (let i = 0; i < startingSectorSize; i++) {
      this._buffers.push(new Uint32Array(sectorSize));
    }
  }

  currentArray: Uint32Array;
  curentIndex = 0;
  _index = 0;

  setIndex(index: number) {
    this._index = index;

    const bufferIndex = Math.floor(index / this.sectorSize);

    if (!this._buffers[bufferIndex])
      this._buffers[bufferIndex] = new Uint32Array(this.sectorSize);

    this.curentIndex = index - bufferIndex * this.sectorSize;
    this.currentArray = this._buffers[bufferIndex];

  return this;
  }
}
