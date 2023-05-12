import { DivineShaderBuilder } from "divine-shaders";
import { UtilMap } from "../../../Global/Util/UtilMap.js";
export const NodeShaderManager = {
    shaders: new UtilMap(),
    create(shaders) {
        for (const shader of shaders) {
            this.shaders.add([[shader.id, shader]]);
        }
    },
    get(id) {
        return this.shaders.get(id);
    },
    getBulder() {
        return DivineShaderBuilder;
    }
};
