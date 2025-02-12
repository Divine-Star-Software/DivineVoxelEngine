import type { VoxelModelBuilder } from "../../../VoxelModelBuilder";
import { QuadScalarVertexData } from "../../../../Geomtry/Primitives/QuadVertexData"
import { QuadVerticies } from "../../../../Geomtry/Geometry.types"
import { CompassAngles } from "@amodx/math";
enum FlowStates {
  None = 0,
  Down = 1,
  Up = 2,
}
export enum FlowVerticies {
  NorthEast = 0,
  NorthWest = 1,
  SouthWest = 2,
  SouthEsat = 3,
}
const checkSets = {
  [FlowVerticies.NorthEast]: [
    //1
    1, 0,
    //2
    0, 1,
    //3
    1, 1,
  ],
  [FlowVerticies.NorthWest]: [
    //1
    -1, 0,
    //2
    0, 1,
    //3
    -1, 1,
  ],

  [FlowVerticies.SouthWest]: [
    //1
    -1, 0,
    //2
    0, -1,
    //3
    -1, -1,
  ],

  [FlowVerticies.SouthEsat]: [
    //1
    1, 0,
    //2
    0, -1,
    //3
    1, -1,
  ],
};

function getLevel(tool: VoxelModelBuilder, x: number, y: number, z: number) {
  const voxel = tool.nVoxel.getVoxel(x, y, z);
  if (!voxel || !voxel.isRenderable()) return -1;
  if (!tool.voxel.isSameVoxel(voxel)) return -1;
  const level = voxel.getLevel();
  const levelState = voxel.getLevelState();
  if (levelState > 0) return 7;
  return level;
}

const returnData: [angle: CompassAngles, flow: number] = [
  CompassAngles.East,
  0,
];
export function getFlowAngle(vertexLevel: QuadScalarVertexData) {
  if (vertexLevel.isAllEqualTo(7)) {
    returnData[0] = 0;
    returnData[1] = FlowStates.None;
    return returnData;
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
      returnData[0] = CompassAngles.North;
      returnData[1] = FlowStates.Up;
      return returnData;
    }
    if (upRight > downRight) {
      returnData[0] = CompassAngles.South;
      returnData[1] = FlowStates.Up;
      return returnData;
    }
  }

  if (rightEqual && leftEqual) {
    if (upRight < upLeft) {
      returnData[0] = CompassAngles.East;
      returnData[1] = FlowStates.Up;
      return returnData;
    }
    if (upRight > upLeft) {
      returnData[0] = CompassAngles.West;
      returnData[1] = FlowStates.Up;
      return returnData;
    }
  }

  if (
    (downRight < upRight && downRight < upLeft && downRight < downLeft) ||
    (upLeft > upRight && upLeft > downRight && upLeft > downLeft)
  ) {
    returnData[0] = CompassAngles.SouthEast;
    returnData[1] = FlowStates.Up;
    return returnData;
  }

  if (
    (upLeft < upRight && upLeft < downRight && upLeft < downLeft) ||
    (downRight > upRight && downRight > upLeft && downRight > downLeft)
  ) {
    returnData[0] = CompassAngles.NorthWest;
    returnData[1] = FlowStates.Up;
    return returnData;
  }

  if (
    (upRight < downRight && upRight < upLeft && upRight < downLeft) ||
    (downLeft > downRight && downLeft > upLeft && downLeft > upRight)
  ) {
    returnData[0] = CompassAngles.NorthEast;
    returnData[1] = FlowStates.Up;
    return returnData;
  }

  if (
    (downLeft < downRight && downLeft < upLeft && downLeft < upRight) ||
    (upRight > downRight && upRight > upLeft && upRight > downLeft)
  ) {
    returnData[0] = CompassAngles.SouthWest;
    returnData[1] = FlowStates.Up;
    return returnData;
  }

  returnData[0] = CompassAngles.North;
  returnData[1] = FlowStates.Up;
  return returnData;
}

export function getFlowGradient(
  tool: VoxelModelBuilder,
  flowStates: QuadScalarVertexData
) {
  const cl = tool.voxel.getLevel();
  const cs = tool.voxel.getLevelState();

  for (let vertex = <QuadVerticies>0; vertex <= 3; vertex++) {
    const checkSet = checkSets[vertex];

    let finalLevel = cl;

    let zerCount = 0;

    for (let i = 0; i < 6; i += 2) {
      const cx = checkSet[i] + tool.position.x;
      const cz = checkSet[i + 1] + tool.position.z;

      const aboveLevel = getLevel(tool, cx, tool.position.y + 1, cz);

      if (aboveLevel > 0) {
        flowStates.vertices[vertex] = 9;
        finalLevel = 9;
        break;
      }
      const level = getLevel(tool, cx, tool.position.y, cz);

      if (level == -1) {
        zerCount++;
      }

      if (finalLevel < level) {
        finalLevel = level;
      }
    }
    if (((finalLevel < 7 && finalLevel > 3) || cs == 1) && zerCount >= 2) {
      finalLevel = 3;
    }

    flowStates.vertices[vertex] = finalLevel;
  }

  return flowStates;
}
