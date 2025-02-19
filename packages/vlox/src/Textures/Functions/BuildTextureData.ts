import { CompiledTexture } from "../Classes/CompiledTexture";
import { TextureData } from "../../Textures/Texture.types";
import { CompiledTextureAnimation } from "../../Textures/Classes/CompiledTextureAnimation";

let baseURL = "assets/textures";
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

let atlasCanvas: HTMLCanvasElement;
let atlasContext: CanvasRenderingContext2D;
const finalSize: [width: number, height: number] = [256, 256];

async function getImageBase64(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

async function sliceImageIntoTiles(
  src: string,
  tilesX: number,
  tilesY: number
): Promise<string[]> {
  const image = await loadImage(src);
  const tileWidth = image.width / tilesX;
  const tileHeight = image.height / tilesY;

  atlasCanvas.width = tileWidth;
  atlasCanvas.height = tileHeight;

  const tiles: string[] = [];

  for (let x = 0; x < tilesX; x++) {
    for (let y = 0; y < tilesY; y++) {
      atlasContext.clearRect(0, 0, tileWidth, tileHeight);
      atlasContext.drawImage(
        image,
        x * tileWidth,
        y * tileHeight,
        tileWidth,
        tileHeight,
        0,
        0,
        tileWidth,
        tileHeight
      );
      tiles[CompiledTexture.GetAtlasIndex(x, y, tilesX)] =
        atlasCanvas.toDataURL("image/png");
    }
  }

  return tiles;
}

async function loadImageForShader(
  imgSrcData: string | HTMLImageElement
): Promise<HTMLImageElement> {
  if (!context) throw new Error("");
  canvas.width = finalSize[0];
  canvas.height = finalSize[1];
  const prom: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
    const image = typeof imgSrcData == "string" ? new Image() : imgSrcData;
    image.onerror = (error) => reject(error);
    if (typeof imgSrcData == "string") image.src = imgSrcData;
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = false;
      context.save();
      context.translate(0, canvas.height);
      context.scale(1, -1);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.restore();
      const dataUrl = canvas.toDataURL("image/png");
      const returnImage = new Image(canvas.width, canvas.height);
      returnImage.src = dataUrl;
      returnImage.onload = () => {
        resolve(returnImage);
      };
    };
  });
  return prom;
}

function getImagePath(data: TextureData, parentId: string | null = null) {
  if (data.base64) return data.base64;
  if (data.path) return data.path;
  if (!parentId) return `${baseURL}/${data.id}.png`;
  return `${baseURL}/${parentId}/${data.id}.png`;
}

function getTextureId(data: TextureData, parentId: string | null = null) {
  return `${parentId ? parentId : data.id}${!parentId ? "" : ":" + data.id}`;
}

function createAnimationData(
  atlas: TextureData["atlas"],
  data: TextureData["animated"],
  startIndex: number
): CompiledTextureAnimation {
  const compiled = new CompiledTextureAnimation(startIndex);
  if (!data?.frames) {
    const maxFrames = atlas!.tiles[0] * atlas!.tiles[1];
    for (let i = 0; i < maxFrames; i++) {
      compiled!._frames[i] = i;
      compiled._times[i] = data!.frameTime!;
    }
  } else {
    for (let i = 0; i < data.frames.length; i++) {
      const frameData = data.frames[i];
      if (typeof frameData == "number") {
        compiled!._frames[i] = frameData;
        compiled._times[i] = data!.frameTime!;
        continue;
      }
      compiled!._frames[i] = frameData.index;
      compiled._times[i] = frameData.time;
    }
  }

  if (data?.pingPong) {
    compiled!._frames = [
      ...compiled._frames,
      ...compiled._frames.toReversed().slice(1, compiled._frames.length - 1),
    ];
    compiled!._times = [
      ...compiled._times,
      ...compiled._times.toReversed().slice(1, compiled._times.length - 1),
    ];
  }
  return compiled;
}

async function process(
  compiled: CompiledTexture,
  data: TextureData,
  textureIndex: number,
  parent: string | null,
  cache = false
) {
  const textureId = getTextureId(data, parent);
  compiled.textureMap[textureId] = textureIndex;
  const imagePath = getImagePath(data, parent);
  if (cache) {
    data.base64 = await getImageBase64(imagePath);
  }
  if (!data.atlas) {
    compiled.images[textureIndex] = await loadImageForShader(imagePath);
    return textureIndex + 1;
  }
  const tiles = await sliceImageIntoTiles(imagePath, ...data.atlas.tiles);
  for (let i = 0; i < tiles.length; i++) {
    compiled.images[textureIndex + i] = await loadImageForShader(tiles[i]);
  }
  compiled.atlasSizeMap[textureId] = data.atlas.tiles;
  if (data.animated) {
    compiled.animations.push(
      createAnimationData(data.atlas, data.animated, textureIndex)
    );
  }

  if (data.atlas.namedTiles) {
    for (const named of data.atlas.namedTiles) {
      let tIndex = Array.isArray(named.index)
        ? CompiledTexture.GetAtlasIndex(...named.index, data.atlas.tiles[0])
        : named.index;
      compiled.textureMap[`${textureId}:${named.id}`] = textureIndex + tIndex;
      
    }
  }

  return textureIndex + tiles.length;
}

export type BuildTextureDataProps = {
  type: string;
  baseURL?: string;
  createCache?: boolean;
  textures: TextureData[];
  finalSize?: [width: number, height: number];
};

export async function BuildTextureData({
  type,
  baseURL: currentBaseURL,
  textures,
  finalSize: currentFinalSize,
  createCache,
}: BuildTextureDataProps): Promise<CompiledTexture> {
  const defaultBaseURL = currentBaseURL || "assets/textures";

  finalSize[0] = currentFinalSize ? currentFinalSize[0] : 256;
  finalSize[1] = currentFinalSize ? currentFinalSize[1] : 256;

  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.width = finalSize[0];
    canvas.height = finalSize[1];
    context = canvas.getContext("2d", { willReadFrequently: true })!;
    context.imageSmoothingEnabled = false;
    atlasCanvas = document.createElement("canvas");
    atlasContext = atlasCanvas.getContext("2d", { willReadFrequently: true })!;
    // atlasContext.imageSmoothingEnabled = false;
    if (!context)
      throw new Error(`Error could not create CanvasRenderingContext2D`);
  }

  const compiled = new CompiledTexture(type);

  let count = 0;
  for (const texture of textures) {
    if (texture.basePath) {
      baseURL = texture.basePath;
    } else {
      baseURL = defaultBaseURL;
    }
    if (!texture.variations?.length) {
      try {
        count = await process(compiled, texture, count, null, createCache);
        continue;
      } catch (error) {
        console.warn(`Could not load texture ${texture.id}`);
        console.error(error);
        continue;
      }
    }

    if (texture.variations) {
      for (let i = 0; i < texture.variations.length; i++) {
        const vara = texture.variations[i];
        if (texture.basePath) {
          baseURL = texture.basePath;
        } else {
          baseURL = defaultBaseURL;
        }

        if (typeof vara == "string") {
          const newData: TextureData = { type: texture.type, id: vara };
          try {
            count = await process(
              compiled,
              newData,
              count,
              texture.id,
              createCache
            );
            if (createCache) texture.variations[i] = newData;
            continue;
          } catch (error) {
            console.warn(`Could not load texture ${texture.id}`);
            console.error(error);
            continue;
          }
        }
        try {
          if (vara.basePath) {
            baseURL = vara.basePath;
          } else {
            baseURL = defaultBaseURL;
          }

          count = await process(compiled, vara, count, texture.id, createCache);
        } catch (error) {
          console.warn(`Could not load texture ${texture.id}`);
          console.error(error);
          continue;
        }
      }
    }
  }

  return compiled;
}
