import { DAE } from "../DivineAudioEngine.js";
export const SoundSpaceManager = {
    model: "HRTF",
    setListenerPosition(x, y, z) {
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
    setListenerDirection(x, y, z) {
        const context = DAE.api.context;
        const listener = context.listener;
        listener.forwardX.value = x;
        listener.forwardY.value = y;
        listener.forwardZ.value = z;
    },
};
