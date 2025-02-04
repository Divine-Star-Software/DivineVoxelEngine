import { GeoemtryNode } from "../../GeometryNode";
import { VoxelCustomGeomtryNode } from "../../../../../Models/VoxelModel.types";
import { CompassAngles } from "@amodx/math";
import { Quad } from "../../../../Geomtry/Primitives/Quad";
import { QuadUVData, QuadVerticies } from "../../../../Geomtry/Geometry.types";
import { QuadScalarVertexData } from "../../../../Geomtry/Primitives/QuadVertexData";
import { VoxelFaceDirections, VoxelFaces } from "../../../../../Math";
import { shouldCauseFlip } from "../../../Common/Calc/CalcConstants";
import type { LiquidVoxelModelArgs } from "../../../../../Models/Defaults/LiquidVoxelModel";
import { getFlowAngle, getFlowGradient, FlowVerticies } from "./FlowGradient";
import { GetBoxGeometryNodeData } from "../../../Common/BoxGeometryNode";
import { VoxelLightData } from "../../../../../Voxels/Cursor/VoxelLightData";
import { VoxelGeometryBuilder } from "../../../../Geomtry/VoxelGeometryBuilder";
const vertexValue = new QuadScalarVertexData();
const vertexLevel = new QuadScalarVertexData();

const lightData = new VoxelLightData();
const waterHeight = 6 / 7;

const quadRotations: Record<CompassAngles, QuadUVData> = {
  [CompassAngles.North]: Quad.RotateUvs(Quad.FullUVs, CompassAngles.North),
  [CompassAngles.South]: Quad.RotateUvs(Quad.FullUVs, CompassAngles.South),
  [CompassAngles.East]: Quad.RotateUvs(Quad.FullUVs, CompassAngles.East),
  [CompassAngles.West]: Quad.RotateUvs(Quad.FullUVs, CompassAngles.West),

  [CompassAngles.NorthWest]: Quad.RotateUvs(
    Quad.FullUVs,
    CompassAngles.NorthWest
  ),
  [CompassAngles.NorthEast]: Quad.RotateUvs(
    Quad.FullUVs,
    CompassAngles.NorthEast
  ),
  [CompassAngles.SouthWest]: Quad.RotateUvs(
    Quad.FullUVs,
    CompassAngles.SouthWest
  ),
  [CompassAngles.SouthEast]: Quad.RotateUvs(
    Quad.FullUVs,
    CompassAngles.SouthEast
  ),
};

const uvs: QuadUVData = [
  [1, 1],
  [0, 1],
  [0, 0],
  [1, 0],
];

const {
  quads: Quads,
  vertexWeights,
  quadBounds,
} = GetBoxGeometryNodeData(
  [
    [0, 0, 0],
    [1, waterHeight, 1],
  ],
  {}
);

Quads[VoxelFaces.Up].setUVs(uvs);
Quads[VoxelFaces.Down].setUVs(uvs);

export class LiquidGeometryNode extends GeoemtryNode<
  VoxelCustomGeomtryNode,
  LiquidVoxelModelArgs
> {
  init(): void {
    this.faceCount = 1;
    this.vertexCount = 0;
  }

  isExposed(face: VoxelFaces) {
    const nv = this.builder.nVoxel.getVoxel(
      VoxelFaceDirections[face][0] + this.builder.position.x,
      VoxelFaceDirections[face][1] + this.builder.position.y,
      VoxelFaceDirections[face][2] + this.builder.position.z
    );
    if (
      !nv ||
      nv.isAir() ||
      (!this.builder.voxel.isSameVoxel(nv) && face == VoxelFaces.Up)
    )
      return true;
    return false;
  }

  determineShading(face: VoxelFaces) {
    this.builder.calculateFaceData(face);
    const lightData = this.builder.lightData[face];
    const worldLight = this.builder.vars.light;
    worldLight.vertices[0] = lightData[0];
    worldLight.vertices[1] = lightData[1];
    worldLight.vertices[2] = lightData[2];
    worldLight.vertices[3] = lightData[3];
  }

  shouldFlip() {
    const worldLight = this.builder.vars.light;
    return (
      shouldCauseFlip(
        lightData.getS(worldLight.vertices[0]),
        lightData.getS(worldLight.vertices[1]),
        lightData.getS(worldLight.vertices[2]),
        lightData.getS(worldLight.vertices[3])
      ) ||
      shouldCauseFlip(
        lightData.sumRGB(worldLight.vertices[0]),
        lightData.sumRGB(worldLight.vertices[1]),
        lightData.sumRGB(worldLight.vertices[2]),
        lightData.sumRGB(worldLight.vertices[3])
      )
    );
  }

  add(args: LiquidVoxelModelArgs) {
    vertexLevel.setAll(15);
    vertexValue.setAll(0);
    const tool = this.builder;

    let added = false;
    let upFaceExposed = false;
    if (this.isExposed(VoxelFaces.Up)) {
      upFaceExposed = true;
      added = true;
      getFlowGradient(tool, vertexLevel);
      const quad = Quads[VoxelFaces.Up];
      this.determineShading(VoxelFaces.Up);
      quad.flip = this.shouldFlip();
      tool.vars.textureIndex = args.stillTexture;
      vertexValue.set(
        vertexLevel.vertices[0] / 7,
        vertexLevel.vertices[1] / 7,
        vertexLevel.vertices[2] / 7,
        vertexLevel.vertices[3] / 7
      );
      const flowData = getFlowAngle(vertexLevel);
      const uvSet = quadRotations[flowData[0]];
      tool.vars.animation.setAll(flowData[1]);

      quad.uvs.vertices[QuadVerticies.TopRight].x = uvSet[0][0];
      quad.uvs.vertices[QuadVerticies.TopRight].y = uvSet[0][1];

      quad.uvs.vertices[QuadVerticies.TopLeft].x = uvSet[1][0];
      quad.uvs.vertices[QuadVerticies.TopLeft].y = uvSet[1][1];

      quad.uvs.vertices[QuadVerticies.BottomLeft].x = uvSet[2][0];
      quad.uvs.vertices[QuadVerticies.BottomLeft].y = uvSet[2][1];

      quad.uvs.vertices[QuadVerticies.BottomRight].x = uvSet[3][0];
      quad.uvs.vertices[QuadVerticies.BottomRight].y = uvSet[3][1];

      quad.positions.vertices[0].y = vertexValue.vertices[0] * waterHeight;
      quad.positions.vertices[1].y = vertexValue.vertices[1] * waterHeight;
      quad.positions.vertices[2].y = vertexValue.vertices[2] * waterHeight;
      quad.positions.vertices[3].y = vertexValue.vertices[3] * waterHeight;

      VoxelGeometryBuilder.addQuad(tool, tool.origin, quad);
      tool.updateBounds(quadBounds[VoxelFaces.Up]);
    }
    if (this.isExposed(VoxelFaces.Down)) {
      added = true;
      tool.vars.textureIndex = args.stillTexture;
      const quad = Quads[VoxelFaces.Down];
      this.determineShading(VoxelFaces.Down);
      quad.flip = this.shouldFlip();
      tool.vars.textureIndex = args.stillTexture;
      VoxelGeometryBuilder.addQuad(tool, tool.origin, quad);
      tool.updateBounds(quadBounds[VoxelFaces.Down]);
    }

    if (this.isExposed(VoxelFaces.North)) {
      added = true;
      tool.vars.textureIndex = args.stillTexture;
      const quad = Quads[VoxelFaces.North];
      tool.vars.animation.setAll(1);
      this.determineShading(VoxelFaces.North);
      quad.flip = this.shouldFlip();
      if (upFaceExposed) {
        quad.positions.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[FlowVerticies.NorthWest] * waterHeight;
        quad.positions.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[FlowVerticies.NorthEast] * waterHeight;

        quad.uvs.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[FlowVerticies.NorthWest];
        quad.uvs.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[FlowVerticies.NorthEast];
      } else {
        quad.positions.vertices[QuadVerticies.TopRight].y = 1;
        quad.positions.vertices[QuadVerticies.TopLeft].y = 1;
        quad.setUVs(uvs);
      }

      VoxelGeometryBuilder.addQuad(tool, tool.origin, quad);
      tool.updateBounds(quadBounds[VoxelFaces.North]);
    }

    if (this.isExposed(VoxelFaces.South)) {
      added = true;
      tool.vars.textureIndex = args.stillTexture;
      const quad = Quads[VoxelFaces.South];
      tool.vars.animation.setAll(1);
      this.determineShading(VoxelFaces.South);
      quad.flip = this.shouldFlip();
      if (upFaceExposed) {
        quad.positions.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[FlowVerticies.SouthEsat] * waterHeight;
        quad.positions.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[FlowVerticies.SouthWest] * waterHeight;

        quad.uvs.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[FlowVerticies.SouthEsat];
        quad.uvs.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[FlowVerticies.SouthWest];
      } else {
        quad.positions.vertices[QuadVerticies.TopLeft].y = 1;
        quad.positions.vertices[QuadVerticies.TopRight].y = 1;
        quad.setUVs(uvs);
      }
      VoxelGeometryBuilder.addQuad(tool, tool.origin, quad);
      tool.updateBounds(quadBounds[VoxelFaces.South]);
    }

    if (this.isExposed(VoxelFaces.East)) {
      added = true;
      tool.vars.textureIndex = args.stillTexture;
      const quad = Quads[VoxelFaces.East];

      tool.vars.animation.setAll(1);
      this.determineShading(VoxelFaces.East);
      //  quad.flip = this.shouldFlip();
      if (upFaceExposed) {
        quad.positions.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[FlowVerticies.NorthEast] * waterHeight;
        quad.positions.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[FlowVerticies.SouthEsat] * waterHeight;

        quad.uvs.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[FlowVerticies.SouthEsat];
        quad.uvs.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[FlowVerticies.NorthEast];
      } else {
        quad.positions.vertices[QuadVerticies.TopLeft].y = 1;
        quad.positions.vertices[QuadVerticies.TopRight].y = 1;
        quad.setUVs(uvs);
      }
      VoxelGeometryBuilder.addQuad(tool, tool.origin, quad);
      tool.updateBounds(quadBounds[VoxelFaces.East]);
    }

    if (this.isExposed(VoxelFaces.West)) {
      added = true;
      tool.vars.textureIndex = args.stillTexture;
      const quad = Quads[VoxelFaces.West];
      tool.vars.animation.setAll(1);
      this.determineShading(VoxelFaces.West);
      quad.flip = this.shouldFlip();
      if (upFaceExposed) {
        quad.positions.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[FlowVerticies.SouthWest] * waterHeight;
        quad.positions.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[FlowVerticies.NorthWest] * waterHeight;

        quad.uvs.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[FlowVerticies.SouthWest];
        quad.uvs.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[FlowVerticies.NorthWest];
      } else {
        quad.positions.vertices[QuadVerticies.TopLeft].y = 1;
        quad.positions.vertices[QuadVerticies.TopRight].y = 1;
        quad.setUVs(uvs);
      }
      VoxelGeometryBuilder.addQuad(tool, tool.origin, quad);
      tool.updateBounds(quadBounds[VoxelFaces.West]);
    }

    this.builder.vars.light.setAll(0);

    return added;
  }
}
