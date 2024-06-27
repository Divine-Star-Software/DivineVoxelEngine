import { VoxelFaces } from "@divinevoxel/core/Math/index.js";
import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { ShapeTool } from "../../ShapeTool.js";
import { QuadScalarVertexData } from "@amodx/meshing/Classes/QuadVertexData";
import { VoxelShapeBase } from "../../VoxelShapeBase.js";
import { VoxelShapeManager } from "../../VoxelShapeManager.js";

const animationState = new QuadScalarVertexData();

class HalfBoxVoxelShapeClass extends VoxelShapeBase {
  id = "#dve_half_box";
  init(): void {
    //cullface
    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_panel"),
      (data) => {
        return false;
      }
    );
    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_box"),
      (data) => {
        if (data.face == VoxelFaces.Bottom) {
          if (data.currentVoxel.getShapeState() == 0) {
            return false;
          }
        }
        if (data.face == VoxelFaces.Top) {
          if (data.currentVoxel.getShapeState() == 1) {
            return false;
          }
        }

        return true;
      }
    );
    OverrideManager.FaceExposedShapeCheck.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_stair"),
      (data) => {
        return data.default;
      }
    );
    //AO
    OverrideManager.AO.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_panel"),
      (data) => {
        return false;
      }
    );
    OverrideManager.AO.register(
      this.numberId,
      VoxelShapeManager.getMappedId("#dve_box"),
      (data) => {
        const shapeState = data.currentVoxel.getShapeState();
        if (shapeState == 1) {
          if (data.face == VoxelFaces.Top) {
            if (
              data.neighborVoxel.location[2] > data.currentVoxel.location[2]
            ) {
              return true;
            }
          }
          if (data.neighborVoxel.location[2] == data.currentVoxel.location[2]) {
            return true;
          }
          return false;
        }
        return data.default;
      }
    );
  }

  _createFace() {}
  add = {
    top() {},
    bottom() {},
    north() {},
    south() {},
    east() {},
    west() {},
  };
}

export const HalfBoxVoxelShape = new HalfBoxVoxelShapeClass();
