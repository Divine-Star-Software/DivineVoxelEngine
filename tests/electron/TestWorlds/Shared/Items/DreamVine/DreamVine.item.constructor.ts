import { ItemConstructorObject } from "../../../../out/Meta/Data/Items/Item.types";

let uv = 0;
export const DreamVineItemConstructorObject: ItemConstructorObject  = {
 id: "dve_dreamvine-item",
 shapeId: "vine",
 hooks: {
  texturesRegistered: (DVEB) => {
   uv = DVEB.textureManager.getTextureUV("Item", "dream-vine");
  },
 },
 process(data, DVEB) {
  data.uvs.push(uv);
 },
};
