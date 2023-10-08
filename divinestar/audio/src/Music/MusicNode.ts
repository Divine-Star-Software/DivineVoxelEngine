import { AudioChannel } from "../Channels/AudioChannel.js";
import { DAE } from "../DivineAudioEngine.js";
import { EffectNodes, MusicTrackData } from "../Meta/AudioTypes.js";

export class MusicNode {
  audioNode: MediaElementAudioSourceNode | null = null;
  audio: HTMLAudioElement | null = null;
  master: GainNode | null = null;

  constructor(public data: MusicTrackData) {}

  async play(load = true) {
    if(!DAE._initalized) return;
    if (load) {
      await this.load();
    }
    if (!this.audio || !this.audioNode || !this.master) {
      throw new Error(
        `${this.data.id} is not loaded. Must load before playing`
      );
    }
    if (this.data.loop) {
      this.audio.loop = true;
    }
    const channel = DAE.channels.getChannel(this.data.channel);

    const finalLevel = AudioChannel.getNodeLevel(
      this.data.level,
      channel._level
    );
    this.master.gain.value = finalLevel;
    this.audio.play();
  }

  async fadeIn(interval: number, steps: number) {
    if(!DAE._initalized) return;
    if (!this.master) await this.load();

    const channel = DAE.channels.getChannel(this.data.channel);

    const finalLevel = AudioChannel.getNodeLevel(
      this.data.level,
      channel._level
    );
    this.master!.gain.value = 0;

    this.audio!.currentTime = 0;
    this.audio!.play();
    if (this.data.loop) {
      this.audio!.loop = true;
    }

    return new Promise((resolve) => {
      const inte = setInterval(() => {
        if (!this.master || !this.audio) return resolve(false);
        if (this.audio!.paused) return resolve(false);
        if (this.master!.gain.value >= finalLevel) {
          this.master!.gain.value = finalLevel;
          resolve(true);
          clearInterval(inte);
          return;
        }

        this.master!.gain.value += finalLevel / steps;
      }, interval);
    });
  }

  async fadeOut(interval: number, steps: number) {
    if(!DAE._initalized) return;
    if (!this.master) return false;
    const channel = DAE.channels.getChannel(this.data.channel);

    const finalLevel = AudioChannel.getNodeLevel(
      this.data.level,
      channel._level
    );
    this.master!.gain.value = finalLevel;

    return new Promise((resolve) => {
      const inte = setInterval(() => {
        if (!this.master || !this.audio) return resolve(false);
        if (this.audio!.paused) return resolve(false);
        if (this.master!.gain.value <= 0) {
          this.master!.gain.value = 0;
          resolve(true);
          clearInterval(inte);
          this.puase();
          return;
        }
        this.master!.gain.value -= finalLevel / steps;
      }, interval);
    });
  }

  onEnd(func: (this: GlobalEventHandlers, ev: Event) => any) {
    if (!this.audio) return this;
    this.audio.onended = func;
    return this;
  }
  onPause(func: (this: GlobalEventHandlers, ev: Event) => any) {
    if (!this.audio) return this;
    this.audio.onpause = func;
    return this;
  }

  puase() {
    if (!this.audio) return;
    this.audio.pause();
    return this;
  }

  unlLoad() {
    this.audioNode = null;
    this.audio = null;
    if (this.master) this.master.dispatchEvent(DAE.api._dissconectEvent);
    this.master = null;
  }

  load() {
    const channel = DAE.channels.getChannel(this.data.channel);

    const nodes = DAE.api.createAudioElementNode(this.data.path);
    this.audioNode = nodes.audioNode;
    this.audio = nodes.audio;

    this.master = DAE.api.createGain(this.data.level);
    this.audioNode.connect(this.master);

    channel.add(this.master, this.data.level);

    return new Promise((resolve) => {
      nodes.audio.addEventListener("canplay", () => {
        resolve(true);
      });
    });
  }
}
