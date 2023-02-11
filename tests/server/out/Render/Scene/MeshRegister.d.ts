/// <reference types="babylonjs" />
import type { MeshRegisterChunk, MeshRegisterDimensions, MushRegisterRegion, MeshRegisterColumn } from "Meta/Render/Scene/MeshRegister.types.js";
import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
import { VoxelTemplateSubstanceType } from "Meta/index.js";
export declare const MeshRegister: {
    _dimensions: MeshRegisterDimensions;
    $INIT(): void;
    dimensions: {
        add(id: string): Map<any, any>;
        get(id: string): Map<string, MushRegisterRegion> | undefined;
        remove(id: string): boolean;
    };
    region: {
        add(location: LocationData): MushRegisterRegion;
        remove(location: LocationData): boolean;
        _getRegionData(): MushRegisterRegion;
        get(location: LocationData): false | MushRegisterRegion;
    };
    column: {
        add(location: LocationData): MeshRegisterColumn;
        remove(location: LocationData): false | MeshRegisterColumn;
        _getColumnData(location: LocationData): MeshRegisterColumn;
        get(location: LocationData): false | MeshRegisterColumn | undefined;
    };
    chunk: {
        add(location: LocationData, mesh: BABYLON.Mesh, substance: VoxelTemplateSubstanceType): Map<string, MeshRegisterChunk>;
        _getChunkData(mesh: BABYLON.Mesh): MeshRegisterChunk;
        remove(location: LocationData, substance: VoxelTemplateSubstanceType): false | BABYLON.Mesh;
        get(location: LocationData, substance: VoxelTemplateSubstanceType): false | MeshRegisterChunk;
    };
};
