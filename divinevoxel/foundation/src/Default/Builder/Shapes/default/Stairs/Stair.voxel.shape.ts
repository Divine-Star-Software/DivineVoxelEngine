import { VoxelShapeBase } from "../../VoxelShapeBase.js";
import { VoxelFaces } from "@divinevoxel/core/Math/index.js";
import { addStairQuads } from "./StairShapes.js";
import { StairOverrides } from "./StairOverrides.js";

class StairVoxelShapeClass extends VoxelShapeBase {
  id = "#dve_stair";
  init() {
    StairOverrides.init();
  }
  add = {
    top() {
      addStairQuads(VoxelFaces.Top);
    },
    bottom() {
      addStairQuads(VoxelFaces.Bottom);
    },
    north() {
      addStairQuads(VoxelFaces.North);
    },
    south() {
      addStairQuads(VoxelFaces.South);
    },
    east() {
      addStairQuads(VoxelFaces.East);
    },
    west() {
      addStairQuads(VoxelFaces.West);
    },
  };
}

export const StairVoxelShape = new StairVoxelShapeClass();
