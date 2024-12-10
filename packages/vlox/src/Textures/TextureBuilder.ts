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

    document.body.append(this._canvas);

  /*   this._canvas.setAttribute(
      "style",
      `
    image-rendering: pixelated; 
    position: absolute;
    border: 1px solid red;
    z-index: 1000;
    top: 0;
`
    );

   */

    this.context = context;
  }

  static async createMaterialTexture(
    name: string,
    images: Map<string, HTMLImageElement | string | false>,
    width: number = -1,
    height: number = -1
  ): Promise<HTMLImageElement[]> {
    if (width == -1) width = this.finalImagWidth;
    if (height == -1) height = this.finalImageHeight;
    this._canvas.width = this.finalImagWidth;
    this._canvas.height = this.finalImageHeight;

    const resolvedImages: HTMLImageElement[] = [];

    for (const [path, rawData] of images) {
      const data = await this.loadImage(
        rawData ? rawData : path,
        width,
        height
      );
      resolvedImages.push(data);
    }
    return resolvedImages;
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
    imgSrcData: string | HTMLImageElement,
    width: number = 0,
    height: number = 0
  ): Promise<HTMLImageElement> {
    if (!width) width = this.finalImagWidth;
    if (!height) height = this.finalImageHeight;

    const ctx = TextureBuilder.context;

    if (!ctx) {
      throw new Error("Context is not set for texture creation.");
    }

    const prom: Promise<HTMLImageElement> = new Promise((resolve) => {
      const image = typeof imgSrcData == "string" ? new Image() : imgSrcData;
      if (typeof imgSrcData == "string") image.src = imgSrcData;
      image.onload = () => {
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(image, 0, 0, this._canvas.width!, this._canvas.height!);

        const dataUrl = this._canvas.toDataURL("image/png");
        const returnImage = new Image(this._canvas.width, this._canvas.height);
        returnImage.src = dataUrl;
        returnImage.onload = () => {
          resolve(returnImage);
        };
      };
    });

    return prom;
  }
}
