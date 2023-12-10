export class DivineCompute {
  static async init() {
    console.log("INIT THE DIVINE COMPUTE ENGINE");
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      console.warn("Could not init compute engine.");
      return;
    }
    const device = await adapter.requestDevice();
    console.log("got the device",device)
  }
}
