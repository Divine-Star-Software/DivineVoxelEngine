import { Vec3Array, Vec4Array, Vector3Like } from "@amodx/math";
import { VoxelFaceNameArray, VoxelFaces } from "../../../../Math";

import { QuadScalarVertexData } from "@amodx/meshing";
import { QuadVerticies } from "@amodx/meshing/Geometry.types";
import { VoxelBoxGeometryNode } from "../../../../Models/VoxelModel.types";

import { Quad } from "@amodx/meshing/Primitives/Quad";
import { VoxelMesherDataTool } from "../../../../Mesher/Tools/VoxelMesherDataTool";
import { VoxelGeometry } from "../../VoxelGeometry";
import {
  BoxVoxelGometryArgs,
  BoxVoxelGometryInputs,
} from "../../../../Models/Input/BoxVoxelGometryInputs";
import { VoxelGeometryLookUp } from "../../VoxelGeometryLookUp";
import { GeoemtryNode } from "../GeometryNode";
import {
  getInterpolationValue,
  shouldCauseFlip,
} from "../../Common/Calc/CalcConstants";
import { VoxelRelativeCubeIndexPositionMap } from "../../../../Models/Indexing/VoxelRelativeCubeIndex";
import { GetBoxGeometryNodeData } from "../../Common/BoxGeometryNode";
import { UpdateBounds } from "../../Common/BoundsFunctions";
import { VoxelLightData } from "../../../../Voxels/Cursor/VoxelLightData";

const ArgIndexes = BoxVoxelGometryInputs.ArgIndexes;

export class BoxVoxelGometryNode extends GeoemtryNode<
  VoxelBoxGeometryNode,
  BoxVoxelGometryArgs
> {
  quads: Record<VoxelFaces, Quad>;
  quadBounds: [Vec3Array, Vec3Array][] = [];
  vertexWeights: Record<
    VoxelFaces,
    [Vec4Array, Vec4Array, Vec4Array, Vec4Array]
  >;
  worldLight: QuadScalarVertexData;
  worldAO: QuadScalarVertexData;
  lightData = new VoxelLightData();

  init(): void {
    this.faceCount = 6;
    this.vertexCount = this.faceCount * 4;
    const { quads, vertexWeights, quadBounds } = GetBoxGeometryNodeData(
      this.data.points,
      this.transform
    );
    this.quads = quads;
    this.vertexWeights = vertexWeights;
    this.quadBounds = quadBounds;
  }

  isExposed(face: VoxelFaces) {
    const trueFaceIndex = face + this.faceIndex;
    const faceIndexes = this.geomtry.faceCullMap![trueFaceIndex];
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
        tool.nVoxel,
        tool.position.x + p[0],
        tool.position.y + p[1],
        tool.position.z + p[2]
      );

      const offsetBaseGometry = VoxelGeometryLookUp.geometryCache[hashed];
      const offsetConditonalGeometry =
        VoxelGeometryLookUp.conditionalGeometryCache[hashed];

      if (offsetBaseGometry) {
        for (let i = 0; i < offsetBaseGometry.length; i++) {
          const geoId = offsetBaseGometry[i];
          if (VoxelGeometryLookUp.isRulesless(geoId)) continue;
          const faceIndex = this.geomtry.cullIndex.getValue(
            geoId,
            currentIndex,
            trueFaceIndex
          );
          if (
            faceIndex > -1 &&
            !VoxelGeometryLookUp.voxelHash[hashed].isShapeStateFaceTransparent(
              VoxelGeometryLookUp.modCache[hashed],
              VoxelGeometryLookUp.stateCache[hashed],
              geoId,
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
          const geoId = cond[k];
          if (VoxelGeometryLookUp.isRulesless(geoId)) continue;
          const faceIndex = this.geomtry.cullIndex.getValue(
            geoId,
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
              geoId,
              faceIndex
            )
          )
            return false;
        }
      }
    }

    return true;
  }

  determineShading(face: VoxelFaces) {
    const tool = this.tool;

    const lightData = tool.lightData[face];
    const noAO = this.tool.voxel.isLightSource() || this.tool.voxel.noAO();

    const worldLight = this.worldLight;
    const worldAO = this.worldAO;
    for (let v = 0 as QuadVerticies; v < 4; v++) {
      worldAO.vertices[v] = 0;

      worldLight.vertices[v] = getInterpolationValue(
        lightData as Vec4Array,
        this.vertexWeights[face][v]
      );

      if (noAO) continue;

      const trueVertexIndex = this.vertexIndex + face * 4 + v;

      const aoIndexes = this.geomtry.vertexHitMap![trueVertexIndex];

      if (!aoIndexes) continue;

      for (
        let positionIndex = 0;
        positionIndex < aoIndexes.length;
        positionIndex++
      ) {
        const currentIndex = aoIndexes[positionIndex];
        const p = VoxelRelativeCubeIndexPositionMap[currentIndex];

        const hashed = VoxelGeometryLookUp.getHash(
          tool.nVoxel,
          tool.position.x + p[0],
          tool.position.y + p[1],
          tool.position.z + p[2]
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
        this.lightData.getS(this.worldLight.vertices[0]),
        this.lightData.getS(this.worldLight.vertices[1]),
        this.lightData.getS(this.worldLight.vertices[2]),
        this.lightData.getS(this.worldLight.vertices[3])
      ) ||
      shouldCauseFlip(
        this.lightData.sumRGB(this.worldLight.vertices[0]),
        this.lightData.sumRGB(this.worldLight.vertices[1]),
        this.lightData.sumRGB(this.worldLight.vertices[2]),
        this.lightData.sumRGB(this.worldLight.vertices[3])
      )
    );
  }

  add(
    tool: VoxelMesherDataTool,
    originHash: number,
    origin: Vector3Like,
    args: BoxVoxelGometryArgs
  ) {
    this.tool = tool;
    this.origin = tool.position;

    this.worldAO = tool.getWorldAO();
    this.worldLight = tool.getWorldLight();


    for (let face = 0 as VoxelFaces; face < 6; face++) {
      if (args[face][ArgIndexes.Enabled] && this.isExposed(face)) {


        tool.calculateFaceData(face);
        this.determineShading(face);
        const faceArgs = args[face];
        const quad = this.quads[face];

        quad.flip = this.shouldFlip() || faceArgs[ArgIndexes.Fliped];

        tool.setTexture(faceArgs[ArgIndexes.Texture]);

        const uvs = faceArgs[ArgIndexes.UVs];
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

        UpdateBounds(tool, origin, this.quadBounds[face]);
      }
    }

    this.worldLight.setAll(0);
    this.worldAO.setAll(0);
  }
}
