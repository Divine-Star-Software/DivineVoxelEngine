import { QuadVerticies } from "../../../Geomtry/Geometry.types";
import { VoxelModelBuilder } from "../../../Models/VoxelModelBuilder";
import { getInterpolationValue } from "../Calc/CalcConstants";
import { Vec4Array } from "@amodx/math";

export function ShadeRulelessFace(
  builder: VoxelModelBuilder,
  lightData: Record<QuadVerticies, number>,
  vertexWeights: Vec4Array[],
  verticesStride: number
) {
  const noAO = builder.voxel.isLightSource() || builder.voxel.noAO();
  const worldLight = builder.vars.light;
  const worldAO = builder.vars.ao;
  for (let v = 0; v < verticesStride; v++) {
    worldAO.vertices[v] = 0;
    worldLight.vertices[v] = getInterpolationValue(
      lightData as Vec4Array,
      vertexWeights[v]
    );
    if (noAO) continue;
  }
}
