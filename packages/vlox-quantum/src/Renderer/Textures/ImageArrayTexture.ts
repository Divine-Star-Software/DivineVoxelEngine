import { Scene } from "../Scene/Scene";

export class ImageArrayTexture {
  _texture: GPUTexture;
  _smapler: GPUSampler;
  constructor(
    public images: HTMLImageElement[],
    public scene: Scene
  ) {
    const device = scene.engine.device;
    const width = images[0].width;
    const height = images[0].height;
    const layerCount = images.length;
    console.warn("make image array texture", width, height, images);

    const texture = device.createTexture({
      dimension: "2d",

      size: [width, height, layerCount],
      format: "rgba8unorm",
      usage:
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.COPY_DST |
        GPUTextureUsage.RENDER_ATTACHMENT,
    });
    this._texture = texture;

    const encoder = device.createCommandEncoder();
    const queue = device.queue;

    for (let i = 0; i < images.length; i++) {
      queue.copyExternalImageToTexture(
        { source: images[i] },
        { texture: texture, origin: [0, 0, i] },
        [width, height, 1]
      );
    }

    this._smapler = device.createSampler({
      magFilter: "nearest",
      minFilter: "nearest",
    });
    device.queue.submit([encoder.finish()]);
    console.warn("Created texture", queue);
  }

  createView() {
    return this._texture.createView({
      dimension: "2d-array",
      baseArrayLayer: 0,
      arrayLayerCount: this.images.length,
    });
  }
}
