import {
  CompassDirectionVoxelFaceMap,
  VoxelFaceCompassDirectionMap,
  VoxelFaceOpositeDirectionMap,
  VoxelFaces,
} from "../../../../Math/index.js";
import { AMath, Directions } from "@amodx/math";

import { StairStates } from "./StairStates.js";
import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { StairVoxelShape } from "./Stair.voxel.shape.js";
import { CubeVoxelShape } from "../Cube/Cube.voxel.shape.js";
import {
  HalfCubeStates,
  HalfCubeVoxelShape,
} from "../Cube/HalfCube.voxel.shape.js";
/**
 * types
 */

enum FaceType {
  Box,
  Side,
  Up,
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
  [VoxelFaces.Up]: FaceType.Up,
  [VoxelFaces.Down]: FaceType.Box,
  [VoxelFaces.North]: FaceType.Box,
  [VoxelFaces.South]: FaceType.Front,
  [VoxelFaces.West]: FaceType.Side,
  [VoxelFaces.East]: FaceType.Side,
};

const DefaultConnectedStair: StairShapeState = {
  [VoxelFaces.Up]: FaceType.Up,
  [VoxelFaces.Down]: FaceType.Box,
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
    newData[VoxelFaces.Up] = data[VoxelFaces.Down];
    newData[VoxelFaces.Down] = data[VoxelFaces.Up];
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
  [StairStates.DownNorth]: createRototation(0, DefaultStair),
  [StairStates.DownSouth]: createRototation(deg180, DefaultStair),
  [StairStates.DownEast]: createRototation(deg90, DefaultStair),
  [StairStates.DownWest]: createRototation(deg270, DefaultStair),
  [StairStates.UpNorth]: createRototation(0, DefaultStair, true),
  [StairStates.UpSouth]: createRototation(deg180, DefaultStair, true),
  [StairStates.UpEast]: createRototation(deg90, DefaultStair, true),
  [StairStates.UpWest]: createRototation(deg270, DefaultStair, true),
  [StairStates.DownNorthEast]: createRototation(0, DefaultConnectedStair),
  [StairStates.DownSouthWest]: createRototation(
    deg180,
    DefaultConnectedStair
  ),
  [StairStates.DownSouthEast]: createRototation(deg90, DefaultConnectedStair),
  [StairStates.DownNorthWest]: createRototation(
    deg270,
    DefaultConnectedStair
  ),
  [StairStates.UpNorthEast]: createRototation(0, DefaultConnectedStair, true),
  [StairStates.UpSouthWest]: createRototation(
    deg180,
    DefaultConnectedStair,
    true
  ),
  [StairStates.UpSouthEast]: createRototation(
    deg90,
    DefaultConnectedStair,
    true
  ),
  [StairStates.UpNorthWest]: createRototation(
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
        if (faceType == FaceType.Up) return true;
        if (faceType == FaceType.Box && opositeFaceType == FaceType.Box)
          return false;
        if (faceType == FaceType.Side && opositeFaceType == FaceType.Side)
          return false;
        return true;
      }
    );
    OverrideManager.FaceExposedShapeCheck.register(
      StairVoxelShape.numberId,
      CubeVoxelShape.numberId,
      (data) => {
        const faceType = StairOverrides.getStairState(
          data.currentVoxel.getShapeState()
        )[data.face];
        if (faceType == FaceType.Up) return true;
        if (faceType == FaceType.Box) return false;
        return true;
      }
    );
    OverrideManager.FaceExposedShapeCheck.register(
      StairVoxelShape.numberId,
      HalfCubeVoxelShape.numberId,
      (data) => {
        const state = data.neighborVoxel.getShapeState();
        const faceType = StairOverrides.getStairState(
          data.currentVoxel.getShapeState()
        )[data.face];
        if (state == HalfCubeStates.Down) {
          return true;
        }
        if (state == HalfCubeStates.Up) {
          if (faceType == FaceType.Up) return false;
        }
        return true;
      }
    );
    OverrideManager.AO.register(
      StairVoxelShape.numberId,
      HalfCubeVoxelShape.numberId,
      (data) => {
        const state = data.neighborVoxel.getShapeState();
        const faceType = StairOverrides.getStairState(
          data.currentVoxel.getShapeState()
        )[data.face];
        if (state == HalfCubeStates.Down) {
          if(data.neighborVoxel.y < data.currentVoxel.y) return false;
          if (faceType == FaceType.Front) return false;
          return true;
        }
        return data.default;
      }
    );
    OverrideManager.AO.register(
      HalfCubeVoxelShape.numberId,
      StairVoxelShape.numberId,
      (data) => {
        const state = data.currentVoxel.getShapeState();

        if (state == HalfCubeStates.Down) {
          if (data.currentVoxel.y == data.neighborVoxel.y) return false;
          return data.default;
        }
        return data.default;
      }
    );
    OverrideManager.DarkenFaceUnderneath.register(
      StairVoxelShape.numberId,
      CubeVoxelShape.numberId,
      (data) => {
        return true;
      }
    );
    OverrideManager.DarkenFaceUnderneath.register(
      StairVoxelShape.numberId,
      HalfCubeVoxelShape.numberId,
      (data) => {
        const state = data.currentVoxel.getShapeState();
        if (state == HalfCubeStates.Up) {
          return true;
        }
        return false;
      }
    );
  }
}
