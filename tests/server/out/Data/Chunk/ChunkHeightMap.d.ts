import { VoxelSubstanceType } from "Meta/index";
export declare const ChunkHeightMap: {
    update: {
        add(dimensionId: string | number, substance: VoxelSubstanceType, x: number, y: number, z: number): void;
        remove(dimensionId: string | number, substance: VoxelSubstanceType, x: number, y: number, z: number): void;
    };
};
