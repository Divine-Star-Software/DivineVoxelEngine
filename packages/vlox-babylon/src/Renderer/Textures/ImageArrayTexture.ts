import {
  URITexture,
  URITextureData,
  URITexture2DArrayData,
} from "@amodx/uri/Textures/URITexture.js";
import {
  URITextureFormat,
  URITextureSamplingMode,
  URITextureTypes,
} from "@amodx/uri/Constants/URITexturesConstants.js";
import { RawTexture2DArray } from "@babylonjs/core/Materials/Textures/rawTexture2DArray.js";
import {
  DVEBRTextureFormatMap,
  DVEBRTextureSamplingModeMap,
} from "../Constants/DVEBRTextureConstants";
import { DVEBRScene } from "../Scene/DVEBRScene";
import {
  Constants,
  Engine,
  InternalTexture,
  InternalTextureSource,
  Scene,
  Texture,
} from "@babylonjs/core";
import { TextureBuilder } from "@divinevoxel/vlox/Textures/TextureBuilder";

export class ImageArrayTexture extends Texture {
  constructor(
    public imgs: HTMLImageElement[],
    public scene: Scene
  ) {
    super(null, scene);

    const gl = (scene.getEngine() as any)._gl as WebGL2RenderingContext;
    if (!gl.TEXTURE_2D_ARRAY) {
      throw new Error("TEXTURE_2D_ARRAY is not supported on this device.");
    }

    const width = imgs[0].width;
    const height = imgs[0].height;
    const layers = imgs.length;

    // Create the WebGL texture array
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

    // Upload each image into the texture array
    for (let layer = 0; layer < imgs.length; layer++) {
      const img = imgs[layer];

      gl.texSubImage3D(
        gl.TEXTURE_2D_ARRAY,
        0, // Mipmap level
        0,
        0,
        layer, // x, y, z offsets
        width,
        height,
        1, // Width, height, depth
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img
      );
    }
    gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
    // Set texture parameters

    // gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    //  gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Update Babylon.js texture object
    // Unbind the texture
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, null);

    const itex = new InternalTexture(
      scene.getEngine(),
      InternalTextureSource.Unknown
    );
    itex.width = width;
    itex.height = height;
    itex.isReady = true;
    itex.type = Engine.TEXTURETYPE_UNSIGNED_INT;
    itex.is2DArray = true;
    //  itex.samplingMode = Texture.NEAREST_NEAREST_MIPLINEAR;

    // itex.type = Engine.TEXTURETYPE_UNSIGNED_INT; // Ensure correct type
    //  itex.is3D = true; //

    itex._hardwareTexture = {
      setUsage() {
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
      },
      reset() {
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, null);
      },
      release() {
        gl.deleteTexture(texture); // Properly delete the texture
      },
      set(hardware) {
        gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
      },
      underlyingResource: texture,
    };

    this._texture = itex;

    this.updateSamplingMode(Texture.NEAREST_NEAREST_MIPLINEAR);
  }

  copy(scene: Scene) {
    return new ImageArrayTexture(this.imgs, scene);
  }
}
