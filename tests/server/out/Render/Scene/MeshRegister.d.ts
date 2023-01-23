/// <reference types="babylonjs" />
import type { MeshRegisterChunk, MeshRegisterDimensions, MushRegisterRegion, MeshRegisterColumn } from "Meta/Render/Scene/MeshRegister.types.js";
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
        add(dimensionId: string, x: number, y: number, z: number): MushRegisterRegion;
        remove(dimensionId: string, x: number, z: number, y?: number): boolean;
        _getRegionData(): MushRegisterRegion;
        get(dimensionId: string, x: number, y: number, z: number): false | MushRegisterRegion;
    };
    column: {
        add(dimensionId: string, x: number, z: number, y?: number): MeshRegisterColumn;
        remove(dimensionId: string, x: number, z: number, y?: number): false | MeshRegisterColumn;
        _getColumnData(position: [x: number, y: number, z: number]): MeshRegisterColumn;
        get(dimensionId: string, x: number, z: number, y?: number): false | MeshRegisterColumn | undefined;
    };
    chunk: {
        add(dimensionId: string, x: number, y: number, z: number, mesh: BABYLON.Mesh, substance: VoxelTemplateSubstanceType): Map<VoxelTemplateSubstanceType, MeshRegisterChunk>;
        _getChunkData(mesh: BABYLON.Mesh): MeshRegisterChunk;
        remove(dimensionId: string, x: number, y: number, z: number, substance: VoxelTemplateSubstanceType): false | BABYLON.Mesh;
        get(dimensionId: string, x: number, y: number, z: number, substance: VoxelTemplateSubstanceType): false | MeshRegisterChunk;
    };
};
