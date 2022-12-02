import { PannerNodeData } from "./API.types";
import { EffectData } from "./Effects.types";

export type MusicTrackData = {
  id: string;
  path: string;
  channel: "main" | string;
  loop: boolean;
  level : number;
};

export type SFXData = {
  id: string;
  path: string;
  channel: "sfx" | string;
  varations?: SFXPlayOptions[];
  is3dSound?: boolean;
  loop ?: boolean;
  _3dSoundData?: Partial<PannerNodeData>;
};

export type MusicTrackNodes = {
  audio: MediaElementAudioSourceNode;
  master: GainNode;
  effects: Record<string, EffectNodes>;
};

export type SFXNodes = {
  buffer: AudioBuffer;
};

export type SFXPlayOptions = {
  startTime?: number;
  level?: number;
  dryLevel?: number;
  playBackRate?: number;
  _3dSoundData?: Partial<PannerNodeData>;
  _3dSoundPosition?: {
    x: number;
    y: number;
    z: number;
  };
  effects?: EffectData;
};

export type EffectTypes = "reverb" | "delay" | "filter";

export type EffectNodes = {
  type: EffectTypes;
  master: GainNode;
  reverb?: ConvolverNode;
  delay?: DelayNode;
};

