import type { VoxelMesherDataTool } from "../../Tools/VoxelMesherDataTool.js";
import { LightData } from "../../../Data/LightData.js";
import { QuadVerticies } from "@amodx/meshing/Geometry.types";
import { VoxelFaces, VoxelFaceDirections } from "../../../Math";
import { GradientCheckSets, GradientCheckSetsArray } from "../CalcConstants.js";

type AllLight = [s: number, r: number, g: number, b: number];

const currentLightValues = new Uint16Array([0, 0, 0, 0]) as any as AllLight;
const loadedLightValues = new Uint16Array([0, 0, 0, 0]) as any as AllLight;
const faceLength = 9 * 4;
const settings = {
  doAO: true,
  doLight: true,
};
export const FaceDataCalc = {
  settings,
  calculate(face: VoxelFaces, tool: VoxelMesherDataTool) {
    let light = tool.voxel.getLight();

    const faceNormal = VoxelFaceDirections[face];
    tool.nVoxel.loadInAt(
      tool.voxel.x + faceNormal[0],
      tool.voxel.y + faceNormal[1],
      tool.voxel.z + faceNormal[2]
    );

    const otherLight = tool.nVoxel.getLight();
    light = otherLight >= 0 ? otherLight : light >= 0 ? light : 0;

    const baseIndex = face * faceLength;
    for (let vertex: QuadVerticies = <QuadVerticies>0; vertex < 4; vertex++) {
      const checkSetIndex = baseIndex + vertex * 9;

      if (settings.doLight) {
        tool.lightData[face][vertex] = light;
        LightData.getLightValuesToRef(light, currentLightValues);
      }

      for (let i = 0; i < 9; i += 3) {
        const didLoad = tool.nVoxel.loadInAt(
          GradientCheckSets[face][vertex][i] + tool.voxel.x,
          GradientCheckSets[face][vertex][i + 1] + tool.voxel.y,
          GradientCheckSets[face][vertex][i + 2] + tool.voxel.z
        );

        if (!settings.doLight || !didLoad) continue;
        const nl = tool.nVoxel.getLight();
        if (nl <= 0) continue;
        /*
      Do Light
      */
        LightData.getLightValuesToRef(nl, loadedLightValues);

        currentLightValues[0] =
          currentLightValues[0] < loadedLightValues[0]
            ? loadedLightValues[0]
            : currentLightValues[0];

        currentLightValues[1] =
          currentLightValues[1] < loadedLightValues[1]
            ? loadedLightValues[1]
            : currentLightValues[1];

        currentLightValues[2] =
          currentLightValues[2] < loadedLightValues[2]
            ? loadedLightValues[2]
            : currentLightValues[2];

        currentLightValues[3] =
          currentLightValues[3] < loadedLightValues[3]
            ? loadedLightValues[3]
            : currentLightValues[3];
      }

      tool.lightData[face][vertex] =
        LightData.setLightValues(currentLightValues);
    }
  },
};
