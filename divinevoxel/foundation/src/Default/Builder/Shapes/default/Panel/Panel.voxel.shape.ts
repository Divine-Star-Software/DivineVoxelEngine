import { QuadScalarVertexData } from "@divinevoxel/core/Meshing/";
import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";

import { ShapeTool } from "../../ShapeTool.js";
import { VoxelShapeBase } from "../../VoxelShapeBase.js";

const animationState = new QuadScalarVertexData();
const addData = () => {
  return ShapeTool.builder.quad
    .setDimensions(1, 1)
    .animationState.add(animationState)
    .light.add(ShapeTool.data.getWorldLight())
    .AO.add(ShapeTool.data.getWorldAO())
    .textures.add(ShapeTool.data.getTexture())
    .overlayTexture.add(ShapeTool.data.getOverlayTextures());
};

const shapeStates: Record<number, () => void> = {
  0: () => {
    addData().updatePosition(0.5, 0.5, 0.05).setDirection("south").create();
    addData().setDirection("north").create().clear();
  },
  1: () => {
    addData().updatePosition(0.5, 0.5, 0.95).setDirection("north").create();
    addData().setDirection("south").create().clear();
  },
  2: () => {
    addData().updatePosition(0.95, 0.5, 0.5).setDirection("east").create();
    addData().setDirection("west").create().clear();
  },
  3: () => {
    addData().updatePosition(0.05, 0.5, 0.5).setDirection("west").create();
    addData().setDirection("east").create().clear();
  },
  4: () => {
    addData().updatePosition(0.5, 0.05, 0.5).setDirection("top").create();
    addData().setDirection("bottom").create().clear();
  },
  5: () => {
    addData().updatePosition(0.5, 0.95, 0.5).setDirection("top").create();
    addData().setDirection("bottom").create().clear();
  },
};

class PanelVoxelShapeClass extends VoxelShapeBase {
  id = "#dve_panel";
  init() {
    OverrideManager.CullFace.register(
      this.numberId,
      OverrideManager.ANY,
      (data) => {
        if (data.currentVoxel.getSubstanceStringId() == "#dve_flora") {
          return false;
        }
        return data.default;
      }
    );
  }
  build() {
    animationState.setAll(0);

    if (ShapeTool.data.voxel.getSubstanceStringId() == "#dve_flora") {
      animationState.setAll(2);
    }

    shapeStates[ShapeTool.data.voxel.getShapeState()]();
  }
}

export const PanelVoxelShape = new PanelVoxelShapeClass();
