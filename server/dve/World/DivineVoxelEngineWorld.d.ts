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
        getValue(x: number, y: number, z: number, array: Uint32Array): number;
        getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
        getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
        setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
        setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
        setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
        deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
        deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
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
        getRichPositionKey(x: number, y: number, z: number): string;
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
        setChunkPosition(chunk: DataView, position: import("../Meta/Util.types.js").Position3Matrix): void;
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
        getVoxelDataUseObj(chunkData: DataView, position: import("../Meta/Util.types.js").Position3Matrix, secondary?: boolean): number;
        setVoxelDataUseObj(chunkData: DataView, position: import("../Meta/Util.types.js").Position3Matrix, data: number, secondary?: boolean): void;
        getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
        setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
        getChunkMinData(chunkData: DataView): number;
        setChunkMinData(chunkData: DataView, data: number): void;
        getChunkMaxData(chunkData: DataView): number;
        setChunkMaxData(chunkData: DataView, data: number): void;
    };
    __settingsHaveBeenSynced: boolean;
    __renderIsDone: boolean;
    __serverIsDone: boolean;
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
        getChunkReader(): {
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
            setChunkPosition(chunk: DataView, position: import("../Meta/Util.types.js").Position3Matrix): void;
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
            getVoxelDataUseObj(chunkData: DataView, position: import("../Meta/Util.types.js").Position3Matrix, secondary?: boolean): number;
            setVoxelDataUseObj(chunkData: DataView, position: import("../Meta/Util.types.js").Position3Matrix, data: number, secondary?: boolean): void;
            getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
            setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
            getChunkMinData(chunkData: DataView): number;
            setChunkMinData(chunkData: DataView, data: number): void;
            getChunkMaxData(chunkData: DataView): number;
            setChunkMaxData(chunkData: DataView, data: number): void;
        };
        getAQueue<T>(): import("../Global/Util/Queue.js").Queue<T>;
        merge<T_1, K>(target: T_1, newObject: K): T_1 & K;
        getEntityFlat3dArray(): {
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
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
        };
        getDataEncoder(): {
            setData(raw: number, value: number, offset: number, numBits: number): number;
            getData(raw: number, offset: number, numBits: number): number;
        };
        getMeshFaceDataByte(): {
            setAnimationType(animationType: number, rawData: number): number;
            getAnimationType(rawData: number): number;
        };
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
            getValue(x: number, y: number, z: number, array: Uint32Array): number;
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
        };
        getFaceByte(): {
            _rotationMap: Record<import("../Meta/Constructor/Mesher.types.js").Rotations, number>;
            _rotationReverseMap: Record<number, import("../Meta/Constructor/Mesher.types.js").Rotations>;
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
            setFaceTextureState(direction: import("../Meta/Util.types.js").DirectionNames, rotation: import("../Meta/Constructor/Mesher.types.js").Rotations, rawData: number): number;
            getFaceTextureState(direction: import("../Meta/Util.types.js").DirectionNames, rawData: number): import("../Meta/Constructor/Mesher.types.js").Rotations;
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
            getValue(x: number, y: number, z: number, array: Uint32Array): number;
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
        };
        getHeightByte(): {
            _getHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            initalizeChunk(chunkData: DataView): void;
            updateChunkMinMax(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, chunkData: DataView): void;
            getChunkMin(chunkData: DataView): number;
            getChunkMax(chunkData: DataView): number;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
            getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
            isSubstanceExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
            markSubstanceAsExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            markSubstanceAsNotExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            setMinYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMinYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
            setMaxYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMaxYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
        };
        getVoxelByte(): {
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
        getLightByte(): {
            SRS: number;
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
            getRGB(sl: number): number;
            setRGB(value: number, sl: number): number;
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
            minusOneForAll(sl: number): number;
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
            getRichPositionKey(x: number, y: number, z: number): string;
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
        degtoRad(degrees: number): number;
        radToDeg(radians: number): number;
    };
    settings: {
        context: "MatrixLoadedThread" | "DVEW" | "DVER" | "DVEC" | "DVEN" | "DVED" | "DVEFX" | "DVERW";
        settings: {
            nexus: {
                enabled: boolean;
                autoSyncChunks: boolean;
                autoSyncVoxelPalette: boolean;
            };
            data: {
                enabled: boolean;
                autoSyncChunks: boolean;
            };
            fx: {
                enabled: boolean;
                autoSyncChunks: boolean;
                autoSyncVoxelPalette: boolean;
            };
            server: {
                enabled: boolean;
            };
            richWorld: {
                enabled: boolean;
                autoSyncChunks: boolean;
                autoSyncVoxelPalette: boolean;
            };
            textureOptions: {
                animationTime: number;
                width: number;
                height: number;
            };
            updating: {
                autoRebuild: boolean;
            };
            world: {
                maxX: number;
                minX: number;
                maxZ: number;
                minZ: number;
                maxY: number;
                minY: number;
            };
            regions: {
                regionXPow2: number;
                regionYPow2: number;
                regionZPow2: number;
            };
            chunks: {
                autoHeightMap: boolean;
                chunkXPow2: number;
                chunkYPow2: number;
                chunkZPow2: number;
            };
            voxels: {
                doColors: boolean;
            };
            lighting: {
                doAO: boolean;
                doSunLight: boolean;
                doRGBLight: boolean;
                autoRGBLight: boolean;
                autoSunLight: boolean;
            };
            meshes: {
                clearChachedGeometry: boolean;
                checkMagmaCollisions: boolean;
                checkFluidCollisions: boolean;
                checkFloraCollisions: boolean;
                checkSolidCollisions: boolean;
                seralize: boolean;
                pickable: boolean;
            };
            materials: {
                mode: string;
                doAO: boolean;
                doSunLight: boolean;
                doRGBLight: boolean;
                disableFloraShaderEffects: boolean;
                disableFluidShaderEffects: boolean;
            };
        };
        setContext(context: "MatrixLoadedThread" | "DVEW" | "DVER" | "DVEC" | "DVEN" | "DVED" | "DVEFX" | "DVERW"): void;
        getSettings(): EngineSettingsData;
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
            getRichPositionKey(x: number, y: number, z: number): string;
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
        syncChunkInRichWorldThread(): boolean;
        richDataEnabled(): boolean;
        syncChunkInFXThread(): boolean;
        syncChunkInDataThread(): boolean;
        syncChunksInNexusThread(): boolean;
        doSunPropagation(): boolean;
        doRGBPropagation(): boolean;
        doLight(): boolean;
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
            getRichPositionKey(x: number, y: number, z: number): string;
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
        regions: Record<string, import("../Meta/Matrix/Matrix.types.js").WorldThreadMatrixRegionData>;
        isChunkInMatrix(x: number, y: number, z: number): boolean;
        isRegionInMatrix(x: number, y: number, z: number): boolean;
        isChunkLocked(x: number, y: number, z: number): boolean;
        lockChunk(x: number, y: number, z: number): boolean;
        unLockChunk(x: number, y: number, z: number): boolean;
        updateChunkData(x: number, y: number, z: number, run: (chunk: import("../Meta/index.js").ChunkData) => {}): false | Promise<boolean>;
        releaseChunk(x: number, y: number, z: number): boolean | undefined;
        createMatrixChunkSAB(x: number, y: number, z: number): false | SharedArrayBuffer[];
        getMatrixChunkSAB(x: number, y: number, z: number): false | SharedArrayBuffer[];
        getMatrixChunkData(x: number, y: number, z: number): false | {
            chunkStates: Uint8Array;
            chunkStatesSAB: SharedArrayBuffer;
        };
        getMatrixRegionData(x: number, y: number, z: number): false | import("../Meta/Matrix/Matrix.types.js").WorldThreadMatrixRegionData;
        addRegionToMatrix(x: number, y: number, z: number): import("../Meta/Matrix/Matrix.types.js").WorldThreadMatrixRegionData;
        removeRegionFromMatrix(x: number, y: number, z: number): false | undefined;
        deleteThreadFromRegion(threadId: string, x: number, y: number, z: number): false | undefined;
    };
    matrixCentralHub: {
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
            setChunkPosition(chunk: DataView, position: import("../Meta/Util.types.js").Position3Matrix): void;
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
            getVoxelDataUseObj(chunkData: DataView, position: import("../Meta/Util.types.js").Position3Matrix, secondary?: boolean): number;
            setVoxelDataUseObj(chunkData: DataView, position: import("../Meta/Util.types.js").Position3Matrix, data: number, secondary?: boolean): void;
            getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
            setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
            getChunkMinData(chunkData: DataView): number;
            setChunkMinData(chunkData: DataView, data: number): void;
            getChunkMaxData(chunkData: DataView): number;
            setChunkMaxData(chunkData: DataView, data: number): void;
        };
        threads: Record<string, import("../Libs/ThreadComm/Meta/Comm/Comm.types.js").CommPortTypes>;
        _threadMessageFunctions: Record<string, (data: any, event: MessageEvent<any>) => void>;
        registerThread(threadId: string, thread: import("../Libs/ThreadComm/Meta/Comm/Comm.types.js").CommPortTypes): void;
        syncChunk(x: number, y: number, z: number): false | undefined;
        syncChunkInThread(threadId: string, x: number, y: number, z: number): false | undefined;
        /**# Delete Chunk
         * ---
         * Deletes a chunk from world data and releases it from all threads.
         */
        releaseChunk(x: number, y: number, z: number): void;
        releaseChunkInThread(threadId: string, x: number, y: number, z: number): void;
        syncRegion(x: number, y: number, z: number): false | undefined;
        syncRegionInThread(threadId: string, x: number, y: number, z: number): false | undefined;
        releaseRegion(x: number, y: number, z: number): false | undefined;
        releaseRegionInThread(threadId: string, x: number, y: number, z: number): false | undefined;
        syncVoxelPalette(): void;
        syncVoxelPaletteInThread(threadId: string): void;
        syncVoxelData(): void;
        syncVoxelDataInThread(threadId: string): void;
    };
    voxelMatrix: {
        byteLength: {
            substance: number;
            shapeId: number;
            hardness: number;
            material: number;
            checkCollision: number;
            colliderId: number;
            lightSource: number;
            lightValue: number;
            totalLength: number;
        };
        indexes: {
            substance: number;
            shapeId: number;
            hardness: number;
            material: number;
            checkCollision: number;
            colliderId: number;
            lightSource: number;
            lightValue: number;
        };
        matrixMap: {
            shapeMap: Record<string, number>;
            substanceMap: Record<import("../Meta/index.js").VoxelSubstanceType, number>;
            substanceRecord: Record<number, import("../Meta/index.js").VoxelSubstanceType>;
            __shapeMapSet: boolean;
            isReady(): boolean;
            setShapeMap(shapeMap: Record<string, number>): void;
            flush(): void;
        };
        substanceMap: Record<import("../Meta/index.js").VoxelSubstanceType, number>;
        voxelData: {
            substance: number;
            shapeId: number;
            hardness: number;
            material: number;
            checkCollision: number;
            colliderId: number;
            lightSource: number;
            lightValue: number;
        };
        voxelDataMapped: {
            substance: string;
            shapeId: number;
            hardness: number;
            material: number;
            checkCollision: number;
            colliderId: number;
            lightSource: number;
            lightValue: number;
        };
        voxelBuffer: SharedArrayBuffer;
        voxelDataView: DataView;
        voxelMapBuffer: SharedArrayBuffer;
        voxelMap: Uint16Array;
        __isReady: boolean;
        $INIT(): void;
        getVoxelData(id: number): {
            substance: number;
            shapeId: number;
            hardness: number;
            material: number;
            checkCollision: number;
            colliderId: number;
            lightSource: number;
            lightValue: number;
        };
        getSubstance(id: number): number;
        getTrueSubstance(id: number): import("../Meta/index.js").VoxelSubstanceType;
        getShapeId(id: number): number;
        getHardness(id: number): number;
        getCheckCollisions(id: number): number;
        getColliderId(id: number): number;
        isLightSource(id: number): number;
        getLightValue(id: number): number;
    };
    matrixMap: {
        shapeMap: Record<string, number>;
        substanceMap: Record<import("../Meta/index.js").VoxelSubstanceType, number>;
        substanceRecord: Record<number, import("../Meta/index.js").VoxelSubstanceType>;
        __shapeMapSet: boolean;
        isReady(): boolean;
        setShapeMap(shapeMap: Record<string, number>): void;
        flush(): void;
    };
    fxComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    dataComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    nexusComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    parentComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    ccm: import("../Libs/ThreadComm/Manager/CommManager.js").CommManager & {
        syncChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number): void;
        releaseChunkInAllThreads(chunkX: number, chunkY: number, chunkZ: number): void;
        syncRegionInAllThreads(regionX: number, regionY: number, regionZ: number): void;
        releaseRegionInAllThreads(regionX: number, regionY: number, regionZ: number): void;
        tasks: {
            build: {
                chunk: (data: any) => number;
                entity: (x: number, y: number, z: number, width: number, depth: number, height: number, composed: number, voxelData: Uint32Array[], voxelStateData: Uint32Array[]) => number;
                item: (data: any) => number;
            };
            rgb: {
                update: (data: any) => number;
                remove: (data: any) => number;
            };
            worldSun: {
                fillWorldColumn: (data: any) => number;
                updateAtMaxY: (data: any) => number;
                floodAtMaxY: (data: any, threadNumber: number) => number;
            };
            sun: {
                update: (data: any) => number;
                remove: (data: any) => number;
            };
            flow: {
                update: (data: any) => number;
                remove: (data: any) => number;
            };
            worldGen: {
                generate: (data: any) => number;
            };
        };
    };
    richWorldComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase & {
        setInitalData(voxelId: string, x: number, y: number, z: number): void;
        removeRichData(x: number, y: number, z: number): void;
    };
    worldGeneration: {
        heightByte: {
            _getHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            initalizeChunk(chunkData: DataView): void;
            updateChunkMinMax(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, chunkData: DataView): void;
            getChunkMin(chunkData: DataView): number;
            getChunkMax(chunkData: DataView): number;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
            getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
            isSubstanceExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
            markSubstanceAsExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            markSubstanceAsNotExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            setMinYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMinYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
            setMaxYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMaxYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
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
            setChunkPosition(chunk: DataView, position: import("../Meta/Util.types.js").Position3Matrix): void;
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
            getVoxelDataUseObj(chunkData: DataView, position: import("../Meta/Util.types.js").Position3Matrix, secondary?: boolean): number;
            setVoxelDataUseObj(chunkData: DataView, position: import("../Meta/Util.types.js").Position3Matrix, data: number, secondary?: boolean): void;
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
            registerVoxel(voxel: import("../Meta/index.js").VoxelData): void;
            getVoxelPartentId(id: number): number;
            /**# Divine Voxel Engine World
             * ---
             * This handles everything in the world worker context.
             */
            getVoxelState(voxelId: number): number;
            getVoxelPalette(): Record<number, string>;
            getVoxelPaletteMap(): Record<string, number>;
        };
        getBlankRegion(): import("../Meta/World/WorldData/World.types.js").WorldRegion;
        createChunkFromDataThread(data: any[]): import("../Meta/index.js").ChunkData;
        createChunkFromServer(data: ArrayBuffer): import("../Meta/index.js").ChunkData;
        getBlankChunk(empty?: boolean, proto?: boolean): import("../Meta/index.js").ChunkData;
    };
    worldData: {
        currentDimension: string;
        dimensions: import("../Meta/World/WorldData/World.types.js").WorldDimensions;
        regions: Record<string, import("../Meta/World/WorldData/World.types.js").WorldRegion>;
        tempVoxelData: DataView;
        heightByte: {
            _getHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("../Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            initalizeChunk(chunkData: DataView): void;
            updateChunkMinMax(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, chunkData: DataView): void;
            getChunkMin(chunkData: DataView): number;
            getChunkMax(chunkData: DataView): number;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
            getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
            isSubstanceExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
            markSubstanceAsExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            markSubstanceAsNotExposed(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            setMinYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMinYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
            setMaxYForSubstance(height: number, substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMaxYForSubstance(substance: import("../Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
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
            setChunkPosition(chunk: DataView, position: import("../Meta/Util.types.js").Position3Matrix): void;
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
            getVoxelDataUseObj(chunkData: DataView, position: import("../Meta/Util.types.js").Position3Matrix, secondary?: boolean): number;
            setVoxelDataUseObj(chunkData: DataView, position: import("../Meta/Util.types.js").Position3Matrix, data: number, secondary?: boolean): void;
            getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
            setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
            getChunkMinData(chunkData: DataView): number;
            setChunkMinData(chunkData: DataView, data: number): void;
            getChunkMaxData(chunkData: DataView): number;
            setChunkMaxData(chunkData: DataView, data: number): void;
        };
        lightByte: {
            SRS: number;
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
            getRGB(sl: number): number;
            setRGB(value: number, sl: number): number;
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
            minusOneForAll(sl: number): number;
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
            getValue(x: number, y: number, z: number, array: Uint32Array): number;
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
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
            getRichPositionKey(x: number, y: number, z: number): string;
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
        setCurrentDimension(dimension: string): void;
        registerDimension(dimension: string | string[]): void;
        runRebuildCheck(x: number, y: number, z: number): void;
        __lightQueCheck(remove: boolean | undefined, x: number, y: number, z: number): void;
        runLightUpdateCheck(x: number, y: number, z: number, remove?: boolean): void;
        setAir(x: number, y: number, z: number, lightValue: number): void;
        setLight(x: number, y: number, z: number, lightValue: number): void;
        getLight(x: number, y: number, z: number): number;
        removeData(x: number, y: number, z: number): false | undefined;
        getLevelState(x: number, y: number, z: number): number;
        setLevelState(state: number, x: number, y: number, z: number): void;
        getData(x: number, y: number, z: number, state?: boolean): number | false;
        setData(x: number, y: number, z: number, data: number, state?: boolean): boolean;
        getVoxelPaletteId(voxelId: string, voxelStateId: number): number;
        getVoxel(x: number, y: number, z: number, secondary?: boolean): false | [number | import("../Meta/index.js").VoxelData, string | number, number];
        addRegion(x: number, y: number, z: number): import("../Meta/World/WorldData/World.types.js").WorldRegion;
        getRegion(x: number, y: number, z: number): false | import("../Meta/World/WorldData/World.types.js").WorldRegion;
        addChunk(x: number, y: number, z: number): import("../Meta/index.js").ChunkData;
        paintVoxel(voxelId: string, voxelStateId: number, shapeState: number, x: number, y: number, z: number): void;
        addOrGetChunk(x: number, y: number, z: number): import("../Meta/index.js").ChunkData;
        _getStartingLevel(voxelData: import("../Meta/index.js").VoxelData, stateData: number): number;
        paintDualVoxel(voxelId: string, voxelStateId: number, shapeState: number, secondVoxelId: string, secondVoxelStateId: number, x: number, y: number, z: number): void;
        __handleHeightMapUpdateForVoxelAdd(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, substance: import("../Meta/index.js").VoxelSubstanceType, chunk: import("../Meta/index.js").ChunkData): void;
        __handleHeightMapUpdateForVoxelRemove(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, voxelData: import("../Meta/index.js").VoxelData, chunk: import("../Meta/index.js").ChunkData): void;
        getChunk(x: number, y: number, z: number): false | import("../Meta/index.js").ChunkData;
        removeChunk(x: number, y: number, z: number): false | undefined;
        setChunk(x: number, y: number, z: number, chunk: import("../Meta/index.js").ChunkData, doNotSyncInThreads?: boolean): void;
        __runLightRemoveAndUpdates(remove?: boolean, update?: boolean): Promise<void>;
        requestVoxelAddFromRaw(rawData1: number, rawData2: number, x: number, y: number, z: number): Promise<false | DataView>;
        getRawVoxelData(voxelId: string, voxelStateId: number, shapeState: number): false | DataView;
        requestVoxelAdd(voxelId: string, voxelStateId: number, shapeState: number, x: number, y: number, z: number): Promise<false | DataView>;
        requestVoxelBeRemoved(x: number, y: number, z: number): Promise<void>;
        getWorldColumn(x: number, z: number): false | Record<string, import("../Meta/index.js").ChunkData> | undefined;
        getRelativeMaxWorldColumnHeight(x: number, z: number): number;
        getAbsoluteHeightOfWorldColumn(x: number, z: number): number;
        fillWorldCollumnWithChunks(x: number, z: number): void;
    };
    entityConstructor: {
        voxelData: Uint32Array[] | null;
        voxelStateData: Uint32Array[] | null;
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
            getValue(x: number, y: number, z: number, array: Uint32Array): number;
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
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
        lightByte: {
            SRS: number;
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
            getRGB(sl: number): number;
            setRGB(value: number, sl: number): number;
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
            minusOneForAll(sl: number): number;
        };
        pos: {
            x: number;
            y: number;
            z: number;
        };
        composed: number;
        width: number;
        depth: number;
        height: number;
        begin(width: number, height: number, depth: number, composed?: number): void;
        setLight(s: number, r: number, g: number, b: number, x: number, y: number, z: number, composed?: number): void;
        fillLight(s: number, r: number, g: number, b: number, composed?: number): void;
        addVoxel(voxelId: string, voxelStateId: number, shapeState: number, x: number, y: number, z: number, composed?: number): void;
        build(x: number, y: number, z: number): void;
    };
    voxelManager: {
        voxelData: Record<string, import("../Meta/index.js").VoxelData>;
        _onRegister: (data: import("../Meta/index.js").VoxelData) => void;
        getVoxelData(id: string): import("../Meta/index.js").VoxelData;
        registerVoxelData(data: import("../Meta/index.js").VoxelData): void;
        onRegister(func: (data: import("../Meta/index.js").VoxelData) => void): void;
    };
    itemManager: {
        itemData: Record<string, import("../Meta/Items/Item.types.js").ItemData>;
        _onRegister: (data: import("../Meta/Items/Item.types.js").ItemData) => void;
        getItemData(id: string): import("../Meta/Items/Item.types.js").ItemData;
        registerItemData(data: import("../Meta/Items/Item.types.js").ItemData): void;
        onRegister(func: (data: import("../Meta/Items/Item.types.js").ItemData) => void): void;
    };
    queues: {
        $INIT(): void;
        rgb: {
            update: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").LightUpdateTask>;
            remove: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").LightUpdateTask>;
        };
        worldSun: {
            add(x: number, z: number, queueId?: string): void;
            run(): Promise<void>;
            __steps: {
                step1: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<[number, number, number]>;
                step2: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<[number, number, number, number]>;
                step3: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<[number, number, number, number]>;
            };
        };
        sun: {
            update: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").LightUpdateTask>;
            remove: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").LightUpdateTask>;
        };
        flow: {
            update: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").LightUpdateTask>;
            remove: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").LightUpdateTask>;
        };
        build: {
            chunk: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").LightUpdateTask>;
        };
        generate: {
            chunk: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").LightUpdateTask>;
        };
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
    buildChunk(chunkX: number, chunkY: number, chunkZ: number, LOD?: number): void;
    generate(x: number, z: number, data?: any): void;
    buildWorldColumn(x: number, z: number, LOD?: number): false | undefined;
    createItem(itemId: string, x: number, y: number, z: number): void;
    $INIT(data: DVEWInitData): Promise<void>;
    addChunkFromServer(data: ArrayBuffer): void;
};
export declare type DivineVoxelEngineWorld = typeof DVEW;
