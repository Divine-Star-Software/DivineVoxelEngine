import { UniformBuffer } from "../../../Core/Buffers/UniformBuffer";
import { QuantumEngine } from "../../../Engine/QuantumEngine";

/*
  struct VoxelParameters {
maxDistToCheck: f32,
voxelGridSize: f32,
gridDimensions: vec3<f32>,
epsilon: f32
}; 
*/
export class VoxelParameters {
  uniform: UniformBuffer;
  get byteSize() {
    return (4 + 4 + 4 + 4) * 4
  }
  view = new Float32Array(this.byteSize / 4);

  constructor(engine: QuantumEngine) {
    this.uniform = new UniformBuffer(
      engine,
      "voxelParams",
      this.view.byteLength,
      "var<uniform> voxelParams: VoxelParameters"
    );
  }

  setMaxDistanceToCheck(value: number) {
    this.view[0] = value;
    return this;
  }
  setElipson(value: number) {
    this.view[1] = value;
    return this;
  }

  setVoxelGridDimensions(x: number, y: number, z: number) {
    this.view[4] = x;
    this.view[5] = y;
    this.view[6] = z;
    return this;
  }

  setVoxelGridSize(size:number) {
    this.view[7] = size;
    return this;
  }

  sync() {

    this.uniform.write(this.view.buffer);
    return this;
  }
}
