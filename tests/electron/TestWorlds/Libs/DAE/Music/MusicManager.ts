import { MusicTrackNodes, MusicTrackData } from "Meta/Audio.types";
import { DAE } from "../DivineAudioEngine.js";
export const MusicManager = {
  _musicCount: 0,
  _musicPalette: <Record<string, number>>{},
  _musicMap: <Record<number, string>>{},
  _trackData: <Record<string, MusicTrackData>>{},

  _trackNodes: <Record<string, MusicTrackNodes>>{},

  musicChannels: <Record<string, GainNode>>{},

  play(trackId: string | number) {
    const data = this.getTrackData(trackId);
    const node = this._trackNodes[data.id];
    if (!node) {
      throw new Error(`Track with id ${data.id} does not exists`);
    }
    if (data.loop) {
      node.audio.mediaElement.loop = true;
    }
    node.master.gain.value = data.level;
    node.audio.mediaElement.play();
  },

  stop(trackId: string | number) {
    const data = this.getTrackData(trackId);
  },

  getTrackData(sfxId: string | number) {
    let id = sfxId;
    if (this._musicMap[sfxId as number]) {
      id = this._musicMap[sfxId as number];
    }
    const data = this._trackData[id];
    if (!data) {
      throw new Error(`DAE: Music Track with ID: ${id} does not exists.`);
    }
    return data;
  },

  registerMusicTracks(data: MusicTrackData[]) {
    for (const track of data) {
      this._trackData[track.id] = track;
    }
  },

  async createMusicNodes() {
    for (const trackID of Object.keys(this._trackData)) {
      const track = this._trackData[trackID];
      const node = await DAE.api.createAudioElementNode(track.path);
      this._trackNodes[track.id] = node;
    }
  },
};
