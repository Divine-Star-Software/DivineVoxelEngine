import { ShapeTool } from "../../ShapeTool.js";
import { QuadVertexData } from "@divinevoxel/core/Meshing/";
import { VoxelGeometry } from "../../../Geometry/VoxelGeometry.js";
import { Vec2Array, Vec3Array } from "@divinevoxel/core/Math/index.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";

const animationState = new QuadVertexData();
const addData = () => {
  return ShapeTool.builder.quad.light
    .add(ShapeTool.data.getWorldLight())
    .AO.add(ShapeTool.data.getWorldAO())
    .textures.add(ShapeTool.data.getTexture())
    .overlayTexture.add(ShapeTool.data.getOverlayTextures());
};

const Quads: [
  pooints: [Vec3Array, Vec3Array, Vec3Array, Vec3Array],
  uvs: [Vec2Array, Vec2Array, Vec2Array, Vec2Array]
][] = [
  //1
   [
    [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
    ],
    [
      [0, 1], 
      [0, 0], 
      [1, 0], 
      [1, 1],
    ],
  ], 
  //2
  [
    [
      [1, 0, 0], // was 4th
      [1, 1, 0], // was 3rd
      [0, 1, 1], // was 2nd
      [0, 0, 1], // was 1st
    ],
    [
      [0, 1], 
      [0, 0], 
      [1, 0], 
      [1, 1],
    ],
  ],
];

export const CrossedPanels = {
  id: "#dve_crossed_panels",

  build() {
    let topANIM = 0;
    let bottomANIM = 0;
    if (ShapeTool.data.voxel.getSubstanceStringId() == "#dve_flora") {
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
    const { x, y, z } = ShapeTool.data.voxel;
    const voxelPOS = WorldSpaces.voxel.getPositionXYZ(x, y, z);
    for (const data of Quads) {
      VoxelGeometry.addQuad(ShapeTool.data, voxelPOS, true, data[0], data[1]);
    }

    /*   ShapeTool.builder.quad.setDimensions(1, 1);

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
   .clearTransform(); */
  },
};
