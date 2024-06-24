import type { MesherDataTool } from "@amodx/meshing/Tools/MesherDataTools"
import type { QuadDimensions, QuadTransforms } from "../Types/Geometry.types";
import type { DirectionNames } from "@divinevoxel/core/Types/Util.types";
import type { Vector3Like } from "@amodx/math";

export const QuadBuilder = {
  defaultTransform: <QuadTransforms>{
    1: { x: 0, y: 0, z: 0 },
    2: { x: 0, y: 0, z: 0 },
    3: { x: 0, y: 0, z: 0 },
    4: { x: 0, y: 0, z: 0 },
  },

  width: 0,
  height: 0,
  faceFunctions: <
    Record<
      DirectionNames,
      (
        origin: Vector3Like,
        tool: MesherDataTool,
        transform: QuadTransforms,
        flip?: boolean
      ) => void
    >
  >{
    top: (origin, tool, transform, flip) => {
      if (!flip) {
        tool.positions.push(
          //v1
          origin.x - QuadBuilder.width + transform[1].x,
          origin.y + transform[1].y,
          origin.z - QuadBuilder.height + transform[1].z,
          //v2
          origin.x - QuadBuilder.width + transform[2].x,
          origin.y + transform[2].y,
          origin.z + QuadBuilder.height + transform[2].z,
          //v3
          origin.x + QuadBuilder.width + transform[3].x,
          origin.y + transform[3].y,
          origin.z + QuadBuilder.height + transform[3].z,
          //v4
          origin.x + QuadBuilder.width + transform[4].x,
          origin.y + transform[4].y,
          origin.z - QuadBuilder.height + transform[4].z
        );
      } else {
        tool.positions.push(
          //v1
          origin.x + QuadBuilder.width + transform[4].x,
          origin.y + transform[4].y,
          origin.z - QuadBuilder.height + transform[4].z,
          //v2
          origin.x - QuadBuilder.width + transform[1].x,
          origin.y + transform[1].y,
          origin.z - QuadBuilder.height + transform[1].z,
          //v3
          origin.x - QuadBuilder.width + transform[2].x,
          origin.y + transform[2].y,
          origin.z + QuadBuilder.height + transform[2].z,
          //v4
          origin.x + QuadBuilder.width + transform[3].x,
          origin.y + transform[3].y,
          origin.z + QuadBuilder.height + transform[3].z
        );
      }
      tool.indices.push(
        tool.indicieIndex + 3,
        tool.indicieIndex + 2,
        tool.indicieIndex,

        tool.indicieIndex + 2,
        tool.indicieIndex + 1,
        tool.indicieIndex
      );
      tool.normals.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0);
      tool.indicieIndex += 4;
    },
    bottom: (origin, tool, transform, flip) => {
      if (!flip) {
        tool.positions.push(
          //v1
          origin.x - QuadBuilder.width + transform[1].x,
          origin.y + transform[1].y,
          origin.z - QuadBuilder.height + transform[1].z,
          //v2
          origin.x + QuadBuilder.width + transform[2].x,
          origin.y + transform[2].y,
          origin.z - QuadBuilder.height + transform[2].z,
          //v3
          origin.x + QuadBuilder.width + transform[3].x,
          origin.y + transform[3].y,
          origin.z + QuadBuilder.height + transform[3].z,
          //v4
          origin.x - QuadBuilder.width + transform[4].x,
          origin.y + transform[4].y,
          origin.z + QuadBuilder.height + transform[4].z
        );
      } else {
        tool.positions.push(
          //v1
          origin.x - QuadBuilder.width + transform[4].x,
          origin.y + transform[4].y,
          origin.z + QuadBuilder.height + transform[4].z,
          //v2
          origin.x - QuadBuilder.width + transform[1].x,
          origin.y + transform[1].y,
          origin.z - QuadBuilder.height + transform[1].z,
          //v3
          origin.x + QuadBuilder.width + transform[2].x,
          origin.y + transform[2].y,
          origin.z - QuadBuilder.height + transform[2].z,
          //v4
          origin.x + QuadBuilder.width + transform[3].x,
          origin.y + transform[3].y,
          origin.z + QuadBuilder.height + transform[3].z
        );
      }
      tool.indices.push(
        tool.indicieIndex + 2,
        tool.indicieIndex + 1,
        tool.indicieIndex,
        tool.indicieIndex + 3,
        tool.indicieIndex + 2,
        tool.indicieIndex
      );
      tool.normals.push(0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0);
      tool.indicieIndex += 4;
    },
    //front
    south: (origin, tool, transform, flip) => {
      if (!flip) {
        tool.positions.push(
          //v1
          origin.x - QuadBuilder.width + transform[1].x,
          origin.y + QuadBuilder.height + transform[1].y,
          origin.z + transform[1].z,
          //v2
          origin.x + QuadBuilder.width + transform[2].x,
          origin.y + QuadBuilder.height + transform[2].y,
          origin.z + transform[2].z,
          //v3
          origin.x + QuadBuilder.width + transform[3].x,
          origin.y - QuadBuilder.height + transform[3].y,
          origin.z + transform[3].z,
          //v4
          origin.x - QuadBuilder.width + transform[4].x,
          origin.y - QuadBuilder.height + transform[4].y,
          origin.z + transform[4].z
        );
      } else {
        tool.positions.push(
          //v1
          origin.x - QuadBuilder.width + transform[4].x,
          origin.y - QuadBuilder.height + transform[4].y,
          origin.z + transform[4].z,
          //v2
          origin.x - QuadBuilder.width + transform[1].x,
          origin.y + QuadBuilder.height + transform[1].y,
          origin.z + transform[1].z,
          //v3
          origin.x + QuadBuilder.width + transform[2].x,
          origin.y + QuadBuilder.height + transform[2].y,
          origin.z + transform[2].z,
          //v4
          origin.x + QuadBuilder.width + transform[3].x,
          origin.y - QuadBuilder.height + transform[3].y,
          origin.z + transform[3].z
        );
      }
      tool.indices.push(
        tool.indicieIndex + 2,
        tool.indicieIndex + 1,
        tool.indicieIndex,
        tool.indicieIndex + 3,
        tool.indicieIndex + 2,
        tool.indicieIndex
      );
      tool.normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);

      tool.indicieIndex += 4;
    },
    //back
    north: (origin, tool, transform, flip) => {
      if (!flip) {
        tool.positions.push(
          //v1
          origin.x + QuadBuilder.width + transform[1].x,
          origin.y + QuadBuilder.height + transform[1].y,
          origin.z + transform[1].z,
          //v2
          origin.x - QuadBuilder.width + transform[2].x,
          origin.y + QuadBuilder.height + transform[2].y,
          origin.z + transform[2].z,
          //v3
          origin.x - QuadBuilder.width + transform[3].x,
          origin.y - QuadBuilder.height + transform[3].y,
          origin.z + transform[3].z,
          //v4
          origin.x + QuadBuilder.width + transform[4].x,
          origin.y - QuadBuilder.height + transform[4].y,
          origin.z + transform[4].z
        );
      } else {
        tool.positions.push(
          //v1
          origin.x + QuadBuilder.width + transform[4].x,
          origin.y - QuadBuilder.height + transform[4].y,
          origin.z + transform[4].z,
          //v2
          origin.x + QuadBuilder.width + transform[1].x,
          origin.y + QuadBuilder.height + transform[1].y,
          origin.z + transform[1].z,
          //v3
          origin.x - QuadBuilder.width + transform[2].x,
          origin.y + QuadBuilder.height + transform[2].y,
          origin.z + transform[2].z,
          //v4
          origin.x - QuadBuilder.width + transform[3].x,
          origin.y - QuadBuilder.height + transform[3].y,
          origin.z + transform[3].z
        );
      }
      tool.indices.push(
        tool.indicieIndex + 2,
        tool.indicieIndex + 1,
        tool.indicieIndex,
        tool.indicieIndex + 3,
        tool.indicieIndex + 2,
        tool.indicieIndex
      );
      tool.normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1);
      tool.indicieIndex += 4;
    },
    //left
    west: (origin, tool, transform, flip) => {
      if (!flip) {
        tool.positions.push(
          //v1
          origin.x + transform[1].x,
          origin.y + QuadBuilder.height + transform[1].y,
          origin.z + QuadBuilder.width + transform[1].z,
          //v2
          origin.x + transform[2].x,
          origin.y + QuadBuilder.height + transform[2].y,
          origin.z - QuadBuilder.width + transform[2].z,
          //v3
          origin.x + transform[3].x,
          origin.y - QuadBuilder.height + transform[3].y,
          origin.z - QuadBuilder.width + +transform[3].z,
          //v4
          origin.x + transform[4].x,
          origin.y - QuadBuilder.height + transform[4].y,
          origin.z + QuadBuilder.width + transform[4].z
        );
      } else {
        tool.positions.push(
          //v1
          origin.x + transform[4].x,
          origin.y - QuadBuilder.height + transform[4].y,
          origin.z + QuadBuilder.width + transform[4].z,
          //v2
          origin.x + transform[1].x,
          origin.y + QuadBuilder.height + transform[1].y,
          origin.z + QuadBuilder.width + transform[1].z,
          //v3
          origin.x + transform[2].x,
          origin.y + QuadBuilder.height + transform[2].y,
          origin.z - QuadBuilder.width + transform[2].z,
          //v4
          origin.x + transform[3].x,
          origin.y - QuadBuilder.height + transform[3].y,
          origin.z - QuadBuilder.width + transform[3].z
        );
      }

      tool.indices.push(
        tool.indicieIndex + 2,
        tool.indicieIndex + 1,
        tool.indicieIndex,
        tool.indicieIndex + 3,
        tool.indicieIndex + 2,
        tool.indicieIndex
      );
      tool.normals.push(-1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0);
      tool.indicieIndex += 4;
    },
    //right
    east: (origin, tool, transform, flip) => {
      if (!flip) {
        tool.positions.push(
          //v1
          origin.x + transform[1].x,
          origin.y + QuadBuilder.height + transform[1].y,
          origin.z - QuadBuilder.width + transform[1].z,
          //v2
          origin.x + transform[2].x,
          origin.y + QuadBuilder.height + transform[2].y,
          origin.z + QuadBuilder.width + transform[2].z,
          //v3
          origin.x + transform[3].x,
          origin.y - QuadBuilder.height + transform[3].y,
          origin.z + QuadBuilder.width + transform[3].z,
          //v4
          origin.x + transform[4].x,
          origin.y - QuadBuilder.height + transform[4].y,
          origin.z - QuadBuilder.width + transform[4].z
        );
      } else {
        tool.positions.push(
          //v1
          origin.x + transform[4].x,
          origin.y - QuadBuilder.height + transform[4].y,
          origin.z - QuadBuilder.width + transform[4].z,
          //v2
          origin.x + transform[1].x,
          origin.y + QuadBuilder.height + transform[1].y,
          origin.z - QuadBuilder.width + transform[1].z,
          //v3
          origin.x + transform[2].x,
          origin.y + QuadBuilder.height + transform[2].y,
          origin.z + QuadBuilder.width + transform[2].z,
          //v4
          origin.x + transform[3].x,
          origin.y - QuadBuilder.height + transform[3].y,
          origin.z + QuadBuilder.width + transform[3].z
        );
      }

      tool.indices.push(
        tool.indicieIndex + 2,
        tool.indicieIndex + 1,
        tool.indicieIndex,

        tool.indicieIndex + 3,
        tool.indicieIndex + 2,
        tool.indicieIndex
      );
      tool.normals.push(1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0);
      tool.indicieIndex += 4;
    },
  },

  create(
    tool: MesherDataTool,
    direction: DirectionNames,
    origin: Vector3Like,
    dimensions: QuadDimensions,
    flip: boolean,
    transform?: QuadTransforms
  ) {
    this.width = dimensions.width / 2;
    this.height = dimensions.height / 2;
    this.faceFunctions[direction](
      origin,
      tool,
      transform ? transform : this.defaultTransform,
      flip
    );
  },
};
