import { DAE } from "../DivineAudioEngine.js";

export const SoundSpaceManager = {
  model: <"equalpower" | "HRTF">"HRTF",

  setListenerPosition(x: number, y: number, z: number) {
    const context = DAE.api.context;
    const listener = context.listener;
    listener.positionX.value = x;
    listener.positionY.value = y;
    listener.positionZ.value = z;
  },
  /**# Set Listener Direction
   * ---
   * For 3d games set this to the forward vector of the player camera.
   */
  setListenerDirection(x: number, y: number, z: number) {
    const context = DAE.api.context;
    const listener = context.listener;
    listener.forwardX.value = x;
    listener.forwardY.value = y;
    listener.forwardZ.value = z;
  },
};
