import { DebugItemData } from "./Debug.item.data.js";
export const DebugItemConstructorObject = {
    data: DebugItemData,
    process(data, DVEB) {
        const uv = DVEB.textureManager.getTextureUV("Item", "debug");
        data.uvs.push(uv);
    },
};
