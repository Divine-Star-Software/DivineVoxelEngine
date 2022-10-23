import { VoxelData } from "Meta/index.js";
export declare const VoxelDataCreator: {
    voxelBuffer: SharedArrayBuffer;
    voxelMapBuffer: SharedArrayBuffer;
    shapeMap: Record<string, number>;
    __shapeMapSet: boolean;
    isReady(): boolean;
    $createVoxelData(): void;
    setShapeMap(shapeMap: Record<string, number>): void;
    palette: {
        _count: number;
        _palette: Record<number, string>;
        _map: Record<string, number>;
        registerVoxel(voxel: VoxelData): void;
        getVoxelBaseId(id: number): number;
        getVoxelStateId(voxelId: string, voxelState: number): number;
        getVoxelStringId(voxelId: number): string;
        getVoxelState(voxelId: number): number;
        get(): Record<number, string>;
        getMap(): Record<string, number>;
    };
};
