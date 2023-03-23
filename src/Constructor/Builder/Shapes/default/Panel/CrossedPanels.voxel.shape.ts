import { ShapeTool } from "../../ShapeTool.js";
import { QuadVertexData } from "../../../Classes/VertexData.js";

const animationState = new QuadVertexData();
const addData = () => {
 return ShapeTool.builder.quad.light
  .add(ShapeTool.data.getWorldLight())
  .AO.add(ShapeTool.data.getWorldAO())
  .textures.add(ShapeTool.data.getUV())
  .overlayTexture.add(ShapeTool.data.getOverlayTextures());
};
export const CrossedPanels = {
 id: "#dve_crossed_panels",

 build() {
  let topANIM = 0;
  let bottomANIM = 0;
  if (ShapeTool.data.voxel.getSubstance() == "#dve_flora") {
   if (
    ShapeTool.data.voxel.isSameVoxel(
     ShapeTool.data.voxel.x,
     ShapeTool.data.voxel.y + 1,
     ShapeTool.data.voxel.z
    )
   ) {
    topANIM = 3;
    bottomANIM = 3;
   } else {
    topANIM = 1;
   }
  }
  animationState.set(topANIM, topANIM, bottomANIM, bottomANIM);
  ShapeTool.builder.quad.setDimensions(1, 1);

  addData()
   .setDirection("north")
   .setFlipped(false)
   .animationState.add(animationState)
   .updatePosition(0.5, 0.5, 1)
   .setTransform(1, 0, 0, -1)
   .setTransform(4, 0, 0, -1)
   .create()
   .clearTransform();

  addData()
   .setDirection("north")
   .setFlipped(false)
   .animationState.add(animationState)
   .updatePosition(0.5, 0.5, 0)
   .setTransform(1, 0, 0, 1)
   .setTransform(4, 0, 0, 1)
   .create()
   .clearTransform();

  addData()
   .setDirection("south")
   .setFlipped(false)
   .animationState.add(animationState)
   .updatePosition(0.5, 0.5, 0)
   .setTransform(1, 0, 0, 1)
   .setTransform(4, 0, 0, 1)
   .create()
   .clearTransform();

  addData()
   .setDirection("south")
   .setFlipped(false)
   .animationState.add(animationState)
   .updatePosition(0.5, 0.5, 1)
   .setTransform(1, 0, 0, -1)
   .setTransform(4, 0, 0, -1)
   .create()
   .clearTransform();
 },
};
