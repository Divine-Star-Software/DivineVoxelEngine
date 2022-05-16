import type { DVEWInitData } from "Meta/World/DVEW";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export declare const DVEW: {
    environment: "browser" | "node";
    _3dFlatArray: {
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
        getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
        setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
        delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
    };
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
        regionTotalChunks: number;
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
        syncBoundsWithFlat3DArray: (flat3dArray: {
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
            getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
        }) => void;
        setChunkBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
        setRegionBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
        getRegionPosition: (x: number, y: number, z: number) => {
            x: number;
            y: number;
            z: number;
        };
        getChunkPosition: (x: number, y: number, z: number) => {
            x: number;
            y: number;
            z: number;
        };
        getChunkKey: (chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => string;
        getChunkKeyFromPosition: (x: number, y: number, z: number) => string;
        getRegionKey: (regionPOS: import("../Meta/Util.types.js").PositionMatrix) => string;
        getRegionKeyFromPosition: (x: number, y: number, z: number) => string;
        getVoxelPosition: (x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => {
            x: number;
            y: number;
            z: number;
        };
    };
    __settingsHaveBeenSynced: boolean;
    __renderIsDone: boolean;
    engineSettings: {
        settings: EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        getSettingsCopy(): any;
    };
    UTIL: {
        calculateGameZone(positionZ: number, positionX: number): number[];
        getFlat3DArray(): {
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
            getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
        };
        getVoxelByte(): {
            setId(id: number, value: number): number;
            getId(value: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        };
        getLightByte(): {
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
        getWorldBounds(): {
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
            regionTotalChunks: number;
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
            syncBoundsWithFlat3DArray: (flat3dArray: {
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
                getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
                setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
            }) => void;
            setChunkBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
            setRegionBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
            getRegionPosition: (x: number, y: number, z: number) => {
                x: number;
                y: number;
                z: number;
            };
            getChunkPosition: (x: number, y: number, z: number) => {
                x: number;
                y: number;
                z: number;
            };
            getChunkKey: (chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => string;
            getChunkKeyFromPosition: (x: number, y: number, z: number) => string;
            getRegionKey: (regionPOS: import("../Meta/Util.types.js").PositionMatrix) => string;
            getRegionKeyFromPosition: (x: number, y: number, z: number) => string;
            getVoxelPosition: (x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => {
                x: number;
                y: number;
                z: number;
            };
        };
        getInfoByte(number?: number): {
            maxBit: number;
            minBit: number;
            maxDec: number;
            minDec: number;
            byteValue: number;
            getNumberValue(): number;
            setNumberValue(newValue: number): void;
            getBit(index: number): 0 | 1;
            getBitsArray(bitIndex: number, byteLength: number): (0 | 1)[];
            getHalfByteDec(bitIndex: number): number;
            setHalfByteBits(index: number, value: number): void;
            setBit(index: number, value: 0 | 1): void;
            toArray(): (0 | 1)[];
            toString(delimiter?: string): string;
        };
        degtoRad(degrees: number): number;
        radToDeg(radians: number): number;
    };
    builderCommManager: {
        count: number;
        numBuilders: number;
        builders: import("../Meta/Comms/InterComm.types.js").InterCommInterface[];
        ready: Record<string, boolean>;
        buildersConnected: number;
        addBuilder(port: import("../Meta/Comms/InterComm.types.js").InterCommPortTypes): void;
        syncChunkInAllBuilders(chunkX: number, chunkY: number, chunkZ: number): void;
        releaseChunkInAllBuilders(chunkX: number, chunkY: number, chunkZ: number): void;
        isReady(): boolean;
        requestFullChunkBeRemoved(chunkX: number, chunkY: number, chunkZ: number): void;
        requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number): void;
    };
    worldGeneration: {
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
            regionTotalChunks: number;
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
            syncBoundsWithFlat3DArray: (flat3dArray: {
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
                getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
                setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
            }) => void;
            setChunkBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
            setRegionBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
            getRegionPosition: (x: number, y: number, z: number) => {
                x: number;
                y: number;
                z: number;
            };
            getChunkPosition: (x: number, y: number, z: number) => {
                x: number;
                y: number;
                z: number;
            };
            getChunkKey: (chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => string;
            getChunkKeyFromPosition: (x: number, y: number, z: number) => string;
            getRegionKey: (regionPOS: import("../Meta/Util.types.js").PositionMatrix) => string;
            getRegionKeyFromPosition: (x: number, y: number, z: number) => string;
            getVoxelPosition: (x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => {
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
                getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
                setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
            };
            fillWithAir(chunk: import("../Meta/index.js").ChunkData): void;
            createHeightMap(chunk: import("../Meta/index.js").ChunkData, chunkX: number, chunkY: number, chunkZ: number): void;
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
                getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
                setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
            };
            air: number[];
            runSunLightUpdateAt: typeof import("./WorldGenration/Illumanation/Functions/SunLight.js").runSunLightUpdateAt;
            runSunLightUpdate: typeof import("./WorldGenration/Illumanation/Functions/SunLight.js").runSunLightUpdate;
            runSunLightRemove: typeof import("./WorldGenration/Illumanation/Functions/SunLight.js").runSunLightRemove;
            runSunLightRemoveAt: typeof import("./WorldGenration/Illumanation/Functions/SunLight.js").runSunLightRemoveAt;
            runRGBFloodFillAt: typeof import("./WorldGenration/Illumanation/Functions/RGBFloodLight.js").runRGBFloodFillAt;
            runRGBFloodFill: typeof import("./WorldGenration/Illumanation/Functions/RGBFloodLight.js").runRGBFloodFill;
            runRGBFloodRemoveAt: typeof import("./WorldGenration/Illumanation/Functions/RGBFloodLight.js").runRGBFloodRemoveAt;
            runRGBFloodRemove: typeof import("./WorldGenration/Illumanation/Functions/RGBFloodLight.js").runRGBFloodRemove;
            _RGBlightUpdateQue: number[][];
            _RGBlightRemovalQue: number[][];
            _sunLightUpdateQue: number[][];
            _sunLightRemoveQue: number[][];
            addChunkToSunLightUpdate(chunk: import("../Meta/index.js").ChunkData, chunkX: number, chunkY: number, chunkZ: number): void;
            populateChunkAirWithInitlSunLight(chunk: import("../Meta/index.js").ChunkData): void;
        };
        voxelPalette: {
            globalVoxelPaletteIndex: number;
            perRegionVoxelRecord: Record<string, string[]>;
            globalVoxelPalette: Record<number, string>;
            globalVoxelPaletteMap: Record<string, number>;
            globalVoxelPaletteRecord: Record<string, string[]>;
            getVoxelPaletteIdFromGlobalPalette(voxelTrueId: string, voxelStateId: string): number;
            getVoxelDataFromGlobalPalette(voxelId: number): string[];
            registerVoxelForGlobalPalette(voxel: import("../Meta/index.js").VoxelData): void;
            registerVoxelForPerRegionVoxelPalette(voxel: import("../Meta/index.js").VoxelData): void;
            getGlobalVoxelPalette(): Record<number, string>;
            getGlobalVoxelPaletteRecord(): Record<string, string[]>;
            getVoxelDataFromRegion(region: import("../Meta/World/WorldData/World.types.js").WorldRegion, voxelId: number): false | string[];
            getVoxelPaletteIdFromRegion(region: import("../Meta/World/WorldData/World.types.js").WorldRegion, voxelId: string, voxelState: string): number | false;
            addToRegionsVoxelPalette(region: import("../Meta/World/WorldData/World.types.js").WorldRegion, voxelId: string, voxelState: string): number;
        };
        paintVoxel(voxelPalletId: number): number;
        getBlankRegion(palette?: boolean): import("../Meta/World/WorldData/World.types.js").WorldRegion;
        getBlankChunk(empty?: boolean, proto?: boolean): import("../Meta/index.js").ChunkData;
    };
    renderComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        onReady: () => void;
        onRestart: () => void;
    };
    worldData: {
        regions: Record<string, import("../Meta/World/WorldData/World.types.js").WorldRegion>;
        chunks: Record<string, import("../Meta/index.js").ChunkData>;
        _RGBLightRemoveQue: number[][];
        _RGBLightUpdateQue: number[][];
        _chunkRebuildQue: number[][];
        _chunkRebuildQueMap: Record<string, Record<import("../Meta/index.js").VoxelSubstanceType | "all", boolean>>;
        infoByte: {
            maxBit: number;
            minBit: number;
            maxDec: number;
            minDec: number;
            byteValue: number;
            getNumberValue(): number;
            setNumberValue(newValue: number): void;
            getBit(index: number): 0 | 1;
            getBitsArray(bitIndex: number, byteLength: number): (0 | 1)[];
            getHalfByteDec(bitIndex: number): number;
            setHalfByteBits(index: number, value: number): void;
            setBit(index: number, value: 0 | 1): void;
            toArray(): (0 | 1)[];
            toString(delimiter?: string): string;
        };
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
            getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
        };
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
            regionTotalChunks: number;
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
            syncBoundsWithFlat3DArray: (flat3dArray: {
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
                getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
                setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
            }) => void;
            setChunkBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
            setRegionBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
            getRegionPosition: (x: number, y: number, z: number) => {
                x: number;
                y: number;
                z: number;
            };
            getChunkPosition: (x: number, y: number, z: number) => {
                x: number;
                y: number;
                z: number;
            };
            getChunkKey: (chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => string;
            getChunkKeyFromPosition: (x: number, y: number, z: number) => string;
            getRegionKey: (regionPOS: import("../Meta/Util.types.js").PositionMatrix) => string;
            getRegionKeyFromPosition: (x: number, y: number, z: number) => string;
            getVoxelPosition: (x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => {
                x: number;
                y: number;
                z: number;
            };
        };
        getRGBLightUpdateQue(): number[][];
        clearRGBLightUpdateQue(): void;
        getRGBLightRemoveQue(): number[][];
        clearRGBLightRemoveQue(): void;
        getChunkRebuildQue(): number[][];
        getSubstanceNeededToRebuild(chunkX: number, chunkY: number, chunkZ: number): Record<import("../Meta/index.js").VoxelSubstanceType | "all", boolean>;
        clearChunkRebuildQue(): void;
        runRebuildChekc(x: number, y: number, z: number): void;
        addToRebuildQue(x: number, y: number, z: number, substance: import("../Meta/index.js").VoxelSubstanceType | "all"): void;
        getCurrentWorldDataSize(): number;
        getCurrentWorldDataString(): string;
        setAir(x: number, y: number, z: number, lightValue: number): void;
        setLight(x: number, y: number, z: number, lightValue: number): void;
        getLight(x: number, y: number, z: number): number;
        removeData(x: number, y: number, z: number): false | undefined;
        getData(x: number, y: number, z: number): number;
        setData(x: number, y: number, z: number, data: number): void | -1;
        getVoxel(x: number, y: number, z: number): false | [number | import("../Meta/index.js").VoxelData, string | number, number];
        addRegion(x: number, y: number, z: number): import("../Meta/World/WorldData/World.types.js").WorldRegion;
        getRegion(x: number, y: number, z: number): false | import("../Meta/World/WorldData/World.types.js").WorldRegion;
        addChunk(x: number, y: number, z: number): import("../Meta/index.js").ChunkData;
        paintVoxel(voxelId: string, voxelStateId: string, x: number, y: number, z: number): void;
        insertData(x: number, y: number, z: number, data: number): void;
        getChunk(x: number, y: number, z: number): false | import("../Meta/index.js").ChunkData;
        removeChunk(x: number, y: number, z: number): false | undefined;
        setChunk(x: number, y: number, z: number, chunk: import("../Meta/index.js").ChunkData, doNotSyncInBuilderThread?: boolean): void;
        requestVoxelAdd(voxelId: string, voxelStateId: string, x: number, y: number, z: number): void;
        requestVoxelBeRemoved(x: number, y: number, z: number): void;
    };
    matrix: {
        updateDieTime: number;
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
            regionTotalChunks: number;
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
            syncBoundsWithFlat3DArray: (flat3dArray: {
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
                getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
                setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                delete(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
            }) => void;
            setChunkBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
            setRegionBounds: (pow2X: number, pow2Y: number, pow2Z: number) => void;
            getRegionPosition: (x: number, y: number, z: number) => {
                x: number;
                y: number;
                z: number;
            };
            getChunkPosition: (x: number, y: number, z: number) => {
                x: number;
                y: number;
                z: number;
            };
            getChunkKey: (chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => string;
            getChunkKeyFromPosition: (x: number, y: number, z: number) => string;
            getRegionKey: (regionPOS: import("../Meta/Util.types.js").PositionMatrix) => string;
            getRegionKeyFromPosition: (x: number, y: number, z: number) => string;
            getVoxelPosition: (x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix) => {
                x: number;
                y: number;
                z: number;
            };
        };
        loadedChunks: Record<string, SharedArrayBuffer>;
        loadedRegions: Record<string, Record<string, boolean>>;
        chunkStatesSAB: Record<string, SharedArrayBuffer>;
        chunkStates: Record<string, Uint8Array>;
        isChunkInMatrix(x: number, y: number, z: number): boolean;
        isChunkLocked(x: number, y: number, z: number): boolean;
        lockChunk(x: number, y: number, z: number): boolean;
        unLockChunk(x: number, y: number, z: number): boolean;
        updateChunkData(x: number, y: number, z: number, run: (chunk: import("../Meta/index.js").ChunkData) => {}): false | Promise<boolean>;
        releaseChunk(x: number, y: number, z: number): boolean | undefined;
        createChunkSAB(x: number, y: number, z: number): false | SharedArrayBuffer[];
    };
    matrixCentralHub: {
        threads: Record<string, import("../Meta/Comms/InterComm.types.js").InterCommPortTypes>;
        _threadMessageFunctions: Record<string, (data: any, event: MessageEvent<any>) => void>;
        registerThread(threadId: string, thread: import("../Meta/Comms/InterComm.types.js").InterCommPortTypes): void;
        syncChunk(chunkX: number, chunkY: number, chunkZ: number): false | undefined;
        syncChunkInThread(threadId: string, chunkX: number, chunkY: number, chunkZ: number): false | undefined;
        releaseChunk(chunkX: number, chunkY: number, chunkZ: number): void;
        releaseChunkInThread(threadId: string, chunkX: number, chunkY: number, chunkZ: number): void;
        syncGlobalVoxelPalette(): void;
        syncGlobalVoxelPaletteInThread(threadId: string): void;
        syncRegionVoxelPalette(regionX: number, regionY: number, regionZ: number): false | undefined;
        syncRegionVoxelPaletteInThread(threadId: string, regionX: number, regionY: number, regionZ: number): false | undefined;
        releaseRegionVoxelPalette(regionX: number, regionY: number, regionZ: number): void;
        releaseRegionVoxelPaletteInThread(threadId: string, regionX: number, regionY: number, regionZ: number): void;
    };
    nexusComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface;
    voxelManager: {
        voxels: Record<string, import("../Meta/index.js").VoxelData>;
        shapeMap: Record<string, number>;
        shapeMapHasBeenSet: boolean;
        fluidShapeMap: Record<string, number>;
        fluidShapeMapHasBeenSet: boolean;
        getVoxel(id: string): import("../Meta/index.js").VoxelData;
        registerVoxelData(voxel: import("../Meta/index.js").VoxelData): void;
        runVoxelHookForAll(hook: any): void;
    };
    isReady(): boolean;
    syncSettings(data: EngineSettingsData): void;
    runRGBLightUpdateQue(): void;
    clearRGBLightUpdateQue(): void;
    runRGBLightRemoveQue(): void;
    clearRGBLightRemoveQue(): void;
    runChunkRebuildQue(): void;
    clearChunkRebuildQue(): void;
    removeChunk(chunkX: number, chunkY: number, chunkZ: number): boolean;
    buildChunk(chunkX: number, chunkY: number, chunkZ: number): void;
    $INIT(data: DVEWInitData): Promise<void>;
};
export declare type DivineVoxelEngineWorld = typeof DVEW;
