import {
  URITextureFormat,
  URITextureSamplingMode,
  URITextureTypes,
} from "@amodx/uri/Constants/URITexturesConstants";
import { URITexture } from "@amodx/uri/Textures/URITexture";
import { DivineVoxelEngineRender } from "../Contexts/Render/DivineVoxelEngineRender";

export class TextureBuilder {
  static context: CanvasRenderingContext2D | null = null;

  static _textureSize = 16;
  static finalImagWidth = 16;
  static finalImageHeight = 16;

  static _canvas: HTMLCanvasElement = document.createElement("canvas");

  static defineTextureDimensions(textureSize: number, mipMapSizes: number[]) {
    this.finalImagWidth = textureSize < 256 ? 256 : textureSize;
    this.finalImageHeight = textureSize < 256 ? 256 : textureSize;
    this._textureSize = textureSize;
  }

  static setUpImageCreation() {
    this._canvas.width = this.finalImagWidth;
    this._canvas.height = this.finalImageHeight;
    const context = this._canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      throw new Error("Context did not load for texture creation.");
    }

    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";
    this.context = context;
  }

  static async createMaterialTexture(
    name: string,
    images: Map<string, Uint8ClampedArray | string | false>,
    width: number = -1,
    height: number = -1
  ): Promise<URITexture> {
    if (width == -1) width = this.finalImagWidth;
    if (height == -1) height = this.finalImageHeight;
    this._canvas.width = this.finalImagWidth;
    this._canvas.height = this.finalImageHeight;

    return (await this._create(name, images, width, height)) as any;
    /*    for (const size of this._mipMapSizes) {
      const texture = await this._createOld(name, images, size, size);
      textures.push(texture);
    }
    return textures; */
  }

  static async _create(
    name: string,
    images: Map<string, Uint8ClampedArray | string | false>,
    width: number,
    height: number
  ) {
    // const scene = RenderManager.scene!;
    const data = (await this._createMipMap(0, images, width, height)) as any;
    const texture =
      DivineVoxelEngineRender.instance.renderer.engine.createTexture({
        type: URITextureTypes.Texture2DArray,
        data,
        width,
        height,
        scene: DivineVoxelEngineRender.instance.renderer.scene,
        layers: images.size + 2,
        format: URITextureFormat.Rgba,
        samplingMode: URITextureSamplingMode.TrilinearSamplingMode,
        //@ts-ignore
        images,
      });
    await texture._create();

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

    return texture;
  }

  static async _createMipMap(
    level: number,
    images: Map<string, Uint8ClampedArray | string | false>,
    width: number,
    height: number
  ) {
    //   const scene = RenderManager.scene!;
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
  }

  static async getRawData(imageSrc: string): Promise<Uint8ClampedArray> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = imageSrc;
      image.onload = () => {
        if (!this.context) {
          return reject(new Error("Context is not set for texture creation."));
        }
        this._canvas.width = image.width;
        this._canvas.height = image.height;
        this.context.clearRect(0, 0, image.width, image.height);
        this.context.drawImage(image, 0, 0, image.width, image.height);
        const imgData = this.context.getImageData(
          0,
          0,
          image.width,
          image.height
        );
        resolve(imgData.data);
        this._canvas.width = this.finalImagWidth;
        this._canvas.height = this.finalImageHeight;
      };
      image.onerror = (err) => reject(err);
    });
  }

  static async loadImage(
    imgSrcData: string | Uint8ClampedArray,
    width: number = 0,
    height: number = 0,
    lod = 0,
    flip = true
  ): Promise<Uint8ClampedArray> {
    if (!width) width = this.finalImagWidth;
    if (!height) height = this.finalImageHeight;

    const ctx = TextureBuilder.context;

    if (!ctx) {
      throw new Error("Context is not set for texture creation.");
    }



    if (typeof imgSrcData == "string") {
      const prom: Promise<Uint8ClampedArray> = new Promise((resolve) => {
        const image = new Image();
        image.src = imgSrcData;
        image.onload = async () => {
          ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
          ctx.save();
          if (flip) {
            ctx.scale(1, -1);
            ctx.drawImage(image, 0, -image.height, image.width!, image.height!);
          } else {
            ctx.drawImage(image, 0, 0, image.width!, image.height!);
          }
          ctx.restore();
          const imgData = ctx.getImageData(0, 0, image.width!, image.height!);

          const bitmap = await createImageBitmap(
            new ImageData(imgData.data, image.width, image.height),
            {
              resizeWidth: width,
              resizeHeight: height,
              resizeQuality: "pixelated",
              premultiplyAlpha: lod != 0 ? "premultiply" : undefined,
            }
          );
          ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
          ctx.drawImage(bitmap, 0, 0, width!, height!);
          const bitmapData = ctx.getImageData(0, 0, width!, height!);
 
          resolve(bitmapData.data);
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
            resizeQuality: "pixelated",
            premultiplyAlpha: lod != 0 ? "premultiply" : undefined,
          }
        );

        ctx.save();
        if (flip) {
          ctx.scale(1, -1);
          ctx.drawImage(bitmap, 0, -height, width!, height!);
        } else {
          ctx.drawImage(bitmap, 0, 0, width!, height!);
        }
        ctx.restore();

        const imgData = ctx.getImageData(0, 0, width!, height!);
    
        resolve(imgData.data);
      });
      return prom;
    }

    throw new Error("Context is not set for texture creation.");
  }

  static _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]) {
    const combinedImagedata = new Uint8ClampedArray(totalLength);
    const length = arrays[0].length;
    for (let i = 0; i < arrays.length; i++) {
      const array = arrays[i];
      const previousArrayIndex = length * i;

      combinedImagedata.set(array, previousArrayIndex);
    }
    return combinedImagedata;
  }
}
