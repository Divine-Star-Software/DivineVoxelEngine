import type { BoundingInfo, Mesh, Scene } from "babylonjs";
import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
import { ChunkMeshData } from "Meta/Tasks/RenderTasks.types";
import { DVEMaterial } from "../Materials/DVEMaterial.js";
export declare class DVEMesh {
    name: string;
    dveMat: DVEMaterial;
    meshes: Mesh[];
    pickable: boolean;
    checkCollisions: boolean;
    seralize: boolean;
    clearCachedGeometry: boolean;
    defaultBb: BoundingInfo;
    constructor(name: string, dveMat: DVEMaterial);
    createTemplateMesh(scene: Scene): Mesh;
    syncSettings(settings: EngineSettingsData): void;
    _setEmptyData(mesh: Mesh): void;
    _clearCached(mesh: Mesh): void;
    removeMesh(mesh: Mesh): void;
    setMeshData(mesh: Mesh, location: LocationData, data: ChunkMeshData): Promise<Mesh>;
}
