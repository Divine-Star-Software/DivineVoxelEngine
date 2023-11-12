import { Engine } from "@babylonjs/core/Engines/engine.js";
import { Constants } from "@babylonjs/core/Engines/constants.js";
import { Texture } from "@babylonjs/core/Materials/Textures/texture.js";
import { RenderManager } from "../../Scene/RenderManager.js";
import { RawTexture2DArray } from "@babylonjs/core/Materials/Textures/rawTexture2DArray.js";
import {
  InternalTexture,
  InternalTextureSource,
} from "@babylonjs/core/Materials/Textures/internalTexture.js";
import { Vector3, Vector4 } from "@babylonjs/core/Maths/math.vector.js";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo.js";
import { VertexBuffer } from "@babylonjs/core/Meshes/buffer.js";

export const TextureCreator = {
  context: <CanvasRenderingContext2D | null>null,

  _textureSize: 16,
  imgWidth: 16,
  imgHeight: 16,
  _canvas: <HTMLCanvasElement>document.createElement("canvas"),

  defineTextureDimensions(textureSize: number, mipMapSizes: number[]) {
    this.imgWidth = textureSize < 256 ? 256 : textureSize;
    this.imgHeight = textureSize < 256 ? 256 : textureSize;
    this._textureSize = textureSize;
  },

  setUpImageCreation() {
    this._canvas.width = this.imgWidth;
    this._canvas.height = this.imgHeight;
    const context = this._canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      throw new Error("Context did not load for texture creation.");
    }

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";
    this.context = context;
  },

  async createMaterialTexture(
    name: string,
    images: Map<string, Uint8ClampedArray | false>,
    width: number = -1,
    height: number = -1
  ): Promise<RawTexture2DArray[]> {
    if (width == -1) width = this.imgWidth;
    if (height == -1) height = this.imgHeight;
    this._canvas.width = this.imgWidth;
    this._canvas.height = this.imgHeight;
    const textures: RawTexture2DArray[] = [];

    return (await this._create(name, images, width, height)) as any;
    /*    for (const size of this._mipMapSizes) {
      const texture = await this._createOld(name, images, size, size);
      textures.push(texture);
    }
    return textures; */
  },

  async _create(
    name: string,
    images: Map<string, Uint8ClampedArray | false>,
    width: number,
    height: number
  ) {
    const scene = RenderManager.scene!;
    const engine = scene.getEngine();

    const texture = new RawTexture2DArray(
      await this._createMipMap(0, images, width, height),
      width,
      height,
      images.size + 2,
      Engine.TEXTUREFORMAT_RGBA,
      scene,
      true,
      false,
      Texture.NEAREST_NEAREST_MIPLINEAR
    );
   // texture.anisotropicFilteringLevel = 16;

/*     texture._noMipmap = false;
    const iTexture = texture._texture!;
    iTexture.generateMipMaps = true;
    iTexture.useMipMaps = true;
    engine._bindTextureDirectly(engine._gl.TEXTURE_2D_ARRAY, iTexture);

    let w = width,
      h = height,
      mipMapLevel = 0;
    while (w >= 1 && h >= 1) {
      if (mipMapLevel < 3) {
        this.context!.imageSmoothingEnabled = false;
      } else {
        this.context!.imageSmoothingEnabled = true;
      }
      const mip = await this._createMipMap(mipMapLevel, images, w, h);

      const gl = engine._gl;
      const textureType = engine._getWebGLTextureType(iTexture.type);
      const format = engine._getInternalFormat(iTexture.format);
      const internalFormat = engine._getRGBABufferInternalSizedFormat(
        iTexture.type,
        iTexture.format,
        iTexture._useSRGBBuffer
      );

      engine._unpackFlipY(texture.invertY);

      console.log(w, h);
      let target = gl.TEXTURE_2D_ARRAY;

      gl.texImage3D(
        target,
        mipMapLevel,
        internalFormat,
        w,
        h,
        images.size + 2,
        0,
        format,
        textureType,
        mip
      );
      w /= 2;
      h /= 2;
      mipMapLevel++;
    }

    iTexture.width = width;
    iTexture.height = height;
    iTexture.isReady = true;
    //  iTexture.samplingMode = Texture.NEAREST_NEAREST_MIPLINEAR;
    engine._bindTextureDirectly(engine._gl.TEXTURE_2D_ARRAY, null);
    texture._texture = iTexture;
 */

    return [texture];
  },
  async _createMipMap(
    level: number,
    images: Map<string, Uint8ClampedArray | false>,
    width: number,
    height: number
  ) {
    const scene = RenderManager.scene!;
    const resolvedImages: Uint8ClampedArray[] = [];
    //create blank fill to pad image array buffer

    const data: number[] = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        data.push(0, 0, 0, 1);
      }
    }
    resolvedImages.push(new Uint8ClampedArray(data));
    for (const [path, rawData] of images) {
      const data = await this.loadImage(
        rawData ? rawData : path,
        width,
        height,
        level
      );
      resolvedImages.push(data);
    }
    resolvedImages.push(new Uint8ClampedArray(data));

    let totalLength = 0;
    for (const image of resolvedImages) {
      totalLength += image.byteLength;
    }

    return this._combineImageData(totalLength, resolvedImages);
  },

  loadImage(
    imgSrcData: string | Uint8ClampedArray,
    width: number = 0,
    height: number = 0,
    lod = 0
  ): Promise<Uint8ClampedArray> {
    if (!width) width = this.imgWidth;
    if (!height) height = this.imgHeight;

    const ctx = TextureCreator.context;

    if (!ctx) {
      throw new Error("Context is not set for texture creation.");
    }

    if (typeof imgSrcData == "string") {
      const prom: Promise<Uint8ClampedArray> = new Promise((resolve) => {
        const image = new Image();
        image.src = imgSrcData;
        image.onload = () => {
          //clear the canvas before re-rendering another image
          ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

          ctx.drawImage(image, 0, 0, width!, height!);
          const imgData = ctx.getImageData(0, 0, width!, height!);

          resolve(imgData.data);
        };
      });

      return prom;
    }
    if (imgSrcData instanceof Uint8ClampedArray) {
      const prom: Promise<Uint8ClampedArray> = new Promise(async (resolve) => {
        ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        const bitmap = await createImageBitmap(
          new ImageData(
            imgSrcData,
            Math.sqrt(imgSrcData.length / 4),
            Math.sqrt(imgSrcData.length / 4)
          ),
          {
            resizeWidth: width,
            resizeHeight: height,
            resizeQuality: lod < 3 ? "pixelated" : "high",
            premultiplyAlpha: lod < 3 ? "none" : "premultiply",
          }
        );

        ctx.drawImage(bitmap, 0, 0, width!, height!);

        const imgData = ctx.getImageData(0, 0, width!, height!);
        resolve(imgData.data);
      });
      return prom;
    }

    throw new Error("Context is not set for texture creation.");
  },

  _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]) {
    const combinedImagedata = new Uint8ClampedArray(totalLength);
    const length = arrays[0].length;
    for (let i = 0; i < arrays.length; i++) {
      const array = arrays[i];
      const previousArrayIndex = length * i;

      combinedImagedata.set(array, previousArrayIndex);
    }
    return combinedImagedata;
  },
};
