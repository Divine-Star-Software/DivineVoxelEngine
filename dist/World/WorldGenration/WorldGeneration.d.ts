import { ChunkData } from "Meta/Chunks/Chunk.types";
import { WorldRegion } from "Meta/World/WorldData/World.types.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export declare const WorldGeneration: {
    worldBounds: {
        __maxChunkYSize: number;
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
        chunkArea: number;
        regionXPow2: number;
        regionYPow2: number;
        regionZPow2: number;
        regionXSize: number;
        regionYSize: number;
        regionZSize: number;
        __regionPosition: {
            x: number;
            y: number;
            z: number;
        };
        __chunkPosition: {
            x: number;
            y: number;
            z: number;
        };
        __voxelPosition: {
            x: number;
            y: number;
            z: number;
        };
        syncBoundsWithArrays(): void;
        setChunkBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        setRegionBounds(pow2X: number, pow2Y: number, pow2Z: number): void;
        getRegionPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getChunkKey(chunkPOS: import("../../Meta/Util.types.js").PositionMatrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: import("../../Meta/Util.types.js").PositionMatrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../../Meta/Util.types.js").PositionMatrix): {
            x: number;
            y: number;
            z: number;
        };
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getWorldColumnKeyFromObj(position: import("../../Meta/Util.types.js").PositionMatrix): string;
        getWorldColumnKey(x: number, z: number): string;
    };
    voxelByte: {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
    };
    heightByte: {
        heightMapArray: {
            bounds: {
                x: number;
                y: number;
                z: number;
            };
            _position: {
                x: number;
                y: number;
                /**# World Generation
                 * ---
                 * Helps with creating the needed data for chunks and world generation things.
                 */
                z: number;
            };
            setBounds(x: number, y: number, z: number): void;
            getValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
            getValueUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
            setValueUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
            deleteUseObj(position: import("../../Meta/Util.types.js").PositionMatrix, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../../Meta/Util.types.js").PositionMatrix;
        };
        positionByte: {
            _poisiton: {
                x: number;
                y: number;
                z: number;
            };
            getY(byteData: number): number;
            getPosition(byteData: number): {
                x: number;
                y: number;
                z: number;
            };
            setPosition(x: number, y: number, z: number): number;
            setPositionUseObj(positionObj: import("../../Meta/Util.types.js").PositionMatrix): number;
        };
        _getHeightMapData: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
        _setHeightMapData: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
        _markSubstanceAsNotExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _markSubstanceAsExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _isSubstanceExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
        getStartingHeightMapValue(): number;
        updateChunkMinMax(voxelPOS: import("../../Meta/Util.types.js").PositionMatrix, minMax: Uint32Array): void;
        calculateHeightRemoveDataForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
        calculateHeightAddDataForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
        getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
        isSubstanceExposed(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
        markSubstanceAsExposed(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        markSubstanceAsNotExposed(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        setMinYForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getMinYForSubstance(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
        setMaxYForSubstance(height: number, substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
        getMaxYForSubstance(substance: import("../../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
    };
    voxelPalette: {
        globalVoxelPaletteIndex: number;
        perRegionVoxelRecord: Record<string, string[]>;
        globalVoxelPalette: Record<number, string>;
        globalVoxelPaletteMap: Record<string, number>;
        globalVoxelPaletteRecord: Record<string, string[]>;
        getVoxelPaletteIdFromGlobalPalette(voxelTrueId: string, voxelStateId: string): number;
        getVoxelDataFromGlobalPalette(voxelId: number): string[];
        registerVoxelForGlobalPalette(voxel: import("../../Meta/index.js").VoxelData): void;
        registerVoxelForPerRegionVoxelPalette(voxel: import("../../Meta/index.js").VoxelData): void;
        getGlobalVoxelPalette(): Record<number, string>;
        getGlobalVoxelPaletteRecord(): Record<string, string[]>;
        getVoxelDataFromRegion(region: WorldRegion, voxelId: number): false | string[];
        getVoxelPaletteIdFromRegion(region: WorldRegion, voxelId: string, voxelState: string): number | false;
        addToRegionsVoxelPalette(region: WorldRegion, voxelId: string, voxelState: string): number;
    };
    paintVoxel(voxelPalletId: number): number;
    getBlankRegion(palette?: boolean): WorldRegion;
    getBlankChunk(empty?: boolean, proto?: boolean): ChunkData;
};
