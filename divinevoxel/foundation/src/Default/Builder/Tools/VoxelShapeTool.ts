import type { QuadVertexes } from "../Types/Geometry.types";

import { QuadBuilderTool, QuadUVTool } from "./MeshBuilderTool.js";
import { QuadScalarVertexData } from "@divinevoxel/core/Meshing/";
import { VoxelShaderDataTool } from "../../Tools/Shaders/VoxelShaderData.js";

const faceData = new VoxelShaderDataTool();
class VoxelQuadBulder extends QuadBuilderTool {
  constructor() {
    super();
    this.light._s = this;
    this.AO._s = this;
    this.overlayTexture._s = this;
    this.animationState._s = this;
  }

  _lightData = new QuadScalarVertexData();
  _AOData = new QuadScalarVertexData();
  _animationData = new QuadScalarVertexData();

  clear() {
    this._cachedPosition.x = 0;
    this._cachedPosition.y = 0;
    this._cachedPosition.z = 0;
    this._fliped = false;
    this._dimension.width = 1;
    this._dimension.height = 1;
    this.textures.clear();
    for (let i = 1; i < 5; i++) {
      this._transform[i as QuadVertexes].x = 0;
      this._transform[i as QuadVertexes].y = 0;
      this._transform[i as QuadVertexes].z = 0;
    }
    return this;
  }

  create() {
    this.builder.create(
      this.tool,
      this._direction,
      this._position,
      this._dimension,
      this._fliped,
      this._transform
    );
    const attribute = this.tool.getAttribute("voxelData");

    attribute.push(
      faceData
        .setLight(this._lightData.getVertex(1))
        .setAO(this._AOData.getVertex(1))
        .setAnimation(this._animationData.getVertex(1))
        .getValue(),
      faceData
        .setLight(this._lightData.getVertex(2))
        .setAO(this._AOData.getVertex(2))
        .setAnimation(this._animationData.getVertex(2))
        .getValue(),
      faceData
        .setLight(this._lightData.getVertex(3))
        .setAO(this._AOData.getVertex(3))
        .setAnimation(this._animationData.getVertex(3))
        .getValue(),
      faceData
        .setLight(this._lightData.getVertex(4))
        .setAO(this._AOData.getVertex(4))
        .setAnimation(this._animationData.getVertex(4))
        .getValue()
    );

    return this;
  }

  setFlipped(flipped: boolean) {
    this._fliped = flipped;

    this.textures.setFlipped(flipped);
    return this;
  }
  animationState = {
    _s: <VoxelQuadBulder>{},
    add(data: QuadScalarVertexData) {
      this._s._animationData.setFromQuadData(data);
      return this._s;
    },
  };
  light = {
    _s: <VoxelQuadBulder>{},
    add(data: QuadScalarVertexData) {
      this._s._lightData.setFromQuadData(data);
      return this._s;
    },
  };
  AO = {
    _s: <VoxelQuadBulder>{},
    add(data: QuadScalarVertexData) {
      this._s._AOData.setFromQuadData(data);
      return this._s;
    },
  };
  textures = new QuadUVTool(this, "cuv3");
  overlayTexture = {
    _s: <VoxelQuadBulder>{},
    add(data: QuadScalarVertexData) {
      let i = 4;
      const attribute = this._s.tool.getAttribute("ocuv3")!;
      while (i--) {
        attribute.push(
          data.vertices[1],
          data.vertices[2],
          data.vertices[3],
          data.vertices[4]
        );
      }
      return this._s;
    },
  };
}

export class VoxelShapeTool {
  quad = new VoxelQuadBulder();
}
