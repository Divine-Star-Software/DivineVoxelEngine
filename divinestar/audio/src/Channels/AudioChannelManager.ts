import { AudioChannelData } from "../Meta/AudioChannelsTypes";
import { AudioChannel } from "./AudioChannel.js";

export const AudioChannelManager = {
  _channels: new Map<string, AudioChannel>(),
  masterLevel: 1,

  setMasterLevel(level: number) {
    this.masterLevel = level;
    for (const [id, channel] of this._channels) {
      channel._update();
    }
  },

  registerChannels(channels: AudioChannelData[]) {
    for (const channelData of channels) {
      const channel = new AudioChannel(channelData);
      this._channels.set(channelData.id, channel);
    }
  },

  getChannel(id: string) {
    const channel = this._channels.get(id);
    if (!channel) throw new Error(`Channel with ${id} does not exist`);
    return channel;
  },
};
