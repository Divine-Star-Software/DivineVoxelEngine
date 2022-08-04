import { ItemConstructorObject } from "../../../../out/Meta/Items/Item.types";
import { DebugItemData } from "./Debug.item.data.js";

export const DebugItemConstructorObject: ItemConstructorObject = {
 data: DebugItemData,
 process(data, DVEB) {
  const uv = DVEB.textureManager.getTextureUV("Item", "debug");
  data.uvs.push(uv);
 },
};
