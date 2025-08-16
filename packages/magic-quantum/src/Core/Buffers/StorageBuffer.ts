import { QuantumEngine } from "../../Engine/QuantumEngine";

export class StorageBuffer {
  _buffer: GPUBuffer;
  constructor(
    public engine: QuantumEngine,
    public name: string,
    public size: number,
    public shaderDefine: string
  ) {
    this._buffer = engine.device.createBuffer({
      size: size,
      label: name,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
  }

  write(buffer: BufferSource | SharedArrayBuffer, offeset = 0) {
    this.engine.device.queue.writeBuffer(this._buffer, offeset, buffer);
    return this;
  }
}
