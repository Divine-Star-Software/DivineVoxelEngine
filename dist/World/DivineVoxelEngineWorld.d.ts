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
        getValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): number;
        setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
        setValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
        deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
        deleteUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
    };
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
        getChunkKey(chunkPOS: import("../Meta/Util.types.js").PositionMatrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string; /**# Delete Chunk
         * ---
         * Deletes a chunk from world data and releases it from all threads.
         */
        getRegionKey(regionPOS: import("../Meta/Util.types.js").PositionMatrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix): {
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
    __settingsHaveBeenSynced: boolean;
    __renderIsDone: boolean;
    UTIL: {
        createPromiseCheck: (data: {
            check: () => boolean;
            onReady?: (() => any) | undefined;
            checkInterval: number;
            failTimeOut?: number | undefined;
            onFail?: (() => any) | undefined;
        }) => Promise<boolean>;
        getWorkerPort: (environment: "browser" | "node") => Promise<any>;
        getEnviorment(): "browser" | "node";
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
            getValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
            deleteUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
        };
        getFaceByte(): {
            _setFaceTextureState: Record<import("../Meta/Util.types.js").DirectionNames, (state: number, faceBit: number) => number>;
            _getFaceTextureState: Record<import("../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
            _setFaceRotateState: Record<import("../Meta/Util.types.js").DirectionNames, (state: number, faceBit: number) => number>;
            _getFaceRotateState: Record<import("../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
            _markExposedFace: Record<import("../Meta/Util.types.js").DirectionNames, (faceBit: number) => number>;
            _checkExposedFace: Record<import("../Meta/Util.types.js").DirectionNames, (faceBit: number) => boolean>;
            markFaceAsExposed(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): number;
            isFaceExposed(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): boolean;
            setFaceRotateState(direction: import("../Meta/Util.types.js").DirectionNames, state: number, rawData: number): number;
            getFaceRotateState(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): number;
            setFaceTextureState(direction: import("../Meta/Util.types.js").DirectionNames, state: number, rawData: number): number;
            getFaceTextureState(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): number;
        };
        getHeightMapArray(): {
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
            getValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
            deleteUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
        };
        getHeightByte(): {
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
                getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
                getValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): number;
                setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                setValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
                deleteUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
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
                setPositionUseObj(positionObj: import("../Meta/Util.types.js").PositionMatrix): number;
            };
            _getHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            updateChunkMinMax(voxelPOS: import("../Meta/Util.types.js").PositionMatrix, minMax: Uint32Array): void;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
            getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
            isSubstanceExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
            markSubstanceAsExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            markSubstanceAsNotExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            setMinYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getMinYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
            setMaxYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getMaxYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
        };
        getVoxelByte(): {
            setId(id: number, value: number): number;
            getId(value: number): number;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
        };
        getLightByte(): {
            _lightValues: number[];
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
            getChunkKey(chunkPOS: import("../Meta/Util.types.js").PositionMatrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string; /**# Delete Chunk
             * ---
             * Deletes a chunk from world data and releases it from all threads.
             */
            getRegionKey(regionPOS: import("../Meta/Util.types.js").PositionMatrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix): {
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
    engineSettings: {
        settings: EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        getSettingsCopy(): any;
    };
    matrix: {
        updateDieTime: number;
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
            getChunkKey(chunkPOS: import("../Meta/Util.types.js").PositionMatrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string; /**# Delete Chunk
             * ---
             * Deletes a chunk from world data and releases it from all threads.
             */
            getRegionKey(regionPOS: import("../Meta/Util.types.js").PositionMatrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix): {
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
        regions: Record<string, import("../Meta/Matrix/MatrixData.js").MatrixRegionData>;
        isChunkInMatrix(x: number, y: number, z: number): boolean;
        isRegionInMatrix(x: number, y: number, z: number): boolean;
        isChunkLocked(x: number, y: number, z: number): boolean;
        lockChunk(x: number, y: number, z: number): boolean;
        unLockChunk(x: number, y: number, z: number): boolean;
        updateChunkData(x: number, y: number, z: number, run: (chunk: import("../Meta/index.js").ChunkData) => {}): false | Promise<boolean>;
        releaseChunk(x: number, y: number, z: number): boolean | undefined;
        createMatrixChunkData(x: number, y: number, z: number): false | SharedArrayBuffer[];
        getMatrixChunkData(x: number, y: number, z: number): false | {
            chunkStates: Uint8Array;
            chunkStatesSAB: SharedArrayBuffer;
            voxelsSAB: SharedArrayBuffer;
            voxelsStatesSAB: SharedArrayBuffer;
            minMaxMapSAB: SharedArrayBuffer;
            heightMapSAB: SharedArrayBuffer;
        };
        getMatrixRegionData(x: number, y: number, z: number): false | import("../Meta/Matrix/MatrixData.js").MatrixRegionData;
        addRegionToMatrix(x: number, y: number, z: number): import("../Meta/Matrix/MatrixData.js").MatrixRegionData;
        removeRegionFromMatrix(x: number, y: number, z: number): false | undefined;
        deleteThreadFromRegion(threadId: string, x: number, y: number, z: number): false | undefined;
    };
    matrixCentralHub: {
        threads: Record<string, import("../Meta/Comms/InterComm.types.js").InterCommPortTypes>;
        _threadMessageFunctions: Record<string, (data: any, event: MessageEvent<any>) => void>;
        registerThread(threadId: string, thread: import("../Meta/Comms/InterComm.types.js").InterCommPortTypes): void;
        syncChunk(x: number, y: number, z: number): false | undefined;
        syncChunkInThread(threadId: string, x: number, y: number, z: number): false | undefined;
        releaseChunk(x: number, y: number, z: number): void;
        releaseChunkInThread(threadId: string, x: number, y: number, z: number): void;
        syncRegion(x: number, y: number, z: number): false | undefined;
        syncRegionInThread(threadId: string, x: number, y: number, z: number): false | undefined;
        releaseRegion(x: number, y: number, z: number): false | undefined;
        releaseRegionInThread(threadId: string, x: number, y: number, z: number): false | undefined;
        syncGlobalVoxelPalette(): void;
        syncGlobalVoxelPaletteInThread(threadId: string): void;
        syncRegionVoxelPalette(x: number, y: number, z: number): false | undefined;
        syncRegionVoxelPaletteInThread(threadId: string, x: number, y: number, z: number): false | undefined;
        releaseRegionVoxelPalette(x: number, y: number, z: number): false | undefined;
        releaseRegionVoxelPaletteInThread(threadId: string, x: number, y: number, z: number): false | undefined;
    };
    nexusComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface;
    renderComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        onReady: () => void;
        onRestart: () => void;
    };
    builderCommManager: {
        count: number;
        numBuilders: number;
        builders: import("../Meta/Comms/InterComm.types.js").InterCommInterface[];
        buildersConnected: number;
        addBuilder(port: import("../Meta/Comms/InterComm.types.js").InterCommPortTypes): void;
        syncChunkInAllBuilders(chunkX: number, chunkY: number, chunkZ: number): void;
        releaseChunkInAllBuilders(chunkX: number, chunkY: number, chunkZ: number): void;
        syncRegionInAllBuilders(regionX: number, regionY: number, regionZ: number): void;
        releaseRegionInAllBuilders(regionX: number, regionY: number, regionZ: number): void;
        isReady(): boolean;
        requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number): void;
    };
    propagationCommManager: {
        count: number;
        numWorldGens: number;
        states: Int32Array;
        __numLightUpdates: number;
        propagators: import("../Meta/Comms/InterComm.types.js").InterCommInterface[];
        worldGensConnected: number;
        $INIT(): void;
        addPropagator(port: import("../Meta/Comms/InterComm.types.js").InterCommPortTypes): void;
        syncChunkInAllWorldGens(chunkX: number, chunkY: number, chunkZ: number): void;
        releaseChunkInAllWorldGens(chunkX: number, chunkY: number, chunkZ: number): void;
        syncRegionInAllWorldGens(regionX: number, regionY: number, regionZ: number): void;
        releaseRegionInAllWorldGens(regionX: number, regionY: number, regionZ: number): void;
        isReady(): boolean;
        _chunkRebuildQueMap: Record<string, Record<import("../Meta/index.js").VoxelSubstanceType | "all", boolean>>;
        _chunkRebuildQue: number[][];
        __addToRebuildQue(x: number, y: number, z: number, substance: import("../Meta/index.js").VoxelSubstanceType | "all"): void;
        awaitAllLightUpdates(): Promise<boolean>;
        runRebuildQue(): void;
        runRGBFloodFillAt(x: number, y: number, z: number): void;
        runRGBFloodRemoveAt(x: number, y: number, z: number): void;
        areRGBLightUpdatesAllDone(): boolean;
        areRGBLightRemovesAllDone(): boolean;
    };
    worldGeneration: {
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
            getChunkKey(chunkPOS: import("../Meta/Util.types.js").PositionMatrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string; /**# Delete Chunk
             * ---
             * Deletes a chunk from world data and releases it from all threads.
             */
            getRegionKey(regionPOS: import("../Meta/Util.types.js").PositionMatrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix): {
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
                getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
                getValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): number;
                setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                setValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
                deleteUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
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
                setPositionUseObj(positionObj: import("../Meta/Util.types.js").PositionMatrix): number;
            };
            _getHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            updateChunkMinMax(voxelPOS: import("../Meta/Util.types.js").PositionMatrix, minMax: Uint32Array): void;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
            getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
            isSubstanceExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
            markSubstanceAsExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            markSubstanceAsNotExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            setMinYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getMinYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
            setMaxYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getMaxYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
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
    worldData: {
        regions: Record<string, import("../Meta/World/WorldData/World.types.js").WorldRegion>;
        chunks: Record<string, import("../Meta/index.js").ChunkData>;
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
                getValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): number;
                getValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): number;
                setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                setValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
                deleteUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
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
                setPositionUseObj(positionObj: import("../Meta/Util.types.js").PositionMatrix): number;
            };
            _getHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            updateChunkMinMax(voxelPOS: import("../Meta/Util.types.js").PositionMatrix, minMax: Uint32Array): void;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getLowestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
            getHighestExposedVoxel(x: number, z: number, heightMap: Uint32Array): number;
            isSubstanceExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): boolean;
            markSubstanceAsExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            markSubstanceAsNotExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            setMinYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getMinYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
            setMaxYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): void;
            getMaxYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: Uint32Array): number;
        };
        lightByte: {
            _lightValues: number[];
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
            getValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): number;
            setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
            deleteUseObj(position: import("../Meta/Util.types.js").PositionMatrix, array: import("../Meta/index.js").ChunkVoxels): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").PositionMatrix;
        };
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
            getChunkKey(chunkPOS: import("../Meta/Util.types.js").PositionMatrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string; /**# Delete Chunk
             * ---
             * Deletes a chunk from world data and releases it from all threads.
             */
            getRegionKey(regionPOS: import("../Meta/Util.types.js").PositionMatrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").PositionMatrix): {
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
        runRebuildCheck(x: number, y: number, z: number): void;
        getCurrentWorldDataSize(): number;
        getCurrentWorldDataString(): string;
        setAir(x: number, y: number, z: number, lightValue: number): void;
        setLight(x: number, y: number, z: number, lightValue: number): void;
        getLight(x: number, y: number, z: number): number;
        removeData(x: number, y: number, z: number): false | undefined;
        getData(x: number, y: number, z: number): number | false;
        setData(x: number, y: number, z: number, data: number): void | -1;
        getVoxel(x: number, y: number, z: number): false | [number | import("../Meta/index.js").VoxelData, string | number, number];
        addRegion(x: number, y: number, z: number): import("../Meta/World/WorldData/World.types.js").WorldRegion;
        getRegion(x: number, y: number, z: number): false | import("../Meta/World/WorldData/World.types.js").WorldRegion;
        addChunk(x: number, y: number, z: number): import("../Meta/index.js").ChunkData;
        paintVoxel(voxelId: string, voxelStateId: string, x: number, y: number, z: number): void;
        __handleHeightMapUpdateForVoxelAdd(voxelPOS: import("../Meta/Util.types.js").PositionMatrix, voxelData: import("../Meta/index.js").VoxelData, chunk: import("../Meta/index.js").ChunkData): void;
        __handleHeightMapUpdateForVoxelRemove(voxelPOS: import("../Meta/Util.types.js").PositionMatrix, voxelData: import("../Meta/index.js").VoxelData, chunk: import("../Meta/index.js").ChunkData): void;
        getChunk(x: number, y: number, z: number): false | import("../Meta/index.js").ChunkData;
        removeChunk(x: number, y: number, z: number): false | undefined;
        setChunk(x: number, y: number, z: number, chunk: import("../Meta/index.js").ChunkData, doNotSyncInThreads?: boolean): void;
        requestVoxelAdd(voxelId: string, voxelStateId: string, x: number, y: number, z: number): Promise<void>;
        requestVoxelBeRemoved(x: number, y: number, z: number): Promise<void>;
    };
    voxelManager: {
        voxels: Record<string, import("../Meta/index.js").VoxelData>;
        shapeMap: Record<string, number>;
        shapeMapHasBeenSet: boolean;
        fluidShapeMap: Record<string, number>;
        fluidShapeMapHasBeenSet: boolean;
        getVoxel(id: string): import("../Meta/index.js").VoxelData;
        registerVoxelData(voxel: import("../Meta/index.js").VoxelData): void;
        getCurrentVoxelSize(): number;
        runVoxelHookForAll(hook: any): void;
    };
    queues: {
        _numChunksRebuilding: number;
        _numRGBLightUpdates: number;
        _numRGBLightRemoves: number;
        _RGBLightRemoveQue: number[][];
        _RGBLightUpdateQue: number[][];
        _chunkRebuildQueMap: Record<string, Record<import("../Meta/index.js").VoxelSubstanceType | "all", boolean>>;
        _chunkRebuildQue: number[][];
        addToRGBUpdateQue(x: number, y: number, z: number): void;
        addToRGBRemoveQue(x: number, y: number, z: number): void;
        runRGBUpdateQue(): void;
        runRGBRemoveQue(): void;
        awaitAllRGBLightUpdates(): Promise<boolean>;
        awaitAllRGBLightRemove(): Promise<boolean>;
        addToRebuildQue(x: number, y: number, z: number, substance: import("../Meta/index.js").VoxelSubstanceType | "all"): void;
        runRebuildQue(): void;
        awaitAllChunksToBeBuilt(): Promise<boolean>;
    };
    isReady(): boolean;
    syncSettings(data: EngineSettingsData): void;
    /**# Remove Chunk
     * ---
     * Removes a chunk from the render thread.
     * Can also delete the chunk from world ata.
     */
    removeChunk(chunkX: number, chunkY: number, chunkZ: number, deleteChunk?: boolean): boolean;
    /**# Delete Chunk
     * ---
     * Deletes a chunk from world data and releases it from all threads.
     */
    deleteChunk(chunkX: number, chunkY: number, chunkZ: number): void;
    buildChunk(chunkX: number, chunkY: number, chunkZ: number): void;
    $INIT(data: DVEWInitData): Promise<void>;
};
export declare type DivineVoxelEngineWorld = typeof DVEW;
