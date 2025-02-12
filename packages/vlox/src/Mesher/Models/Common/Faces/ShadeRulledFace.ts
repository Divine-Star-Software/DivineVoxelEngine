import { VoxelRelativeCubeIndexPositionMap } from "../../../../Voxels/Models/Indexing/VoxelRelativeCubeIndex";
import { VoxelModelBuilder } from "../../VoxelModelBuilder";
import { VoxelModelConstructorRegister } from "../../VoxelModelConstructorRegister";
import { getInterpolationValue } from "../Calc/CalcConstants";
import { Vec4Array } from "@amodx/math";
import { QuadVerticies } from "../../../Geomtry/Geometry.types";

export function ShadeRulledFace(
  builder: VoxelModelBuilder,
  trueFaceIndex: number,
  lightData: Record<QuadVerticies, number>,
  vertexWeights: Vec4Array[],
  vertexStride: number,

) {
  const noAO = builder.voxel.isLightSource() || builder.voxel.noAO();

  const worldLight = builder.vars.light;
  const worldAO = builder.vars.ao;

  for (let v = 0; v < vertexStride; v++) {
    worldAO.vertices[v] = 0;

    worldLight.vertices[v] = getInterpolationValue(
      lightData as Vec4Array,
      vertexWeights[v]
    );

    if (noAO) continue;

    const aoIndexes =
      VoxelModelConstructorRegister.vertexHitMap![trueFaceIndex][v];

    if (!aoIndexes) continue;

    for (let i = 0; i < aoIndexes.length; i++) {
      const directionIndex = aoIndexes[i];
      const p = VoxelRelativeCubeIndexPositionMap[directionIndex];

      const hashed = builder.space.getHash(
        builder.nVoxel,
        builder.position.x + p[0],
        builder.position.y + p[1],
        builder.position.z + p[2]
      );

      if (
        builder.space.foundHash[hashed] < 2 ||
        builder.space.noCastAO[hashed] === 1
      )
        continue;
      const baseGeo = builder.space.getGeomtry(hashed);
      const conditonalGeo = builder.space.getConditionalGeomtry(hashed);

      if (!baseGeo && !conditonalGeo) continue;

      let length = 0;
      let shaded = false;
      if (baseGeo) {
        length = baseGeo.length;
        for (let geoIndex = 0; geoIndex < length; geoIndex++) {
          if (
            VoxelModelConstructorRegister.aoIndex.getValue(
              baseGeo[geoIndex],
              directionIndex,
              trueFaceIndex,
              v
            )
          ) {
            worldAO.vertices[v]++;
            if (worldAO.vertices[v] >= 3) {
              shaded = true;
              break;
            }
          }
        }
      }
      if (!conditonalGeo || shaded) continue;
      length = conditonalGeo.length;

      for (let condtionsIndex = 0; condtionsIndex < length; condtionsIndex++) {
        const condiotnalength = conditonalGeo[condtionsIndex].length;
        for (let geoIndex = 0; geoIndex < condiotnalength; geoIndex++) {
          if (
            VoxelModelConstructorRegister.aoIndex.getValue(
              conditonalGeo[condtionsIndex][geoIndex],
              directionIndex,
              trueFaceIndex,
              v
            )
          ) {
            worldAO.vertices[v]++;
            if (worldAO.vertices[v] >= 3) {
              shaded = true;
              break;
            }
          }
        }
      }
    }
  }
}
