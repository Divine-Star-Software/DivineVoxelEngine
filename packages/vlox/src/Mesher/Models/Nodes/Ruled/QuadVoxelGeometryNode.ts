import { Vec3Array, Vec4Array } from "@amodx/math";
import { VoxelFaces } from "../../../../Math";
import { QuadVerticies } from "../../../Geomtry/Geometry.types";
import { VoxelQuadGeometryNode } from "../../../../Models/VoxelModel.types";

import { Quad } from "../../../Geomtry/Primitives/Quad";
import { VoxelGeometryBuilder } from "../../../Geomtry/VoxelGeometryBuilder";

import { GeoemtryNode } from "../GeometryNode";
import {
  getInterpolationValue,
  shouldCauseFlip,
} from "../../Common/Calc/CalcConstants";

import { VoxelRelativeCubeIndexPositionMap } from "../../../../Models/Indexing/VoxelRelativeCubeIndex";
import {
  QuadVoxelGometryArgs,
  QuadVoxelGometryInputs,
} from "../../../../Models/Input/QuadVoxelGometryInputs";
import { GetQuadGeometryData } from "../../Common/QuadGeometryNode";
import { VoxelLightData } from "../../../../Voxels/Cursor/VoxelLightData";

const ArgIndexes = QuadVoxelGometryInputs.ArgIndexes;

export class QuadVoxelGometryNode extends GeoemtryNode<
  VoxelQuadGeometryNode,
  QuadVoxelGometryArgs
> {
  quad: Quad;
  quadBounds: [Vec3Array, Vec3Array] = [
    [0, 0, 0],
    [0, 0, 0],
  ];
  vertexWeights: [Vec4Array, Vec4Array, Vec4Array, Vec4Array];
  closestFace: VoxelFaces;
  lightData = new VoxelLightData();

  init(): void {
    this.faceCount = 6;
    this.vertexCount = this.faceCount * 4;

    const { quad, quadBounds, closestFace, vertexWeights } =
      GetQuadGeometryData(this.data, this.transform);
    this.quad = quad;
    this.quadBounds = quadBounds;
    this.vertexWeights = vertexWeights;
    this.closestFace = closestFace;
  }
  isExposed() {
    const trueFaceIndex = this.faceIndex;
    const faceIndexes = this.geomtry.faceCullMap![trueFaceIndex];
    if (!faceIndexes) return true;

    const tool = this.builder;

    for (
      let positionIndex = 0;
      positionIndex < faceIndexes.length;
      positionIndex++
    ) {
      const currentIndex = faceIndexes[positionIndex];
      const p = VoxelRelativeCubeIndexPositionMap[currentIndex];
      const hashed = this.builder.space.getHash(
        tool.nVoxel,
        tool.position.x + p[0],
        tool.position.y + p[1],
        tool.position.z + p[2]
      );

      const offsetBaseGometry = this.builder.space!.getGeomtry(hashed);
      const offsetConditonalGeometry =
        this.builder.space!.getConditionalGeomtry(hashed);

      if (offsetBaseGometry) {
        for (let i = 0; i < offsetBaseGometry.length; i++) {
          const faceIndex = this.geomtry.cullIndex.getValue(
            offsetBaseGometry[i],
            currentIndex,
            trueFaceIndex
          );
          if (
            faceIndex > -1 &&
            !this.builder
              .space!.getConstructor(hashed)
              ?.isShapeStateFaceTransparent(
                this.builder.space!.modCache[hashed],
                this.builder.space!.stateCache[hashed],
                offsetBaseGometry[i],
                faceIndex
              )
          ) {
            return false;
          }
        }
      }

      if (!offsetConditonalGeometry) continue;
      for (let i = 0; i < offsetConditonalGeometry.length; i++) {
        const cond = offsetConditonalGeometry[i];
        for (let k = 0; k < cond.length; k++) {
          const faceIndex = this.geomtry.cullIndex.getValue(
            cond[k],
            currentIndex,
            trueFaceIndex
          );
          if (
            faceIndex > -1 &&
            !this.builder
              .space!.getConstructor(hashed)
              ?.isCondtionalStateFaceTransparent(
                this.builder.space!.modCache[hashed],
                this.builder.space!.stateCache[hashed],
                cond[i],
                faceIndex
              )
          )
            return false;
        }
      }
    }

    return true;
  }

  determineShading() {
    const tool = this.builder;

    const lightData = tool.lightData[VoxelFaces.Up];
    const noAO =
      this.builder.voxel.isLightSource() || this.builder.voxel.noAO();

    const worldLight = tool.vars.light;
    const worldAO = tool.vars.ao;
    for (let v = 0 as QuadVerticies; v < 4; v++) {
      worldAO.vertices[v] = 0;

      worldLight.vertices[v] = getInterpolationValue(
        lightData as Vec4Array,
        this.vertexWeights[v]
      );

      if (noAO) continue;

      const trueVertexIndex = this.vertexIndex + 4 + v;

      const aoIndexes = this.geomtry.vertexHitMap![trueVertexIndex];

      if (!aoIndexes) continue;

      for (
        let positionIndex = 0;
        positionIndex < aoIndexes.length;
        positionIndex++
      ) {
        const currentIndex = aoIndexes[positionIndex];
        const p = VoxelRelativeCubeIndexPositionMap[currentIndex];

        const hashed = this.builder.space.getHash(
          tool.nVoxel,
          tool.position.x + p[0],
          tool.position.y + p[1],
          tool.position.z + p[2]
        );

        if (this.builder.space!.noCastAO[hashed] === 1) continue;
        const baseGeo = this.builder.space!.getGeomtry(hashed);
        const conditonalGeo = this.builder.space!.getConditionalGeomtry(hashed);

        if (!baseGeo && !conditonalGeo) continue;

        let length = 0;
        let shaded = false;
        if (baseGeo) {
          length = baseGeo.length;
          for (let geoIndex = 0; geoIndex < length; geoIndex++) {
            if (
              this.geomtry.aoIndex.getValue(
                baseGeo[geoIndex],
                currentIndex,
                trueVertexIndex
              )
            ) {
              worldAO.vertices[v] = 1;
              shaded = true;
              break;
            }
          }
        }
        if (!conditonalGeo) continue;
        length = conditonalGeo.length;
        for (
          let condtionsIndex = 0;
          condtionsIndex < length;
          condtionsIndex++
        ) {
          const condiotnalength = conditonalGeo[condtionsIndex].length;
          for (let geoIndex = 0; geoIndex < condiotnalength; geoIndex++) {
            if (
              this.geomtry.aoIndex.getValue(
                conditonalGeo[condtionsIndex][geoIndex],
                currentIndex,
                trueVertexIndex
              )
            ) {
              worldAO.vertices[v] = 1;
              break;
            }
          }
        }
      }
    }
  }
  shouldFlip() {
    const worldAO = this.builder.vars.ao;
    const worldLight = this.builder.vars.light;
    if (
      shouldCauseFlip(
        worldAO.vertices[0],
        worldAO.vertices[1],
        worldAO.vertices[2],
        worldAO.vertices[3]
      )
    )
      return true;
    return (
      shouldCauseFlip(
        this.lightData.getS(worldLight.vertices[0]),
        this.lightData.getS(worldLight.vertices[1]),
        this.lightData.getS(worldLight.vertices[2]),
        this.lightData.getS(worldLight.vertices[3])
      ) ||
      shouldCauseFlip(
        this.lightData.sumRGB(worldLight.vertices[0]),
        this.lightData.sumRGB(worldLight.vertices[1]),
        this.lightData.sumRGB(worldLight.vertices[2]),
        this.lightData.sumRGB(worldLight.vertices[3])
      )
    );
  }

  add(args: QuadVoxelGometryArgs) {
    if (!args[ArgIndexes.Enabled]) return false;
    if (!this.isExposed()) return false;
    this.builder.calculateFaceData(this.closestFace);
    this.determineShading();

    const quad = this.quad;
    quad.flip = this.shouldFlip() || args[ArgIndexes.Fliped];
    this.builder.vars.textureIndex = args[ArgIndexes.Texture];

    quad.doubleSided = args[ArgIndexes.DoubleSided];
    const uvs = args[ArgIndexes.UVs];
    //1
    quad.uvs.vertices[0].x = uvs[0][0];
    quad.uvs.vertices[0].y = uvs[0][1];
    //2
    quad.uvs.vertices[1].x = uvs[1][0];
    quad.uvs.vertices[1].y = uvs[1][1];
    //3
    quad.uvs.vertices[2].x = uvs[2][0];
    quad.uvs.vertices[2].y = uvs[2][1];
    //4
    quad.uvs.vertices[3].x = uvs[3][0];
    quad.uvs.vertices[3].y = uvs[3][1];
    VoxelGeometryBuilder.addQuad(this.builder, this.builder.origin, quad);

    this.builder.updateBounds(this.quadBounds);
    this.builder.vars.light.setAll(0);
    this.builder.vars.ao.setAll(0);

    return true;
  }
}
