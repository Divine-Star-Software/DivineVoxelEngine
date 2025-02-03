import type { VoxelMesherDataTool } from "../../../../Mesher/Tools/VoxelMesherDataTool.js";
import { QuadVerticies } from "../../../Geomtry/Geometry.types.js";
import { VoxelFaces, VoxelFaceDirections } from "../../../../Math/index.js";
import { GradientCheckSets } from "./CalcConstants.js";
import { VoxelLightData } from "../../../../Voxels/Cursor/VoxelLightData.js";

type AllLight = [s: number, r: number, g: number, b: number];

const lightData = new VoxelLightData();
const currentLightValues = new Uint16Array([0, 0, 0, 0]) as any as AllLight;
const loadedLightValues = new Uint16Array([0, 0, 0, 0]) as any as AllLight;
export default function calculateFaceData(
  face: VoxelFaces,
  builder: VoxelMesherDataTool
) {
  let light = builder.voxel.getLight();

  const faceNormal = VoxelFaceDirections[face];

  const x = builder.position.x;
  const y = builder.position.y;
  const z = builder.position.z;
  const vertexData = builder.lightData[face];
  const nVoxel = builder.nVoxel;
  const checkSet = GradientCheckSets[face];
  const otherLight =
    builder.space.getLight(
      builder.nVoxel,
      x + faceNormal[0],
      y + faceNormal[1],
      z + faceNormal[2]
    ) || 0;
  light = otherLight >= 0 ? otherLight : light >= 0 ? light : 0;

  for (let vertex: QuadVerticies = <QuadVerticies>0; vertex < 4; vertex++) {
    vertexData[vertex] = light;
    lightData.getLightValuesArrayToRef(light, currentLightValues);

    for (let i = 0; i < 9; i += 3) {
      const nl = builder.space.getLight(
        nVoxel,
        checkSet[vertex][i] + x,
        checkSet[vertex][i + 1] + y,
        checkSet[vertex][i + 2] + z
      );
      if (nl <= 0) continue;
      /*
      Do Light
      */
      lightData.getLightValuesArrayToRef(nl, loadedLightValues);

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

    vertexData[vertex] = lightData.setLightValues(currentLightValues);
  }
}
