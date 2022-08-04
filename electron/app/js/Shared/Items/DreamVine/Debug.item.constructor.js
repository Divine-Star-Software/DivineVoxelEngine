import { DreamvineItemData } from "./Debug.item.data.js";
export const DreamVineItemConstructorObject = {
    data: DreamvineItemData,
    process(data, DVEB) {
        const uv = DVEB.textureManager.getTextureUV("Item", "dreamvine");
        data.uvs.push(uv);
    },
};
