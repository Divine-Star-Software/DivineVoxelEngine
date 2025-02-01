export interface VoxelVertexBuffer {
  [index: number]: number;
}
export class VoxelVertexBuffer {
  _buffers: Float32Array[] = [];

  constructor(
    public vertexFloatSize: number,
    public sectorVertexSize: number,
    startingSectorSize = 4
  ) {
    const sectorSize = vertexFloatSize * sectorVertexSize;
    for (let i = 0; i < startingSectorSize; i++) {
      this._buffers.push(new Float32Array(sectorSize));
    }
    const array = this;

    return new Proxy([], {
      get: (target, property) => {
        if (property == "length") return array.length;
        if (property == "_buffers") return array._buffers;
        const index = +(property as any);

        const bufferIndex = Math.floor(index / sectorSize);

        if (!array._buffers[bufferIndex])
          this._buffers[bufferIndex] = new Float32Array(sectorSize);

        const arrayIndex = index - bufferIndex * sectorSize;
        return array._buffers[bufferIndex][arrayIndex];
      },
      set: (target, property, value) => {
        if (property == "length") return false;
        const index = +(property as any);
        const bufferIndex = Math.floor(index / sectorSize);

        if (!array._buffers[bufferIndex])
          array._buffers[bufferIndex] = new Float32Array(sectorSize);

        const arrayIndex = index - bufferIndex * sectorSize;
        array._buffers[bufferIndex][arrayIndex] = value;
        return true;
      },
    }) as any;
  }

  get length() {
    return this._buffers.length * this.vertexFloatSize;
  }
}
export interface VoxelIndiceBuffer {
  [index: number]: number;
}
export class VoxelIndiceBuffer {
  _buffers: Uint32Array[] = [];

  constructor(
    public sectorSize: number,
    startingSectorSize = 4
  ) {
    for (let i = 0; i < startingSectorSize; i++) {
      this._buffers.push(new Uint32Array(sectorSize));
    }
    const array = this;

    return new Proxy([], {
      get: (target, property) => {
        if (property == "length") return array.length;
        if (property == "_buffers") return array._buffers;
        const index = +(property as any);

        const bufferIndex = Math.floor(index / sectorSize);

        if (!array._buffers[bufferIndex])
          this._buffers[bufferIndex] = new Uint32Array(sectorSize);

        const arrayIndex = index - bufferIndex * sectorSize;
        return array._buffers[bufferIndex][arrayIndex];
      },
      set: (target, property, value) => {
        if (property == "length") return false;
        const index = +(property as any);
        const bufferIndex = Math.floor(index / sectorSize);

        if (!array._buffers[bufferIndex])
          array._buffers[bufferIndex] = new Uint32Array(sectorSize);

        const arrayIndex = index - bufferIndex * sectorSize;
        array._buffers[bufferIndex][arrayIndex] = value;
        return true;
      },
    }) as any;
  }

  get length() {
    return this._buffers.length * this.sectorSize;
  }
}
