import { VoxelShapeBase } from "../../VoxelShapeBase.js";
import { VoxelFaces } from "../../../../Math/index.js";
import { addStairQuads } from "./StairShapes.js";
import { StairOverrides } from "./StairOverrides.js";

class StairVoxelShapeClass extends VoxelShapeBase {
  id = "#dve_stair";
  init() {
    StairOverrides.init();
  }
  add = {
    up() {
      addStairQuads(VoxelFaces.Up);
    },
    down() {
      addStairQuads(VoxelFaces.Down);
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
