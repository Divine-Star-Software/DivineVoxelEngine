import { ItemConstructorObject } from "../../../../out/Meta/Items/Item.types";
import { DreamvineItemData } from "./DreamVine.item.data.js";

export const DreamVineItemConstructorObject: ItemConstructorObject = {
 data: DreamvineItemData,
 process(data, DVEB) {
  const uv = DVEB.textureManager.getTextureUV("Item", "dream-vine");
  data.uvs.push(uv);
 },
};
