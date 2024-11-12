import { UniformBuffer } from "../../../Core/Buffers/UniformBuffer";
import { QuantumEngine } from "../../../Engine/QuantumEngine";

/*
struct VoxelMaterials {
 
    color: vec4<f32>,
    x -> roughness
    y -> metallic
    z -> emissive

    material: vec4<f32>,
};  
*/
export class VoxelMaterials {
  uniform: UniformBuffer;
  static MaxSize = 255;
  static StructNumberSize = 8;
  get byteSize() {
    return (4 + 4 + 4) * 4 * VoxelMaterials.MaxSize;
  }
  view = new Float32Array(this.byteSize / 4);

  constructor(engine: QuantumEngine) {
    this.uniform = new UniformBuffer(
      engine,
      "voxelMaterials",
      this.view.byteLength,
      `var<uniform> voxelMaterials: array<VoxelMaterials, ${VoxelMaterials.MaxSize}>`
    );
  }

  _index = 0;
  _trueIndex = 0;
  setIndex(index: number) {
    this._index = index;
    this._trueIndex = VoxelMaterials.StructNumberSize * index;
  }

  setColor(color: { r: number; g: number; b: number; a: number }) {
    this.view[this._trueIndex] = color.r/255;
    this.view[this._trueIndex + 1] = color.g/255;
    this.view[this._trueIndex + 2] = color.b/255;
    this.view[this._trueIndex + 3] = color.a/255;
  }

  setRoughness(value: number) {
    this.view[this._trueIndex + 8] = value;
  }
  setMetallic(value: number) {
    this.view[this._trueIndex + 9] = value;
  }
  setEmissive(value: number) {
    this.view[this._trueIndex + 10] = value;
  }
  sync() {

    this.uniform.write(this.view.buffer);
    return this;
  }
}
