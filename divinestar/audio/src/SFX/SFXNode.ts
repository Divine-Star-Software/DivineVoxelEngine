import { AudioChannel } from "../Channels/AudioChannel";
import { DAE } from "../DivineAudioEngine.js";
import { SFXData, SFXPlayOptions } from "../Meta/AudioTypes";

class SFXInstance {
  constructor(public source: AudioBufferSourceNode) {}

  stop() {
    this.source.stop();
  }
}

export class SFXNode {
  _sfxPlayCount = 0;

  constructor(
    public channel: AudioChannel,
    public data: SFXData,
    public buffer: AudioBuffer
  ) {}

  getOptions() {
    if (!this.data.varations) return false;
    const length = this.data.varations.length;
    const index = Math.floor(Math.random() * length);
    return this.data.varations[index];
  }

  _getPanner(data: SFXData, options?: SFXPlayOptions) {
    if (data.is3dSound) {
      let pannerData = data._3dSoundData;
      if (!data._3dSoundData && options?._3dSoundData) {
        pannerData = options._3dSoundData;
      }
      if (!options?._3dSoundPosition) {
        throw new Error(`Must provide a postion to play a 3d sound.`);
      }
      if (!pannerData) {
        pannerData = {
          positionX: 0,
          positionY: 0,
          positionZ: 0,
        };
      }
      pannerData.positionX = options._3dSoundPosition.x;
      pannerData.positionY = options._3dSoundPosition.y;
      pannerData.positionZ = options._3dSoundPosition.z;
      return DAE.api.createPannerNode(pannerData);
    }
    return false;
  }

  play(options?: SFXPlayOptions) {
    if(!DAE._initalized) return;
    const data = this.data;

    if (this._sfxPlayCount > 30) return;
    this._sfxPlayCount++;

    getOptions: if (options && data.varations) {
      let newOption = this.getOptions();
      if (!newOption) break getOptions;
      if (options._3dSoundPosition) {
        newOption._3dSoundPosition = {
          x: options._3dSoundPosition.x,
          y: options._3dSoundPosition.y,
          z: options._3dSoundPosition.z,
        };
      }
      if (options._3dSoundData) {
        newOption._3dSoundData = {
          ...options._3dSoundData,
        };
      }
      if (options.dryLevel) newOption!.dryLevel = options.dryLevel;
      if (options.level) newOption!.level = options.level;
      options = newOption;
    }

    if (!options && data.varations) {
      let opt = this.getOptions();
      if (opt) options = opt;
    }
    const disconnectNodes: AudioNode[] = [];

    const master = DAE.api.createGain();

    const source = DAE.api.createAudioBufferSource(this.buffer);

    let finalNode: AudioNode = source;
    if (options?.playBackRate !== undefined) {
      source.playbackRate.value = options.playBackRate;
    }
    if (data.is3dSound) {
      const panner = this._getPanner(data, options);
      if (panner) {
        finalNode.connect(panner);
        disconnectNodes.push(panner);
        finalNode = panner;
      }
    }

    if (options?.effects) {
      DAE.effects.getEffectsNode(
        options.effects,
        finalNode,
        master,
        disconnectNodes
      );
      const sourceGain = DAE.api.createGain();
      if (options?.dryLevel !== undefined) {
        sourceGain.gain.value = options.dryLevel;
      }

      finalNode.connect(sourceGain);
      sourceGain.connect(master);
      disconnectNodes.push(sourceGain);
    } else {
      finalNode.connect(master);
    }

    if (options?.level !== undefined) {
      master.gain.value = options.level;
    }

    this.channel.add(master, master.gain.value);

    disconnectNodes.push(source, master);

    source.onended = () => {
      this._sfxPlayCount--;
      for (const node of disconnectNodes) {
        node.disconnect();
        node.dispatchEvent(DAE.api._dissconectEvent);
      }
    };

    /*     master.gain.setValueAtTime(master.gain.value, DAE.api.context.currentTime);
        master.gain.exponentialRampToValueAtTime(
          0.0001,
          DAE.api.context.currentTime + node.buffer.duration * 2
        ); */

    if (data.loop) {
      source.loop = true;
    }
    source.start(0);

    return new SFXInstance(source);
  }
}
