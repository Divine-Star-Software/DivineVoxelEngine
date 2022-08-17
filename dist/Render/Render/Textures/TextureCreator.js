export const TextureCreator = {
    context: null,
    imgWidth: 16,
    imgHeight: 16,
    defineTextureDimensions(width, height) {
        this.imgWidth = width;
        this.imgHeight = height;
    },
    setUpImageCreation() {
        const TwoDcanvas = document.createElement("canvas");
        const context = TwoDcanvas.getContext("2d");
        if (!context) {
            throw new Error("Context did not load for texture creation.");
        }
        this.context = context;
    },
    async createMaterialTexture(name, scene, images, width = -1, height = -1) {
        if (width == -1)
            width = this.imgWidth;
        if (height == -1)
            height = this.imgHeight;
        const resolvedImages = [];
        //create blank fill to pad image array buffer
        let index = 0;
        const data = [];
        for (let i = 0; i < width * 2; i++) {
            for (let j = 0; j < height * 2; j++) {
                if (index % 4 == 0) {
                    data[index] = 1;
                }
                else {
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
        const _2DTextureArray = new BABYLON.RawTexture2DArray(combinedImages, width, height, images.length + 2, BABYLON.Engine.TEXTUREFORMAT_RGBA, scene, false, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        _2DTextureArray.name = name;
        return _2DTextureArray;
    },
    _loadImages(imgPath, width, height) {
        const self = this;
        if (!self.context) {
            throw new Error("Context is not set for texture creation.");
        }
        const prom = new Promise((resolve) => {
            const loadedImage = new Image();
            loadedImage.src = imgPath;
            loadedImage.onload = function () {
                //@ts-ignore
                self.context.drawImage(loadedImage, 0, 0, width, height);
                //@ts-ignore
                const imgData = self.context.getImageData(0, 0, width, height);
                resolve(imgData.data);
                //import to clear the canvas before re-rendering another image
                //@ts-ignore
                self.context.clearRect(0, 0, width, height);
            };
        });
        return prom;
    },
    _combineImageData(totalLength, arrays) {
        const combinedImagedata = new Uint8ClampedArray(totalLength);
        const length = arrays[0].length;
        for (let i = 0; i < arrays.length; i++) {
            const array = arrays[i];
            const previousArrayIndex = length * i;
            combinedImagedata.set(array, previousArrayIndex);
        }
        return combinedImagedata;
    },
    getTextureBuffer(imgPath, width = -1, height = -1) {
        const self = this;
        if (width == -1)
            width = this.imgWidth;
        if (height == -1)
            height = this.imgHeight;
        if (!self.context) {
            throw new Error("Context is not set for texture creation.");
        }
        const prom = new Promise((resolve) => {
            const loadedImage = new Image();
            loadedImage.src = imgPath;
            loadedImage.onload = function () {
                //@ts-ignore
                self.context.drawImage(loadedImage, 0, 0, width, height);
                //@ts-ignore
                const imgData = self.context.getImageData(0, 0, width, height);
                resolve(imgData.data);
                //@ts-ignore
                self.context.clearRect(0, 0, width, height);
            };
        });
        return prom;
    }
};
