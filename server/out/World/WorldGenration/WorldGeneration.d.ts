import { ChunkData } from "Meta/World/WorldData/Chunk.types";
import { WorldRegion } from "Meta/World/WorldData/World.types.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export declare const WorldGeneration: {
    heightByte: {
        _getHeightMapData: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
        _setHeightMapData: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
        _markSubstanceAsNotExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _markSubstanceAsExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _isSubstanceExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
        getStartingHeightMapValue(): number;
        initalizeChunk(chunkData: DataView): void;
        updateChunkMinMax(voxelPOS: import("../../Meta/Util.types.js").Position3Matrix, chunkData: DataView): void;
        getChunkMin(chunkData: DataView): number;
        getChunkMax(chunkData: DataView): number;
        calculateHeightRemoveDataForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
        calculateHeightAddDataForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
        getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
        isSubstanceExposed(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
        markSubstanceAsExposed(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        markSubstanceAsNotExposed(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        setMinYForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        getMinYForSubstance(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
        setMaxYForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
        getMaxYForSubstance(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
    };
    chunkReader: {
        chunkByteSize: number;
        indexSizes: {
            header: number;
            states: number;
            position: number;
            minMax: number;
            heightMap: number;
            voxelData: number;
            voxelStateData: number;
        };
        indexes: {
            header: number;
            states: number;
            position: number;
            minMax: number;
            heightMap: number;
            voxelData: number;
            voxelStateData: number;
        };
        byteLengths: {
            heightMapData: number;
            voxelData: number;
            voxelStateData: number;
        };
        syncSettings(): void;
        _getVoxelDataIndex(x: number, y: number, z: number): number;
        _getVoxelStateDataIndex(x: number, y: number, z: number): number;
        _chunkPositon: {
            x: number;
            y: number;
            z: number;
        };
        getChunkPosition(chunk: DataView): {
            x: number;
            y: number;
            z: number;
        };
        setChunkPosition(chunk: DataView, position: import("../../Meta/Util.types.js").Position3Matrix): void;
        getVoxelChunkDataIndex(x: number, y: number, z: number, secondary?: boolean): number;
        hmBounds: {
            x: number;
            y: number;
            z: number;
        };
        _getHeightMapIndex(x: number, y: number, z: number): number;
        getHeightMapIndex(x: number, y: number, z: number): number;
        getVoxelData(chunkData: DataView, x: number, y: number, z: number, secondary?: boolean): number;
        setVoxelData(chunkData: DataView, x: number, y: number, z: number, data: number, secondary?: boolean): void;
        getVoxelDataUseObj(chunkData: DataView, position: import("../../Meta/Util.types.js").Position3Matrix, secondary?: boolean): number;
        setVoxelDataUseObj(chunkData: DataView, position: import("../../Meta/Util.types.js").Position3Matrix, data: number, secondary?: boolean): void;
        getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
        setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
        getChunkMinData(chunkData: DataView): number;
        setChunkMinData(chunkData: DataView, data: number): void;
        getChunkMaxData(chunkData: DataView): number;
        setChunkMaxData(chunkData: DataView, data: number): void;
    };
    voxelPalette: {
        voxelPaletteCount: number;
        voxelPalette: Record<number, string>;
        voxelPaletteMap: Record<string, number>;
        getVoxelPaletteId(voxelId: string, voxelState: number): number;
        getVoxelTrueId(voxelId: number): string;
        registerVoxel(voxel: import("../../Meta/index.js").VoxelData): void;
        getVoxelPartentId(id: number): number;
        getVoxelState(voxelId: number): number;
        getVoxelPalette(): Record<number, string>;
        getVoxelPaletteMap(): Record<string, number>;
    };
    getBlankRegion(): WorldRegion;
    createChunkFromDataThread(data: any[]): ChunkData;
    getBlankChunk(empty?: boolean, proto?: boolean): ChunkData;
};
