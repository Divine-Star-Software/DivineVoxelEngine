import { RemoteTagManager } from "../../Libs/DivineBinaryTags/RemoteTagManager.js";
declare class VDTags extends RemoteTagManager {
    id: string;
    voxelIndex: Uint16Array;
    constructor(id: string);
    sync(voxelMap: Uint16Array): void;
    setVoxel(id: number): void;
}
export declare const VoxelTags: VDTags;
export {};
