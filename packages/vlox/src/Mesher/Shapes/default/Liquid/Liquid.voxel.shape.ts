//types
import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { ShapeTool } from "../../ShapeTool.js";
import { QuadScalarVertexData } from "@amodx/meshing/Classes/QuadVertexData";

import { DirectionNames } from "../../../../Types/Util.types.js";
import { CubeVoxelShape } from "../Cube/Cube.voxel.shape.js";
import { VoxelFaces } from "../../../../Math/index.js";
import { VoxelShapeBase } from "../../VoxelShapeBase.js";
import { Quad } from "@amodx/meshing/Classes/Quad.js";
import { QuadUVData, QuadVerticies } from "@amodx/meshing/Geometry.types.js";
import { VoxelGeometry } from "../../../Geometry/VoxelGeometry.js";
import { CompassAngles } from "@amodx/math";

let flowAnimationState = 0;
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
const Quads: Record<DirectionNames, Quad> = {
  up: Quad.Create(
    [
      [0, waterHeight, 0],
      [1, waterHeight, 1],
    ],
    uvs,
    false,
    0
  ),
  down: Quad.Create(
    [
      [0, 0, 0],
      [1, 0, 1],
    ],
    uvs,
    false,
    1
  ),
  north: Quad.Create(
    [
      [0, 0, 1],
      [1, waterHeight, 1],
    ],
    uvs,
    false,
    1
  ),
  south: Quad.Create(
    [
      [0, 0, 0],
      [1, waterHeight, 0],
    ],
    uvs,
    false,
    0
  ),
  east: Quad.Create(
    [
      [1, 0, 0],
      [1, waterHeight, 1],
    ],
    uvs,
    false,
    0
  ),
  west: Quad.Create(
    [
      [0, 0, 0],
      [0, waterHeight, 1],
    ],
    uvs,
    false,
    1
  ),
};

class LiquidVoxelShapeClass extends VoxelShapeBase {
  id = "#dve_liquid";
  init() {
    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      OverrideManager.ANY,
      (data) => {
        if (
          data.face == VoxelFaces.Up &&
          data.currentVoxel.getStringId() != data.neighborVoxel.getStringId()
        ) {
          return true;
        }
        return data.default;
      }
    );
  }
  start() {
    upFaceExposed = false;
    flowAnimationState = 0;
    vertexLevel.setAll(15);
    vertexValue.setAll(0);
    level = ShapeTool.data.voxel.getLevel();
  }
  add = {
    up() {
      upFaceExposed = true;
      const level = ShapeTool.data.voxel.getLevel();

      ShapeTool.data.calculateFlow();
      vertexLevel.setFromQuadData(ShapeTool.data.getWorldLevel());

      vertexValue.set(
        vertexLevel.vertices[0] / 7,
        vertexLevel.vertices[1] / 7,
        vertexLevel.vertices[2] / 7,
        vertexLevel.vertices[3] / 7
      );
      const uvAngle = getFlowAngle();
      const uvSet = quadRotations[uvAngle];

      Quads.up.uvs.vertices[QuadVerticies.TopRight].x = uvSet[0][0];
      Quads.up.uvs.vertices[QuadVerticies.TopRight].y = uvSet[0][1];

      Quads.up.uvs.vertices[QuadVerticies.TopLeft].x = uvSet[1][0];
      Quads.up.uvs.vertices[QuadVerticies.TopLeft].y = uvSet[1][1];

      Quads.up.uvs.vertices[QuadVerticies.BottomLeft].x = uvSet[2][0];
      Quads.up.uvs.vertices[QuadVerticies.BottomLeft].y = uvSet[2][1];

      Quads.up.uvs.vertices[QuadVerticies.BottomRight].x = uvSet[3][0];
      Quads.up.uvs.vertices[QuadVerticies.BottomRight].y = uvSet[3][1];

      Quads.up.positions.vertices[0].y = vertexValue.vertices[0] * waterHeight;
      Quads.up.positions.vertices[1].y = vertexValue.vertices[1] * waterHeight;
      Quads.up.positions.vertices[2].y = vertexValue.vertices[2] * waterHeight;
      Quads.up.positions.vertices[3].y = vertexValue.vertices[3] * waterHeight;

      ShapeTool.data.getAnimationData().setAll(flowAnimationState);
      Quads.up.flip = ShapeTool.data.isFaceFlipped();
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.up);
    },

    down() {
      ShapeTool.data.getAnimationData().setAll(0);
      CubeVoxelShape.add.down();
    },

    north() {
      ShapeTool.data.getAnimationData().setAll(1);
      Quads.north.flip = ShapeTool.data.isFaceFlipped();
      if (upFaceExposed) {
        Quads.north.positions.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.TopRight] * waterHeight;
        Quads.north.positions.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.TopLeft] * waterHeight;
        Quads.north.uvs.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.TopRight];
        Quads.north.uvs.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.TopLeft];
      } else {
        Quads.north.positions.vertices[QuadVerticies.TopRight].y = 1;
        Quads.north.positions.vertices[QuadVerticies.TopLeft].y = 1;
        Quads.north.setUVs(uvs);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.north);
    },

    south() {
      Quads.south.flip = ShapeTool.data.isFaceFlipped();
      ShapeTool.data.getAnimationData().setAll(1);
      if (upFaceExposed) {
        Quads.south.positions.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.BottomRight] * waterHeight;
        Quads.south.positions.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.BottomLeft] * waterHeight;

        Quads.south.uvs.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.BottomRight];
        Quads.south.uvs.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.BottomLeft];
      } else {
        Quads.south.positions.vertices[QuadVerticies.TopLeft].y = 1;
        Quads.south.positions.vertices[QuadVerticies.TopRight].y = 1;
        Quads.south.setUVs(uvs);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.south);
    },

    east() {
      ShapeTool.data.getAnimationData().setAll(1);
      Quads.east.flip = ShapeTool.data.isFaceFlipped();
      if (upFaceExposed) {
        Quads.east.positions.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.TopRight] * waterHeight;
        Quads.east.positions.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.BottomRight] * waterHeight;

        Quads.east.uvs.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.TopRight];
        Quads.east.uvs.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.BottomRight];
      } else {
        Quads.east.positions.vertices[QuadVerticies.TopLeft].y = 1;
        Quads.east.positions.vertices[QuadVerticies.TopRight].y = 1;
        Quads.east.setUVs(uvs);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.east);
    },

    west() {
      ShapeTool.data.getAnimationData().setAll(1);
      Quads.west.flip = ShapeTool.data.isFaceFlipped();
      if (upFaceExposed) {
        Quads.west.positions.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.TopLeft] * waterHeight;
        Quads.west.positions.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.BottomLeft] * waterHeight;

        Quads.west.uvs.vertices[QuadVerticies.TopRight].y =
          vertexValue.vertices[QuadVerticies.TopLeft];
        Quads.west.uvs.vertices[QuadVerticies.TopLeft].y =
          vertexValue.vertices[QuadVerticies.BottomLeft];
      } else {
        Quads.west.positions.vertices[QuadVerticies.TopLeft].y = 1;
        Quads.west.positions.vertices[QuadVerticies.TopRight].y = 1;
        Quads.west.setUVs(uvs);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.west);
    },
  };
}

export const LiquidVoxelShape = new LiquidVoxelShapeClass();
