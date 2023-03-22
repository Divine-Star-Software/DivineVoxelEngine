import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";

import { ShapeTool } from "../../ShapeTool.js";

const addData = () => {
 return ShapeTool.builder.quad
  .setDimensions(1, 1)
  .faceData.add(animationState)
  .light.add(ShapeTool.data.getLight())
  .AO.add(ShapeTool.data.getAO())
  .uvs.add(ShapeTool.data.getUV()[0])
  .overlayUVs.add(ShapeTool.data.getOverlayUV());
};
let animationState = 0;
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

export const PanelVoxelShape = {
 id: "#dve_panel",
 build() {
  animationState = 0;

  if (ShapeTool.data.voxel.getSubstance() == "#dve_flora") {
   animationState = 2;
  }

  shapeStates[ShapeTool.data.voxel.getShapeState()]();
 },
};
OverrideManager.registerOverride("CullFace", "Panel", "Any", (data) => {
 if (data.currentVoxel.getSubstance() == "#dve_flora") {
  return false;
 }
 return data.default;
});

OverrideManager.registerOverride("CullFace", "Panel", "Any", (data) => {
 if (data.currentVoxel.getSubstance() == "#dve_flora") {
  return false;
 }
 return data.default;
});
