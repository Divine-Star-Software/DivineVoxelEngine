import { Vec3Array, Vec4Array } from "@amodx/math";
import { VoxelFaces } from "../../../../Math";
import { QuadVerticies } from "../../../Geomtry/Geometry.types";
import { VoxelQuadGeometryNode } from "../../../../Voxels/Models/VoxelModel.types";

import { Quad } from "../../../Geomtry/Primitives/Quad";
import {
  addVoxelQuad,
  VoxelGeometryBuilder,
} from "../../../Geomtry/VoxelGeometryBuilder";

import {
  getInterpolationValue,
  shouldCauseFlip,
} from "../../Common/Calc/CalcConstants";

import {
  QuadVoxelGometryArgs,
  QuadVoxelGometryInputs,
} from "../../../../Voxels/Models/Input/QuadVoxelGometryInputs";
import { GeoemtryNode } from "../GeometryNode";
import { GetQuadGeometryData } from "../../Common/QuadGeometryNode";
import { VoxelLightData } from "../../../../Voxels/Cursor/VoxelLightData";

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
  closestFace: VoxelFaces;
  lightData = new VoxelLightData();

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
    const tool = this.builder;

    const lightData = tool.lightData[VoxelFaces.Up];
    const noAO =
      this.builder.voxel.isLightSource() || this.builder.voxel.noAO();

    const worldLight = this.builder.vars.light;
    const worldAO = this.builder.vars.ao;
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
    const worldLight = this.builder.vars.light;
    const worldAO = this.builder.vars.ao;
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
    const tool = this.builder;

    tool.calculateFaceData(this.closestFace);
    this.determineShading();

    const quad = this.quad;
    quad.flip = this.shouldFlip() || args[ArgIndexes.Fliped];
    tool.vars.textureIndex = args[ArgIndexes.Texture];

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
    addVoxelQuad(tool, tool.position, quad);

    this.builder.updateBounds(this.quadBounds);

    this.builder.vars.light.setAll(0);
    this.builder.vars.ao.setAll(0);

    return true;
  }
}
