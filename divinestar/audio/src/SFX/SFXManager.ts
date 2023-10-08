import { DAE } from "../DivineAudioEngine.js";
import { SFXData, SFXPlayOptions } from "../Meta/AudioTypes.js";
import { SFXNode } from "./SFXNode.js";

export const SFXMAnager = {
  _sfxCount: 0,
  _sfxPalette: <Record<string, number>>{},
  _sfxMap: <Record<number, string>>{},

  _sfxData: <Record<string, SFXData>>{},

  _sfxNodes: new Map<string, SFXNode>(),

  _sfxChannels: <Record<string, GainNode>>{},

  _sfxPlayCount: new Map<string | number, number>(),

  play(sfxId: string | number, options?: SFXPlayOptions) {
    if(!DAE._initalized) return;
    const node = this.getSFXNode(sfxId);
    node.play(options);
  },

  getSFXNode(sfxId: string | number) {
    const node = this._sfxNodes.get(
      typeof sfxId == "string" ? sfxId : this._sfxMap[sfxId as number]
    );

    if (!node) {
      throw new Error(
        `DAE: SFX with ID: ${sfxId} does audio nodes are not created.`
      );
    }

    return node;
  },

  registerSFX(sfxData: SFXData[]) {
    for (const sfx of sfxData) {
      this._sfxData[sfx.id] = sfx;
      this._sfxPalette[sfx.id] = this._sfxCount;
      this._sfxMap[this._sfxCount] = sfx.id;
      this._sfxCount++;
    }
  },

  async createSFXNodes() {
    for (const sfxKey of Object.keys(this._sfxData)) {
      const sfx = this._sfxData[sfxKey];
      const channel = DAE.channels.getChannel(sfx.channel);
      let buffer;
      if (sfx.path) {
        buffer = await DAE.api.loadAudioBuffer(sfx.path);
      }
      if (sfx.rawData) {
        buffer = await DAE.api.creteAudioBuffer(sfx.rawData);
      }
      if (!buffer) {
        throw new Error(`${sfx.id} must have a path or raw data set`);
      }

      this._sfxNodes.set(sfx.id, new SFXNode(channel, sfx, buffer));
    }
  },
};
