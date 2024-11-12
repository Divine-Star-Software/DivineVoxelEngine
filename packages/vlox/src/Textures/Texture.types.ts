export type TextureTypes = string;

export type TextureTypeUVMap = Record<
  string,
  Record<string, Record<string, number>>
>;

export type TextureAnimationData = {
  /**# Frames
   * If the texture has animation frames the number of frames must be set to the number
   * texture animatoin images. This number must be greater than 1.
   *
   * The number will be used to locate all the associated frames.
   *
   * Example: If you specify 3 frames for a texture with the ID **dreamstone** the folder would look like this:
   * - dreamstone/default-1.png
   * - dreamstone/default-2.png
   * - dreamstone/default-3.png
   */
  frames: number;
  /**# Anim Keys
   * If the texture is animated you must supply the anim key frames which
   * is just the order of the frames.
   */
  animKeys?: number[];
  /**# Global Frame Time
   * ---
   * Specifies how many frames every anim key should be display.
   */
  globalFrameTime?: number;
  /**# Anim Key Frame Time
   * ---
   * If set globalFrameTime will be ignored.
   * Specifies how many frames every anim should be displayed.
   * You must supply a number for every animKey.
   */
  animKeyFrameTimes?: number[];
};
export type TextureDataBase = {
  /**# rawData
   * Provide a Uint8ClampedArray or an array of Uint8ClampedArray's instead of downloading
   */
  rawData?: Uint8ClampedArray | Uint8ClampedArray[];
  /**# base64
   * Provide a base64 encoded string to use instead of downloading
   */
  base64?: string | string[];
  /**# includeInRawDataMap
   * Will keep a Uint8ClampedArray of the loaded texture if set to true.
   */
  includeInRawDataMap?: boolean;
};
export type TextureData = {
  type: TextureTypes;
  /**# ID
   * The id of the texture.
   * This will be used to locate the file.
   */
  id: string;
  /**# Path
   * If the texture is not in the default path specify it here.
   */
  path?: string;
  /**# Segment
   * Define the segmetn of the texutre. By default it is main.
   */
  segment?: string;
  /**# normalMap
   * If the texture is an overlay specify it here.
   */
  normalMap?: boolean;
  /**# Varations
   * The name of the texture must be default with the folder being its ID.
   * Variations allow you to add variations to the same texture.
   *
   * If you add a variation of "grassy-up" you must you include in the
   * folder of the texture one with the name 'grassy-up'.
   *
   * So the files in that folder would be for a texture with the ID **dreamstone**
   * - dreamstone/default.png
   * - dreamstone/grassy-up.png
   */
  variations?: Record<string, TextureAnimationData & TextureDataBase>;
} & TextureAnimationData &
  TextureDataBase;
