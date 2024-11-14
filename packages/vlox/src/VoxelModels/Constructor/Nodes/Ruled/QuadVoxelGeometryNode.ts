import { Vec3Array, Vec4Array, Vector3Like } from "@amodx/math";
import { VoxelFaces } from "../../../../Math";

import { QuadScalarVertexData } from "@amodx/meshing";
import {
  QuadVerticies,
  QuadVerticiesArray,
} from "@amodx/meshing/Geometry.types";
import { VoxelQuadGeometryNode } from "../../../VoxelModel.types";

import { Quad } from "@amodx/meshing/Classes/Quad";
import { VoxelMesherDataTool } from "../../../../Mesher/Tools/VoxelMesherDataTool";
import { VoxelGeometry } from "../../../../Mesher/Geometry/VoxelGeometry";

import { VoxelGeometryLookUp } from "../../VoxelGeometryLookUp";
import { GeoemtryNode } from "../GeometryNode";
import { VoxelGeometryConstructor } from "../../Register/VoxelGeometryConstructor";
import {
  addQuadWeights,
  closestUnitNormal,
  getInterpolationValue,
  shouldCauseFlip,
} from "../../../../Mesher/Calc/CalcConstants";

import { LightData } from "../../../../Data/LightData";

import { VoxelRelativeCubeIndexPositionMap } from "../../../Indexing/VoxelRelativeCubeIndex";
import {
  QuadVoxelGometryArgs,
  QuadVoxelGometryInputs,
} from "../../../Input/QuadVoxelGometryInputs";
import { VoxelGeometryTransform } from "../../../../VoxelData/VoxelSyncData";
import { TransformQuad } from "../../../Shared/Transform";

const ArgIndexes = QuadVoxelGometryInputs.ArgIndexes;

export class QuadVoxelGometryNode extends GeoemtryNode<QuadVoxelGometryArgs> {
  quad: Quad;
  vertexWeights: [Vec4Array, Vec4Array, Vec4Array, Vec4Array];
  worldLight: QuadScalarVertexData;
  worldAO: QuadScalarVertexData;
  closestFace: VoxelFaces;
  constructor(
    geometryPaletteId: number,
    geometry: VoxelGeometryConstructor,
    public data: VoxelQuadGeometryNode,
    transform: VoxelGeometryTransform
  ) {
    super(geometryPaletteId, geometry);

    this.faceCount = 6;
    this.vertexCount = this.faceCount * 4;

    this.quad = TransformQuad(Quad.Create(data.points), transform);
    this.quad.orientation = 0;

    const normals = this.quad.normals.getAsArray();
    const averageNormal: Vec3Array = [0, 0, 0];

    for (let i = 0; i < normals.length; i++) {
      averageNormal[0] += normals[i].x;
      averageNormal[1] += normals[i].y;
      averageNormal[2] += normals[i].z;
    }
    averageNormal[0] /= normals.length;
    averageNormal[1] /= normals.length;
    averageNormal[2] /= normals.length;

    // Normalize the average normal
    const magnitude = Math.sqrt(
      averageNormal[0] * averageNormal[0] +
        averageNormal[1] * averageNormal[1] +
        averageNormal[2] * averageNormal[2]
    );
    if (magnitude !== 0) {
      averageNormal[0] /= magnitude;
      averageNormal[1] /= magnitude;
      averageNormal[2] /= magnitude;
    }

    const unitNormal = closestUnitNormal(averageNormal);
    let closestFace = VoxelFaces.Up;
    if (unitNormal[0] == 1) closestFace = VoxelFaces.East;
    if (unitNormal[0] == -1) closestFace = VoxelFaces.West;
    if (unitNormal[1] == 1) closestFace = VoxelFaces.Up;
    if (unitNormal[1] == -1) closestFace = VoxelFaces.Down;
    if (unitNormal[2] == 1) closestFace = VoxelFaces.North;
    if (unitNormal[2] == -1) closestFace = VoxelFaces.South;

    this.vertexWeights = addQuadWeights(this.quad, closestFace);

    this.closestFace = closestFace;
  }

  isExposed() {
    const trueFaceIndex = this.faceIndex;
    const faceIndexes = this.geomtry.data.faceCullMap[trueFaceIndex];
    if (!faceIndexes) return true;

    const tool = this.tool;

    for (
      let positionIndex = 0;
      positionIndex < faceIndexes.length;
      positionIndex++
    ) {
      const currentIndex = faceIndexes[positionIndex];
      const p = VoxelRelativeCubeIndexPositionMap[currentIndex];
      const hashed = VoxelGeometryLookUp.getHash(
        tool.voxel.x + p[0],
        tool.voxel.y + p[1],
        tool.voxel.z + p[2]
      );

      const offsetBaseGometry = VoxelGeometryLookUp.geometryCache[hashed];
      const offsetConditonalGeometry =
        VoxelGeometryLookUp.conditionalGeometryCache[hashed];

      if (offsetBaseGometry) {
        for (let i = 0; i < offsetBaseGometry.length; i++) {
          const faceIndex = this.geomtry.cullIndex.getValue(
            offsetBaseGometry[i],
            currentIndex,
            trueFaceIndex
          );
          if (
            faceIndex > -1 &&
            !VoxelGeometryLookUp.voxelHash[hashed].isShapeStateFaceTransparent(
              VoxelGeometryLookUp.modCache[hashed],
              VoxelGeometryLookUp.stateCache[hashed],
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
            !VoxelGeometryLookUp.voxelHash[
              hashed
            ].isCondtionalStateFaceTransparent(
              VoxelGeometryLookUp.modCache[hashed],
              VoxelGeometryLookUp.stateCache[hashed],
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
    const tool = this.tool;

    const lightData = tool.lightData[VoxelFaces.Up];
    const noAO = this.tool.voxel.isLightSource() || this.tool.voxel.noAO();

    const worldLight = this.worldLight;
    const worldAO = this.worldAO;
    for (let v = 0 as QuadVerticies; v < 4; v++) {
      worldAO.vertices[v] = 0;

      worldLight.vertices[v] = getInterpolationValue(
        lightData as Vec4Array,
        this.vertexWeights[v]
      );

      if (noAO) continue;

      const trueVertexIndex = this.vertexIndex + 4 + v;

      const aoIndexes = this.geomtry.data.vertexHitMap[trueVertexIndex];

      if (!aoIndexes) continue;

      for (
        let positionIndex = 0;
        positionIndex < aoIndexes.length;
        positionIndex++
      ) {
        const currentIndex = aoIndexes[positionIndex];
        const p = VoxelRelativeCubeIndexPositionMap[currentIndex];

        const hashed = VoxelGeometryLookUp.getHash(
          tool.voxel.x + p[0],
          tool.voxel.y + p[1],
          tool.voxel.z + p[2]
        );

        if (VoxelGeometryLookUp.noCastAO[hashed] === true) continue;
        const baseGeo = VoxelGeometryLookUp.geometryCache[hashed];
        const conditonalGeo =
          VoxelGeometryLookUp.conditionalGeometryCache[hashed];

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
    if (
      shouldCauseFlip(
        this.worldAO.vertices[0],
        this.worldAO.vertices[1],
        this.worldAO.vertices[2],
        this.worldAO.vertices[3]
      )
    )
      return true;
    return (
      shouldCauseFlip(
        LightData.getS(this.worldLight.vertices[0]),
        LightData.getS(this.worldLight.vertices[1]),
        LightData.getS(this.worldLight.vertices[2]),
        LightData.getS(this.worldLight.vertices[3])
      ) ||
      shouldCauseFlip(
        LightData.sumRGB(this.worldLight.vertices[0]),
        LightData.sumRGB(this.worldLight.vertices[1]),
        LightData.sumRGB(this.worldLight.vertices[2]),
        LightData.sumRGB(this.worldLight.vertices[3])
      )
    );
  }

  add(
    tool: VoxelMesherDataTool,
    originHash: number,
    origin: Vector3Like,
    args: QuadVoxelGometryArgs
  ) {
    this.tool = tool;
    this.origin = tool.voxel;

    this.worldAO = tool.getWorldAO();
    this.worldLight = tool.getWorldLight();

    if (args[ArgIndexes.Enabled] && this.isExposed()) {
      tool.calculateFaceData(this.closestFace);
      this.determineShading();

      const quad = this.quad;
      quad.flip = this.shouldFlip() || args[ArgIndexes.Fliped];
      tool.setTexture(args[ArgIndexes.Texture]);

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
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    this.worldLight.setAll(0);
    this.worldAO.setAll(0);
  }
}
