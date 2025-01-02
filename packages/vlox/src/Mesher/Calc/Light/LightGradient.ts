import type { VoxelMesherDataTool } from "../../Tools/VoxelMesherDataTool";

import { OverrideManager } from "../../Rules/Overrides/OverridesManager.js";
import { LightData } from "../../../Data/LightData";

import { QuadScalarVertexData, QuadVec3ArrayVertexData } from "@amodx/meshing/Primitives/QuadVertexData";
import { SubstanceRules } from "../../Rules/SubstanceRules.js";
import { QuadVerticies } from "@amodx/meshing/Geometry.types";
import { VoxelFaces, VoxelFaceDirections } from "../../../Math";
import { Vector3Like } from "@amodx/math";
import { GradientCheckSets } from "../CalcConstants";

const LD = LightData;
const LightValue = new QuadScalarVertexData();

const AOValue = new QuadScalarVertexData();
const AOGeometryValues = new QuadVec3ArrayVertexData();

const isMax = (num: number, v1: number, v2: number): boolean => {
  return num >= v1 && num >= v2;
};
const isAllEqual = (
  num: number,
  v1: number,
  v2: number,
  v3: number
): boolean => {
  return num == v1 && v1 == v2 && v2 == v3;
};
const shouldSunFlip = (face: VoxelFaces) => {
  const upRight = LD.getS(LightValue.vertices[QuadVerticies.TopRight]);
  const upLeft = LD.getS(LightValue.vertices[QuadVerticies.TopLeft]);
  const downLeft = LD.getS(LightValue.vertices[QuadVerticies.BottomLeft]);
  const downRight = LD.getS(LightValue.vertices[QuadVerticies.BottomRight]);
  if (isAllEqual(upRight, upLeft, downLeft, downRight)) return false;
  const t1 =
    downLeft > upLeft && downLeft > upRight && downLeft > downRight;
  const t2 =
    upRight > upLeft && upRight > downLeft && upRight > downRight;
  const t3 =
    upLeft < downLeft && upLeft < upRight && upLeft < downRight;
  const t4 =
    downRight < upLeft && downRight < upRight && downRight < upLeft;
  if (t1 && !t2) return true;
  if (t2 && !t1) return true;
  if (t3) return true;
  if (t4) return true;
  return false;
};

const shouldRGBFlip = (face: VoxelFaces) => {
  const upRight = LD.getRGB(LightValue.vertices[QuadVerticies.TopRight]);
  const upLeft = LD.getRGB(LightValue.vertices[QuadVerticies.TopLeft]);
  const downLeft = LD.getRGB(LightValue.vertices[QuadVerticies.BottomLeft]);
  const downRight = LD.getRGB(LightValue.vertices[QuadVerticies.BottomRight]);
  if (isAllEqual(upRight, upLeft, downLeft, downRight)) return false;
  const t1 =
    downLeft > upLeft && downLeft > upRight && downLeft > downRight;
  const t2 =
    upRight > upLeft && upRight > downLeft && upRight > downRight;
  const t3 =
    upLeft < downLeft && upLeft < upRight && upLeft < downRight;
  const t4 =
    downRight < upLeft && downRight < upRight && downRight < upLeft;
  if (t1 && !t2) return true;
  if (t2 && !t1) return true;
  if (t3) return true;
  if (t4) return true;
  return false;
};

const shouldAOFlip = (face: VoxelFaces) => {
  if (states.ignoreAO) return false;
  LightGradient.tool.faceDataOverride.face = face;
  LightGradient.tool.faceDataOverride.default = false;

  if (
    OverrideManager.AOFlipFace.run(
      LightGradient.tool.voxel.getShapeId(),
      OverrideManager.ANY,
      LightGradient.tool.faceDataOverride
    )
  ) {
    return false;
  }
  const upRight = AOValue.vertices[QuadVerticies.TopRight];
  const upLeft = AOValue.vertices[QuadVerticies.TopLeft];
  const downRight = AOValue.vertices[QuadVerticies.BottomRight];
  const downLeft = AOValue.vertices[QuadVerticies.BottomLeft];

  if (isAllEqual(upRight, upLeft, downLeft, downRight)) return false;
  const t1 = isMax(upRight, upLeft, downRight);
  const t2 = isMax(downLeft, upLeft, downRight);
  if (t1 || t2) return true;
  return false;
};

const flipCheck = (face: VoxelFaces) => {
  if (shouldAOFlip(face)) return true;
  if (shouldRGBFlip(face)) return true;
  return shouldSunFlip(face);
};
/**
 * 
2       1
|    /  |
|   /   |
|  /    |
| /     |
3       4


 */

const states = { ignoreAO: false };
const newRGBValues: number[] = [];
const RGBValues = { r: 0, g: 0, b: 0 };
const sunValues = { s: 0 };
const nlValues = { s: 0, r: 0, g: 0, b: 0 };
const AOValues = { a: 0 };

export const LightGradient = {
  tool: <VoxelMesherDataTool>{},
  settings: {
    doAO: true,
    doRGB: true,
    doSun: true,
  },
  aoOffset: Vector3Like.Create(),
  calculate(face: VoxelFaces, tool: VoxelMesherDataTool, ignoreAO?: boolean) {
    tool.setFaceFlipped(false).getWorldLight().setAll(0);

    tool.getWorldAO().setAll(0);
    this.tool = tool;
    const voxelSubstance = SubstanceRules.getSubstanceParent(
      tool.voxel.getSubstance()
    );
    const isLightSource = tool.voxel.isLightSource();

    let light = tool.voxel.getLight();
    let aoOverRide = -1;
    AOValue.setAll(1);

    if (this.settings.doAO && !ignoreAO) {
      states.ignoreAO = false;
    } else {
      states.ignoreAO = true;
    }

    let baseAO = 0;

    const faceNormal = VoxelFaceDirections[face];
    tool.nVoxel.loadInAt(
      tool.position.x + faceNormal[0],
      tool.position.y + faceNormal[1],
      tool.position.z + faceNormal[2]
    );

    light = tool.nVoxel.getLight();
    if (light < 0) {
      if (tool.voxel.getLight() >= 0) {
        light = tool.voxel.getLight();
      } else {
        light = 0;
      }
    }

    if (face == VoxelFaces.Up) {
      if (tool.nVoxel.isRenderable() && !tool.nVoxel.isLightSource()) {
        tool.faceDataOverride.face = face;
        tool.faceDataOverride.default = false;
        if (
          OverrideManager.DarkenFaceUnderneath.run(
            tool.nVoxel.getShapeId(),
            OverrideManager.ANY,
            tool.faceDataOverride
          )
        ) {
          aoOverRide = 1;
        }
      }
    }
    for (let vertex: QuadVerticies = <QuadVerticies>0; vertex < 4; vertex++) {
      const checkSet = GradientCheckSets[face][vertex];

      if (this.settings.doRGB || this.settings.doSun) {
        const values = LD.getLightValues(light);
        if (this.settings.doSun) {
          sunValues.s = values[0];
        }
        if (this.settings.doRGB) {
          RGBValues.r = values[1];
          RGBValues.g = values[2];
          RGBValues.b = values[3];
        }
      }

      AOValues.a = 0;

      let checkSetIndex = 0;
      for (let i = 0; i < 9; i += 3) {
        if (this.settings.doRGB || this.settings.doSun) {
          if (
            !tool.nVoxel.loadInAt(
              checkSet[i] + tool.position.x,
              checkSet[i + 1] + tool.position.y,
              checkSet[i + 2] + tool.position.z
            )
          )
            continue;

          const nl = tool.nVoxel.getLight();
          if (nl >= 0) {
            const values = LD.getLightValues(nl);
            nlValues.s = values[0];
            nlValues.r = values[1];
            nlValues.g = values[2];
            nlValues.b = values[3];

            if (this.settings.doRGB) {
              if (LD.removeS(nl)) {
                if (nlValues.r > RGBValues.r && RGBValues.r < 15) {
                  RGBValues.r = nlValues.r;
                }

                if (nlValues.g > RGBValues.g && RGBValues.g < 15) {
                  RGBValues.g = nlValues.g;
                }

                if (nlValues.b > RGBValues.b && RGBValues.b < 15) {
                  RGBValues.b = nlValues.b;
                }
              }
            }
            if (this.settings.doSun) {
              if (LD.getS(nl)) {
                if (sunValues.s < nlValues.s && sunValues.s < 15) {
                  sunValues.s = nlValues.s;
                }
              }
            }
          }
        }
        /*
    Do AO
    */

        if (!states.ignoreAO) {
          if (
            !tool.nVoxel.loadInAt(
              tool.nVoxel.x + this.aoOffset.x,
              tool.nVoxel.y + this.aoOffset.y,
              tool.nVoxel.z + this.aoOffset.z
            )
          )
            continue;
          if (aoOverRide > 0) {
            AOValues.a = aoOverRide;
          } else if (!tool.nVoxel.isRenderable()) {
          } else {
            const neighborVoxelSubstance = SubstanceRules.getSubstanceParent(
              tool.nVoxel.getSubstance()
            );
            const neightLightSource = tool.nVoxel.isLightSource();

            let finalResult = true;

            if (neighborVoxelSubstance != voxelSubstance) {
              finalResult = false;
            }

            if (isLightSource || neightLightSource) {
              finalResult = false;
            }

            tool.faceDataOverride.face = face;
            tool.faceDataOverride.default = finalResult;

            finalResult = OverrideManager.AO.run(
              tool.voxel.getShapeId(),
              tool.nVoxel.getShapeId(),
              tool.faceDataOverride
            );

            if (finalResult) {
              AOValues.a++;
            }
          }
        }

        checkSetIndex++;
      }


      /*
   Light End
   */
      if (this.settings.doSun || this.settings.doRGB) {
        newRGBValues[0] = sunValues.s;
        newRGBValues[1] = RGBValues.r;
        newRGBValues[2] = RGBValues.g;
        newRGBValues[3] = RGBValues.b;
        LightValue.setVertex(vertex, LD.setLightValues(newRGBValues));
      }
      /*
   AO End
   */
      if (this.settings.doAO) {
        AOValue.setVertex(vertex, Math.ceil((AOValues.a / 3) * 15));
      }
    }

    tool
      .setFaceFlipped(flipCheck(face))
      .getWorldLight()
      .set(
        LightValue.vertices[QuadVerticies.TopRight],
        LightValue.vertices[QuadVerticies.TopLeft],
        LightValue.vertices[QuadVerticies.BottomLeft],
        LightValue.vertices[QuadVerticies.BottomRight]
      );

    if (!states.ignoreAO) {
      tool
        .getWorldAO()
        .set(
          AOValue.vertices[QuadVerticies.TopRight],
          AOValue.vertices[QuadVerticies.TopLeft],
          AOValue.vertices[QuadVerticies.BottomLeft],
          AOValue.vertices[QuadVerticies.BottomRight]
        );
    }
  },
};
