import { ChunkData } from "Meta/Chunks/Chunk.types";
import { WorldRegion } from "Meta/World/WorldData/World.types.js";
/**# World Generation
 * ---
 * Helps with creating the needed data for chunks and world generation things.
 */
export declare const WorldGeneration: {
    worldBounds: {
        chunkXPow2: number;
        chunkYPow2: number;
        chunkZPow2: number;
        chunkXSize: number;
        chunkYSize: number;
        chunkZSize: number;
        chunkTotalVoxels: number;
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
        syncBoundsWithFlat3DArray(flat3dArray: {
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
            getValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
            delete(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../../Meta/Util.types.js").PositionMatrix;
        }): void;
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
    };
    voxelByte: {
        setId(id: number, value: number): number;
        getId(value: number): number;
        decodeLightFromVoxelData(voxelData: number): number;
        encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
    };
    chunkDataHelper: {
        lightByte: {
            getS(value: number): number;
            getR(value: number): number;
            getG(value: number): number;
            getB(value: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
            setLightValues(values: number[]): number;
            getLightValues(value: number): number[];
            isLessThanForRGBRemove(n1: number, n2: number): boolean;
            isLessThanForRGBAdd(n1: number, n2: number): boolean;
            isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
            getMinusOneForRGB(sl: number): number;
            removeRGBLight(sl: number): number;
            getFullSunLight(sl: number): number;
            isLessThanForSunAdd(n1: number, n2: number): boolean;
            isLessThanForSunAddDown(n1: number, n2: number): boolean;
            getSunLightForUnderVoxel(currentVoxel: number): number;
            getMinusOneForSun(sl: number): number;
            isLessThanForSunRemove(n1: number, sl: number): boolean;
            isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
            sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
            removeSunLight(sl: number): number;
        };
        _3dArray: {
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
            getValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
            delete(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../../Meta/Util.types.js").PositionMatrix;
        };
        fillWithAir(chunk: ChunkData): void;
        createHeightMap(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): void;
    };
    illumantionManager: {
        lightByte: {
            getS(value: number): number;
            getR(value: number): number;
            getG(value: number): number;
            getB(value: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
            setLightValues(values: number[]): number;
            getLightValues(value: number): number[];
            isLessThanForRGBRemove(n1: number, n2: number): boolean;
            isLessThanForRGBAdd(n1: number, n2: number): boolean;
            isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
            getMinusOneForRGB(sl: number): number;
            removeRGBLight(sl: number): number;
            getFullSunLight(sl: number): number;
            isLessThanForSunAdd(n1: number, n2: number): boolean;
            isLessThanForSunAddDown(n1: number, n2: number): boolean;
            getSunLightForUnderVoxel(currentVoxel: number): number;
            getMinusOneForSun(sl: number): number;
            isLessThanForSunRemove(n1: number, sl: number): boolean;
            isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
            sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
            removeSunLight(sl: number): number;
        };
        voxelByte: {
            setId(id: number, value: number): number;
            getId(value: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        };
        _3dArray: {
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
            getValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels, value: number): void;
            delete(x: number, y: number, z: number, array: import("Meta/Chunks/Chunk.types").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../../Meta/Util.types.js").PositionMatrix;
        };
        air: number[];
        runSunLightUpdateAt: typeof import("./Illumanation/Functions/SunLight.js").runSunLightUpdateAt;
        runSunLightUpdate: typeof import("./Illumanation/Functions/SunLight.js").runSunLightUpdate;
        runSunLightRemove: typeof import("./Illumanation/Functions/SunLight.js").runSunLightRemove;
        runSunLightRemoveAt: typeof import("./Illumanation/Functions/SunLight.js").runSunLightRemoveAt;
        runRGBFloodFillAt: typeof import("./Illumanation/Functions/RGBFloodLight.js").runRGBFloodFillAt;
        runRGBFloodFill: typeof import("./Illumanation/Functions/RGBFloodLight.js").runRGBFloodFill;
        runRGBFloodRemoveAt: typeof import("./Illumanation/Functions/RGBFloodLight.js").runRGBFloodRemoveAt;
        runRGBFloodRemove: typeof import("./Illumanation/Functions/RGBFloodLight.js").runRGBFloodRemove;
        _RGBlightUpdateQue: number[][];
        _RGBlightRemovalQue: number[][];
        _sunLightUpdateQue: number[][];
        _sunLightRemoveQue: number[][];
        addChunkToSunLightUpdate(chunk: ChunkData, chunkX: number, chunkY: number, chunkZ: number): void;
        populateChunkAirWithInitlSunLight(chunk: ChunkData): void;
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
