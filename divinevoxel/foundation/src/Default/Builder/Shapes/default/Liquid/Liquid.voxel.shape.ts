//types
import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { ShapeTool } from "../../ShapeTool.js";
import { QuadScalarVertexData } from "@amodx/meshing/Classes/QuadVertexData";

import { DirectionNames } from "@divinevoxel/core/Types/Util.types.js";
import { BoxVoxelShape } from "../Box/Box.voxel.shape.js";
import { VoxelFaces } from "@divinevoxel/core/Math/index.js";
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
  const topRight = vertexLevel.vertices[QuadVerticies.TopRight];
  const topLeft = vertexLevel.vertices[QuadVerticies.TopLeft];
  const bottomLeft = vertexLevel.vertices[QuadVerticies.BottomLeft];
  const bottomRight = vertexLevel.vertices[QuadVerticies.BottomRight];

  const topEqual = topRight == topLeft;
  const bottomEqual = bottomRight == bottomLeft;
  const rightEqual = topRight == bottomRight;
  const leftEqual = topLeft == bottomLeft;

  if (topEqual && bottomEqual) {
    if (topRight < bottomRight) {
      flowAnimationState = FlowStates.Up;
      return CompassAngles.North;
    }
    if (topRight > bottomRight) {
      flowAnimationState = FlowStates.Up;
      return CompassAngles.South;
    }
  }

  if (rightEqual && leftEqual) {
    if (topRight < topLeft) {
      flowAnimationState = FlowStates.Up;
      return CompassAngles.East;
    }
    if (topRight > topLeft) {
      flowAnimationState = FlowStates.Up;
      return CompassAngles.West;
    }
  }

  if (
    (bottomRight < topRight &&
      bottomRight < topLeft &&
      bottomRight < bottomLeft) ||
    (topLeft > topRight && topLeft > bottomRight && topLeft > bottomLeft)
  ) {
    flowAnimationState = FlowStates.Up;
    return CompassAngles.SouthEast;
  }

  if (
    (topLeft < topRight && topLeft < bottomRight && topLeft < bottomLeft) ||
    (bottomRight > topRight &&
      bottomRight > topLeft &&
      bottomRight > bottomLeft)
  ) {
    flowAnimationState = FlowStates.Up;
    return CompassAngles.NorthWest;
  }

  if (
    (topRight < bottomRight && topRight < topLeft && topRight < bottomLeft) ||
    (bottomLeft > bottomRight && bottomLeft > topLeft && bottomLeft > topRight)
  ) {
    flowAnimationState = FlowStates.Up;
    return CompassAngles.NorthEast;
  }

  if (
    (bottomLeft < bottomRight &&
      bottomLeft < topLeft &&
      bottomLeft < topRight) ||
    (topRight > bottomRight && topRight > topLeft && topRight > bottomLeft)
  ) {
    flowAnimationState = FlowStates.Up;
    return CompassAngles.SouthWest;
  }

  return CompassAngles.North;
};

let topFaceExposed = false;
let level = 0;

const uvs: QuadUVData = [
  [1, 1],
  [0, 1],
  [0, 0],
  [1, 0],
];
const Quads: Record<DirectionNames, Quad> = {
  top: Quad.Create(
    [
      [0, waterHeight, 0],
      [1, waterHeight, 1],
    ],
    uvs,
    false,
    0
  ),
  bottom: Quad.Create(
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
          data.face == VoxelFaces.Top &&
          data.currentVoxel.getStringId() != data.neighborVoxel.getStringId()
        ) {
          return true;
        }
        return data.default;
      }
    );
  }
  start() {
    topFaceExposed = false;
    flowAnimationState = 0;
    vertexLevel.setAll(15);
    vertexValue.setAll(0);
    level = ShapeTool.data.voxel.getLevel();
  }
  add = {
    top() {
      topFaceExposed = true;
      const level = ShapeTool.data.voxel.getLevel();

      ShapeTool.data.calculateFlow();
      vertexLevel.setFromQuadData(ShapeTool.data.getWorldLevel());

      vertexValue.set(
        vertexLevel.vertices[1] / 7,
        vertexLevel.vertices[2] / 7,
        vertexLevel.vertices[3] / 7,
        vertexLevel.vertices[4] / 7
      );
      const uvAngle = getFlowAngle();
      const uvSet = quadRotations[uvAngle];

      Quads.top.uvs.vertices[QuadVerticies.TopRight].x = uvSet[0][0];
      Quads.top.uvs.vertices[QuadVerticies.TopRight].y = uvSet[0][1];

      Quads.top.uvs.vertices[QuadVerticies.TopLeft].x = uvSet[1][0];
      Quads.top.uvs.vertices[QuadVerticies.TopLeft].y = uvSet[1][1];

      Quads.top.uvs.vertices[QuadVerticies.BottomLeft].x = uvSet[2][0];
      Quads.top.uvs.vertices[QuadVerticies.BottomLeft].y = uvSet[2][1];

      Quads.top.uvs.vertices[QuadVerticies.BottomRight].x = uvSet[3][0];
      Quads.top.uvs.vertices[QuadVerticies.BottomRight].y = uvSet[3][1];

      Quads.top.positions.vertices[1].y = vertexValue.vertices[1] * waterHeight;
      Quads.top.positions.vertices[2].y = vertexValue.vertices[2] * waterHeight;
      Quads.top.positions.vertices[3].y = vertexValue.vertices[3] * waterHeight;
      Quads.top.positions.vertices[4].y = vertexValue.vertices[4] * waterHeight;

      ShapeTool.data.getAnimationData().setAll(flowAnimationState);
      Quads.top.flip = ShapeTool.data.isFaceFlipped();
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.top);
    },

    bottom() {
      ShapeTool.data.getAnimationData().setAll(0);
      BoxVoxelShape.add.bottom();
    },

    north() {
      ShapeTool.data.getAnimationData().setAll(1);
      Quads.north.flip = ShapeTool.data.isFaceFlipped();
      if (topFaceExposed) {
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
      if (topFaceExposed) {
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
      if (topFaceExposed) {
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
      if (topFaceExposed) {
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
