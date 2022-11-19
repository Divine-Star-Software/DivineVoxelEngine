import { QuadBuilder } from "./Quad/QuadBuilder.js";
import { QuadUVs } from "./Quad/QuadUVs.js";
export const GeometryBuilder = {
    data: {},
    quads: {
        builder: QuadBuilder,
        uvs: QuadUVs,
    },
    setData(data) {
        this.data = data;
    },
    clearData() {
        this.data = null;
    },
    createQuad(directon, dimensions, origion, flip = false, transforms) {
        QuadBuilder.create(directon, origion, dimensions, this.data, flip, transforms);
    },
};
