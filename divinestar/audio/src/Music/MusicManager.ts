import { MusicTrackData } from "../Meta/AudioTypes";
import { MusicNode } from "./MusicNode.js";
export const MusicManager = {
  _nodes: new Map<string, MusicNode>(),

  play(trackId: string) {
    const node = this.getMusicNode(trackId);
    node.play();
    return node;
  },

  stop(trackId: string) {
    const node = this.getMusicNode(trackId);
    node.puase();
  },

  getMusicNode(musicId: string) {
    const node = this._nodes.get(musicId);
    if (!node) {
      throw new Error(`DAE: Music Track with ID: ${musicId} does not exists.`);
    }
    return node;
  },

  registerMusicTracks(data: MusicTrackData[]) {
    for (const track of data) {
      this._nodes.set(track.id, new MusicNode(track));
    }
  },
};
