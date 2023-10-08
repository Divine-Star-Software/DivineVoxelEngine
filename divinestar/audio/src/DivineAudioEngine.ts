import { APIManager } from "./API/APIManager.js";
import { AudioChannelManager } from "./Channels/AudioChannelManager.js";
import { ConstantsManager } from "./Constants/ConstantsManager.js";
import { EffectsManager } from "./Effects/EffectsManager.js";
import { MusicManager } from "./Music/MusicManager.js";
import { SFXMAnager } from "./SFX/SFXManager.js";
import { SoundSpaceManager } from "./SoundSpace/SoundSpaceManager.js";

export const DAE = {
  api: APIManager,
  music: MusicManager,
  sfx: SFXMAnager,
  space: SoundSpaceManager,
  effects: EffectsManager,
  constants: ConstantsManager,
  channels: AudioChannelManager,
  _initalized : false,

  async $INIT() {
    DAE.api.$INIT();
    this._initalized = true;
  },

  async $CREATE() {
    await DAE.sfx.createSFXNodes();
  },
};

export type DivineAudioEngine = typeof DAE;
