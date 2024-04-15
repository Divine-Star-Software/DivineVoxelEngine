export class QuantumEngine {
  context: GPUCanvasContext;
  adapter: GPUAdapter;
  device: GPUDevice;
  presentationFormat: GPUTextureFormat;
  constructor(public canvas: HTMLCanvasElement | OffscreenCanvas) {}

  async init() {
    const context = this.canvas.getContext("webgpu");
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!adapter || !device || !context) {
      throw new Error(`Could not initalize.`);
    }
    this.context = context;
    this.adapter = adapter;
    this.device = device;

    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    this.presentationFormat = presentationFormat;
    context.configure({
      device,
      format: presentationFormat,
    });
  }
}
