import type { VoxelMesherDataTool } from "../../../../../Mesher/Tools/VoxelMesherDataTool";
import {
  QuadScalarVertexData,
  QuadVertexData,
} from "@amodx/meshing/Primitives/QuadVertexData";
import { QuadVerticies } from "@amodx/meshing/Geometry.types";

const checkSets = {
  [QuadVerticies.TopRight]: [
    1, 0, 0, 1,
    //corner
    1, 1,
  ],
  [QuadVerticies.TopLeft]: [
    -1, 0, 0, 1,
    //corner
    -1, 1,
  ],

  [QuadVerticies.BottomLeft]: [
    -1, 0, 0, -1,
    //corner
    -1, -1,
  ],

  [QuadVerticies.BottomRight]: [
    1, 0, 0, -1,
    //corner
    1, -1,
  ],
};

export const FlowGradient = {
  getLevel(tool: VoxelMesherDataTool, x: number, y: number, z: number) {
    const voxel = tool.nVoxel.getVoxel(x, y, z);
    if (!voxel || !voxel.isRenderable()) return -1;
    if (!tool.voxel.isSameVoxel(voxel)) return -1;
    const level = voxel.getLevel();
    const levelState = voxel.getLevelState();
    if (levelState > 0) return 7;
    return level;
  },
  calculate(tool: VoxelMesherDataTool, flowStates: QuadScalarVertexData) {
    const cl = tool.voxel.getLevel();
    const cs = tool.voxel.getLevelState();

    let log = false;
    if (tool.position.x == -1 && tool.position.z == -1) {
      log = true;
    }

    for (let vertex = <QuadVerticies>0; vertex <= 3; vertex++) {
      const checkSet = checkSets[vertex];

      let finalLevel = cl;

      let zerCount = 0;

      for (let i = 0; i < 6; i += 2) {
        const cx = checkSet[i] + tool.position.x;
        const cz = checkSet[i + 1] + tool.position.z;

        const aboveLevel = this.getLevel(tool, cx, tool.position.y + 1, cz);

        if (aboveLevel > 0) {
          finalLevel = 9;
          break;
        }
        const level = this.getLevel(tool, cx, tool.position.y, cz);

        if (level == -1) {
          zerCount++;
        }

        if (finalLevel < level) {
          finalLevel = level;
        }
      }
      if (cl !== 7 && zerCount >= 1 && finalLevel < 7 && finalLevel > 3) {
        finalLevel = 3;
      }

      flowStates.vertices[vertex] = finalLevel;
    }

    return flowStates;
  },
};
