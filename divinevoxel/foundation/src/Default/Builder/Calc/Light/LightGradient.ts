import type { VoxelMesherDataTool } from "../../Tools/VoxelMesherDataTool";
import type { DirectionNames } from "@divinevoxel/core/Types";

import { OverrideManager } from "../../Rules/Overrides/OverridesManager.js";
import { LightData } from "../../../../Data/LightData"

import { QuadVertexData } from "@divinevoxel/core/Meshing/";
import { SubstanceRules } from "../../Rules/SubstanceRules.js";
import { FaceNormals } from "@divinevoxel/core/Math/Constants/Faces.js";
import { QuadVerticies } from "../../Geometry/Geometry.types";

const LD = LightData;
const LightValue = new QuadVertexData();
const RGBState = new QuadVertexData();
const SunState = new QuadVertexData();
const AOValue = new QuadVertexData();
const AOState = new QuadVertexData();

const shouldSunFlip = (face: DirectionNames) => {
  const v1 = LD.getS(LightValue.vertices[QuadVerticies.TopRight]);
  const v2 = LD.getS(LightValue.vertices[QuadVerticies.TopLeft]);
  const v3 = LD.getS(LightValue.vertices[QuadVerticies.BottomLeft]);
  const v4 = LD.getS(LightValue.vertices[QuadVerticies.BottomRight]);

  if (v4 > v1 && v4 > v2 && v4 > v3) return false;
  if (v2 > v1 && v2 > v4 && v2 > v3) return false;
  const totalLight = v1 + v2 + v3 + v4;
  const averageLight = totalLight / 4;
  const threshold = 1;
  if (
    Math.abs(v1 - averageLight) <= threshold &&
    Math.abs(v2 - averageLight) <= threshold &&
    Math.abs(v3 - averageLight) <= threshold &&
    Math.abs(v4 - averageLight) <= threshold
  ) {
    return false;
  }

  if (v3 + v1 > v2 + v4) return true;
  return false;
};

const shouldRGBFlip = (face: DirectionNames) => {
  // Retrieve RGB values for each vertex based on their positions
  const v1 = LD.getRGB(LightValue.vertices[QuadVerticies.TopLeft]); // TopLeft
  const v2 = LD.getRGB(LightValue.vertices[QuadVerticies.BottomLeft]); // BottomLeft
  const v3 = LD.getRGB(LightValue.vertices[QuadVerticies.BottomRight]); // BottomRight
  const v4 = LD.getRGB(LightValue.vertices[QuadVerticies.TopRight]); // TopRight

  if (v4 > v1 && v4 > v2 && v4 > v3) return false;
  if (v2 > v1 && v2 > v4 && v2 > v3) return false;
  const totalLight = v1 + v2 + v3 + v4;
  const averageLight = totalLight / 4;
  const threshold = 1;
  if (
    Math.abs(v1 - averageLight) <= threshold &&
    Math.abs(v2 - averageLight) <= threshold &&
    Math.abs(v3 - averageLight) <= threshold &&
    Math.abs(v4 - averageLight) <= threshold
  ) {
    return false;
  }

  if (v3 + v1 > v2 + v4) return true;
  return false;
};

const shouldAOFlip = (face: DirectionNames) => {
  if (states.ignoreAO) return false;
  LightGradient.tool.faceDataOverride.face = face;
  LightGradient.tool.faceDataOverride.default = false;

  if (
    OverrideManager.runOverride(
      "AOFlipFace",
      LightGradient.tool.voxel.getShapeId(),
      "Any",
      LightGradient.tool.faceDataOverride
    )
  ) {
    return false;
  }
  const v1 = AOValue.vertices[QuadVerticies.TopRight];
  const v2 = AOValue.vertices[QuadVerticies.TopLeft];
  const v3 = AOValue.vertices[QuadVerticies.BottomLeft];
  const v4 = AOValue.vertices[QuadVerticies.BottomRight];

  if (v2 > v3 && v2 > v1) return false;
  if (v4 > v3 && v4 > v1) return false;
  if (v2 < v3 || v2 < v1) return true;
  if (v4 < v3 || v4 < v1) return true;
  if (
    v3 + v1 > v2 + v4 ||
    AOState.isEqualTo(1, 1, 0, 1) ||
    AOState.isEqualTo(0, 1, 1, 1) ||
    AOState.isEqualTo(0, 1, 0, 1)
  )
    return true;
  return false;
};

const flipCheck = (face: DirectionNames) => {
  const rgbFlip = !shouldRGBFlip(face);
  const sunFlip = shouldSunFlip(face);
  const aoFlip = shouldAOFlip(face);

  const shouldFlip = rgbFlip || sunFlip || aoFlip;

  return rgbFlip;
};
/**
 * 
2       1
|    /  |
|   /   |
|  /    |
| /     |
3       4

normal
1      4
| \    |
|  \   |
|   \  |
|    \ |
2      3
1 Top-left corner
2 Bottom-left corner
3 Bottom-right corner
4 Top-right corner
And for the flipped case, you've rearranged them to:

flipped

2       1
|    /  |
|   /   |
|  /    |
| /     |
3       4
4 Top-right corner
1 Top-left corner
2 Bottom-left corner
3 Bottom-right corner
 */
const checkSets: Record<DirectionNames, Record<QuadVerticies, number[]>> = {
  top: {
    [QuadVerticies.BottomLeft]: [-1, 1, 0, 0, 1, -1, -1, 1, -1],
    [QuadVerticies.TopLeft]: [-1, 1, 0, 0, 1, 1, -1, 1, 1],
    [QuadVerticies.TopRight]: [1, 1, 0, 0, 1, 1, 1, 1, 1],
    [QuadVerticies.BottomRight]: [1, 1, 0, 0, 1, -1, 1, 1, -1],
  },
  bottom: {
    [QuadVerticies.BottomLeft]: [-1, -1, 0, 0, -1, -1, -1, -1, -1],
    [QuadVerticies.TopLeft]: [-1, -1, 0, 0, -1, 1, -1, -1, 1],
    [QuadVerticies.TopRight]: [1, -1, 0, 0, -1, 1, 1, -1, 1],
    [QuadVerticies.BottomRight]: [1, -1, 0, 0, -1, -1, 1, -1, -1],
  },
  east: {
    [QuadVerticies.TopLeft]: [1, 0, -1, 1, 1, 0, 1, 1, -1],
    [QuadVerticies.TopRight]: [1, 0, 1, 1, 1, 0, 1, 1, 1],
    [QuadVerticies.BottomRight]: [1, 0, 1, 1, -1, 0, 1, -1, 1],
    [QuadVerticies.BottomLeft]: [1, 0, -1, 1, -1, 0, 1, -1, -1],
  },
  west: {
    [QuadVerticies.TopRight]: [-1, 0, 1, -1, 1, 0, -1, 1, 1],
    [QuadVerticies.TopLeft]: [-1, 0, -1, -1, 1, 0, -1, 1, -1],
    [QuadVerticies.BottomLeft]: [-1, 0, -1, -1, -1, 0, -1, -1, -1],
    [QuadVerticies.BottomRight]: [-1, 0, 1, -1, -1, 0, -1, -1, 1],
  },
  south: {
    [QuadVerticies.TopLeft]: [-1, 0, -1, 0, 1, -1, -1, 1, -1],
    [QuadVerticies.TopRight]: [1, 0, -1, 0, 1, -1, 1, 1, -1],
    [QuadVerticies.BottomRight]: [1, 0, -1, 0, -1, -1, 1, -1, -1],
    [QuadVerticies.BottomLeft]: [-1, 0, -1, 0, -1, -1, -1, -1, -1],
  },
  north: {
    [QuadVerticies.TopRight]: [1, 0, 1, 0, 1, 1, 1, 1, 1],
    [QuadVerticies.TopLeft]: [-1, 0, 1, 0, 1, 1, -1, 1, 1],
    [QuadVerticies.BottomLeft]: [-1, 0, 1, 0, -1, 1, -1, -1, 1],
    [QuadVerticies.BottomRight]: [1, 0, 1, 0, -1, 1, 1, -1, 1],
  },
};
const states = { ignoreAO: false };
const newRGBValues: number[] = [];
const zeroCheck = { s: 0, r: 0, g: 0, b: 0 };
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
  calculate(
    face: DirectionNames,
    tool: VoxelMesherDataTool,
    ignoreAO?: boolean
  ) {
    tool.setFaceFlipped(false).getWorldLight().set(0, 0, 0, 0);

    tool.getWorldAO().set(1, 1, 1, 1);
    this.tool = tool;
    const voxelSubstance = SubstanceRules.getSubstanceParent(
      tool.voxel.getSubstance()
    );
    const isLightSource = tool.voxel.isLightSource();

    let light = tool.voxel.getLight();
    let aoOverRide = -1;
    AOValue.setAll(1);
    AOState.setAll(1);
    if (this.settings.doAO && !ignoreAO) {
      states.ignoreAO = false;
    } else {
      states.ignoreAO = true;
    }

    const faceNormal = FaceNormals[face];
    tool.nVoxel.loadInAt(
      tool.voxel.x + faceNormal[0],
      tool.voxel.y + faceNormal[1],
      tool.voxel.z + faceNormal[2]
    );

    light = tool.nVoxel.getLight();
    if (light < 0) {
      if (tool.voxel.getLight() >= 0) {
        light = tool.voxel.getLight();
      } else {
        light = 0;
      }
    }

    if (tool.nVoxel.isRenderable() && !tool.nVoxel.isLightSource()) {
      tool.faceDataOverride.face = face;
      tool.faceDataOverride.default = false;
      if (
        OverrideManager.runOverride(
          "DarkenFaceUnderneath",
          tool.nVoxel.getShapeId(),
          "All",
          tool.faceDataOverride
        )
      ) {
        aoOverRide = 2;
      }
    }

    for (let vertex: QuadVerticies = <QuadVerticies>1; vertex <= 4; vertex++) {
      const checkSet = checkSets[face][vertex];

      if (this.settings.doRGB || this.settings.doSun) {
        const values = LD.getLightValues(light);
        if (this.settings.doSun) {
          sunValues.s = values[0];
          if (sunValues.s == 0) zeroCheck.s++;
        }
        if (this.settings.doRGB) {
          RGBValues.r = values[1];
          if (RGBValues.r == 0) zeroCheck.r++;
          RGBValues.g = values[2];
          if (RGBValues.g == 0) zeroCheck.g++;
          RGBValues.b = values[3];
          if (RGBValues.b == 0) zeroCheck.b++;
        }
      }

      if (!states.ignoreAO) {
        AOValues.a = 1;
      }

      for (let i = 0; i < 9; i += 3) {
        if (this.settings.doRGB || this.settings.doSun) {
          if (
            !tool.nVoxel.loadInAt(
              checkSet[i] + tool.voxel.x,
              checkSet[i + 1] + tool.voxel.y,
              checkSet[i + 2] + tool.voxel.z
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

            doRGB: if (this.settings.doRGB) {
              if (nlValues.r == 0) zeroCheck.r++;
              if (nlValues.g == 0) zeroCheck.g++;
              if (nlValues.b == 0) zeroCheck.b++;
              if (!LD.removeS(nl)) break doRGB;
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
            doSun: if (this.settings.doSun) {
              if (nlValues.s == 0) zeroCheck.s++;
              if (!LD.getS(nl)) break doSun;
              if (sunValues.s < nlValues.s && sunValues.s < 15) {
                sunValues.s = nlValues.s;
              }
            }
          }
        }
        /*
    Do AO
    */
        doAO: if (!states.ignoreAO) {
          if (aoOverRide > 0) {
            AOState.setVertex(vertex, 0);
            AOValues.a = aoOverRide;
            break doAO;
          }

          if (!tool.nVoxel.isRenderable()) break doAO;
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

          finalResult = OverrideManager.runOverride(
            "AO",
            tool.voxel.getShapeId(),
            tool.nVoxel.getShapeId(),
            tool.faceDataOverride
          );

          if (!finalResult) break doAO;
          AOState.setVertex(vertex, 0);
          AOValues.a++;
        }
      }

      /*
   Light End
   */
      if (this.settings.doSun || this.settings.doRGB) {
        let zeroTolerance = 2;
        let totalZero = true;
        if (zeroCheck.s >= zeroTolerance) {
          SunState.setVertex(vertex, 1);

          newRGBValues[0] = 0;
        } else {
          SunState.setVertex(vertex, 0);
          newRGBValues[0] = sunValues.s;
        }
        if (zeroCheck.r >= zeroTolerance) {
          newRGBValues[1] = 0;
        } else {
          totalZero = false;
          newRGBValues[1] = RGBValues.r;
        }
        if (zeroCheck.g >= zeroTolerance) {
          newRGBValues[2] = 0;
        } else {
          totalZero = false;
          newRGBValues[2] = RGBValues.g;
        }
        if (zeroCheck.b >= zeroTolerance) {
          newRGBValues[3] = 0;
        } else {
          totalZero = false;
          newRGBValues[3] = RGBValues.b;
        }
        RGBState.setVertex(vertex, totalZero ? 0 : 1);
        LightValue.setVertex(vertex, LD.setLightValues(newRGBValues));
        zeroCheck.s = 0;
        zeroCheck.r = 0;
        zeroCheck.b = 0;
        zeroCheck.g = 0;
      }
      /*
   AO End
   */
      if (this.settings.doAO) {
        AOValue.setVertex(vertex, AOValues.a);
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