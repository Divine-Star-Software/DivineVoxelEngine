export const TextureCreator = {
    context: null,
    imgWidth: 16,
    imgHeight: 16,
    _mipMapSizes: [16, 12, 8, 4],
    defineTextureDimensions(textureSize, mipMapSizes) {
        this.imgWidth = textureSize;
        this.imgHeight = textureSize;
        this._mipMapSizes = mipMapSizes;
        console.log("create", mipMapSizes);
    },
    setUpImageCreation() {
        const _2dCanvas = document.createElement("canvas");
        _2dCanvas.width = this.imgWidth;
        _2dCanvas.height = this.imgHeight;
        const context = _2dCanvas.getContext("2d", { willReadFrequently: true });
        if (!context) {
            throw new Error("Context did not load for texture creation.");
        }
        context.imageSmoothingEnabled = false;
        this.context = context;
    },
    async createMaterialTexture(name, scene, images, width = -1, height = -1) {
        if (width == -1)
            width = this.imgWidth;
        if (height == -1)
            height = this.imgHeight;
        const textures = [];
        for (const size of this._mipMapSizes) {
            const texture = await this._createTextures(name, scene, images, size, size);
            textures.push(texture);
        }
        return textures;
    },
    async _createTextures(name, scene, images, width, height) {
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
        if (!this.context) {
            throw new Error("Context is not set for texture creation.");
        }
        const prom = new Promise((resolve) => {
            const image = new Image();
            image.src = imgPath;
            image.onload = () => {
                const ctx = TextureCreator.context;
                if (!ctx)
                    return;
                //clear the canvas before re-rendering another image
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(image, 0, 0, width, height);
                const imgData = ctx.getImageData(0, 0, width, height);
                resolve(imgData.data);
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
};
