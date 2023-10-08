import type {
  PixelEntityData,
  PixelEntityIndexData,
} from "Types/PixelEntityData.types";
import type { Vec3Array } from "@divinevoxel/core/Math";

import { Flat3DAnyArray } from "@divinevoxel/core/Tools/Util/Flat3dArray.js";
import { LerpVec3Array } from "@divinevoxel/core/Math/Functions/LerpVec3.js";

import { PixelEntityAnimationManager } from "../Animations/PixelEntityAnimationManager.js";
import { VoxelShaderDataTool } from "@divinevoxel/core/Tools/Shaders/VoxelShaderData.js";
import { LocationData } from "@divinestar/voxelspaces";
import { AnimatedPixelEntityType } from "./AnimatedPixelEntityType.js";
import { MatrixArray } from "./AnimatedUtils.js";

const voxelShader = new VoxelShaderDataTool();

export class AnimatedPixelEntity {
  matrix: MatrixArray<Float32Array>;
  voxelData: Float32Array;
  faceData: Float32Array;
  animation = {
    animation: "",
    count: 0,
    keyFrameTime: 0,
    frameIndex: 0,
    maxFrameIndex: 0,
    frameOrder: <number[]>[],
  };
  nextFrame: Flat3DAnyArray<[displacment: Vec3Array]>;
  currentFrame: Flat3DAnyArray<[displacment: Vec3Array]>;
  pixelFlatIndex: Flat3DAnyArray<PixelEntityIndexData>;
  type: AnimatedPixelEntityType;

  lightMap: Flat3DAnyArray<{
    voxelPosition: Vec3Array;
  }>;

  constructor(
    public location: LocationData,
    public data: PixelEntityData,
    public id = crypto.randomUUID(),
    forceRender = false
  ) {
    this.type = PixelEntityAnimationManager.getEntityType(data, forceRender);

    const [matrix, voxelData, faceData] = this.type.getInstanceData();
    this.matrix = new MatrixArray(matrix);
    this.voxelData = voxelData;
    this.faceData = faceData;

    this.type.addEntity(this);

    this.lightMap = this.type.getLightMap();

    this.setAnimation(data.startingAnimation);
  }

  _getPercentTillNextFrame() {
    return this.animation.count / this.animation.keyFrameTime;
  }

  _runAnimationTick() {
    if (!this.animation.animation) return;
    if (this.animation.count < this.animation.keyFrameTime) {
      this.animation.count++;
      return false;
    }
    this.animation.frameIndex++;
    if (this.animation.frameIndex >= this.animation.maxFrameIndex) {
      this.animation.frameIndex = 0;
    }
    this.animation.count = 0;
    this.currentFrame = this.type.getAnimationKeyFrame(
      this.animation.animation,
      this.animation.frameOrder[this.animation.frameIndex]
    );
    this.animation.keyFrameTime =
      this.data.animations[this.animation.animation].keyFrames[
        this.animation.frameIndex
      ].length;
    this.nextFrame = this.type.getAnimationKeyFrame(
      this.animation.animation,
      this.animation.frameOrder[this.animation.frameIndex + 1]
    );
  }

  _start: Vec3Array = [0, 0, 0];
  _end: Vec3Array = [0, 0, 0];
  _final: Vec3Array = [0, 0, 0];
  _zeroVec3: Vec3Array = [0, 0, 0];

  update([x, y, z]: Vec3Array, ogPositon: Vec3Array) {
    if (!this.animation.animation) return;
    const percent = this._getPercentTillNextFrame();
    const startVecC = this.currentFrame.getValue(x, y, z);
    let startVec = this._zeroVec3;
    if (startVecC) {
      startVec = startVecC[0];
    }
    const endVecC = this.nextFrame.getValue(x, y, z);
    let endVec = this._zeroVec3;
    if (endVecC) {
      endVec = endVecC[0];
    }
    this._start[0] = ogPositon[0] + startVec[0];
    this._start[1] = ogPositon[1] + startVec[1];
    this._start[2] = ogPositon[2] + startVec[2];

    this._end[0] = ogPositon[0] + endVec[0];
    this._end[1] = ogPositon[1] + endVec[1];
    this._end[2] = ogPositon[2] + endVec[2];

    this._final[0] = x;
    this._final[1] = y;
    this._final[2] = z;

    this.updatePixelPosition(
      this._final,
      LerpVec3Array(this._start, this._end, percent)
    );
  }

  setAnimation(id: string) {
    const data = this.type.getAnimationData(id);
    if (!data) return;

    this.animation.animation = id;
    this.animation.count = 0;
    this.animation.maxFrameIndex = data.frameOrder.length - 1;
    this.animation.frameOrder = data.frameOrder;
    this.animation.keyFrameTime = data.keyFrames[data.frameOrder[0]].length;

    if (!this.currentFrame) {
      this.currentFrame = this.type.getAnimationKeyFrame(
        this.animation.animation,
        this.animation.frameOrder[this.animation.frameIndex]
      );
      this.nextFrame = this.type.getAnimationKeyFrame(
        this.animation.animation,
        this.animation.frameOrder[this.animation.frameIndex + 1]
      );
      return;
    }

    this.nextFrame = this.type.getAnimationKeyFrame(
      this.animation.animation,
      this.animation.frameOrder[0]
    );
  }

  updatePixelPosition([x, y, z]: Vec3Array, [nx, ny, nz]: Vec3Array) {
    const matrixIndex = this.type.getPixelMatrixIndex(x, y, z);
    if (matrixIndex === false) return;
    const i = matrixIndex * 16 + 12;

    this.matrix.setMatriciesIndex(matrixIndex).setPosition(nx, ny, nz);

    let tx = Math.ceil(nx + this.location[1]);
    let ty = Math.ceil(ny + this.location[2]);
    let tz = Math.ceil(nz + this.location[3]);

    const position = this.lightMap.getValue(x, y, z).voxelPosition;
    if (position[0] == tx || position[1] == ty || position[2] == tz) return;

    position[0] = tx;
    position[1] = ty;
    position[2] = tz;
    let light = this.type._findBrightestLight(tx, ty, tz);
    //   if (light < 0) light = 0;
    if (light == 0) return;
    voxelShader.setLight(light).setAO(0).setAnimation(0);
    this.voxelData[matrixIndex] = voxelShader.getValue();
  }
}
