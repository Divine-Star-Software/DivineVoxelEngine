//types
import { TextureRotations } from "../../../Types/Geometry.types.js";
import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { ShapeTool } from "../../ShapeTool.js";
import { QuadScalarVertexData } from "@divinevoxel/core/Meshing/";

import { DirectionNames } from "@divinevoxel/core/Types/Util.types.js";
import { BoxVoxelShape } from "../Box/Box.voxel.shape.js";
import { VoxelFaces } from "@divinevoxel/core/Math/index.js";
import { VoxelShapeBase } from "../../VoxelShapeBase.js";
import { Quad } from "@divinevoxel/core/Meshing/Classes/Quad.js";
import { QuadUVData } from "@divinevoxel/core/Meshing/Geometry.types.js";
import { VoxelGeometry } from "../../../Geometry/VoxelGeometry.js";
//objects
const addData = (face: DirectionNames) => {
  return ShapeTool.builder.quad
    .setDirection(face)
    .setFlipped(ShapeTool.data.isFaceFlipped())
    .light.add(ShapeTool.data.getWorldLight())
    .textures.add(ShapeTool.data.getTexture())
    .overlayTexture.add(ShapeTool.data.getOverlayTextures())
    .animationState.add(flowAnimationState);
};

const flowAnimationState = new QuadScalarVertexData();
const vertexValue = new QuadScalarVertexData();
const vertexLevel = new QuadScalarVertexData();

let topFaceExposed = false;
let level = 0;

const uvs: QuadUVData = [
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 1],
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

class LiquidVoxelShapeClass extends VoxelShapeBase {
  id = "#dve_liquid";
  init() {
    OverrideManager.CullFace.register(
      this.numberId,
      OverrideManager.ANY,
      (data) => {
        if (
          data.face == VoxelFaces.Top &&
          data.neighborVoxel.getSubstnaceData().isLiquid() &&
          data.currentVoxel.getStringId() != data.neighborVoxel.getStringId()
        ) {
          return true;
        }
        return data.default;
      }
    );
  }
  start() {
    topFaceExposed = false;
    ShapeTool.builder.quad.setDimensions(1, 1).textures.setRoation(0);
    flowAnimationState.setAll(0);
    vertexLevel.setAll(15);
    vertexValue.setAll(0);
    level = ShapeTool.data.voxel.getLevel();
  }
  add = {
    top() {
      topFaceExposed = true;
      const level = ShapeTool.data.voxel.getLevel();

      ShapeTool.data.calculateFlow();
      vertexLevel.setFromQuadData(ShapeTool.data.getWorldLevel());

      vertexValue.set(
        vertexLevel.vertices[1] / 15 - 1,
        vertexLevel.vertices[2] / 15 - 1,
        vertexLevel.vertices[3] / 15 - 1,
        vertexLevel.vertices[4] / 15 - 1
      );

      Quads.top.positions.vertices[1].y = vertexLevel.vertices[1] / 15 - 1;
      Quads.top.positions.vertices[2].y = vertexLevel.vertices[2] / 15 - 1;
      Quads.top.positions.vertices[3].y = vertexLevel.vertices[3] / 15 - 1;
      Quads.top.positions.vertices[4].y = vertexLevel.vertices[4] / 15 - 1;
      const uvAngle = getAngle();
      Quads.top.flip = ShapeTool.data.isFaceFlipped();
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.top);
    },

    bottom() {
      flowAnimationState.setAll(0);
      BoxVoxelShape.add.bottom();
    },

    north() {
      flowAnimationState.setAll(1);
      Quads.north.flip = ShapeTool.data.isFaceFlipped();
      if (topFaceExposed) {
        Quads.north.positions.vertices[1].y = 1 + vertexValue.vertices[1];
        Quads.north.positions.vertices[2].y = 1 + vertexValue.vertices[2];
        Quads.north.uvs.vertices[1].y = Math.abs(vertexValue.vertices[1]);
        Quads.north.uvs.vertices[2].y = Math.abs(vertexValue.vertices[2]);
      } else {
        Quads.north.positions.vertices[1].y = 1;
        Quads.north.positions.vertices[2].y = 1;
        Quads.north.setUVs(uvs);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.north);
    },

    south() {
      flowAnimationState.setAll(1);
      Quads.south.flip = ShapeTool.data.isFaceFlipped();
      if (topFaceExposed) {
        Quads.south.positions.vertices[1].y = 1 + vertexValue.vertices[3];
        Quads.south.positions.vertices[2].y = 1 + vertexValue.vertices[4];
        Quads.south.uvs.vertices[1].y = Math.abs(vertexValue.vertices[3]);
        Quads.south.uvs.vertices[2].y = Math.abs(vertexValue.vertices[4]);
      } else {
        Quads.south.positions.vertices[1].y = 1;
        Quads.south.positions.vertices[2].y = 1;
        Quads.south.setUVs(uvs);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.south);
    },

    east() {
      flowAnimationState.setAll(1);
      Quads.east.flip = ShapeTool.data.isFaceFlipped();
      if (topFaceExposed) {
        Quads.east.positions.vertices[1].y = 1 + vertexValue.vertices[2];
        Quads.east.positions.vertices[2].y = 1 + vertexValue.vertices[3];
        Quads.east.uvs.vertices[1].y = Math.abs(vertexValue.vertices[2]);
        Quads.east.uvs.vertices[2].y = Math.abs(vertexValue.vertices[3]);
      } else {
        Quads.east.positions.vertices[1].y = 1;
        Quads.east.positions.vertices[2].y = 1;
        Quads.east.setUVs(uvs);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.east);
    },

    west() {
      flowAnimationState.setAll(1);
      Quads.east.flip = ShapeTool.data.isFaceFlipped();
      if (topFaceExposed) {
        Quads.east.positions.vertices[1].y = 1 + vertexValue.vertices[1];
        Quads.east.positions.vertices[2].y = 1 + vertexValue.vertices[4];
        Quads.east.uvs.vertices[1].y = Math.abs(vertexValue.vertices[1]);
        Quads.east.uvs.vertices[2].y = Math.abs(vertexValue.vertices[4]);
      } else {
        Quads.east.positions.vertices[1].y = 1;
        Quads.east.positions.vertices[2].y = 1;
        Quads.east.setUVs(uvs);
      }
      VoxelGeometry.addQuad(ShapeTool.data, ShapeTool.origin, Quads.east);
    },
  };
  addO = {
    top() {
      topFaceExposed = true;
      const level = ShapeTool.data.voxel.getLevel();
      if (level == 15) {
        BoxVoxelShape.add.top();
      } else {
        ShapeTool.data.calculateFlow();
        vertexLevel.setFromQuadData(ShapeTool.data.getWorldLevel());

        vertexValue.set(
          vertexLevel.vertices[1] / 15 - 1,
          vertexLevel.vertices[2] / 15 - 1,
          vertexLevel.vertices[3] / 15 - 1,
          vertexLevel.vertices[4] / 15 - 1
        );

        ShapeTool.builder.quad
          .setTransform(1, 0, vertexValue.vertices[1], 0)
          .setTransform(2, 0, vertexValue.vertices[2], 0)
          .setTransform(3, 0, vertexValue.vertices[3], 0)
          .setTransform(4, 0, vertexValue.vertices[4], 0)
          .textures.setRoation(getAngle());
        addData("top")
          .updatePosition(0.5, 1, 0.5)
          .create()
          .clearTransform()
          .textures.clear();
      }
    },

    bottom() {
      if (level == 15) {
        BoxVoxelShape.add.bottom();
      } else {
        flowAnimationState.setAll(0);
        addData("bottom")
          .updatePosition(0.5, 0, 0.5)
          .create()
          .clearTransform()
          .textures.clear();
      }
    },

    north() {
      if (level == 15) {
        BoxVoxelShape.add.north();
      } else {
        flowAnimationState.setAll(1);
        ShapeTool.builder.quad
          .setDirection("north")
          .updatePosition(0.5, 0.5, 1)
          .setTransform(1, 0, vertexValue.vertices[3], 0)
          .setTransform(2, 0, vertexValue.vertices[2], 0)
          .light.add(ShapeTool.data.getWorldLight())
          .overlayTexture.add(ShapeTool.data.getOverlayTextures())
          .animationState.add(flowAnimationState);
        if (topFaceExposed) {
          ShapeTool.builder.quad.textures.advancedUVs.hs1 = Math.abs(
            vertexValue.vertices[3]
          );
          ShapeTool.builder.quad.textures.advancedUVs.hs2 = Math.abs(
            vertexValue.vertices[2]
          );
          ShapeTool.builder.quad.textures.addAdvancedUVs(
            ShapeTool.data.getTexture()
          );
        } else {
          ShapeTool.builder.quad.textures.add(ShapeTool.data.getTexture());
        }
        ShapeTool.builder.quad.create().clearTransform().textures.clear();
      }
    },

    south() {
      if (level == 15) {
        BoxVoxelShape.add.south();
      } else {
        flowAnimationState.setAll(1);
        ShapeTool.builder.quad
          .setDirection("south")
          .updatePosition(0.5, 0.5, 0)
          .setTransform(1, 0, vertexValue.vertices[1], 0)
          .setTransform(2, 0, vertexValue.vertices[4], 0)
          .light.add(ShapeTool.data.getWorldLight())
          .overlayTexture.add(ShapeTool.data.getOverlayTextures())
          .animationState.add(flowAnimationState);
        if (topFaceExposed) {
          ShapeTool.builder.quad.textures.advancedUVs.hs1 = Math.abs(
            vertexValue.vertices[1]
          );
          ShapeTool.builder.quad.textures.advancedUVs.hs2 = Math.abs(
            vertexValue.vertices[4]
          );
          ShapeTool.builder.quad.textures.addAdvancedUVs(
            ShapeTool.data.getTexture()
          );
        } else {
          ShapeTool.builder.quad.textures.add(ShapeTool.data.getTexture());
        }
        ShapeTool.builder.quad.create().clearTransform().textures.clear();
      }
    },

    east() {
      if (level == 15) {
        BoxVoxelShape.add.east();
      } else {
        flowAnimationState.setAll(1);
        ShapeTool.builder.quad
          .setDirection("east")
          .updatePosition(1, 0.5, 0.5)
          .setTransform(1, 0, vertexValue.vertices[4], 0)
          .setTransform(2, 0, vertexValue.vertices[3], 0)
          .light.add(ShapeTool.data.getWorldLight())
          .overlayTexture.add(ShapeTool.data.getOverlayTextures())
          .animationState.add(flowAnimationState);
        if (topFaceExposed) {
          ShapeTool.builder.quad.textures.advancedUVs.hs1 = Math.abs(
            vertexValue.vertices[4]
          );
          ShapeTool.builder.quad.textures.advancedUVs.hs2 = Math.abs(
            vertexValue.vertices[3]
          );
          ShapeTool.builder.quad.textures.addAdvancedUVs(
            ShapeTool.data.getTexture()
          );
        } else {
          ShapeTool.builder.quad.textures.add(ShapeTool.data.getTexture());
        }
        ShapeTool.builder.quad.create().clearTransform().textures.clear();
      }
    },

    west() {
      if (level == 15) {
        BoxVoxelShape.add.west();
      } else {
        flowAnimationState.setAll(1);
        ShapeTool.builder.quad
          .setDirection("west")
          .updatePosition(0, 0.5, 0.5)
          .setTransform(1, 0, vertexValue.vertices[2], 0)
          .setTransform(2, 0, vertexValue.vertices[1], 0)
          .light.add(ShapeTool.data.getWorldLight())
          .overlayTexture.add(ShapeTool.data.getOverlayTextures())
          .animationState.add(flowAnimationState);
        if (topFaceExposed) {
          ShapeTool.builder.quad.textures.advancedUVs.hs1 = Math.abs(
            vertexValue.vertices[2]
          );
          ShapeTool.builder.quad.textures.advancedUVs.hs2 = Math.abs(
            vertexValue.vertices[1]
          );
          ShapeTool.builder.quad.textures.addAdvancedUVs(
            ShapeTool.data.getTexture()
          );
        } else {
          ShapeTool.builder.quad.textures.add(ShapeTool.data.getTexture());
        }
        ShapeTool.builder.quad.create().clearTransform().textures.clear();
      }
    },
  };
}

export const LiquidVoxelShape = new LiquidVoxelShapeClass();

const getAngle = (): TextureRotations => {
  if (vertexLevel.isAllEqualTo(15)) {
    flowAnimationState.setAll(0);
    return 0;
  }
  const v1 = vertexLevel.vertices[1];
  const v2 = vertexLevel.vertices[2];
  const v3 = vertexLevel.vertices[3];
  const v4 = vertexLevel.vertices[4];

  if (v1 == v2 && v3 == v4 && v1 == v4 && v2 == v3) {
    flowAnimationState.setAll(0);
    return 0;
  }

  if (v2 == v3 && v1 == v4 && v2 > v1) {
    //flowing south
    flowAnimationState.setAll(1);
    return 0;
  }
  if (v2 == v3 && v1 == v4 && v2 < v1) {
    //flowing north
    flowAnimationState.setAll(2);
    return 0;
  }
  if (v2 == v1 && v3 == v4 && v1 > v4) {
    //flowing east
    flowAnimationState.setAll(2);
    return 90;
  }
  if (v3 == v4 && v2 == v1 && v4 > v1) {
    //flowing west
    flowAnimationState.setAll(1);
    return 90;
  }

  if (v2 < v4) {
    //flowing north west
    flowAnimationState.setAll(2);
    return 315;
  }
  if (v2 > v4) {
    //flowing south east
    flowAnimationState.setAll(1);
    return 315;
  }
  if (v1 > v3) {
    //flowing north east
    flowAnimationState.setAll(2);
    return 45;
  }
  if (v1 < v3) {
    //flowing south west
    flowAnimationState.setAll(1);
    return 45;
  }

  return 0;
};
