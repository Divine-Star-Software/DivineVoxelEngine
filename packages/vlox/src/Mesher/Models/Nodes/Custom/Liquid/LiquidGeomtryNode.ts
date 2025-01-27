import { Vector3Like } from "@amodx/math";
import { VoxelMesherDataTool } from "Mesher/Tools/VoxelMesherDataTool";
import { GeoemtryNode } from "../../GeometryNode";
import { VoxelCustomGeomtryNode } from "../../../../../Models/VoxelModel.types";
import { CompassAngles } from "@amodx/math";
import { Quad } from "@amodx/meshing/Primitives/Quad.js";
import { QuadUVData, QuadVerticies } from "@amodx/meshing/Geometry.types.js";
import { QuadScalarVertexData } from "@amodx/meshing/Primitives/QuadVertexData";
import { VoxelFaceDirections, VoxelFaces } from "../../../../../Math";
import { UpdateBounds } from "../../../Common/BoundsFunctions";
import { VoxelGeometry } from "../../../VoxelGeometry";
import { shouldCauseFlip } from "../../../Common/Calc/CalcConstants";
import type { LiquidVoxelModelArgs } from "../../../../../Models/Defaults/LiquidVoxelModel";
import { getFlowAngle, getFlowGradient, FlowVerticies } from "./FlowGradient";
import { GetBoxGeometryNodeData } from "../../../Common/BoxGeometryNode";
import { VoxelLightData } from "../../../../../Voxels/Cursor/VoxelLightData";
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
  worldLight: QuadScalarVertexData;
  init(): void {
    this.faceCount = 1;
    this.vertexCount = 0;

  }

  isExposed(face: VoxelFaces) {
    const nv = this.tool.nVoxel.getVoxel(
      VoxelFaceDirections[face][0] + this.tool.position.x,
      VoxelFaceDirections[face][1] + this.tool.position.y,
      VoxelFaceDirections[face][2] + this.tool.position.z
    );
    if (
      !nv ||
      nv.isAir() ||
      (!this.tool.voxel.isSameVoxel(nv) && face == VoxelFaces.Up)
    )
      return true;
    return false;
  }

  determineShading(face: VoxelFaces) {
    const tool = this.tool;
    const lightData = tool.lightData[face];
    const worldLight = this.worldLight;
    for (let v = 0 as QuadVerticies; v < 4; v++) {
      worldLight.vertices[v] = lightData[v];
    }
  }

  shouldFlip() {
    return (
      shouldCauseFlip(
        lightData.getS(this.worldLight.vertices[0]),
        lightData.getS(this.worldLight.vertices[1]),
        lightData.getS(this.worldLight.vertices[2]),
        lightData.getS(this.worldLight.vertices[3])
      ) ||
      shouldCauseFlip(
        lightData.sumRGB(this.worldLight.vertices[0]),
        lightData.sumRGB(this.worldLight.vertices[1]),
        lightData.sumRGB(this.worldLight.vertices[2]),
        lightData.sumRGB(this.worldLight.vertices[3])
      )
    );
  }

  add(
    tool: VoxelMesherDataTool,
    originHash: number,
    origin: Vector3Like,
    args: LiquidVoxelModelArgs
  ): void {
    vertexLevel.setAll(15);
    vertexValue.setAll(0);
    this.tool = tool;

    this.tool = tool;
    this.origin = tool.position;

    this.worldLight = tool.getWorldLight();

    let upFaceExposed = false;
    if (this.isExposed(VoxelFaces.Up)) {
      upFaceExposed = true;
      getFlowGradient(tool, vertexLevel);
      const quad = Quads[VoxelFaces.Up];
      tool.calculateFaceData(VoxelFaces.Up);
      this.determineShading(VoxelFaces.Up);
      quad.flip = this.shouldFlip();
      tool.setTexture(args.flowTexture);
      vertexValue.set(
        vertexLevel.vertices[0] / 7,
        vertexLevel.vertices[1] / 7,
        vertexLevel.vertices[2] / 7,
        vertexLevel.vertices[3] / 7
      );
      const flowData = getFlowAngle(vertexLevel);
      const uvSet = quadRotations[flowData[0]];
      tool.getAnimationData().setAll(flowData[1]);

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

      UpdateBounds(tool, origin, quadBounds[VoxelFaces.Up]);
      VoxelGeometry.addQuad(tool, origin, quad);
    }
    if (this.isExposed(VoxelFaces.Down)) {
      tool.setTexture(args.flowTexture);
      const quad = Quads[VoxelFaces.Down];
      tool.calculateFaceData(VoxelFaces.Down);
      this.determineShading(VoxelFaces.Down);
      quad.flip = this.shouldFlip();
      tool.setTexture(args.flowTexture);

      UpdateBounds(tool, origin, quadBounds[VoxelFaces.Down]);
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (this.isExposed(VoxelFaces.North)) {
      tool.setTexture(args.flowTexture);
      const quad = Quads[VoxelFaces.North];
      tool.getAnimationData().setAll(1);
      tool.calculateFaceData(VoxelFaces.North);
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

      VoxelGeometry.addQuad(tool, origin, quad);
      UpdateBounds(tool, origin, quadBounds[VoxelFaces.North]);
    }

    if (this.isExposed(VoxelFaces.South)) {
      tool.setTexture(args.flowTexture);
      const quad = Quads[VoxelFaces.South];
      tool.getAnimationData().setAll(1);
      tool.calculateFaceData(VoxelFaces.South);
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
      VoxelGeometry.addQuad(tool, origin, quad);
      UpdateBounds(tool, origin, quadBounds[VoxelFaces.South]);
    }

    if (this.isExposed(VoxelFaces.East)) {
      tool.setTexture(args.flowTexture);
      const quad = Quads[VoxelFaces.East];
      tool.getAnimationData().setAll(1);
      tool.calculateFaceData(VoxelFaces.East);
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
      VoxelGeometry.addQuad(tool, origin, quad);
      UpdateBounds(tool, origin, quadBounds[VoxelFaces.East]);
    }

    if (this.isExposed(VoxelFaces.West)) {
      tool.setTexture(args.flowTexture);
      const quad = Quads[VoxelFaces.West];
      tool.getAnimationData().setAll(1);
      tool.calculateFaceData(VoxelFaces.West);
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
      VoxelGeometry.addQuad(tool, origin, quad);
      UpdateBounds(tool, origin, quadBounds[VoxelFaces.West]);
    }

    this.worldLight.setAll(0);
  }
}
