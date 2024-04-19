import { QuantumEngine } from "Engine/QuantumEngine";

export class Texture {
  _texture: GPUTexture;
  constructor(
    public engine: QuantumEngine,
    public name: string,
    public description: GPUTextureDescriptor,
    public shaderDefine: string
  ) {
    this._texture = engine.device.createTexture(description);
  }
}
