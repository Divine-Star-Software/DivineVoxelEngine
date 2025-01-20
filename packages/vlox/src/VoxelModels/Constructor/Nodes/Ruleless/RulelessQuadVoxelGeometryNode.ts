import { Vec3Array, Vec4Array, Vector3Like } from "@amodx/math";
import { VoxelFaces } from "../../../../Math";

import { QuadScalarVertexData } from "@amodx/meshing";
import { QuadVerticies } from "@amodx/meshing/Geometry.types";
import { VoxelQuadGeometryNode } from "../../../VoxelModel.types";

import { Quad } from "@amodx/meshing/Primitives/Quad";
import { VoxelMesherDataTool } from "../../../../Mesher/Tools/VoxelMesherDataTool";
import { VoxelGeometry } from "../../../../Mesher/Geometry/VoxelGeometry";

import {
  getInterpolationValue,
  shouldCauseFlip,
} from "../../../../Mesher/Calc/CalcConstants";

import { LightData } from "../../../../Data/LightData";

import {
  QuadVoxelGometryArgs,
  QuadVoxelGometryInputs,
} from "../../../Input/QuadVoxelGometryInputs";
import { GeoemtryNode } from "../GeometryNode";
import { VoxelGeometryTransform } from "../../../../VoxelData/VoxelSyncData";
import { GetQuadGeometryData } from "../Common/QuadGeometryNode";
import { UpdateBounds } from "../Common/BoundsFunctions";
import { VoxelGeometryConstructor } from "VoxelModels/Constructor/Register/VoxelGeometryConstructor";

const ArgIndexes = QuadVoxelGometryInputs.ArgIndexes;

export class RulelessQuadVoxelGeometryNode extends GeoemtryNode<
  VoxelQuadGeometryNode,
  QuadVoxelGometryArgs
> {
  quad: Quad;
  quadBounds: [Vec3Array, Vec3Array] = [
    [0, 0, 0],
    [0, 0, 0],
  ];
  vertexWeights: [Vec4Array, Vec4Array, Vec4Array, Vec4Array];
  worldLight: QuadScalarVertexData;
  worldAO: QuadScalarVertexData;
  closestFace: VoxelFaces;

  init(): void {
    this.faceCount = 6;
    this.vertexCount = this.faceCount * 4;

    const { quad, closestFace, vertexWeights, quadBounds } =
      GetQuadGeometryData(this.data, this.transform);
    this.quad = quad;
    this.quadBounds = quadBounds;
    this.vertexWeights = vertexWeights;
    this.closestFace = closestFace;
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
    this.origin = tool.position;

    this.worldAO = tool.getWorldAO();
    this.worldLight = tool.getWorldLight();

    if (args[ArgIndexes.Enabled]) {
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

      UpdateBounds(tool, origin, this.quadBounds);
    }

    this.worldLight.setAll(0);
    this.worldAO.setAll(0);
  }
}
