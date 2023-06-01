import type { NodeSubstanceData } from "../types/RenderNode.types";
import { NodeSubstance } from "./NodeSubstance.js";
import { UtilMap } from "../../../Global/Util/UtilMap.js";
export declare const NodeSubstanceManager: {
    substances: UtilMap<string, NodeSubstance>;
    add(meshes: NodeSubstanceData[]): void;
    buldAll(): void;
    get(id: string): NodeSubstance | undefined;
};
