import type { DVEWInitData } from "Meta/World/DVEW";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export declare const DVEW: {
    environment: "node" | "browser";
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
        getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): number;
        getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): any;
        setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
        setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
        setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
        deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
        deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): void;
        /**# Remove Chunk
         * ---
         * Removes a chunk from the render thread.
         * Can also delete the chunk from world ata.
         */
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
    };
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
        getChunkKey(chunkPOS: import("../Meta/Util.types.js").Position3Matrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: import("../Meta/Util.types.js").Position3Matrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").Position3Matrix): {
            x: number;
            y: number;
            z: number;
        };
        getVoxelPosition(x: number, y: number, z: number): {
            x: number;
            y: number;
            z: number;
        };
        getWorldColumnKeyFromObj(position: import("../Meta/Util.types.js").Position3Matrix): string;
        getWorldColumnKey(x: number, z: number): string;
        getWorldColumnPosition(x: number, z: number): {
            x: number;
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
        getWorkerPort: (environment: "node" | "browser") => Promise<any>;
        getEnviorment(): "node" | "browser";
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
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): any;
            setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): void;
            /**# Remove Chunk
             * ---
             * Removes a chunk from the render thread.
             * Can also delete the chunk from world ata.
             */
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
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
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): any;
            setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): void;
            /**# Remove Chunk
             * ---
             * Removes a chunk from the render thread.
             * Can also delete the chunk from world ata.
             */
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
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
                getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): number;
                getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): any;
                setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
                deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): void;
                /**# Remove Chunk
                 * ---
                 * Removes a chunk from the render thread.
                 * Can also delete the chunk from world ata.
                 */
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
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
                setPositionUseObj(positionObj: import("../Meta/Util.types.js").Position3Matrix): number;
            };
            _getHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            updateChunkMinMax(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, minMax: Uint32Array): void;
            getChunkMin(minMax: Uint32Array): number;
            getChunkMax(minMax: Uint32Array): number;
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
            setS(value: number, sl: number): number;
            setR(value: number, sl: number): number;
            setG(value: number, sl: number): number;
            setB(value: number, sl: number): number;
            removeS(sl: number): number;
            hasRGBLight(sl: number): boolean;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
            setLightValues(values: number[]): number;
            getLightValues(value: number): number[];
            isLessThanForRGBRemove(n1: number, n2: number): boolean;
            isLessThanForRGBAdd(n1: number, n2: number): boolean;
            isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
            getMinusOneForRGB(sl: number, nl: number): number;
            removeRGBLight(sl: number): number;
            getFullSunLight(sl: number): number;
            isLessThanForSunAdd(n1: number, n2: number): boolean;
            isLessThanForSunAddDown(n1: number, n2: number): boolean;
            isLessThanForSunAddUp(n1: number, n2: number): boolean;
            getSunLightForUnderVoxel(sl: number, nl: number): number;
            getMinusOneForSun(sl: number, nl: number): number;
            isLessThanForSunRemove(n1: number, sl: number): boolean;
            isGreaterOrEqualThanForSunRemove(n1: number, sl: number): boolean;
            sunLightCompareForDownSunRemove(n1: number, sl: number): boolean;
            removeSunLight(sl: number): number;
        };
        getWorldBounds(): {
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
            getChunkKey(chunkPOS: import("../Meta/Util.types.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("../Meta/Util.types.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").Position3Matrix): {
                x: number;
                y: number;
                z: number;
            };
            getVoxelPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getWorldColumnKeyFromObj(position: import("../Meta/Util.types.js").Position3Matrix): string;
            getWorldColumnKey(x: number, z: number): string;
            getWorldColumnPosition(x: number, z: number): {
                x: number;
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
    settings: {
        context: "MatrixLoadedThread" | "DVEW" | "DVER" | "DVEP" | "DVEB" | "DVEC" | "DVEN";
        settings: EngineSettingsData;
        setContext(context: "MatrixLoadedThread" | "DVEW" | "DVER" | "DVEP" | "DVEB" | "DVEC" | "DVEN"): void;
        syncSettings(data: EngineSettingsData): void;
        syncWithWorldBounds(worldBounds: {
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
            getChunkKey(chunkPOS: import("../Meta/Util.types.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("../Meta/Util.types.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").Position3Matrix): {
                x: number;
                y: number;
                z: number;
            };
            getVoxelPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getWorldColumnKeyFromObj(position: import("../Meta/Util.types.js").Position3Matrix): string;
            getWorldColumnKey(x: number, z: number): string;
            getWorldColumnPosition(x: number, z: number): {
                x: number;
                z: number;
            };
        }): void;
        getSettingsCopy(): any;
        doSunPropagation(): boolean;
        doRGBPropagation(): boolean;
    };
    matrix: {
        updateDieTime: number;
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
            getChunkKey(chunkPOS: import("../Meta/Util.types.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("../Meta/Util.types.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").Position3Matrix): {
                x: number;
                y: number;
                z: number;
            };
            getVoxelPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getWorldColumnKeyFromObj(position: import("../Meta/Util.types.js").Position3Matrix): string;
            getWorldColumnKey(x: number, z: number): string;
            getWorldColumnPosition(x: number, z: number): {
                x: number;
                z: number;
            };
        };
        regions: Record<string, import("../Meta/Matrix/Matrix.types.js").MatrixRegionData>;
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
        getMatrixRegionData(x: number, y: number, z: number): false | import("../Meta/Matrix/Matrix.types.js").MatrixRegionData;
        addRegionToMatrix(x: number, y: number, z: number): import("../Meta/Matrix/Matrix.types.js").MatrixRegionData;
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
    constructorCommManager: {
        count: number;
        numConstructors: number;
        __numLightUpdates: number;
        constructors: import("../Meta/Comms/InterComm.types.js").InterCommInterface[];
        constructorsConnected: number;
        $INIT(statesSAB: SharedArrayBuffer): void;
        addThread(port: import("../Meta/Comms/InterComm.types.js").InterCommPortTypes): void;
        syncChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number): void;
        releaseChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number): void;
        syncRegionInAllThreads(regionX: number, regionY: number, regionZ: number): void;
        releaseRegionInAllThreads(regionX: number, regionY: number, regionZ: number): void;
        isReady(): boolean;
        __handleCount(): number;
        requestFullChunkBeBuilt(chunkX: number, chunkY: number, chunkZ: number): number;
        runRGBFloodFillAt(x: number, y: number, z: number): number;
        runRGBFloodRemoveAt(x: number, y: number, z: number): number;
        runSunLightForWorldColumn(x: number, z: number, maxY: number): number;
        runSunFillAtMaxY(x: number, y: number, maxY: number): number;
        runSunFillMaxYFlood(x: number, y: number, maxY: number, thread: number): number;
        runSunFillAt(x: number, y: number, z: number): number;
        runSunRemoveAt(x: number, y: number, z: number): number;
    };
    worldGeneration: {
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
            getChunkKey(chunkPOS: import("../Meta/Util.types.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("../Meta/Util.types.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").Position3Matrix): {
                x: number;
                y: number;
                z: number;
            };
            getVoxelPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getWorldColumnKeyFromObj(position: import("../Meta/Util.types.js").Position3Matrix): string;
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
                getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): number;
                getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): any;
                setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
                deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): void;
                /**# Remove Chunk
                 * ---
                 * Removes a chunk from the render thread.
                 * Can also delete the chunk from world ata.
                 */
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
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
                setPositionUseObj(positionObj: import("../Meta/Util.types.js").Position3Matrix): number;
            };
            _getHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            updateChunkMinMax(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, minMax: Uint32Array): void;
            getChunkMin(minMax: Uint32Array): number;
            getChunkMax(minMax: Uint32Array): number;
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
            /**# Delete Chunk
             * ---
             * Deletes a chunk from world data and releases it from all threads.
             */
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
                getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): number;
                getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): any;
                setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
                deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
                deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): void;
                /**# Remove Chunk
                 * ---
                 * Removes a chunk from the render thread.
                 * Can also delete the chunk from world ata.
                 */
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
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
                setPositionUseObj(positionObj: import("../Meta/Util.types.js").Position3Matrix): number;
            };
            _getHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            updateChunkMinMax(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, minMax: Uint32Array): void;
            getChunkMin(minMax: Uint32Array): number;
            getChunkMax(minMax: Uint32Array): number;
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
            setS(value: number, sl: number): number;
            setR(value: number, sl: number): number;
            setG(value: number, sl: number): number;
            setB(value: number, sl: number): number;
            removeS(sl: number): number;
            hasRGBLight(sl: number): boolean;
            decodeLightFromVoxelData(voxelData: number): number;
            encodeLightIntoVoxelData(voxelData: number, encodedLight: number): number;
            setLightValues(values: number[]): number;
            getLightValues(value: number): number[];
            isLessThanForRGBRemove(n1: number, n2: number): boolean;
            isLessThanForRGBAdd(n1: number, n2: number): boolean;
            isGreaterOrEqualThanForRGBRemove(n1: number, n2: number): boolean;
            getMinusOneForRGB(sl: number, nl: number): number;
            removeRGBLight(sl: number): number;
            getFullSunLight(sl: number): number;
            isLessThanForSunAdd(n1: number, n2: number): boolean;
            isLessThanForSunAddDown(n1: number, n2: number): boolean;
            isLessThanForSunAddUp(n1: number, n2: number): boolean;
            getSunLightForUnderVoxel(sl: number, nl: number): number;
            getMinusOneForSun(sl: number, nl: number): number;
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
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): any;
            setValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels, value: number): void;
            deleteValue(x: number, y: number, z: number, array: import("../Meta/index.js").ChunkVoxels): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: import("../Meta/index.js").ChunkVoxels): void;
            /**# Remove Chunk
             * ---
             * Removes a chunk from the render thread.
             * Can also delete the chunk from world ata.
             */
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
        };
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
            getChunkKey(chunkPOS: import("../Meta/Util.types.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("../Meta/Util.types.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("../Meta/Util.types.js").Position3Matrix): {
                x: number;
                y: number;
                z: number;
            };
            getVoxelPosition(x: number, y: number, z: number): {
                x: number;
                y: number;
                z: number;
            };
            getWorldColumnKeyFromObj(position: import("../Meta/Util.types.js").Position3Matrix): string;
            getWorldColumnKey(x: number, z: number): string;
            getWorldColumnPosition(x: number, z: number): {
                x: number;
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
        __handleHeightMapUpdateForVoxelAdd(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, voxelData: import("../Meta/index.js").VoxelData, chunk: import("../Meta/index.js").ChunkData): void;
        __handleHeightMapUpdateForVoxelRemove(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, voxelData: import("../Meta/index.js").VoxelData, chunk: import("../Meta/index.js").ChunkData): void;
        getChunk(x: number, y: number, z: number): false | import("../Meta/index.js").ChunkData;
        removeChunk(x: number, y: number, z: number): false | undefined;
        setChunk(x: number, y: number, z: number, chunk: import("../Meta/index.js").ChunkData, doNotSyncInThreads?: boolean): void;
        requestVoxelAdd(voxelId: string, voxelStateId: string, x: number, y: number, z: number): Promise<void>;
        requestVoxelBeRemoved(x: number, y: number, z: number): Promise<void>;
        getWorldColumn(x: number, z: number): false | Record<string, import("../Meta/index.js").ChunkData> | undefined;
        getRelativeMaxWorldColumnHeight(x: number, z: number): number;
        getAbsoluteHeightOfWorldColumn(x: number, z: number): number;
        fillWorldCollumnWithChunks(x: number, z: number): void;
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
        _worldColumnSunLightPropMap: Record<string, {
            max: number;
            thread: number;
        }>;
        _worldColumnSunLightPropQue: number[][];
        _chunkRebuildQueMap: Record<string, Record<import("../Meta/index.js").VoxelSubstanceType | "all", boolean>>;
        _chunkRebuildQue: number[][];
        __statesSAB: SharedArrayBuffer;
        __states: Uint32Array;
        $INIT(): void;
        addWorldColumnToSunLightQue(x: number, z: number): void;
        runWorldColumnSunLightAndUpateQue(): Promise<void>;
        awaitAllWorldColumnSunLightProp(): Promise<boolean>;
        areWorldColumnSunLightUpdatsDone(): boolean;
        awaitAllSunLightUpdatesAtMaxY(): Promise<boolean>;
        areAllSunLightUpdatesAtMaxYDone(): boolean;
        awaitAllSunLightUpdatesMaxYFlood(): Promise<boolean>;
        areAllSunLightUpdatesMaxYFloodDone(): boolean;
        awaitAllSunLightUpdates(): Promise<boolean>;
        areAllSunLightUpdatesDone(): boolean;
        addToRGBUpdateQue(x: number, y: number, z: number): void;
        addToRGBRemoveQue(x: number, y: number, z: number): void;
        runRGBUpdateQue(): void;
        runRGBRemoveQue(): void;
        awaitAllRGBLightUpdates(): Promise<boolean>;
        awaitAllRGBLightRemove(): Promise<boolean>;
        areRGBLightUpdatesAllDone(): boolean;
        areRGBLightRemovesAllDone(): boolean;
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
    buildWorldColumn(x: number, z: number): false | undefined;
    $INIT(data: DVEWInitData): Promise<void>;
};
export declare type DivineVoxelEngineWorld = typeof DVEW;
