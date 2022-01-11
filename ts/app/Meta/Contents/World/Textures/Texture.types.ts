export type TextureData = {
 /**# Name
  * The name of the texutre.
  */
 name: string;
 /**# ID
  * The id of the texture.
  * This will be used to locate the file.
  */
 id: string;
 /**# Path
  * If the texture is not in the default path specify it here.
  */
 path?: string;
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
 /**# Varations
  * The name of the texture must be default with the folder being its ID.
  * Varations allow you to add varations to the same texutre.
  *
  * If you add a varation of "grassy-top" you must you include in the
  * folder of the texture one with the name 'grassy-top'.
  *
  * So the files in that folder would be for a texture with the ID **dreamstone**
  * - dreamstone/default.png
  * - dreamstone/grassy-top.png
  */
 varations?: Record<string, true>;
};
