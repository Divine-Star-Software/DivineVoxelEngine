import { Vec3Array, Vec4Array, Vector3Like } from "@amodx/math";
import { VoxelFaces } from "../../../../Math";

import { QuadScalarVertexData, QuadVec3ArrayVertexData } from "@amodx/meshing";
import {
  QuadVerticies,
  QuadVerticiesArray,
} from "@amodx/meshing/Geometry.types";
import { VoxelBoxGeometryNode } from "../../../VoxelModel.types";

import { Quad } from "@amodx/meshing/Classes/Quad";
import { VoxelMesherDataTool } from "../../../../Mesher/Tools/VoxelMesherDataTool";
import { VoxelGeometry } from "../../../../Mesher/Geometry/VoxelGeometry";
import {
  BoxVoxelGometryArgs,
  BoxVoxelGometryInputs,
} from "../../../Input/BoxVoxelGometryInputs";
import {
  addQuadWeights,
  getInterpolationValue,
  getVertexWeights,
  shouldCauseFlip,
} from "../../../../Mesher/Calc/CalcConstants";

import { LightData } from "../../../../Data/LightData";
import { VoxelGeometryRulelessConstructor } from "../../Register/VoxelGeometryRulelessConstructor";
import { RulelessGeoemtryNode } from "../RulelessGeometryNode";
import { VoxelGeometryTransform } from "../../../../VoxelData/VoxelSyncData";
import { TransformBox } from "../../../Shared/Transform";
import { GetBoxGeometryNodeData } from "../Common/BoxGeometryNode";
import { UpdateBounds } from "../Common/BoundsFunctions";

const ArgIndexes = BoxVoxelGometryInputs.ArgIndexes;

export class RulelessBoxVoxelGeometryNode extends RulelessGeoemtryNode<BoxVoxelGometryArgs> {
  quads: Quad[] = [];
  quadBounds: [Vec3Array, Vec3Array][] = [];
  vertexWeights: [Vec4Array, Vec4Array, Vec4Array, Vec4Array][] = [];
  worldLight: QuadScalarVertexData;
  worldAO: QuadScalarVertexData;

  constructor(
    geometryPaletteId: number,
    geometry: VoxelGeometryRulelessConstructor,
    public data: VoxelBoxGeometryNode,
    transform: VoxelGeometryTransform
  ) {
    super(geometryPaletteId, geometry);
    this.faceCount = 6;
    this.vertexCount = this.faceCount * 4;

    const { quads, vertexWeights, quadBounds } = GetBoxGeometryNodeData(
      data,
      transform
    );
    this.quads = quads;
    this.quadBounds = quadBounds;
    this.vertexWeights = vertexWeights;
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
    args: BoxVoxelGometryArgs
  ) {
    this.tool = tool;
    this.origin = tool.voxel;

    this.worldAO = tool.getWorldAO();
    this.worldLight = tool.getWorldLight();

    for (let face = 0 as VoxelFaces; face < 6; face++) {
      if (args[face][ArgIndexes.Enabled]) {
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
