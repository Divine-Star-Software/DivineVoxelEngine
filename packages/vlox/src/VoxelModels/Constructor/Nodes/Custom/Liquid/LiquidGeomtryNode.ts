import { Vector3Like } from "@amodx/math";
import { VoxelMesherDataTool } from "Mesher/Tools/VoxelMesherDataTool";
import { GeoemtryNode } from "../../GeometryNode";
import { VoxelCustomGeomtryNode } from "VoxelModels/VoxelModel.types";
let flowAnimationState = 0;
import { CompassAngles } from "@amodx/math";
import { Quad } from "@amodx/meshing/Primitives/Quad.js";
import { QuadUVData, QuadVerticies } from "@amodx/meshing/Geometry.types.js";
import { QuadScalarVertexData } from "@amodx/meshing/Primitives/QuadVertexData";
import { VoxelFaceDirections, VoxelFaces } from "../../../../../Math";
import { UpdateBounds } from "../../Common/BoundsFunctions";
import { VoxelGeometry } from "../../../../../Mesher/Geometry/VoxelGeometry";
import { LightData } from "../../../../../Data/LightData";
import { shouldCauseFlip } from "../../../../../Mesher/Calc/CalcConstants";
import type { LiquidVoxelModelArgs } from "VoxelModels/Defaults/LiquidVoxelModel";
import { FlowGradient } from "./FlowGradient";
import { GetBoxGeometryNodeData } from "../../Common/BoxGeometryNode";
const vertexValue = new QuadScalarVertexData();
const vertexLevel = new QuadScalarVertexData();

enum FlowStates {
  None = 0,
  Down = 1,
  Up = 2,
}

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

const getFlowAngle = (): CompassAngles | 0 => {
  if (vertexLevel.isAllEqualTo(15)) {
    flowAnimationState = FlowStates.None;
    return 0;
  }
  const upRight = vertexLevel.vertices[QuadVerticies.TopRight];
  const upLeft = vertexLevel.vertices[QuadVerticies.TopLeft];
  const downLeft = vertexLevel.vertices[QuadVerticies.BottomLeft];
  const downRight = vertexLevel.vertices[QuadVerticies.BottomRight];

  const upEqual = upRight == upLeft;
  const downEqual = downRight == downLeft;
  const rightEqual = upRight == downRight;
  const leftEqual = upLeft == downLeft;

  if (upEqual && downEqual) {
    if (upRight < downRight) {
      flowAnimationState = FlowStates.Up;
      return CompassAngles.North;
    }
    if (upRight > downRight) {
      flowAnimationState = FlowStates.Up;
      return CompassAngles.South;
    }
  }

  if (rightEqual && leftEqual) {
    if (upRight < upLeft) {
      flowAnimationState = FlowStates.Up;
      return CompassAngles.East;
    }
    if (upRight > upLeft) {
      flowAnimationState = FlowStates.Up;
      return CompassAngles.West;
    }
  }

  if (
    (downRight < upRight && downRight < upLeft && downRight < downLeft) ||
    (upLeft > upRight && upLeft > downRight && upLeft > downLeft)
  ) {
    flowAnimationState = FlowStates.Up;
    return CompassAngles.SouthEast;
  }

  if (
    (upLeft < upRight && upLeft < downRight && upLeft < downLeft) ||
    (downRight > upRight && downRight > upLeft && downRight > downLeft)
  ) {
    flowAnimationState = FlowStates.Up;
    return CompassAngles.NorthWest;
  }

  if (
    (upRight < downRight && upRight < upLeft && upRight < downLeft) ||
    (downLeft > downRight && downLeft > upLeft && downLeft > upRight)
  ) {
    flowAnimationState = FlowStates.Up;
    return CompassAngles.NorthEast;
  }

  if (
    (downLeft < downRight && downLeft < upLeft && downLeft < upRight) ||
    (upRight > downRight && upRight > upLeft && upRight > downLeft)
  ) {
    flowAnimationState = FlowStates.Up;
    return CompassAngles.SouthWest;
  }

  return CompassAngles.North;
};

let upFaceExposed = false;
let level = 0;

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

export class LiquidGeometryNode extends GeoemtryNode<
  VoxelCustomGeomtryNode,
  LiquidVoxelModelArgs
> {
  worldLight: QuadScalarVertexData;
  init(): void {
    console.log("INIT LIQUID MESH", this.data);
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
    args: LiquidVoxelModelArgs
  ): void {
    vertexLevel.setAll(15);
    vertexValue.setAll(0);
    this.tool = tool;

    this.tool = tool;
    this.origin = tool.position;

    //     this.worldAO = tool.getWorldAO();
    this.worldLight = tool.getWorldLight();

    let upFaceExposed = false;
    if (this.isExposed(VoxelFaces.Up)) {
      FlowGradient.calculate(tool, vertexLevel);
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
      const uvAngle = getFlowAngle();
      const uvSet = quadRotations[uvAngle];

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

      tool.getAnimationData().setAll(flowAnimationState);

      VoxelGeometry.addQuad(tool, origin, quad);
      upFaceExposed = true;
      UpdateBounds(tool, origin, quadBounds[VoxelFaces.Up]);
    }
    if (this.isExposed(VoxelFaces.Down)) {
      tool.setTexture(args.flowTexture);
      const quad = Quads[VoxelFaces.Down];
      tool.calculateFaceData(VoxelFaces.Down);
      this.determineShading(VoxelFaces.Down);
      quad.flip = this.shouldFlip();
      tool.setTexture(args.flowTexture);
      VoxelGeometry.addQuad(tool, origin, quad);
      UpdateBounds(tool, origin, quadBounds[VoxelFaces.Down]);
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
          vertexValue.vertices[QuadVerticies.TopRight] * waterHeight;
        quad.positions.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.TopLeft] * waterHeight;
        quad.uvs.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.TopRight];
        quad.uvs.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.TopLeft];
      } else {
        quad.positions.vertices[QuadVerticies.TopRight].y = 1;
        quad.positions.vertices[QuadVerticies.TopLeft].y = 1;
        quad.setUVs(uvs);
        UpdateBounds(tool, origin, quadBounds[VoxelFaces.North]);
      }
      VoxelGeometry.addQuad(tool, origin, quad);
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
          vertexValue.vertices[QuadVerticies.BottomRight] * waterHeight;
        quad.positions.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.BottomLeft] * waterHeight;

        quad.uvs.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.BottomRight];
        quad.uvs.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.BottomLeft];
      } else {
        quad.positions.vertices[QuadVerticies.TopLeft].y = 1;
        quad.positions.vertices[QuadVerticies.TopRight].y = 1;
        quad.setUVs(uvs);
        UpdateBounds(tool, origin, quadBounds[VoxelFaces.South]);
      }
      VoxelGeometry.addQuad(tool, origin, quad);
    }

    if (this.isExposed(VoxelFaces.East)) {
      tool.setTexture(args.flowTexture);
      const quad = Quads[VoxelFaces.East];
      tool.getAnimationData().setAll(1);
      tool.calculateFaceData(VoxelFaces.East);
      this.determineShading(VoxelFaces.East);
      quad.flip = this.shouldFlip();
      if (upFaceExposed) {
        quad.positions.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.TopRight] * waterHeight;
        quad.positions.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.BottomRight] * waterHeight;

        quad.uvs.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.TopRight];
        quad.uvs.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.BottomRight];
      } else {
        quad.positions.vertices[QuadVerticies.TopLeft].y = 1;
        quad.positions.vertices[QuadVerticies.TopRight].y = 1;
        quad.setUVs(uvs);
        UpdateBounds(tool, origin, quadBounds[VoxelFaces.East]);
      }
      VoxelGeometry.addQuad(tool, origin, quad);
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
          vertexValue.vertices[QuadVerticies.TopLeft] * waterHeight;
        quad.positions.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.BottomLeft] * waterHeight;

        quad.uvs.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.TopLeft];
        quad.uvs.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.BottomLeft];
      } else {
        quad.positions.vertices[QuadVerticies.TopLeft].y = 1;
        quad.positions.vertices[QuadVerticies.TopRight].y = 1;
        quad.setUVs(uvs);
        UpdateBounds(tool, origin, quadBounds[VoxelFaces.West]);
      }
      VoxelGeometry.addQuad(tool, origin, quad);
    }
    /*     quad.doubleSided = args[ArgIndexes.DoubleSided];
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
    quad.uvs.vertices[3].y = uvs[3][1]; */

    //   

    this.worldLight.setAll(0);
  }
}
