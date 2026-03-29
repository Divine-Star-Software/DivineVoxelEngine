import { Vec2Array, Vector2Like, Vector3Like } from "@amodx/math";

export type CreateNoiseMessage = {
  state: NoiseVisualizerState;
  start: Vector2Like;
  size: Vector2Like;
};

export enum NoiseViewModes {
  View2D = "View2D",
  View3D = "View3D",
}
export enum NoiseModes {
  Noise2D = "Noise2D",
  Noise3D = "Noise3D",
}

export enum Noise2DViewModes {
  Binary = "Binary",
  BinaryCumulative = "BianryCumulative",
}

export enum Noise3DViewModes {
  Binary = "Binary",
}

class NoiseVisualizerView3DBinaryState {
  range: Vec2Array = [1, 1];
  height = 60;
}

class NoiseVisualizerView2DBinaryState {
  range: Vec2Array = [1, 1];
}

class NoiseVisualizerView2DBinaryCumulativeState {
  range: Vec2Array = [1, 1];
  height = 60;
  heightStep = 5;
}

class NoiseVisualizerView2DState {
  mode = Noise2DViewModes.BinaryCumulative;
  binary = new NoiseVisualizerView2DBinaryState();
  binaryCumulative = new NoiseVisualizerView2DBinaryCumulativeState();
}

class NoiseVisualizerView3DState {
  mode = Noise3DViewModes.Binary;
  binary = new NoiseVisualizerView3DBinaryState();
}

export class NoiseVisualizerState {
  textureSize = Vector2Like.Create(256, 256);
  offset = Vector3Like.Create();
  noiseMode = NoiseModes.Noise3D;
  viewMode = NoiseViewModes.View3D;
  view2d = new NoiseVisualizerView2DState();
  view3d = new NoiseVisualizerView3DState();
}
