import { ConstructorTextureData, DirectionNames } from "@divinevoxel/core";
import type { Vec2Array, Vec3Array } from "@divinevoxel/core/Math/";
export type PixelEntityData = {
  size: Vec3Array;
  id: string;
  textureIndexes?: Record<string, number>;
  textures: Record<string, ConstructorTextureData>;
  segments: Record<string, PixelEntitySegmentData>;
  startingAnimation: string;
  animations: PixelEntityAnimationData;
};

export type PixelEntityPixelFaceData = Record<
  DirectionNames,
  {
    texture: string;

    uvStart: Vec2Array;
    uvEnd: Vec2Array;
    uvDivider: Vec2Array;
  }
>;

export type PixelEntityPixelData = {
  scale: Vec3Array;
  rotation: Vec3Array;
  color: Vec3Array;
  faceData: PixelEntityPixelFaceData;
};

export type PixelEntitySegmentData = {
  offset: Vec3Array;
  pixels: Record<string, PixelEntityPixelData>;
  layers: {
    height: number;
    matrix: (string | number)[][];
  }[];
};


export type PixelEntityIndexData = {
  originalPosition: Vec3Array;
  position: Vec3Array;
  matrixIndex: number;
};

export type PixelEntityAnimationData = Record<
  string,
  {
    frameOrder: number[];
    keyFrames: PixelEntityKeyFrameData[];
  }
>;

export type PixelEntityKeyFrameData = {
  length: number;
  pixels: [
    pixelRange: [start: Vec3Array, end: Vec3Array],
    displacment: Vec3Array
  ][];
};
