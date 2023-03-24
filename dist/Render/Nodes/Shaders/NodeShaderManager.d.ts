import { DivineShader } from "divine-shaders";
import { UtilMap } from "../../../Global/Util/UtilMap.js";
export declare const NodeShaderManager: {
    shaders: UtilMap<string, DivineShader>;
    create(shaders: DivineShader[]): void;
    get(id: string): DivineShader | undefined;
};
