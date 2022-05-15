import type { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
import type { DVEBInitData } from "Meta/Builder/DVEB.js";
export declare const DVEB: {
    environment: "browser" | "node";
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
    worldMatrix: {
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
        voxelByte: {
            setId(id: number, value: number): number;
            getId(value: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        };
        updateDieTime: number;
        loadDieTime: number;
        regions: Record<string, {
            palette?: import("../Meta/World/WorldData/World.types.js").WorldRegionPalette | undefined;
            chunks: Record<string, {
                voxels: Uint32Array;
                chunkStates: Uint8Array;
            }>;
        }>;
        chunks: Record<string, Uint32Array>;
        chunkStates: Record<string, Uint8Array>;
        paletteMode: number;
        globalVoxelPalette: Record<number, string>;
        globalVoxelPaletteRecord: Record<string, string[]>;
        regionVoxelPalettes: Record<string, Record<number, string>>;
        threadName: string;
        syncChunkBounds(): void;
        awaitChunkLoad(x: number, y: number, z: number, timeout?: number): Promise<unknown>;
        __setGlobalVoxelPalette(palette: Record<number, string>, record: Record<string, string[]>): void;
        __syncRegionData(x: number, y: number, z: number, palette: import("../Meta/World/WorldData/World.types.js").WorldRegionPalette): void;
        __removeRegionVoxelPalette(x: number, y: number, z: number): false | undefined;
        getVoxel(x: number, y: number, z: number): false | string[];
        _createRegion(x: number, y: number, z: number): {
            chunks: {};
        };
        __setChunk(x: number, y: number, z: number, chunkSAB: SharedArrayBuffer, chunkStateSAB: SharedArrayBuffer): void;
        getRegion(x: number, y: number, z: number): false | {
            palette?: import("../Meta/World/WorldData/World.types.js").WorldRegionPalette | undefined;
            chunks: Record<string, {
                voxels: Uint32Array;
                chunkStates: Uint8Array;
            }>;
        };
        __removeChunk(x: number, y: number, z: number): false | undefined;
        getChunk(x: number, y: number, z: number): false | {
            voxels: Uint32Array;
            chunkStates: Uint8Array;
        };
        isChunkLocked(x: number, y: number, z: number): boolean;
        lockChunk(x: number, y: number, z: number): boolean;
        unLockChunk(x: number, y: number, z: number): boolean;
        updateChunkData(chunkX: number, chunkY: number, chunkZ: number, run: (chunk: {
            voxels: Uint32Array;
            chunkStates: Uint8Array;
        }) => {}): false | Promise<boolean>;
        setData(x: number, y: number, z: number, data: number): false | undefined;
        getData(x: number, y: number, z: number): number;
        getVoxelNumberID(x: number, y: number, z: number): number | false;
    };
    matrixHub: {
        messageFunctions: Record<string, (data: any, event: MessageEvent<any>) => any>;
        worldPort: import("../Meta/Comms/InterComm.types.js").InterCommPortTypes | undefined;
        threadName: string;
        setThreadName(threadName: string): void;
        onMessage(event: MessageEvent<any>, runAfter: (event: MessageEvent<any>) => any): void;
        requestChunkSync(chunkX: number, chunkY: number, chunkZ: number): Promise<unknown>;
        requestChunkRelease(chunkX: number, chunkY: number, chunkZ: number): void;
        _setWorldPort(port: MessagePort): void;
        _syncChunk(data: any[]): void;
        _releaseChunk(data: any[]): void;
        _syncGlobalVoxelPalette(data: any[]): void;
        _syncRegionData(data: any[]): void;
        _releaseRegionVoxelPalette(data: any[]): void;
        _setThreadName(data: any[]): void;
    };
    renderComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        onReady: () => void;
        onRestart: () => void;
    };
    worldComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface;
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
    chunkProccesor: {
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
        chunkTemplates: Record<number, Record<number, number[][]>>;
        exposedFaces: number[];
        getBaseTemplateNew(): import("../Meta/index.js").FullChunkTemplate;
        makeAllChunkTemplates(voxels: import("../Meta/index.js").ChunkVoxels, chunkX: number, chunkY: number, chunkZ: number): import("../Meta/index.js").FullChunkTemplate;
    };
    textureManager: {
        textureDataHasBeenSet: boolean;
        uvTextureMap: Record<import("../Meta/index.js").VoxelSubstanceType, Record<string, number>>;
        getTextureUV(voxelSubstanceType: import("../Meta/index.js").VoxelSubstanceType, textureId: string, varation?: string | undefined): number;
        isReady(): boolean;
        setUVTextureMap(data: Record<import("../Meta/index.js").VoxelSubstanceType, Record<string, number>>): void;
    };
    voxelManager: {
        voxelObjects: Record<string, import("../Meta/index.js").VoxelBuilderThreadObject>;
        shapeMap: Record<string, number>;
        shapeMapHasBeenSet: boolean;
        fluidShapeMap: Record<string, number>;
        fluidShapeMapHasBeenSet: boolean;
        setShapeMap(shapeMap: Record<string, number>): void;
        shapMapIsSet(): boolean;
        fluidShapMapIsSet(): boolean;
        getVoxel(id: string): import("../Meta/index.js").VoxelBuilderThreadObject;
        registerVoxel(voxel: import("../Meta/index.js").VoxelBuilderThreadObject): void;
        runVoxelHookForAll(hook: any): void;
    };
    voxelHelper: {
        voxellightMixCalc: typeof import("./Voxels/Functions/CalculateVoxelLight.js").VoxelLightMixCalc;
        calculdateVoxelLight: typeof import("./Voxels/Functions/CalculateVoxelLight.js").CalculateVoxelLight;
        voxelByte: {
            setId(id: number, value: number): number;
            getId(value: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
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
        substanceRules: Record<string, boolean>;
        lightValueFunctions: {
            r: (value: number) => number;
            g: (value: number) => number;
            b: (value: number) => number;
            s: (value: number) => number;
        };
        getTrueShapeId(id: string): number;
        getTrueFluidShapeId(id: string): number;
        voxelFaceCheck(voxel: import("../Meta/index.js").VoxelBuilderThreadObject, voxelData: number, x: number, y: number, z: number): boolean;
        getLight(x: number, y: number, z: number): number;
        getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s"): number;
        processVoxelLight(data: import("../Meta/index.js").VoxelProcessData, voxel: import("../Meta/index.js").VoxelData): void;
        calculateVoxelLight(data: import("../Meta/index.js").VoxelProcessData, voxel: import("../Meta/index.js").VoxelData): void;
        calculateVoxelAO(data: import("../Meta/index.js").VoxelProcessData, voxel: import("../Meta/index.js").VoxelData): void;
    };
    __connectedToWorld: boolean;
    engineSettings: {
        settings: EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        getSettingsCopy(): any;
    };
    __settingsHaveBeenSynced: boolean;
    shapeManager: {
        shapes: Record<number, import("../Meta/index.js").VoxelShapeInterface>;
        shapeMap: Record<string, number>;
        shapeCount: number;
        registerShape(shapeObject: import("../Meta/index.js").VoxelShapeInterface): void;
        getShape(shapeId: number): import("../Meta/index.js").VoxelShapeInterface;
        getShapeMap(): Record<string, number>;
    };
    shapeHelper: {
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
        lightMap: number[];
        exposedFaceRecord: Record<import("../Meta/Util.types.js").DirectionNames, number>;
        isFaceExposexd(voxelExposedFaceEncodedBit: number, faceDirection: import("../Meta/Util.types.js").DirectionNames): boolean;
        processReturnData(shapeData: import("../Meta/index.js").VoxelShapeAddData, returnData: import("../Meta/index.js").VoxelShapeAddReturnData): void;
        produceShapeReturnData(shapeData: import("../Meta/index.js").VoxelShapeAddData): {
            newIndicieIndex: number;
            newUVTemplateIndex: number;
            newColorIndex: number;
            newlightIndex: number;
            newAOIndex: number;
        };
        toLinearSpace(r: number, g: number, b: number, a: number): number[];
        calculateLightColor(RGBlightColors: number[], sunlightColors: number[], lightTemplate: Float32Array, startIndex: number): void;
        calculateSunightColor(sunLight: number[], sunLightTemplate: Int32Array, sunLightIndex: number): void;
        calculateAOColor(colors: number[], chunkAmbientOcculusion: Float32Array, startIndex: number): void;
    };
    chunkMesher: {
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
        voxelBuildOrder: import("../Meta/index.js").VoxelSubstanceType[];
        voxelTypeMap: {
            solid: number;
            flora: number;
            fluid: number;
            magma: number;
        };
        buildChunkMesh(chunkX: number, chunkY: number, chunkZ: number, template: import("../Meta/index.js").FullChunkTemplate): void;
    };
    syncSettings(data: EngineSettingsData): void;
    reStart(): void;
    isReady(): boolean;
    $INIT(initData: DVEBInitData): Promise<void>;
    buildChunk(chunkX: number, chunkY: number, chunkZ: number): Promise<true | undefined>;
};
export declare type DivineVoxelEngineBuilder = typeof DVEB;
