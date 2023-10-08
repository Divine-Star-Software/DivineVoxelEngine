import { PixelEntityMath } from "../Maths/PixelEntityMath.js";
import { MeshBuilderTool } from "@divinevoxel/core/Constructor/Builder/Tools/MeshBuilderTool.js";
import { MesherDataTool } from "@divinevoxel/core/Constructor/Builder/Tools/MesherDataTools.js";

const mesher = new MeshBuilderTool();
const mesherData = new MesherDataTool();
mesherData.attributes.add([["cuv3", [[], 3, "32f"]]]);
mesher.setMesherTool(mesherData);
mesher.quad.uvs.attributeId = "cuv3";
export const PixelEntitiesConstructor = {
  _createBox([w, h, d]: [w: number, h: number, d: number]) {
    mesher.quad.setDimensions(w, h);
  

    mesher.quad.uvs
      .add(1)
      .setDirection("top")
      .updatePosition(w / 2, h, d / 2)
      .create()
      .uvs.add(1)
      .setDirection("bottom")
      .updatePosition(w / 2, 0, d / 2)
      .create()
      .uvs.add(1)
      .setDirection("north")
      .updatePosition(w / 2, h / 2, d)
      .create()
      .uvs.add(1)
      .setDirection("south")
      .updatePosition(w / 2, h / 2, 0)
      .create()
      .uvs.add(1)
      .setDirection("east")
      .updatePosition(w, h / 2, d / 2)
      .create()
      .uvs.add(1)
      .setDirection("west")
      .updatePosition(0, h / 2, d / 2)
      .create();
  },

  createPixelEntity() {
    const dim = PixelEntityMath.SCALE;
    this._createBox([dim, dim, dim]);
    const meshData = mesherData.getAllAttributes();
    mesher.quad.clear();
    mesherData.resetAll();
    return meshData;
  },
};
