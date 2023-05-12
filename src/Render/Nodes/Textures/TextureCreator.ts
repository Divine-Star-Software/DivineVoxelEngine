import type { RawTexture2DArray } from "@babylonjs/core";
import { DVEBabylon } from "../DVEBabylon.js";
import { RenderManager } from "../../Scene/RenderManager.js";

export const TextureCreator = {
 context: <CanvasRenderingContext2D | null>null,

 _textureSize: 16,
 imgWidth: 16,
 imgHeight: 16,
 _canvas: <HTMLCanvasElement>document.createElement("canvas"),
 _mipMapSizes: [16, 12, 8, 4],

 defineTextureDimensions(textureSize: number, mipMapSizes: number[]) {
  this.imgWidth = textureSize;
  this.imgHeight = textureSize;
  this._textureSize = textureSize;
  this._mipMapSizes = mipMapSizes;
 },

 setUpImageCreation() {
  this._canvas.width = this.imgWidth;
  this._canvas.height = this.imgHeight;
  const context = this._canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
   throw new Error("Context did not load for texture creation.");
  }

  context.imageSmoothingEnabled = false;
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
  for (const size of this._mipMapSizes) {
   const texture = await this._createTextures(name, images, size, size);
   textures.push(texture);
  }
  return textures;
 },

 async _createTextures(
  name: string,
  images: Map<string, Uint8ClampedArray | false>,
  width: number,
  height: number
 ) {
  const scene = RenderManager.scene!;
  const resolvedImages: Uint8ClampedArray[] = [];
  //create blank fill to pad image array buffer
  let index = 0;
  const data = [];
  for (let i = 0; i < width * 2; i++) {
   for (let j = 0; j < height * 2; j++) {
    if (index % 4 == 0) {
     data[index] = 1;
    } else {
     data[index] = 0;
    }
    index++;
   }
  }

  resolvedImages.push(new Uint8ClampedArray(data));
  for (const [path, rawData] of images) {
   const data = await this.loadImage(rawData ? rawData : path, width, height);
   resolvedImages.push(data);
  }
  resolvedImages.push(new Uint8ClampedArray(data));

  let totalLength = images.size * width * height * 4 + width * height * 4 * 2;

  const combinedImages = this._combineImageData(totalLength, resolvedImages);
  const _2DTextureArray = new DVEBabylon.system.RawTexture2DArray(
   combinedImages,
   width,
   height,
   images.size + 2,
   DVEBabylon.system.Engine.TEXTUREFORMAT_RGBA,
   scene,
   false,
   false,
   DVEBabylon.system.Texture.NEAREST_SAMPLINGMODE
  );

  _2DTextureArray.name = name;

  return _2DTextureArray;
 },

 loadImage(
  imgSrcData: string | Uint8ClampedArray,
  width?: number,
  height?: number
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
     const ctx = TextureCreator.context;
     if (!ctx) return;
     //clear the canvas before re-rendering another image
     ctx.clearRect(0, 0, width!, height!);
     ctx.drawImage(image, 0, 0, width!, height!);
     const imgData = ctx.getImageData(0, 0, width!, height!);

     resolve(imgData.data);
    };
   });

   return prom;
  }
  if (imgSrcData instanceof Uint8ClampedArray) {
   const prom: Promise<Uint8ClampedArray> = new Promise(async (resolve) => {
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
     }
    );

    //clear the canvas before re-rendering another image
    ctx.clearRect(0, 0, width!, height!);

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
