import type {
  PixelEntityData,
  PixelEntityIndexData,
} from "../../Types/PixelEntityData.types";
import type { Vec3Array } from "@divinevoxel/core/Math";

import { AnimatedPixelEntity } from "./AnimatedPixelEntity.js";
import { Flat3DAnyArray } from "@divinevoxel/core/Tools/Util/Flat3dArray.js";
import { DataTool } from "@divinevoxel/core/Tools/Data/DataTool.js";
import { $3dCardinalNeighbors } from "@divinevoxel/core/Math/Constants/CardinalNeighbors.js";
import { LightData } from "@divinevoxel/core/Data/Light/LightByte.js";
import { PixelEntityMath } from "../../Maths/PixelEntityMath.js";
import { FaceDataArray, MatrixArray } from "./AnimatedUtils.js";
import { EntityShaderTool } from "../../Util/EntityShaderTool.js";
import { FaceMap } from "@divinevoxel/core/Math/Constants/Faces.js";
import type { DirectionNames } from "@divinevoxel/core";
const dataTool = new DataTool();

export class AnimatedPixelEntityType {
  pixelIndex: Vec3Array[] = [];
  pixelFlatIndex = new Map<string, PixelEntityIndexData>();
  matrix = new MatrixArray(<number[]>[]);
  voxelData: number[] = [];
  faceData = new FaceDataArray();
  entities = new Set<AnimatedPixelEntity>();
  entitiesIndex = new Map<string, AnimatedPixelEntity>();
  _arrayToSAB(data: number[], byteSize = 4) {
    const matrixBufferSize = data.length * byteSize;
    const matrixBuffer = new SharedArrayBuffer(matrixBufferSize);
    const matrix = new Float32Array(matrixBuffer);
    matrix.set(data);

    return matrix;
  }
  processedKeyFrames: Record<
    string,
    Flat3DAnyArray<[displacment: Vec3Array]>[]
  > = {};

  getLightMap() {
    const array = new Flat3DAnyArray<{ voxelPosition: Vec3Array }>(
      this.data.size,
      []
    );
    for (let i = 0; i < this.pixelIndex.length; i++) {
      const x = this.pixelIndex[i][0];
      const y = this.pixelIndex[i][1];
      const z = this.pixelIndex[i][2];
      array.setValue(x, y, z, {
        voxelPosition: [-Infinity, -Infinity, -Infinity],
      });
    }

    return array;
  }

  getInstanceData() {
    return [
      this._arrayToSAB(this.matrix.matricies),
      this._arrayToSAB(this.voxelData),
      this.faceData.cached,
    ];
  }

  _getKey(x: number, y: number, z: number) {
    return `${x}-${y}-${z}`;
  }

  constructor(public data: PixelEntityData) {
    console.log(data);
    this._render(data);
  }

  _render(data: PixelEntityData) {
    this.matrix.matricies = [];
    const dim = PixelEntityMath.SCALE;
    let cy = 0;
    let matrixIndex = 0;
    for (const segmentKey in data.segments) {
      const segment = data.segments[segmentKey];
      const [fx, fy, fz] = segment.offset;
      for (const layer of segment.layers) {
        for (let y = cy; y < layer.height + cy; y++) {
          const bz = layer.matrix.length;
          for (let z = 0; z < bz; z++) {
            const bx = layer.matrix[z].length;
            for (let x = 0; x < bx; x++) {
              const pixel = layer.matrix[z][x];

              if (!pixel) continue;
              const pixelData = segment.pixels[pixel];
              if (!pixelData) continue;

              let tx = x + fx;
              let ty = y + fy;
              let tz = z + fz;

              this.pixelIndex.push([tx, ty, tz]);

              for (const face of FaceMap) {
                const faceData =  pixelData.faceData[<DirectionNames>face];
                this.faceData.addUV(
                  face,
                  faceData.uvStart,
                  faceData.uvEnd,
                  faceData.uvDivider,
                  data.textureIndexes![faceData.texture]
                );
              }

              this.voxelData.push(0);
              this.matrix.addMatrix();
              this.matrix
                .setMatriciesIndex(matrixIndex)
                .setPosition(tx * dim, ty * dim, tz * dim)
                .setScale(
                  pixelData.scale[0],
                  pixelData.scale[1],
                  pixelData.scale[2]
                );

              this.pixelFlatIndex.set(this._getKey(tx, ty, tz), {
                originalPosition: [tx * dim, ty * dim, tz * dim],
                position: [tx * dim, ty * dim, tz * dim],
                matrixIndex: matrixIndex,
              });
              matrixIndex++;
            }
          }
        }
        cy += layer.height;
      }
    }

    this.faceData.create();

    for (const animKey in data.animations) {
      const anim = data.animations[animKey];
      let frames = this.processedKeyFrames[animKey];
      if (!frames) {
        frames = [];
        this.processedKeyFrames[animKey] = frames;
      }
      for (const frame of anim.keyFrames) {
        const frameIndex = new Flat3DAnyArray<[d: Vec3Array]>(data.size, []);
        frames.push(frameIndex);

        for (const data of frame.pixels) {
          const [pixel, displacment] = data;

          const [[sx, sy, sz], [ex, ey, ez]] = pixel;

          for (let y = sy; y <= ey; y++) {
            for (let z = sz; z <= ez; z++) {
              for (let x = sx; x <= ex; x++) {
                frameIndex.setValue(x, y, z, [displacment]);
              }
            }
          }
        }
      }
    }
  }

  _start: Vec3Array = [0, 0, 0];
  _end: Vec3Array = [0, 0, 0];
  _final: Vec3Array = [0, 0, 0];
  _zeroVec3: Vec3Array = [0, 0, 0];
  lerpFrames() {
    for (let i = 0; i < this.pixelIndex.length; i++) {
      const x = this.pixelIndex[i][0];
      const y = this.pixelIndex[i][1];
      const z = this.pixelIndex[i][2];
      const ogPositon = this.getPixelOriginalPosition(x, y, z);
      if (!ogPositon) continue;
      for (const entity of this.entities) {
        entity.update(this.pixelIndex[i], ogPositon);
      }
    }
  }

  addEntity(entity: AnimatedPixelEntity) {
    this.entities.add(entity);
    this.entitiesIndex.set(entity.id, entity);
  }

  removeEntity(id: string) {
    const entity = this.entitiesIndex.get(id);
    if (!entity) return;
    this.entities.delete(entity);
    this.entitiesIndex.delete(entity.id);
  }

  runAnimations() {
    for (const entity of this.entities) {
      entity._runAnimationTick();
    }
    this.lerpFrames();
  }

  getAnimationData(id: string) {
    return this.data.animations[id];
  }

  getAnimationKeyFrame(id: string, frame: number) {
    return this.processedKeyFrames[id][frame];
  }

  getPixelData(x: number, y: number, z: number) {
    const value = this.pixelFlatIndex.get(this._getKey(x, y, z));
    if (!value) return false;
    return value;
  }

  getPixelOriginalPosition(x: number, y: number, z: number) {
    const pixel = this.getPixelData(x, y, z);
    if (!pixel) return false;
    return pixel.originalPosition;
  }

  getPixelMatrixIndex(x: number, y: number, z: number) {
    const pixel = this.getPixelData(x, y, z);
    if (!pixel) return false;
    return pixel.matrixIndex;
  }
  _lightValues: [s: number, r: number, g: number, b: number] = [0, 0, 0, 0];
  _findBrightestLight(sx: number, sy: number, sz: number) {
    let x = Math.ceil(sx);
    let y = Math.ceil(sy);
    let z = Math.ceil(sz);

    if (dataTool.loadInAt(x, y, z)) {
      const light = dataTool.getLight();
      if (light >= 0) return light;
    }

    //if the entity voxel is inside a voxel find the brightest neighbor
    while (true) {
      if (!dataTool.loadInAt(x, y, z)) break;
      if (dataTool.isAir()) break;
      y++;
    }
    for (const n of $3dCardinalNeighbors) {
      if (!dataTool.loadInAt(x + n[0], y + n[1], z + n[2])) continue;
      let l = dataTool.getLight();
      if (l <= 0) continue;
      const v = LightData.getLightValues(l);
      for (let i = 0; i < 4; i++) {
        if (this._lightValues[i] < v[i]) {
          this._lightValues[i] = v[i];
        }
      }
    }
    let brightest = LightData.setLightValues(this._lightValues);
    for (let i = 0; i < 4; i++) {
      this._lightValues[i] = 0;
    }
    return LightData.minusOneForAll(brightest);
  }
}
