import { ChunkData } from "Meta/World/WorldData/Chunk.types";
import { WorldRegion } from "Meta/World/WorldData/World.types.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export declare const WorldGeneration: {
    worldBounds: {
        __maxChunkYSize: number;
        bounds: {
            MinZ: number;
            MaxZ: number;
            MinX: number;
            MaxX: number;
            MinY: number;
            MaxY: number;
        };
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
        __worldColumnPosition: {
            x: number;
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
        setWorldBounds(minX: number, maxX: number, minZ: number, maxZ: number, minY: number, maxY: number): void;
        isPositonOutsideOfBounds(x: number, y: number, z: number): boolean;
        isPositonInBounds(x: number, y: number, z: number): boolean;
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
        getChunkKey(chunkPOS: import("../../Meta/Util.types.js").Position3Matrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: import("../../Meta/Util.types.js").Position3Matrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../../Meta/Util.types.js").Position3Matrix): {
            x: number;
            y: number;
            z: number;
        };
        getRichPositionKey(x: number, y: number, z: number): string;
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getWorldColumnKeyFromObj(position: import("../../Meta/Util.types.js").Position3Matrix): string;
        getWorldColumnKey(x: number, z: number): string;
        getWorldColumnPosition(x: number, z: number): {
            x: number;
            z: number;
        };
    };
    voxelByte: {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        decodeLevelFromVoxelData(stateData: number): number;
        encodeLevelIntoVoxelData(stateData: number, level: number): number;
        decodeLevelStateFromVoxelData(stateData: number): number;
        encodeLevelStateIntoVoxelData(stateData: number, levelState: number): number;
        getShapeState(voxelData: number): number;
        setShapeState(voxelData: number, shapeState: number): number;
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
                z: number;
            };
            setBounds(x: number, y: number, z: number): void;
            getValue(x: number, y: number, z: number, array: Uint32Array): number;
            getValueUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("../../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("../../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("../../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../../Meta/Util.types.js").Position3Matrix;
        };
        positionByte: {
            _poisiton: {
                x: number;
                y: number;
                z: number;
            };
            _positionMasks: {
                x: number;
                z: number;
                y: number;
            };
            getY(byteData: number): number;
            getPosition(byteData: number): {
                x: number;
                y: number;
                z: number;
            };
            setPosition(x: number, y: number, z: number): number;
            setPositionUseObj(positionObj: import("../../Meta/Util.types.js").Position3Matrix): number;
        };
        _getHeightMapData: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
        _setHeightMapData: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
        _markSubstanceAsNotExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _markSubstanceAsExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
        _isSubstanceExposed: Record<import("../../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
        getStartingHeightMapValue(): number;
        updateChunkMinMax(voxelPOS: import("../../Meta/Util.types.js").Position3Matrix, minMax: Uint32Array): void;
        getChunkMin(minMax: Uint32Array): number;
        getChunkMax(minMax: Uint32Array): number;
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
        globalVoxelPalette: Record<number, string>;
        globalVoxelPaletteMap: Record<string, number>;
        globalVoxelPaletteRecord: Record<string, string[]>;
        getVoxelPaletteIdFromGlobalPalette(voxelId: string, voxelState: string): number;
        getVoxelDataFromGlobalPalette(voxelId: number): string[];
        registerVoxelForGlobalPalette(voxel: import("../../Meta/index.js").VoxelData): void;
        getGlobalVoxelPalette(): Record<number, string>;
        getGlobalVoxelPaletteMap(): Record<string, number>;
        getGlobalVoxelPaletteRecord(): Record<string, string[]>;
    };
    getBlankRegion(): WorldRegion;
    createChunkFromDataThread(data: any[]): ChunkData;
    getBlankChunk(empty?: boolean, proto?: boolean): ChunkData;
};
