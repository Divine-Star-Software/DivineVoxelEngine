import { RemoteTagManager } from "../../Libs/DivineBinaryTags/RemoteTagManager.js";
import { VoxelSubstanceType } from "Meta/index.js";
declare class VDTags extends RemoteTagManager {
    id: string;
    voxelMap: Uint16Array;
    substanceRecord: Record<number, VoxelSubstanceType>;
    materialMap: Record<number, string>;
    colliderMap: Record<number, string>;
    voxelData: {
        substance: VoxelSubstanceType;
        shapeId: number;
        hardness: number;
        material: string;
        checkCollision: number;
        colliderId: string;
        lightSource: number;
        lightValue: number;
        isRich: number;
    };
    constructor(id: string);
    sync(voxelMap: Uint16Array): void;
    setVoxel(id: number): void;
    getVoxelData(id: number): {
        substance: VoxelSubstanceType;
        shapeId: number;
        hardness: number;
        material: string;
        checkCollision: number;
        colliderId: string;
        lightSource: number;
        lightValue: number;
        isRich: number;
    };
    getTrueSubstance(id: number): VoxelSubstanceType;
    getMaterial(id: number): string;
    getCollider(id: number): string;
}
export declare const VoxelTags: VDTags;
export {};
