import { QuantumEngine } from "Engine/QuantumEngine";

export class TextureSampler {
  _sampler: GPUSampler;
  constructor(
    public engine: QuantumEngine,
    public name: string,
    public description: GPUSamplerDescriptor,
    public shaderDefine: string
  ) {
    this._sampler = engine.device.createSampler(description);
  }
}
