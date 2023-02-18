import type { VoxelShape } from "Meta/Constructor/VoxelShape.types";
let topANIM = 0;
let bottomANIM = 0;
export const CrossedPanels: VoxelShape = {
 id: "#dve_crossed_panels",

 build(mesher) {
  topANIM = 0;
  bottomANIM = 0;
  if (mesher.data.getSubstance() == "#dve_flora") {
   if (
    mesher.data.isSameVoxel(mesher.data.x, mesher.data.y + 1, mesher.data.z)
   ) {
    topANIM = 3;
    bottomANIM = 3;
   } else {
    topANIM = 1;
   }
  }
  mesher.quad.setDimensions(1, 1);
  mesher.setTemplateIncrement(false).templateData.loadIn("top");
  mesher.quad
   .setDirection("north")
   .setFlipped(false)
   .addData(1)
   .setAnimationState([bottomANIM, bottomANIM, topANIM, topANIM])
   .updatePosition(0.5, 0.5, 1)
   .setTransform(1, 0, 0, -1)
   .setTransform(4, 0, 0, -1)
   .create()
   .clearTransform();

  mesher.setTemplateIncrement(true).templateData.loadIn("top");
  mesher.quad
   .setDirection("north")
   .setFlipped(false)
   .addData(1)
   .setAnimationState([bottomANIM, bottomANIM, topANIM, topANIM])
   .updatePosition(0.5, 0.5, 0)
   .setTransform(1, 0, 0, 1)
   .setTransform(4, 0, 0, 1)
   .create()
   .clearTransform();

  mesher.setTemplateIncrement(false).templateData.loadIn("bottom");
  mesher.quad
   .setDirection("south")
   .setFlipped(false)
   .addData(1)
   .setAnimationState([bottomANIM, bottomANIM, topANIM, topANIM])
   .updatePosition(0.5, 0.5, 0)
   .setTransform(1, 0, 0, 1)
   .setTransform(4, 0, 0, 1)
   .create()
   .clearTransform();

  mesher.setTemplateIncrement(true).templateData.loadIn("bottom");
  mesher.quad
   .setDirection("south")
   .setFlipped(false)
   .addData(1)
   .setAnimationState([bottomANIM, bottomANIM, topANIM, topANIM])
   .updatePosition(0.5, 0.5, 1)
   .setTransform(1, 0, 0, -1)
   .setTransform(4, 0, 0, -1)
   .create()
   .clearTransform();
 },
};
