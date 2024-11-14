import { Vector3Like } from "@amodx/math/Vectors/Vector3.js";
import { VoxelMesherDataTool } from "../Tools/VoxelMesherDataTool.js";

export class ShapeToolclass {
  data: VoxelMesherDataTool;

  effects: Record<string,number[]> = {};
  origin = Vector3Like.Create();

  setMesher(dataTool: VoxelMesherDataTool) {
    this.data = dataTool;


  }
}

export const ShapeTool = new ShapeToolclass();
