import type { NodeMaterialData } from "../types/RenderNode.types";
import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { NodeMaterial } from "./NodeMaterial.js";
import { Vector4 } from "@babylonjs/core";
import type { RenderFogOptions } from "Meta/Render/Render/Render.options.types";
import { RecursivePartial } from "Meta";
export declare const NodeMaterialManager: {
    materials: UtilMap<string, NodeMaterial>;
    fogOptions: RenderFogOptions;
    fogData: Vector4;
    unifrosm: {
        lightGradient: number[];
    };
    init(): void;
    get(id: string): NodeMaterial | null;
    create(materials: NodeMaterialData[]): void;
    _updateFogData(data: Vector4): void;
    setSunLevel(level: number): void;
    setBaseLevel(level: number): void;
    setOption(id: string, value: boolean): void;
    updateFogOptions(options: RecursivePartial<RenderFogOptions>): void;
};
