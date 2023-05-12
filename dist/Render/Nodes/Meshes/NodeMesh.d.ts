import { BoundingInfo, Mesh, Scene, Engine } from "@babylonjs/core";
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
    scene: Scene;
    engine: Engine;
    constructor(data: NodeMeshData);
    createMesh(data: SetNodeMesh): Mesh;
    returnMesh(mesh: Mesh): void;
    updateVetexData(data: SetNodeMesh, mesh: Mesh): void;
    syncSettings(settings: EngineSettingsData): void;
    _clearCached(mesh: Mesh): void;
}
