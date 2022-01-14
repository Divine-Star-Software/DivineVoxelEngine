export class TextureCreator {
 context: CanvasRenderingContext2D;



 setUpImageCreation() {
  const TwoDcanvas = document.createElement("canvas");

  const context = TwoDcanvas.getContext("2d");

  if (!context) {
   throw new Error("Context did not load for texture creation.");
  }

  this.context = context;
 }

 async createMaterialTexture(
  scene : BABYLON.Scene,
  images: string[],
  width: number = 16,
  height: number = 16
 ): Promise<BABYLON.RawTexture2DArray> {
  const resolvedImages: Uint8ClampedArray[] = [];

  //create blank fill
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
  for (const image of images) {
   const data = await this._loadImages(image, width, height);
   resolvedImages.push(data);
  }
  resolvedImages.push(new Uint8ClampedArray(data));

  let totalLength = images.length * width * height * 4 + width * height * 4 * 2;
  const combinedImages = this._combineImageData(totalLength, resolvedImages);
  const _2DTextureArray = new BABYLON.RawTexture2DArray(
   combinedImages,
   width,
   height,
   images.length + 2,
   BABYLON.Engine.TEXTUREFORMAT_RGBA,
   scene,
   false,
   false,
   BABYLON.Texture.NEAREST_SAMPLINGMODE
  );



  return _2DTextureArray;
 }

 _loadImages(
  imgPath: string,
  width: number,
  height: number
 ): Promise<Uint8ClampedArray> {
  const self = this;
  const prom: Promise<Uint8ClampedArray> = new Promise((resolve) => {
   const loadedImage = new Image();
   loadedImage.src = imgPath;
   loadedImage.onload = function () {
    self.context.drawImage(loadedImage, 0, 0, width, height);
    const imgData = self.context.getImageData(0, 0, width, height);
    resolve(imgData.data);
    self.context.clearRect(0,0,width,height);
   };
  });

  return prom;
 }

 _combineImageData(totalLength: number, arrays: Uint8ClampedArray[]) {
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
