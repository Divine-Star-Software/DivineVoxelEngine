export type TextureId =
  | [id: string, frame: [x: number, y: number]]
  | [id: string, index: number]
  | [id: string, varation: string]
  | [id: string, varation: string, frame: [x: number, y: number]]
  | [id: string, varation: string, index: number]
  | string;

export type TextureTypeUVMap = Record<string, Record<string, number>>;
export type TextureDataBase = {
  /**
   * The id of the texture.
   * This will be used to locate the file if no direct path is given.
   */
  id: string;
  /**
   * If the texture is not in the default path specify it here.
   */
  path?: string;
  /**
   * Provide a base64 encoded string to use instead of downloading
   */
  base64?: string;
  /**
   * If the texture is an atlas specify it here.
   */
  atlas?: {
    spacing?: [pixelX: number, pixelY: number];
    tiles: [tilesX: number, tilesY: number];
    namedTiles?: {
      id: string;
      index: [tileX: number, tileY: number] | number;
    }[];
  };
  /**
   * If the texture is an animated speicfy it here.
   * Only atlas texture can be animated.
   */
  animated?: {
    frameTime: number;
    interpolate?: boolean;
    frames?: (number | { index: number; time: number })[];
  };
};

export type TextureData = {
  /**
   * The type of texture. Used to combined all textures into one final one.
   *
   * Defaults to dve_voxel
   */
  type?: string;
  /**
   * Add textures to the same texture that can be refernced with a TextureId.
   *
   * If not directly giving paths the main texture must be named default
   * and all varations must be in the same folder and be the name of the key they
   * are stored in the variations object.
   */
  variations?: (string | TextureDataBase)[];
} & TextureDataBase;
