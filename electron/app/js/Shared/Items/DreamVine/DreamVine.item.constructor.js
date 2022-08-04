import { DreamvineItemData } from "./DreamVine.item.data.js";
export const DreamVineItemConstructorObject = {
    data: DreamvineItemData,
    process(data, DVEB) {
        const uv = DVEB.textureManager.getTextureUV("Item", "dream-vine");
        data.uvs.push(uv);
    },
};
