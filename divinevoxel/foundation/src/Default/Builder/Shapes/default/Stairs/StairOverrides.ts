import {
  CompassDirectionVoxelFaceMap,
  VoxelFaceCompassDirectionMap,
  VoxelFaceOpositeDirectionMap,
  VoxelFaces,
} from "@divinevoxel/core/Math/index.js";
import { AMath, Directions } from "@amodx/math";

import { StairStates } from "./StairStates.js";
import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { StairVoxelShape } from "./Stair.voxel.shape.js";
import { BoxVoxelShape } from "../Box/Box.voxel.shape.js";
/**
 * types
 */

enum FaceType {
  Box,
  Side,
  Top,
  Front,
}

type StairShapeState = Record<VoxelFaces, FaceType>;

/**
 * constants
 */
const deg90 = AMath.DegreesToRadians(90);
const deg180 = AMath.DegreesToRadians(180);
const deg270 = AMath.DegreesToRadians(270);

const sideFaces = [
  VoxelFaces.North,
  VoxelFaces.South,
  VoxelFaces.West,
  VoxelFaces.East,
];

const DefaultStair: StairShapeState = {
  [VoxelFaces.Top]: FaceType.Top,
  [VoxelFaces.Bottom]: FaceType.Box,
  [VoxelFaces.North]: FaceType.Box,
  [VoxelFaces.South]: FaceType.Front,
  [VoxelFaces.West]: FaceType.Side,
  [VoxelFaces.East]: FaceType.Side,
};

const DefaultConnectedStair: StairShapeState = {
  [VoxelFaces.Top]: FaceType.Top,
  [VoxelFaces.Bottom]: FaceType.Box,
  [VoxelFaces.North]: FaceType.Box,
  [VoxelFaces.South]: FaceType.Front,
  [VoxelFaces.West]: FaceType.Front,
  [VoxelFaces.East]: FaceType.Side,
};

/**
 * functions
 */
const createRototation = (
  rotation: number,
  data: StairShapeState,
  upsideDown = false
) => {
  const newData = structuredClone(data);
  if (upsideDown) {
    newData[VoxelFaces.Top] = data[VoxelFaces.Bottom];
    newData[VoxelFaces.Bottom] = data[VoxelFaces.Top];
  }

  for (const face of sideFaces) {
    const newDirection =
      CompassDirectionVoxelFaceMap[
        Directions.Rotate(VoxelFaceCompassDirectionMap[face], rotation)
      ];
    newData[newDirection] = data[face];
  }

  return newData;
};

/**
 * final
 */
const StairShapeStates: Record<StairStates, StairShapeState> = {
  [StairStates.BottomNorth]: createRototation(0, DefaultStair),
  [StairStates.BottomSouth]: createRototation(deg180, DefaultStair),
  [StairStates.BottomEast]: createRototation(deg90, DefaultStair),
  [StairStates.BottomWest]: createRototation(deg270, DefaultStair),
  [StairStates.TopNorth]: createRototation(0, DefaultStair, true),
  [StairStates.TopSouth]: createRototation(deg180, DefaultStair, true),
  [StairStates.TopEast]: createRototation(deg90, DefaultStair, true),
  [StairStates.TopWest]: createRototation(deg270, DefaultStair, true),
  [StairStates.BottomNorthEast]: createRototation(0, DefaultConnectedStair),
  [StairStates.BottomSouthWest]: createRototation(
    deg180,
    DefaultConnectedStair
  ),
  [StairStates.BottomSouthEast]: createRototation(deg90, DefaultConnectedStair),
  [StairStates.BottomNorthWest]: createRototation(
    deg270,
    DefaultConnectedStair
  ),
  [StairStates.TopNorthEast]: createRototation(0, DefaultConnectedStair, true),
  [StairStates.TopSouthWest]: createRototation(
    deg180,
    DefaultConnectedStair,
    true
  ),
  [StairStates.TopSouthEast]: createRototation(
    deg90,
    DefaultConnectedStair,
    true
  ),
  [StairStates.TopNorthWest]: createRototation(
    deg270,
    DefaultConnectedStair,
    true
  ),
};


export class StairOverrides {
  static FaceTypes = FaceType;
  static getStairState(state: number) {
    return StairShapeStates[state as StairStates];
  }

  static init() {
    OverrideManager.FaceExposedShapeCheck.register(
      StairVoxelShape.numberId,
      StairVoxelShape.numberId,
      (data) => {
        const faceType = StairOverrides.getStairState(
          data.currentVoxel.getShapeState()
        )[data.face];
        const opositeFaceType = StairOverrides.getStairState(
          data.neighborVoxel.getShapeState()
        )[VoxelFaceOpositeDirectionMap[data.face]];
        if (faceType == FaceType.Top) return true;
        if (faceType == FaceType.Box && opositeFaceType == FaceType.Box)
          return false;
        if (faceType == FaceType.Side && opositeFaceType == FaceType.Side)
          return false;
        return true;
      }
    );
    OverrideManager.FaceExposedShapeCheck.register(
      StairVoxelShape.numberId,
      BoxVoxelShape.numberId,
      (data) => {
        const faceType = StairOverrides.getStairState(
          data.currentVoxel.getShapeState()
        )[data.face];
        if (faceType == FaceType.Top) return true;
        if (faceType == FaceType.Box) return false;
        return true;
      }
    );
    OverrideManager.DarkenFaceUnderneath.register(
      StairVoxelShape.numberId,
      OverrideManager.ANY,
      (data) => {
        return true;
      }
    );
  }
}
