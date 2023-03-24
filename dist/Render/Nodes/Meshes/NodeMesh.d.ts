import { BoundingInfo, Mesh } from "@babylonjs/core";
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
import { SetNodeMesh } from "Meta/Tasks/RenderTasks.types";
import type { NodeMeshData } from "../types/RenderNode.types.js";
export declare class NodeMesh {
    data: NodeMeshData;
    meshes: Mesh[];
    pickable: boolean;
    checkCollisions: boolean;
    seralize: boolean;
    clearCachedGeometry: boolean;
    defaultBb: BoundingInfo;
    constructor(data: NodeMeshData);
    createMesh(data: SetNodeMesh): false | Mesh;
    syncSettings(settings: EngineSettingsData): void;
    _clearCached(mesh: Mesh): void;
}
