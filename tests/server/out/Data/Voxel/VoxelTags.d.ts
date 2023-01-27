import { RemoteTagManager } from "../../Libs/DivineBinaryTags/RemoteTagManager.js";
declare class VDTags extends RemoteTagManager {
    id: string;
    voxelMap: Uint16Array;
    substanceRecord: Record<number, import("../../Meta/index.js").VoxelSubstanceType>;
    materialMap: Record<number, string>;
    colliderMap: Record<number, string>;
    constructor(id: string);
    sync(voxelMap: Uint16Array): void;
    setVoxel(id: number): void;
    getTrueSubstance(id: number): import("../../Meta/index.js").VoxelSubstanceType;
    getMaterial(id: number): string;
    getCollider(id: number): string;
}
export declare const VoxelTags: VDTags;
export {};
