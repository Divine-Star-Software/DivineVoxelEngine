export type PannerNodeData = {
  panningModel?: "equalpower" | "HRTF";
  distanceModel?: "linear" | "inverse" | "exponential";
  positionX: number;
  positionY: number;
  positionZ: number;
  orientationX?: number;
  orientationY?: number;
  orientationZ?: number;
  refDistance?: number;
  maxDistance?: number;
  rolloffFactor?: number;
  coneInnerAngle?: number;
  coneOuterAngle?: number;
  coneOuterGain?: number;
};

export type BiquadFilterNodeData = {
  type: BiquadFilterType;
  frequency: number;
  Q?: number;
  detune?: number;
};

export type DynamicCompressorData = {
  threshold?: number;
  knee?: number;
  ratio?: number;
  attack?: number;
  release?: number;
};
