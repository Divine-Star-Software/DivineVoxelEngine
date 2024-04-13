export class ComputeEngine {
  private static _instance: ComputeEngine;
  adapter: GPUAdapter;
  device: GPUDevice;

  constructor() {
    if (ComputeEngine._instance) return ComputeEngine._instance;
    ComputeEngine._instance = this;
    return this;
  }
  async init() {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!adapter || !device) {
      throw new Error(`Could not initalize.`);
    }
    this.adapter = adapter as any;
    this.device = device as any;
  }
}
