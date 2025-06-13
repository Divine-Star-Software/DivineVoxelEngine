import { Engine } from "@babylonjs/core/Engines/engine";
import {
  InternalTexture,
  InternalTextureSource,
} from "@babylonjs/core/Materials/Textures/internalTexture";
import { Scene } from "@babylonjs/core/scene";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
export class ImageArrayTexture extends Texture {
  width: number;
  height: number;
  constructor(
    public imgs: HTMLImageElement[] | null,
    public scene: Scene
  ) {
    super(null, scene);
    if (imgs) {
      const gl = (scene.getEngine() as any)._gl as WebGL2RenderingContext;
      if (!gl.TEXTURE_2D_ARRAY) {
        throw new Error("TEXTURE_2D_ARRAY is not supported on this device.");
      }

      const width = imgs[0].width;
      const height = imgs[0].height;
      this.width = width;
      this.height = height;
      const layers = imgs.length;

      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
      gl.texStorage3D(
        gl.TEXTURE_2D_ARRAY,
        Math.log2(Math.max(width, height)) + 1,
        gl.RGBA8,
        width,
        height,
        layers
      );

      for (let layer = 0; layer < imgs.length; layer++) {
        const img = imgs[layer];

        gl.texSubImage3D(
          gl.TEXTURE_2D_ARRAY,
          0, // Mipmap level
          0,
          0,
          layer,
          width,
          height,
          1, // depth
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          img
        );
      }
      gl.generateMipmap(gl.TEXTURE_2D_ARRAY);

      gl.texParameteri(
        gl.TEXTURE_2D_ARRAY,
        gl.TEXTURE_WRAP_S,
        gl.CLAMP_TO_EDGE
      );
      gl.texParameteri(
        gl.TEXTURE_2D_ARRAY,
        gl.TEXTURE_WRAP_T,
        gl.CLAMP_TO_EDGE
      );

      gl.bindTexture(gl.TEXTURE_2D_ARRAY, null);

      const itex = new InternalTexture(
        scene.getEngine(),
        InternalTextureSource.Unknown
      );
      itex.width = width;
      itex.height = height;
      itex.isReady = true;
      itex.generateMipMaps = true;
      itex.type = Engine.TEXTURETYPE_UNSIGNED_INT;
      itex.is2DArray = true;
      itex._premulAlpha = true;
      this.hasAlpha = true;

      itex._hardwareTexture = {
        setUsage() {
          gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
        },
        reset() {
          gl.bindTexture(gl.TEXTURE_2D_ARRAY, null);
        },
        release() {
          gl.deleteTexture(texture);
        },
        set(hardware) {
          gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
        },
        underlyingResource: texture,
      };

      this._texture = itex;

      this.updateSamplingMode(Texture.NEAREST_NEAREST_MIPLINEAR);
    }
  }

  copy(scene: Scene) {
    return new ImageArrayTexture(this.imgs, scene);
  }
}
