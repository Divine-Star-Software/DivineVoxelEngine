import type { NodeMaterialData } from "../types/RenderNode.types";
import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { NodeMaterial } from "./NodeMaterial.js";
import { Vector4 } from "@babylonjs/core";
export declare const NodeMaterialManager: {
    materials: UtilMap<string, NodeMaterial>;
    get(id: string): NodeMaterial | null;
    create(materials: NodeMaterialData[]): void;
    updateFogOptions(data: Vector4): void;
    setSunLevel(level: number): void;
    setBaseLevel(level: number): void;
};
