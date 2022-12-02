import { APIManager } from "./API/APIManager.js";
import { ConstantsManager } from "./Constants/ConstantsManager.js";
import { EffectsManager } from "./Effects/EffectsManager.js";
import { MusicManager } from "./Music/MusicManager.js";
import { SFXMAnager } from "./SFX/SFXManager.js";
import { SoundSpaceManager } from "./SoundSpace/SoundSpaceManager.js";
export const DAE = {
    version: "0.0.0",
    api: APIManager,
    music: MusicManager,
    sfx: SFXMAnager,
    space: SoundSpaceManager,
    effects: EffectsManager,
    constants: ConstantsManager,
    async $INIT() {
        DAE.api.$INIT();
        DAE.sfx.createChannels();
        await DAE.music.createMusicNodes();
        await DAE.sfx.createSFXNodes();
    },
};
