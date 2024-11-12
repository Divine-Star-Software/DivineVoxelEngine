import type { VoxelMesherDataTool } from "../../Tools/VoxelMesherDataTool";
import { QuadScalarVertexData } from "@amodx/meshing/Classes/QuadVertexData";
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

const flowStates = new QuadScalarVertexData();

export const FlowGradient = {
  getLevel(tool: VoxelMesherDataTool, x: number, y: number, z: number) {
    if (!tool.nVoxel.loadInAt(x, y, z)) return -1;
    if (!tool.nVoxel.isRenderable()) return -1;

    if (!tool.voxel.isSameVoxel(tool.nVoxel)) return -1;
    const level = tool.nVoxel.getLevel();
    const levelState = tool.nVoxel.getLevelState();
    if (levelState > 0) return 7;
    return level;
  },
  calculate(tool: VoxelMesherDataTool) {
    const cl = tool.voxel.getLevel();
    const cs = tool.voxel.getLevelState();

    let log = false;
    if (tool.voxel.x == -1 && tool.voxel.z == -1) {
      log = true;
    }

    for (let vertex = <QuadVerticies>0; vertex <= 3; vertex++) {
      const checkSet = checkSets[vertex];

      let finalLevel = cl;

      let zerCount = 0;

      for (let i = 0; i < 6; i += 2) {
        const cx = checkSet[i] + tool.voxel.x;
        const cz = checkSet[i + 1] + tool.voxel.z;

        const aboveLevel = this.getLevel(tool, cx, tool.voxel.y + 1, cz);

        if (aboveLevel > 0) {
          finalLevel = 9;
          break;
        }
        const level = this.getLevel(tool, cx, tool.voxel.y, cz);

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
    tool.getWorldLevel().setFromQuadData(flowStates);
  },
};
