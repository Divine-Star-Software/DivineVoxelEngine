import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
import type {
 VoxelShapeAddData,
 VoxelShapeInterface,
} from "Meta/Constructor/VoxelShape.types";
import type { DirectionNames } from "Meta/Util.types.js";
import { Rotations } from "Meta/Constructor/Mesher.types.js";

type sideTypes = "normal" | "stair-top" | "stair-side" | "side";

type stairData = {
 type: sideTypes;
 transform1: {
  x: 0;
  y: 0;
  z: 0;
 };
 transform2: {
  x: 0;
  y: 0;
  z: 0;
 };
};

export const buildStar = (
 data: VoxelShapeAddData,
 stairData: Record<DirectionNames, stairData>
) => {

    
};
