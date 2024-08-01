import type { FaceDataOverride } from "../../../Types/Override.types.js";
import type { DirectionNames } from "@divinevoxel/core/Types/Util.types.js";

import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { ShapeTool } from "../../ShapeTool.js";
import { QuadScalarVertexData } from "@amodx/meshing/Classes/QuadVertexData";
import {
  VoxelFaceOpositeDirectionMap,
  VoxelFaces,
} from "@divinevoxel/core/Math/index.js";
import { VoxelGeometry } from "../../../Geometry/VoxelGeometry.js";
import { QuadUVData } from "@amodx/meshing/Geometry.types.js";
import { VoxelShapeBase } from "../../VoxelShapeBase.js";
import { VoxelShapeManager } from "../../VoxelShapeManager.js";
import { Quad } from "@amodx/meshing/Classes/Quad.js";
import { StairOverrides } from "../Stairs/StairOverrides.js";
import { PanelVoxelShape } from "../Panel/Panel.voxel.shape.js";
import { VoxelShaderData } from "../../../../../Data/VoxelShaderData.js";

const animationState = new QuadScalarVertexData();
const uvs: QuadUVData = [
  [1, 1],
  [0, 1],
  [0, 0],
  [1, 0],
];

const Quads: Record<DirectionNames, Quad> = {
  top: Quad.Create(
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    uvs,
    false,
    0
  ),
  bottom: Quad.Create(
    [
      [0, 0, 0],
      [1, 0, 1],
    ],
    uvs,
    false,
    1
  ),
  north: Quad.Create(
    [
      [0, 0, 1],
      [1, 1, 1],
    ],
    uvs,
    false,
    1
  ),
  south: Quad.Create(
    [
      [0, 0, 0],
      [1, 1, 0],
    ],
    uvs,
    false,
    0
  ),
  east: Quad.Create(
    [
      [1, 0, 0],
      [1, 1, 1],
    ],
    uvs,
    false,
    0
  ),
  west: Quad.Create(
    [
      [0, 0, 0],
      [0, 1, 1],
    ],
    uvs,
    false,
    1
  ),
};

class BoxVoxelShapeClass extends VoxelShapeBase {
  id = "#dve_box";

  init(): void {
    //cullface
    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      this.numberId,
      (data) => {
        return BoxCullFunctions[data.face](data);
      }
    );

    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_panel"),
      (data) => {
        return true;
      }
    );

    OverrideManager.DarkenFaceUnderneath.register(
      this.numberId,
      OverrideManager.ANY,
      (data) => {
        return true;
      }
    );

    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_half_box"),
      (data) => {
        if (data.face == VoxelFaces.Top) {
          if (data.neighborVoxel.getShapeState() == 0) {
            return true;
          }
          return false;
        }
        return true;
      }
    );

    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_stair"),
      (data) => {
        const faceType = StairOverrides.getStairState(
          data.neighborVoxel.getShapeState()
        )[VoxelFaceOpositeDirectionMap[data.face]];
        if (faceType == StairOverrides.FaceTypes.Box) return false;
        return true;
      }
    );

    //ao
    OverrideManager.AO.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_panel"),
      (data) => {
        return false;
      }
    );
  }
  add = {
    top() {
      Quads.top.flip = ShapeTool.data.isFaceFlipped();
      if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
        ShapeTool.data
          .getAnimationData()
          .setAll(VoxelShaderData.AnimationStates.WindAffected.Box);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.top);
    },
    bottom() {
      Quads.bottom.flip = ShapeTool.data.isFaceFlipped();
      if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
        ShapeTool.data
          .getAnimationData()
          .setAll(VoxelShaderData.AnimationStates.WindAffected.Box);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.bottom);
    },
    north() {
      Quads.north.flip = ShapeTool.data.isFaceFlipped();
      if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
        ShapeTool.data
          .getAnimationData()
          .setAll(VoxelShaderData.AnimationStates.WindAffected.Box);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.north);
    },
    south() {
      Quads.south.flip = ShapeTool.data.isFaceFlipped();
      if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
        ShapeTool.data
          .getAnimationData()
          .setAll(VoxelShaderData.AnimationStates.WindAffected.Box);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.south);
    },
    east() {
      Quads.east.flip = ShapeTool.data.isFaceFlipped();
      if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
        ShapeTool.data
          .getAnimationData()
          .setAll(VoxelShaderData.AnimationStates.WindAffected.Box);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.east);
    },
    west() {
      Quads.west.flip = ShapeTool.data.isFaceFlipped();
      if (ShapeTool.data.voxel.getSubstnaceData().isWindAffected()) {
        ShapeTool.data
          .getAnimationData()
          .setAll(VoxelShaderData.AnimationStates.WindAffected.Box);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.west);
    },
  };
}

export const BoxVoxelShape = new BoxVoxelShapeClass();

//cull leaf faces
const BoxCullFunctions: Record<
  VoxelFaces,
  (data: FaceDataOverride) => boolean
> = {
  [VoxelFaces.Top]: (data) => {
    if (
      data.currentVoxel.getSubstnaceData().cullDense() &&
      data.neighborVoxel.loadInAt(
        data.currentVoxel.x,
        data.currentVoxel.y + 1,
        data.currentVoxel.z
      ) &&
      data.currentVoxel.isSameVoxel(data.neighborVoxel) &&
      data.neighborVoxel.loadInAt(
        data.currentVoxel.x,
        data.currentVoxel.y + 2,
        data.currentVoxel.z
      ) &&
      data.currentVoxel.isSameVoxel(data.neighborVoxel)
    ) {
      return false;
    }
    return data.default;
  },
  [VoxelFaces.Bottom]: (data) => {
    if (
      data.currentVoxel.getSubstnaceData().cullDense() &&
      data.neighborVoxel.loadInAt(
        data.currentVoxel.x,
        data.currentVoxel.y - 1,
        data.currentVoxel.z
      ) &&
      data.currentVoxel.isSameVoxel(data.neighborVoxel) &&
      data.neighborVoxel.loadInAt(
        data.currentVoxel.x,
        data.currentVoxel.y - 2,
        data.currentVoxel.z
      ) &&
      data.currentVoxel.isSameVoxel(data.neighborVoxel)
    ) {
      return false;
    }
    return data.default;
  },
  [VoxelFaces.East]: (data) => {
    if (
      data.currentVoxel.getSubstnaceData().cullDense() &&
      data.neighborVoxel.loadInAt(
        data.currentVoxel.x + 1,
        data.currentVoxel.y,
        data.currentVoxel.z
      ) &&
      data.currentVoxel.isSameVoxel(data.neighborVoxel) &&
      data.neighborVoxel.loadInAt(
        data.currentVoxel.x + 2,
        data.currentVoxel.y,
        data.currentVoxel.z
      ) &&
      data.currentVoxel.isSameVoxel(data.neighborVoxel)
    ) {
      return false;
    }
    return data.default;
  },
  [VoxelFaces.West]: (data) => {
    if (
      data.currentVoxel.getSubstnaceData().cullDense() &&
      data.neighborVoxel.loadInAt(
        data.currentVoxel.x - 1,
        data.currentVoxel.y,
        data.currentVoxel.z
      ) &&
      data.currentVoxel.isSameVoxel(data.neighborVoxel) &&
      data.neighborVoxel.loadInAt(
        data.currentVoxel.x - 2,
        data.currentVoxel.y,
        data.currentVoxel.z
      ) &&
      data.currentVoxel.isSameVoxel(data.neighborVoxel)
    ) {
      return false;
    }
    return data.default;
  },
  [VoxelFaces.North]: (data) => {
    if (
      data.currentVoxel.getSubstnaceData().cullDense() &&
      data.neighborVoxel.loadInAt(
        data.currentVoxel.x,
        data.currentVoxel.y,
        data.currentVoxel.z + 1
      ) &&
      data.currentVoxel.isSameVoxel(data.neighborVoxel) &&
      data.neighborVoxel.loadInAt(
        data.currentVoxel.x,
        data.currentVoxel.y,
        data.currentVoxel.z + 2
      ) &&
      data.currentVoxel.isSameVoxel(data.neighborVoxel)
    ) {
      return false;
    }
    return data.default;
  },
  [VoxelFaces.South]: (data) => {
    if (
      data.currentVoxel.getSubstnaceData().cullDense() &&
      data.neighborVoxel.loadInAt(
        data.currentVoxel.x,
        data.currentVoxel.y,
        data.currentVoxel.z - 1
      ) &&
      data.currentVoxel.isSameVoxel(data.neighborVoxel) &&
      data.neighborVoxel.loadInAt(
        data.currentVoxel.x,
        data.currentVoxel.y,
        data.currentVoxel.z - 2
      ) &&
      data.currentVoxel.isSameVoxel(data.neighborVoxel)
    ) {
      return false;
    }
    return data.default;
  },
};
