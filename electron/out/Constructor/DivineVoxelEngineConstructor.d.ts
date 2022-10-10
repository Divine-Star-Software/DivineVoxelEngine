import type { EngineSettingsData } from "Meta/index.js";
import type { DVECInitData } from "Meta/Constructor/DVEC.js";
export declare const DVEC: {
    environment: "node" | "browser";
    __settingsHaveBeenSynced: boolean;
    __connectedToWorld: boolean;
    __queueStatesSet: boolean;
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
        getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
        getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
        setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
        setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
        setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
        deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
        deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
        getIndex(x: number, y: number, z: number): number;
        getXYZ(index: number): import("Meta/index.js").Position3Matrix;
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
        getChunkKey(chunkPOS: import("Meta/index.js").Position3Matrix): string;
        getChunkKeyFromPosition(x: number, y: number, z: number): string;
        getRegionKey(regionPOS: import("Meta/index.js").Position3Matrix): string;
        getRegionKeyFromPosition(x: number, y: number, z: number): string;
        getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index.js").Position3Matrix): {
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
        getWorldColumnKeyFromObj(position: import("Meta/index.js").Position3Matrix): string;
        getWorldColumnKey(x: number, z: number): string;
        getWorldColumnPosition(x: number, z: number): {
            x: number;
            z: number;
        };
    };
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
            setChunkPosition(chunk: DataView, position: import("Meta/index.js").Position3Matrix): void;
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
            getVoxelDataUseObj(chunkData: DataView, position: import("Meta/index.js").Position3Matrix, secondary?: boolean): number;
            setVoxelDataUseObj(chunkData: DataView, position: import("Meta/index.js").Position3Matrix, data: number, secondary?: boolean): void;
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
            getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("Meta/index.js").Position3Matrix;
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
            getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("Meta/index.js").Position3Matrix;
        };
        getFaceByte(): {
            _rotationMap: Record<import("../Meta/Constructor/Mesher.types.js").Rotations, number>;
            _rotationReverseMap: Record<number, import("../Meta/Constructor/Mesher.types.js").Rotations>;
            _setFaceTextureState: Record<import("Meta/index.js").DirectionNames, (state: number, faceBit: number) => number>;
            _getFaceTextureState: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
            _setFaceRotateState: Record<import("Meta/index.js").DirectionNames, (state: number, faceBit: number) => number>;
            _getFaceRotateState: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
            _markExposedFace: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
            _checkExposedFace: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => boolean>;
            markFaceAsExposed(direction: import("Meta/index.js").DirectionNames, rawData: number): number;
            isFaceExposed(direction: import("Meta/index.js").DirectionNames, rawData: number): boolean;
            setFaceRotateState(direction: import("Meta/index.js").DirectionNames, state: number, rawData: number): number;
            getFaceRotateState(direction: import("Meta/index.js").DirectionNames, rawData: number): number;
            setFaceTextureState(direction: import("Meta/index.js").DirectionNames, rotation: import("../Meta/Constructor/Mesher.types.js").Rotations, rawData: number): number;
            getFaceTextureState(direction: import("Meta/index.js").DirectionNames, rawData: number): import("../Meta/Constructor/Mesher.types.js").Rotations;
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
            getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("Meta/index.js").Position3Matrix;
        };
        getHeightByte(): {
            _getHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            initalizeChunk(chunkData: DataView): void;
            updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, chunkData: DataView): void;
            getChunkMin(chunkData: DataView): number;
            getChunkMax(chunkData: DataView): number;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
            getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
            isSubstanceExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
            markSubstanceAsExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            markSubstanceAsNotExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            setMinYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMinYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
            setMaxYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMaxYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
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
            getChunkKey(chunkPOS: import("Meta/index.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("Meta/index.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index.js").Position3Matrix): {
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
            getWorldColumnKeyFromObj(position: import("Meta/index.js").Position3Matrix): string;
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
        context: "DVEW" | "DVER" | "DVEP" | "DVEB" | "DVEC" | "DVEN" | "DVEFX" | "DVERW" | "MatrixLoadedThread";
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
        setContext(context: "DVEW" | "DVER" | "DVEP" | "DVEB" | "DVEC" | "DVEN" | "DVEFX" | "DVERW" | "MatrixLoadedThread"): void;
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
            getChunkKey(chunkPOS: import("Meta/index.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("Meta/index.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index.js").Position3Matrix): {
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
            getWorldColumnKeyFromObj(position: import("Meta/index.js").Position3Matrix): string;
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
    DVEB: {
        textureManager: {
            textureDataHasBeenSet: boolean;
            uvTextureMap: Record<import("Meta/index.js").TextureTypes, Record<string, number>>;
            overlayUVTextureMap: Record<import("Meta/index.js").TextureTypes, Record<string, number>>;
            getTextureUV(textureType: import("Meta/index.js").TextureTypes, textureId: string, varation?: string | false | null, overlay?: boolean): number;
            setUVTextureMap(data: Record<import("Meta/index.js").TextureTypes, Record<string, number>>): void;
            setOverlayUVTextureMap(data: Record<import("Meta/index.js").TextureTypes, Record<string, number>>): void;
            releaseTextureData(): void;
            isReady(): boolean;
        };
        shapeManager: {
            shapes: Record<number, import("Meta/index.js").VoxelShapeInterface>;
            shapeMap: Record<string, number>;
            shapeCount: number;
            registerShape(shapeObject: import("Meta/index.js").VoxelShapeInterface): void;
            getShape(shapeId: number): import("Meta/index.js").VoxelShapeInterface;
            getShapeId(shapeId: string): number;
            getShapeMap(): Record<string, number>;
        };
        shapeHelper: {
            faceByte: {
                _rotationMap: Record<import("../Meta/Constructor/Mesher.types.js").Rotations, number>;
                _rotationReverseMap: Record<number, import("../Meta/Constructor/Mesher.types.js").Rotations>;
                _setFaceTextureState: Record<import("Meta/index.js").DirectionNames, (state: number, faceBit: number) => number>;
                _getFaceTextureState: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
                _setFaceRotateState: Record<import("Meta/index.js").DirectionNames, (state: number, faceBit: number) => number>;
                _getFaceRotateState: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
                _markExposedFace: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
                _checkExposedFace: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => boolean>;
                markFaceAsExposed(direction: import("Meta/index.js").DirectionNames, rawData: number): number;
                isFaceExposed(direction: import("Meta/index.js").DirectionNames, rawData: number): boolean;
                setFaceRotateState(direction: import("Meta/index.js").DirectionNames, state: number, rawData: number): number;
                getFaceRotateState(direction: import("Meta/index.js").DirectionNames, rawData: number): number;
                setFaceTextureState(direction: import("Meta/index.js").DirectionNames, rotation: import("../Meta/Constructor/Mesher.types.js").Rotations, rawData: number): number;
                getFaceTextureState(direction: import("Meta/index.js").DirectionNames, rawData: number): import("../Meta/Constructor/Mesher.types.js").Rotations;
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
            meshFaceData: {
                setAnimationType(animationType: number, rawData: number): number;
                getAnimationType(rawData: number): number;
            };
            lightMap: number[];
            shouldFaceFlip(faceBit: number, faceDirection: import("Meta/index.js").DirectionNames): boolean;
            getTextureRotation(faceBit: number, faceDirection: import("Meta/index.js").DirectionNames): import("../Meta/Constructor/Mesher.types.js").Rotations;
            isFaceExposexd(faceBit: number, faceDirection: import("Meta/index.js").DirectionNames): boolean;
            produceShapeReturnData(shapeData: import("Meta/index.js").VoxelShapeAddData): import("Meta/index.js").VoxelShapeAddReturnData;
            toLinearSpace(r: number, g: number, b: number, a: number): number[];
            addFaceData(faceData: number, faceDataArray: number[]): void;
            calculateLightColor(RGBlightColors: number[], sunlightColors: number[], lightTemplate: number[], startIndex: number): void;
            calculateLightColorFromValue(RGBlightColors: number[], sunlightColors: number[], lightValue: number): void;
            calculateSunightColor(sunLight: number[], sunLightTemplate: number[], sunLightIndex: number): void;
            calculateAOColor(aoColors: number[], aoTemplate: number[], aoTemplateIndex: number): void;
            calculateAOColorFromValue(aoColors: number[], aoValue: number): void;
        };
        shapeBuilder: {
            faceFunctions: Record<import("Meta/index.js").DirectionNames, (origin: import("Meta/index.js").Position3Matrix, dimensions: {
                width: number;
                height: number;
                depth: number;
            }, data: import("Meta/index.js").VoxelShapeAddData | import("../Meta/Constructor/ItemShape.type.js").CreateItemData, transform: {
                v1: {
                    x: number;
                    y: number;
                    z: number;
                };
                v2: {
                    x: number;
                    y: number;
                    z: number;
                };
                v3: {
                    x: number;
                    y: number;
                    z: number;
                };
                v4: {
                    x: number;
                    y: number;
                    z: number;
                };
            }, flip?: boolean | undefined) => void>;
            addFace(direction: import("Meta/index.js").DirectionNames, origin: import("Meta/index.js").Position3Matrix, dimensions: {
                width: number;
                height: number;
                depth: number;
            }, data: import("Meta/index.js").VoxelShapeAddData | import("../Meta/Constructor/ItemShape.type.js").CreateItemData, flip?: boolean, transform?: {
                v1: {
                    x: number;
                    y: number;
                    z: number;
                };
                v2: {
                    x: number;
                    y: number;
                    z: number;
                };
                v3: {
                    x: number;
                    y: number;
                    z: number;
                };
                v4: {
                    x: number;
                    y: number;
                    z: number;
                };
            }): void;
        };
        uvHelper: {
            uvRotations: Record<"top" | "bottom" | "side", Record<import("../Meta/Constructor/Mesher.types.js").Rotations, (uv: number, ws: number, we: number, hs: number, he: number, flipped: boolean, uvs: number[]) => void>>;
            advancedUVs: Record<"top" | "bottom" | "side", (uv: number, ws1: number, ws2: number, we1: number, we2: number, hs1: number, hs2: number, he1: number, he2: number, uvs: number[]) => void>;
            uvFunctions: Record<import("Meta/index.js").DirectionNames, (data: import("../Meta/Constructor/Mesher.types.js").UVFunctionData) => void>;
            addUVs(face: import("Meta/index.js").DirectionNames, data: import("../Meta/Constructor/Mesher.types.js").UVFunctionData): void;
            addAdvancedUVs(uv: number, uvs: number, ws1: number, ws2: number, we1: number, we2: number, hs1: number, hs2: number, he1: number, he2: number): void;
            processOverlayUVs(data: import("Meta/index.js").VoxelShapeAddData): void;
        };
        chunkMesher: {
            voxelBuildOrder: import("Meta/index.js").VoxelTemplateSubstanceType[];
            voxelTypeMap: {
                solid: number;
                flora: number;
                fluid: number;
                magma: number;
            };
            buildChunkMesh(chunkX: number, chunkY: number, chunkZ: number, template: import("../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate, LOD?: number): void;
        };
        entityMesher: {
            buildEntityMesh(x: number, y: number, z: number, template: import("../Meta/Constructor/ChunkTemplate.types.js").ChunkTemplate): void;
        };
        itemMesher: {
            createItem(itemId: string, x: number, y: number, z: number): void;
        };
        processor: {
            LOD: number;
            heightByte: {
                _getHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
                _setHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
                _markSubstanceAsNotExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
                _markSubstanceAsExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
                _isSubstanceExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
                getStartingHeightMapValue(): number;
                initalizeChunk(chunkData: DataView): void;
                updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, chunkData: DataView): void;
                getChunkMin(chunkData: DataView): number;
                getChunkMax(chunkData: DataView): number;
                calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
                calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
                getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
                isSubstanceExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
                markSubstanceAsExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                markSubstanceAsNotExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                setMinYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                getMinYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
                setMaxYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                getMaxYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
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
            faceByte: {
                _rotationMap: Record<import("../Meta/Constructor/Mesher.types.js").Rotations, number>;
                _rotationReverseMap: Record<number, import("../Meta/Constructor/Mesher.types.js").Rotations>;
                _setFaceTextureState: Record<import("Meta/index.js").DirectionNames, (state: number, faceBit: number) => number>;
                _getFaceTextureState: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
                _setFaceRotateState: Record<import("Meta/index.js").DirectionNames, (state: number, faceBit: number) => number>;
                _getFaceRotateState: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
                _markExposedFace: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => number>;
                _checkExposedFace: Record<import("Meta/index.js").DirectionNames, (faceBit: number) => boolean>;
                markFaceAsExposed(direction: import("Meta/index.js").DirectionNames, rawData: number): number;
                isFaceExposed(direction: import("Meta/index.js").DirectionNames, rawData: number): boolean;
                setFaceRotateState(direction: import("Meta/index.js").DirectionNames, state: number, rawData: number): number;
                getFaceRotateState(direction: import("Meta/index.js").DirectionNames, rawData: number): number;
                setFaceTextureState(direction: import("Meta/index.js").DirectionNames, rotation: import("../Meta/Constructor/Mesher.types.js").Rotations, rawData: number): number;
                getFaceTextureState(direction: import("Meta/index.js").DirectionNames, rawData: number): import("../Meta/Constructor/Mesher.types.js").Rotations;
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
                getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
                setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
                deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("Meta/index.js").Position3Matrix;
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
                    getValue(x: number, y: number, z: number, array: Uint32Array): number;
                    getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                    getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                    setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
                    setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                    setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                    deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
                    deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
                    getIndex(x: number, y: number, z: number): number;
                    getXYZ(index: number): import("Meta/index.js").Position3Matrix;
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
                    getChunkKey(chunkPOS: import("Meta/index.js").Position3Matrix): string;
                    getChunkKeyFromPosition(x: number, y: number, z: number): string;
                    getRegionKey(regionPOS: import("Meta/index.js").Position3Matrix): string;
                    getRegionKeyFromPosition(x: number, y: number, z: number): string;
                    getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index.js").Position3Matrix): {
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
                    getWorldColumnKeyFromObj(position: import("Meta/index.js").Position3Matrix): string;
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
                heightByte: {
                    _getHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
                    _setHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
                    _markSubstanceAsNotExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
                    _markSubstanceAsExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
                    _isSubstanceExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
                    getStartingHeightMapValue(): number;
                    initalizeChunk(chunkData: DataView): void;
                    updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, chunkData: DataView): void;
                    getChunkMin(chunkData: DataView): number;
                    getChunkMax(chunkData: DataView): number;
                    calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
                    calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                    getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
                    getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
                    isSubstanceExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
                    markSubstanceAsExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                    markSubstanceAsNotExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                    setMinYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                    getMinYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
                    setMaxYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                    getMaxYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
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
                    setChunkPosition(chunk: DataView, position: import("Meta/index.js").Position3Matrix): void;
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
                    getVoxelDataUseObj(chunkData: DataView, position: import("Meta/index.js").Position3Matrix, secondary?: boolean): number;
                    setVoxelDataUseObj(chunkData: DataView, position: import("Meta/index.js").Position3Matrix, data: number, secondary?: boolean): void;
                    getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
                    setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
                    getChunkMinData(chunkData: DataView): number;
                    setChunkMinData(chunkData: DataView, data: number): void;
                    getChunkMaxData(chunkData: DataView): number;
                    setChunkMaxData(chunkData: DataView, data: number): void;
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
                        substanceMap: Record<import("Meta/index.js").VoxelSubstanceType, number>;
                        substanceRecord: Record<number, import("Meta/index.js").VoxelSubstanceType>;
                    };
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
                    voxelDataView: DataView;
                    voxelMap: Uint16Array;
                    syncData(voxelBuffer: SharedArrayBuffer, voxelMapBuffer: SharedArrayBuffer): void;
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
                    getTrueSubstance(id: number): import("Meta/index.js").VoxelSubstanceType;
                    getShapeId(id: number): number;
                    getHardness(id: number): number;
                    getCheckCollisions(id: number): number;
                    getColliderId(id: number): number;
                    isLightSource(id: number): boolean;
                    getLightValue(id: number): number;
                };
                _air: [string, number];
                _barrier: [string, number];
                updateDieTime: number;
                loadDieTime: number;
                regions: import("../Meta/Matrix/Matrix.types.js").MatrixLoadedRegion;
                chunks: Record<string, Uint32Array>;
                chunkStates: Record<string, Uint8Array>;
                paletteMode: number;
                voxelPalette: Record<number, string>;
                voxelPaletteMap: Record<string, number>;
                voxelManager: import("../Meta/Voxels/VoxelManager.types.js").VoxelManagerInterface | null;
                lightValueFunctions: {
                    r: (value: number) => number;
                    g: (value: number) => number;
                    b: (value: number) => number;
                    s: (value: number) => number;
                };
                threadName: string;
                setVoxelManager(voxelManager: import("../Meta/Voxels/VoxelManager.types.js").VoxelManagerInterface): void;
                syncChunkBounds(): void;
                getVoxelPaletteNumericId(voxelId: string, voxelState: number): number;
                awaitChunkLoad(x: number, y: number, z: number, timeout?: number): Promise<boolean>;
                __setGlobalVoxelPalette(palette: Record<number, string>, map: Record<string, number>): void;
                getVoxel(x: number, y: number, z: number, secondary?: boolean): false | [string, number];
                getVoxelShapeState(x: number, y: number, z: number): number;
                getLevel(x: number, y: number, z: number): number;
                setLevel(level: number, x: number, y: number, z: number): void;
                getLevelState(x: number, y: number, z: number): number;
                setLevelState(state: number, x: number, y: number, z: number): void;
                setVoxel(voxelId: string, voxelStateId: number, shapeState: number, x: number, y: number, z: number): false | undefined;
                __handleHeightMapUpdateForVoxelAdd(voxelPOS: import("Meta/index.js").Position3Matrix, voxelSubstance: import("Meta/index.js").VoxelSubstanceType, chunk: import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk): void;
                getVoxelPaletteIdForWorldGen(voxelId: string, voxelStateId: number): number;
                getVoxelData(x: number, y: number, z: number, secondary?: boolean): false | import("Meta/index.js").VoxelData;
                _createRegion(x: number, y: number, z: number): {
                    chunks: {};
                };
                __setChunk(x: number, y: number, z: number, chunkData: SharedArrayBuffer, chunkStates: SharedArrayBuffer): void;
                getVoxelSubstance(x: number, y: number, z: number, secondary?: boolean): import("Meta/index.js").VoxelSubstanceType;
                getVoxelShapeId(x: number, y: number, z: number, secondary?: boolean): number;
                isVoxelALightSource(x: number, y: number, z: number, secondary?: boolean): boolean;
                getLightSourceValue(x: number, y: number, z: number, secondary?: boolean): number;
                isAir(x: number, y: number, z: number): boolean;
                getRegion(x: number, y: number, z: number): false | {
                    palette?: import("../Meta/World/WorldData/World.types.js").WorldRegionPalette | undefined;
                    chunks: Record<string, Record<string, import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk>>;
                };
                __removeChunk(x: number, y: number, z: number): false | undefined;
                getChunk(x: number, y: number, z: number): false | import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk;
                getWorldColumn(x: number, z: number): false | Record<string, import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk>;
                isChunkLocked(x: number, y: number, z: number): boolean;
                lockChunk(x: number, y: number, z: number): boolean;
                unLockChunk(x: number, y: number, z: number): boolean;
                updateChunkData(x: number, y: number, z: number, run: (chunk: import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk) => {}): false | Promise<boolean>;
                setData(x: number, y: number, z: number, data: number, state?: boolean): boolean;
                getData(x: number, y: number, z: number, state?: boolean): number;
                getVoxelNumberID(x: number, y: number, z: number, secondary?: boolean): number | false;
                getLight(x: number, y: number, z: number): number;
                setAir(x: number, y: number, z: number, lightValue: number): void;
                setFullSun(x: number, y: number, z: number): void;
                setLight(x: number, y: number, z: number, lightValue: number): void;
                getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s"): number;
                sameVoxel(x: number, y: number, z: number, cx: number, cy: number, cz: number): boolean;
            };
            calculatFlow: typeof import("./Builder/Processor/Functions/CalculateFlow.js").CalculateFlow;
            voxellightMixCalc: typeof import("./Builder/Processor/Functions/CalculateVoxelLight.js").VoxelLightMixCalc;
            doVoxelLight: typeof import("./Builder/Processor/Functions/CalculateVoxelLight.js").CalculateVoxelLight;
            chunkTemplates: Record<number, Record<number, number[][]>>;
            exposedFaces: number[];
            faceStates: number[];
            textureRotation: import("../Meta/Constructor/Mesher.types.js").Rotations[];
            settings: {
                doAO: boolean;
                doSun: boolean;
                doRGB: boolean;
                ignoreSun: boolean;
                entity: boolean;
                composedEntity: number;
            };
            voxelProcesseData: import("../Meta/Constructor/Voxel.types.js").VoxelProcessData;
            cullFaceOverrideData: any;
            aoOverRideData: any;
            template: import("../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate;
            faceIndexMap: Record<import("Meta/index.js").DirectionNames, number>;
            $INIT(): void;
            getVoxelSubstance(x: number, y: number, z: number, getSecond?: boolean): import("Meta/index.js").VoxelSubstanceType;
            getVoxelShapeId(x: number, y: number, z: number, getSecond?: boolean): number;
            getVoxel(x: number, y: number, z: number, getSecond?: boolean): false | [string, number];
            getVoxelShapeState(x: number, y: number, z: number, getSecond?: boolean): number;
            getVoxelLevel(x: number, y: number, z: number, getSecond?: boolean): number;
            getVoxelLevelState(x: number, y: number, z: number, getSecond?: boolean): number;
            getLight(x: number, y: number, z: number): number;
            cullCheck(face: import("Meta/index.js").DirectionNames, voxelId: string, voxelShapeId: number, voxelSubstance: import("Meta/index.js").VoxelSubstanceType, shapeState: number, x: number, y: number, z: number, faceBit: number): number;
            faceStateCheck(face: import("Meta/index.js").DirectionNames, faceBit: number): number;
            _process(template: import("../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate, x: number, y: number, z: number, doSecondCheck?: boolean): void;
            constructEntity(composed?: number): import("../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate;
            makeAllChunkTemplates(chunk: import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk, chunkX: number, chunkY: number, chunkZ: number, LOD?: number): import("../Meta/Constructor/ChunkTemplate.types.js").FullChunkTemplate;
            processVoxelLight(data: import("../Meta/Constructor/Voxel.types.js").VoxelProcessData, ignoreAO?: boolean): void;
            syncSettings(settings: EngineSettingsData): void;
            flush(): void;
        };
        voxelHelper: {
            substanceMap: Record<import("Meta/index.js").VoxelSubstanceType, number>;
            substanceRules: Record<string, boolean>;
            ruleMap: Record<number, boolean>;
            $INIT(): void;
            substanceRuleCheck(voxel: import("Meta/index.js").VoxelSubstanceType, neightborVoxel: import("Meta/index.js").VoxelSubstanceType): boolean;
        };
        entityConstructor: {
            voxelData: Uint32Array[];
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
                getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
                setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
                deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
                getIndex(x: number, y: number, z: number): number;
                getXYZ(index: number): import("Meta/index.js").Position3Matrix;
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
            totalComposed: number;
            width: number;
            depth: number;
            height: number;
            setEntityData(x: number, y: number, z: number, width: number, height: number, depth: number, composed: number, voxelData: Uint32Array[]): void;
            getVoxel(x: number, y: number, z: number, composed?: number): false | [string, number];
            getLevel(x: number, y: number, z: number, composed?: number): number;
            getLevelState(x: number, y: number, z: number, composed?: number): number;
            getShapeState(x: number, y: number, z: number, composed?: number): number;
            getLight(x: number, y: number, z: number, composed?: number): number;
            clearEntityData(): void;
        };
        $INIT(): Promise<void>;
        syncSettings(settings: EngineSettingsData): void;
        buildChunk(chunkX: number, chunkY: number, chunkZ: number, LOD?: number): Promise<true | undefined>;
        constructEntity(): void;
    };
    DVEP: {
        illumination: {
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
            air: number[];
            runSunLightUpdateAt: typeof import("./Propagation/Illumanation/Functions/SunLight.js").runSunLightUpdateAt;
            runSunLightUpdate: typeof import("./Propagation/Illumanation/Functions/SunLight.js").runSunLightUpdate;
            runSunLightRemove: typeof import("./Propagation/Illumanation/Functions/SunLight.js").runSunLightRemove;
            runSunLightRemoveAt: typeof import("./Propagation/Illumanation/Functions/SunLight.js").runSunLightRemoveAt;
            populateWorldColumnWithSunLight: typeof import("./Propagation/Illumanation/Functions/SunLight.js").PopulateWorldColumnWithSunLight;
            runSunLightUpdateAtMaxY: typeof import("./Propagation/Illumanation/Functions/SunLight.js").RunSunLightUpdateAtMaxY;
            runSunLightFloodDown: typeof import("./Propagation/Illumanation/Functions/SunLight.js").RunSunLightFloodDown;
            runSunLightFloodOut: typeof import("./Propagation/Illumanation/Functions/SunLight.js").RunSunLightFloodOut;
            sunLightAboveCheck: typeof import("./Propagation/Illumanation/Functions/SunLight.js").SunLightAboveCheck;
            _sunLightUpdateQue: import("../Global/Util/Queue.js").Queue<number[]>;
            _sunLightFloodDownQue: import("../Global/Util/Queue.js").Queue<number[]>;
            _sunLightFloodOutQue: Record<string, import("../Global/Util/Queue.js").Queue<number[]>>;
            _sunLightRemoveQue: number[][];
            runRGBFloodFillAt: typeof import("./Propagation/Illumanation/Functions/RGBFloodLight.js").runRGBFloodFillAt;
            runRGBFloodFill: typeof import("./Propagation/Illumanation/Functions/RGBFloodLight.js").runRGBFloodFill;
            runRGBFloodRemoveAt: typeof import("./Propagation/Illumanation/Functions/RGBFloodLight.js").runRGBFloodRemoveAt;
            runRGBFloodRemove: typeof import("./Propagation/Illumanation/Functions/RGBFloodLight.js").runRGBFloodRemove;
            _RGBlightUpdateQue: number[][];
            _RGBlightRemovalQue: number[][];
            _visitMap: Record<string, boolean>;
            checkForSunLight(x: number, y: number, z: number): void;
            checkForRGBLight(x: number, y: number, z: number): void;
        };
        flow: {
            currentVoxel: string;
            worldMatrx: {
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
                    getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                    getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
                    setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
                    setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                    setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
                    deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
                    deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
                    getIndex(x: number, y: number, z: number): number;
                    getXYZ(index: number): import("Meta/index.js").Position3Matrix;
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
                    getChunkKey(chunkPOS: import("Meta/index.js").Position3Matrix): string;
                    getChunkKeyFromPosition(x: number, y: number, z: number): string;
                    getRegionKey(regionPOS: import("Meta/index.js").Position3Matrix): string;
                    getRegionKeyFromPosition(x: number, y: number, z: number): string;
                    getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index.js").Position3Matrix): {
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
                    getWorldColumnKeyFromObj(position: import("Meta/index.js").Position3Matrix): string;
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
                heightByte: {
                    _getHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
                    _setHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
                    _markSubstanceAsNotExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
                    _markSubstanceAsExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
                    _isSubstanceExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
                    getStartingHeightMapValue(): number;
                    initalizeChunk(chunkData: DataView): void;
                    updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, chunkData: DataView): void;
                    getChunkMin(chunkData: DataView): number;
                    getChunkMax(chunkData: DataView): number;
                    calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
                    calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                    getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
                    getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
                    isSubstanceExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
                    markSubstanceAsExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                    markSubstanceAsNotExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                    setMinYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                    getMinYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
                    setMaxYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
                    getMaxYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
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
                    setChunkPosition(chunk: DataView, position: import("Meta/index.js").Position3Matrix): void;
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
                    getVoxelDataUseObj(chunkData: DataView, position: import("Meta/index.js").Position3Matrix, secondary?: boolean): number;
                    setVoxelDataUseObj(chunkData: DataView, position: import("Meta/index.js").Position3Matrix, data: number, secondary?: boolean): void;
                    getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
                    setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
                    getChunkMinData(chunkData: DataView): number;
                    setChunkMinData(chunkData: DataView, data: number): void;
                    getChunkMaxData(chunkData: DataView): number;
                    setChunkMaxData(chunkData: DataView, data: number): void;
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
                        substanceMap: Record<import("Meta/index.js").VoxelSubstanceType, number>;
                        substanceRecord: Record<number, import("Meta/index.js").VoxelSubstanceType>;
                    };
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
                    voxelDataView: DataView;
                    voxelMap: Uint16Array;
                    syncData(voxelBuffer: SharedArrayBuffer, voxelMapBuffer: SharedArrayBuffer): void;
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
                    getTrueSubstance(id: number): import("Meta/index.js").VoxelSubstanceType;
                    getShapeId(id: number): number;
                    getHardness(id: number): number;
                    getCheckCollisions(id: number): number;
                    getColliderId(id: number): number;
                    isLightSource(id: number): boolean;
                    getLightValue(id: number): number;
                };
                _air: [string, number];
                _barrier: [string, number];
                updateDieTime: number;
                loadDieTime: number;
                regions: import("../Meta/Matrix/Matrix.types.js").MatrixLoadedRegion;
                chunks: Record<string, Uint32Array>;
                chunkStates: Record<string, Uint8Array>;
                paletteMode: number;
                voxelPalette: Record<number, string>;
                voxelPaletteMap: Record<string, number>;
                voxelManager: import("../Meta/Voxels/VoxelManager.types.js").VoxelManagerInterface | null;
                lightValueFunctions: {
                    r: (value: number) => number;
                    g: (value: number) => number;
                    b: (value: number) => number;
                    s: (value: number) => number;
                };
                threadName: string;
                setVoxelManager(voxelManager: import("../Meta/Voxels/VoxelManager.types.js").VoxelManagerInterface): void;
                syncChunkBounds(): void;
                getVoxelPaletteNumericId(voxelId: string, voxelState: number): number;
                awaitChunkLoad(x: number, y: number, z: number, timeout?: number): Promise<boolean>;
                __setGlobalVoxelPalette(palette: Record<number, string>, map: Record<string, number>): void;
                getVoxel(x: number, y: number, z: number, secondary?: boolean): false | [string, number];
                getVoxelShapeState(x: number, y: number, z: number): number;
                getLevel(x: number, y: number, z: number): number;
                setLevel(level: number, x: number, y: number, z: number): void;
                getLevelState(x: number, y: number, z: number): number;
                setLevelState(state: number, x: number, y: number, z: number): void;
                setVoxel(voxelId: string, voxelStateId: number, shapeState: number, x: number, y: number, z: number): false | undefined;
                __handleHeightMapUpdateForVoxelAdd(voxelPOS: import("Meta/index.js").Position3Matrix, voxelSubstance: import("Meta/index.js").VoxelSubstanceType, chunk: import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk): void;
                getVoxelPaletteIdForWorldGen(voxelId: string, voxelStateId: number): number;
                getVoxelData(x: number, y: number, z: number, secondary?: boolean): false | import("Meta/index.js").VoxelData;
                _createRegion(x: number, y: number, z: number): {
                    chunks: {};
                };
                __setChunk(x: number, y: number, z: number, chunkData: SharedArrayBuffer, chunkStates: SharedArrayBuffer): void;
                getVoxelSubstance(x: number, y: number, z: number, secondary?: boolean): import("Meta/index.js").VoxelSubstanceType;
                getVoxelShapeId(x: number, y: number, z: number, secondary?: boolean): number;
                isVoxelALightSource(x: number, y: number, z: number, secondary?: boolean): boolean;
                getLightSourceValue(x: number, y: number, z: number, secondary?: boolean): number;
                isAir(x: number, y: number, z: number): boolean;
                getRegion(x: number, y: number, z: number): false | {
                    palette?: import("../Meta/World/WorldData/World.types.js").WorldRegionPalette | undefined;
                    chunks: Record<string, Record<string, import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk>>;
                };
                __removeChunk(x: number, y: number, z: number): false | undefined;
                getChunk(x: number, y: number, z: number): false | import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk;
                getWorldColumn(x: number, z: number): false | Record<string, import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk>;
                isChunkLocked(x: number, y: number, z: number): boolean;
                lockChunk(x: number, y: number, z: number): boolean;
                unLockChunk(x: number, y: number, z: number): boolean;
                updateChunkData(x: number, y: number, z: number, run: (chunk: import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk) => {}): false | Promise<boolean>;
                setData(x: number, y: number, z: number, data: number, state?: boolean): boolean;
                getData(x: number, y: number, z: number, state?: boolean): number;
                getVoxelNumberID(x: number, y: number, z: number, secondary?: boolean): number | false;
                getLight(x: number, y: number, z: number): number;
                setAir(x: number, y: number, z: number, lightValue: number): void;
                setFullSun(x: number, y: number, z: number): void;
                setLight(x: number, y: number, z: number, lightValue: number): void;
                getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s"): number;
                sameVoxel(x: number, y: number, z: number, cx: number, cy: number, cz: number): boolean;
            };
            _visitedMap: Record<string, boolean>;
            _flowQue: number[][];
            _flowRemoveQue: number[][];
            runRemovePropagation: typeof import("./Propagation/Flow/Functions/RunFlowRemove.js").RunRemovePropagation;
            runFlowReduce: typeof import("./Propagation/Flow/Functions/RunFlowRemove.js").RunFlowReduce;
            runFlowRemove: typeof import("./Propagation/Flow/Functions/RunFlowRemove.js").RunFlowRemove;
            runFlow: typeof import("./Propagation/Flow/Functions/RunFlow.js").RunFlow;
            runFlowNoChunkRebuild: typeof import("./Propagation/Flow/Functions/RunFlowNoChunkBuild.js").RunFlowNoChunkBuild;
            runFlowIncrease: typeof import("./Propagation/Flow/Functions/RunFlow.js").RunFlowIncrease;
            runFlowPropagation: typeof import("./Propagation/Flow/Functions/RunFlow.js").RunFlowPropagation;
            rebuildQue: number[][];
            rebuildMap: Record<string, boolean>;
            addToMap(x: number, y: number, z: number): void;
            inMap(x: number, y: number, z: number): boolean;
            setVoxel(level: number, levelState: number, x: number, y: number, z: number): void;
            runRemoveCheck(x: number, y: number, z: number): void;
            setCurrentVoxel(x: number, y: number, z: number): boolean;
            runRebuildQue(): void;
            __addToRebuildQue(x: number, y: number, z: number): void;
            addToRebuildQue(x: number, y: number, z: number, sync?: boolean): void;
            setLevel(level: number, x: number, y: number, z: number): void;
            removeVoxel(x: number, y: number, z: number): void;
            getLevel(x: number, y: number, z: number): number;
            getLevelState(x: number, y: number, z: number): number;
            canFlowOutwardTest(x: number, y: number, z: number): boolean;
            canFlowDownardTest(x: number, y: number, z: number): boolean;
            flowDownTest(x: number, y: number, z: number): boolean;
            wait(ms: number): Promise<unknown>;
            getAbsorbLight(x: number, y: number, z: number): number;
        };
        rebuildQueMap: Record<string, boolean>;
        $INIT(): void;
        addToRebuildQue(x: number, y: number, z: number, substance: import("Meta/index.js").VoxelSubstanceType | "all"): void;
        runRebuildQue(): void;
        runRGBFloodFill(x: number, y: number, z: number): void;
        runRGBFloodRemove(x: number, y: number, z: number): void;
        runSunLightForWorldColumn(x: number, z: number, maxY: number): void;
        runSunFloodFillAtMaxY(x: number, z: number, maxY: number): void;
        runSunFloodFillMaxYFlood(x: number, z: number, maxY: number): void;
        runSunLightUpdate(x: number, y: number, z: number): void;
        runSunLightRemove(x: number, y: number, z: number): void;
        runFlowAt(x: number, y: number, z: number): Promise<void>;
        removeFlowAt(x: number, y: number, z: number): Promise<void>;
    };
    DVEWG: {
        worldGen: import("../Meta/WorldGen/WorldGen.types.js").WorldGenInterface | null;
        heightByte: {
            _getHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            initalizeChunk(chunkData: DataView): void;
            updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, chunkData: DataView): void;
            getChunkMin(chunkData: DataView): number;
            getChunkMax(chunkData: DataView): number;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
            getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
            isSubstanceExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
            markSubstanceAsExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            markSubstanceAsNotExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            setMinYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMinYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
            setMaxYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMaxYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
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
            getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("Meta/index.js").Position3Matrix;
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
            getChunkKey(chunkPOS: import("Meta/index.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("Meta/index.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index.js").Position3Matrix): {
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
            getWorldColumnKeyFromObj(position: import("Meta/index.js").Position3Matrix): string;
            getWorldColumnKey(x: number, z: number): string;
            getWorldColumnPosition(x: number, z: number): {
                x: number;
                z: number;
            };
        };
        setWorldGen(worldGen: import("../Meta/WorldGen/WorldGen.types.js").WorldGenInterface): void;
        generate(x: number, z: number, data: any): Promise<void>;
        __handleHeightMapUpdateForVoxelAdd(voxelPOS: import("Meta/index.js").Position3Matrix, voxelData: import("Meta/index.js").VoxelData, chunk: import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk): void;
        getVoxelPaletteId(voxelId: string, voxelStateId: number): number;
        _paintVoxel(voxelId: string, voxelStateId: number, shapeState: number, x: number, y: number, z: number): void;
        _addToRGBLightUpdateQue(voxelData: import("Meta/index.js").VoxelData, x: number, y: number, z: number): void;
        paintVoxel(voxelId: string, voxelState: number, shapeState: number, x: number, y: number, z: number): Promise<void>;
    };
    queues: {
        __states: Uint32Array;
        setQueueStates(states: Uint32Array): void;
        finishRGBLightUpdate(): void;
        finishRGBLightRemove(): void;
        finishWorldColumnSunLightProp(): void;
        finishSunLightUpdateAtMaxY(): void;
        finishSunLightUpdateMaxYFlood(): void;
        finishSunLightUpdate(): void;
        finishSunLightRemove(): void;
        finishBuildingChunk(): void;
        finishFlowRun(): void;
        finishFlowRemove(): void;
        finishGenerating(): void;
        awaitAllChunksToBeBuilt(): Promise<boolean>;
        areAllChunksDoneBuilding(): boolean;
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
            getValue(x: number, y: number, z: number, array: Uint32Array): number;
            getValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            getValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): number;
            setValue(x: number, y: number, z: number, array: Uint32Array, value: number): void;
            setValueUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("Meta/index.js").Position3Matrix, array: Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: Uint32Array): void;
            deleteUseObj(position: import("Meta/index.js").Position3Matrix, array: Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("Meta/index.js").Position3Matrix;
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
            getChunkKey(chunkPOS: import("Meta/index.js").Position3Matrix): string;
            getChunkKeyFromPosition(x: number, y: number, z: number): string;
            getRegionKey(regionPOS: import("Meta/index.js").Position3Matrix): string;
            getRegionKeyFromPosition(x: number, y: number, z: number): string;
            getVoxelPositionFromChunkPosition(x: number, y: number, z: number, chunkPOS: import("Meta/index.js").Position3Matrix): {
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
            getWorldColumnKeyFromObj(position: import("Meta/index.js").Position3Matrix): string;
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
        heightByte: {
            _getHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (byteData: number) => number>;
            _setHeightMapData: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (height: number, byteData: number) => number>;
            _markSubstanceAsNotExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _markSubstanceAsExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => number>;
            _isSubstanceExposed: Record<import("Meta/index.js").VoxelTemplateSubstanceType, (data: number) => boolean>;
            getStartingHeightMapValue(): number;
            initalizeChunk(chunkData: DataView): void;
            updateChunkMinMax(voxelPOS: import("Meta/index.js").Position3Matrix, chunkData: DataView): void;
            getChunkMin(chunkData: DataView): number;
            getChunkMax(chunkData: DataView): number;
            calculateHeightRemoveDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, heightMap: DataView): boolean | undefined;
            calculateHeightAddDataForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getLowestExposedVoxel(x: number, z: number, chunk: DataView): number;
            getHighestExposedVoxel(x: number, z: number, chunk: DataView): number;
            isSubstanceExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): boolean;
            markSubstanceAsExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            markSubstanceAsNotExposed(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            setMinYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMinYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
            setMaxYForSubstance(height: number, substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): void;
            getMaxYForSubstance(substance: import("Meta/index.js").VoxelTemplateSubstanceType, x: number, z: number, chunk: DataView): number;
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
            setChunkPosition(chunk: DataView, position: import("Meta/index.js").Position3Matrix): void;
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
            getVoxelDataUseObj(chunkData: DataView, position: import("Meta/index.js").Position3Matrix, secondary?: boolean): number;
            setVoxelDataUseObj(chunkData: DataView, position: import("Meta/index.js").Position3Matrix, data: number, secondary?: boolean): void;
            getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
            setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
            getChunkMinData(chunkData: DataView): number;
            setChunkMinData(chunkData: DataView, data: number): void;
            getChunkMaxData(chunkData: DataView): number;
            setChunkMaxData(chunkData: DataView, data: number): void;
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
                substanceMap: Record<import("Meta/index.js").VoxelSubstanceType, number>;
                substanceRecord: Record<number, import("Meta/index.js").VoxelSubstanceType>;
            };
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
            voxelDataView: DataView;
            voxelMap: Uint16Array;
            syncData(voxelBuffer: SharedArrayBuffer, voxelMapBuffer: SharedArrayBuffer): void;
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
            getTrueSubstance(id: number): import("Meta/index.js").VoxelSubstanceType;
            getShapeId(id: number): number;
            getHardness(id: number): number;
            getCheckCollisions(id: number): number;
            getColliderId(id: number): number;
            isLightSource(id: number): boolean;
            getLightValue(id: number): number;
        };
        _air: [string, number];
        _barrier: [string, number];
        updateDieTime: number;
        loadDieTime: number;
        regions: import("../Meta/Matrix/Matrix.types.js").MatrixLoadedRegion;
        chunks: Record<string, Uint32Array>;
        chunkStates: Record<string, Uint8Array>;
        paletteMode: number;
        voxelPalette: Record<number, string>;
        voxelPaletteMap: Record<string, number>;
        voxelManager: import("../Meta/Voxels/VoxelManager.types.js").VoxelManagerInterface | null;
        lightValueFunctions: {
            r: (value: number) => number;
            g: (value: number) => number;
            b: (value: number) => number;
            s: (value: number) => number;
        };
        threadName: string;
        setVoxelManager(voxelManager: import("../Meta/Voxels/VoxelManager.types.js").VoxelManagerInterface): void;
        syncChunkBounds(): void;
        getVoxelPaletteNumericId(voxelId: string, voxelState: number): number;
        awaitChunkLoad(x: number, y: number, z: number, timeout?: number): Promise<boolean>;
        __setGlobalVoxelPalette(palette: Record<number, string>, map: Record<string, number>): void;
        getVoxel(x: number, y: number, z: number, secondary?: boolean): false | [string, number];
        getVoxelShapeState(x: number, y: number, z: number): number;
        getLevel(x: number, y: number, z: number): number;
        setLevel(level: number, x: number, y: number, z: number): void;
        getLevelState(x: number, y: number, z: number): number;
        setLevelState(state: number, x: number, y: number, z: number): void;
        setVoxel(voxelId: string, voxelStateId: number, shapeState: number, x: number, y: number, z: number): false | undefined;
        __handleHeightMapUpdateForVoxelAdd(voxelPOS: import("Meta/index.js").Position3Matrix, voxelSubstance: import("Meta/index.js").VoxelSubstanceType, chunk: import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk): void;
        getVoxelPaletteIdForWorldGen(voxelId: string, voxelStateId: number): number;
        getVoxelData(x: number, y: number, z: number, secondary?: boolean): false | import("Meta/index.js").VoxelData;
        _createRegion(x: number, y: number, z: number): {
            chunks: {};
        };
        __setChunk(x: number, y: number, z: number, chunkData: SharedArrayBuffer, chunkStates: SharedArrayBuffer): void;
        getVoxelSubstance(x: number, y: number, z: number, secondary?: boolean): import("Meta/index.js").VoxelSubstanceType;
        getVoxelShapeId(x: number, y: number, z: number, secondary?: boolean): number;
        isVoxelALightSource(x: number, y: number, z: number, secondary?: boolean): boolean;
        getLightSourceValue(x: number, y: number, z: number, secondary?: boolean): number;
        isAir(x: number, y: number, z: number): boolean;
        getRegion(x: number, y: number, z: number): false | {
            palette?: import("../Meta/World/WorldData/World.types.js").WorldRegionPalette | undefined;
            chunks: Record<string, Record<string, import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk>>;
        };
        __removeChunk(x: number, y: number, z: number): false | undefined;
        getChunk(x: number, y: number, z: number): false | import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk;
        getWorldColumn(x: number, z: number): false | Record<string, import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk>;
        isChunkLocked(x: number, y: number, z: number): boolean;
        lockChunk(x: number, y: number, z: number): boolean;
        unLockChunk(x: number, y: number, z: number): boolean;
        updateChunkData(x: number, y: number, z: number, run: (chunk: import("../Meta/Matrix/Matrix.types.js").MatrixLoadedChunk) => {}): false | Promise<boolean>;
        setData(x: number, y: number, z: number, data: number, state?: boolean): boolean;
        getData(x: number, y: number, z: number, state?: boolean): number;
        getVoxelNumberID(x: number, y: number, z: number, secondary?: boolean): number | false;
        getLight(x: number, y: number, z: number): number;
        setAir(x: number, y: number, z: number, lightValue: number): void;
        setFullSun(x: number, y: number, z: number): void;
        setLight(x: number, y: number, z: number, lightValue: number): void;
        getLightValue(x: number, y: number, z: number, type: "r" | "g" | "b" | "s"): number;
        sameVoxel(x: number, y: number, z: number, cx: number, cy: number, cz: number): boolean;
    };
    matrixHub: {
        environment: "node" | "browser";
        worldPort: import("../Meta/Comms/InterComm.types.js").InterCommPortTypes | undefined;
        threadName: string;
        __threadNameSet: boolean;
        messageFunctions: Record<string, (data: any, event: MessageEvent<any>) => any>;
        isReady(): boolean;
        onMessage(event: MessageEvent<any>, runAfter: (event: MessageEvent<any>) => any): void;
        requestChunkSync(x: number, y: number, z: number): Promise<boolean | undefined>;
        requestChunkLoad(x: number, y: number, z: number): Promise<boolean | undefined>;
        requestChunkRelease(chunkX: number, chunkY: number, chunkZ: number): void;
        _setWorldPort(port: MessagePort): void;
        _syncChunk(data: any[]): void;
        _syncVoxelData(data: any[]): void;
        _releaseChunk(data: any[]): void;
        _syncGlobalVoxelPalette(data: any[]): void;
        _setThreadName(data: any[]): void;
    };
    matrixMap: {
        substanceMap: Record<import("Meta/index.js").VoxelSubstanceType, number>;
        substanceRecord: Record<number, import("Meta/index.js").VoxelSubstanceType>;
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
            substanceMap: Record<import("Meta/index.js").VoxelSubstanceType, number>;
            substanceRecord: Record<number, import("Meta/index.js").VoxelSubstanceType>;
        };
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
        voxelDataView: DataView;
        voxelMap: Uint16Array;
        syncData(voxelBuffer: SharedArrayBuffer, voxelMapBuffer: SharedArrayBuffer): void;
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
        getTrueSubstance(id: number): import("Meta/index.js").VoxelSubstanceType;
        getShapeId(id: number): number;
        getHardness(id: number): number;
        getCheckCollisions(id: number): number;
        getColliderId(id: number): number;
        isLightSource(id: number): boolean;
        getLightValue(id: number): number;
    };
    renderComm: {
        environment: "node" | "browser";
        name: string;
        port: import("../Comms/InterComm.types.js").InterCommPortTypes | null;
        messageFunctions: Record<string | number, (data: any, event?: MessageEvent<any> | undefined) => void>;
        __onSetPortRun: (port: import("../Comms/InterComm.types.js").InterCommPortTypes) => void;
        onSetPort(set: (port: import("../Comms/InterComm.types.js").InterCommPortTypes) => void): void;
        setPort(port: import("../Comms/InterComm.types.js").InterCommPortTypes): void;
        _errorMessage(message: string): void;
        sendMessage(message: string | number, data?: any[], transfers?: any[] | undefined): void;
        listenForMessage(message: string | number, run: (data: any[], event?: MessageEvent<any> | undefined) => void): void;
        onMessage(event: any): void;
    } & {
        onReady: () => void;
        onRestart: () => void;
    };
    serverComm: {
        environment: "node" | "browser";
        name: string;
        port: import("../Comms/InterComm.types.js").InterCommPortTypes | null;
        messageFunctions: Record<string | number, (data: any, event?: MessageEvent<any> | undefined) => void>;
        __onSetPortRun: (port: import("../Comms/InterComm.types.js").InterCommPortTypes) => void;
        onSetPort(set: (port: import("../Comms/InterComm.types.js").InterCommPortTypes) => void): void;
        setPort(port: import("../Comms/InterComm.types.js").InterCommPortTypes): void;
        _errorMessage(message: string): void;
        sendMessage(message: string | number, data?: any[], transfers?: any[] | undefined): void;
        listenForMessage(message: string | number, run: (data: any[], event?: MessageEvent<any> | undefined) => void): void;
        onMessage(event: any): void;
    } & {
        onReady: () => void;
        onRestart: () => void;
    };
    worldComm: {
        environment: "node" | "browser";
        name: string;
        port: import("../Comms/InterComm.types.js").InterCommPortTypes | null;
        messageFunctions: Record<string | number, (data: any, event?: MessageEvent<any> | undefined) => void>;
        __onSetPortRun: (port: import("../Comms/InterComm.types.js").InterCommPortTypes) => void;
        onSetPort(set: (port: import("../Comms/InterComm.types.js").InterCommPortTypes) => void): void;
        setPort(port: import("../Comms/InterComm.types.js").InterCommPortTypes): void;
        _errorMessage(message: string): void;
        sendMessage(message: string | number, data?: any[], transfers?: any[] | undefined): void;
        listenForMessage(message: string | number, run: (data: any[], event?: MessageEvent<any> | undefined) => void): void;
        onMessage(event: any): void;
    };
    voxelManager: {
        voxelObjects: Record<string, import("Meta/index.js").VoxelConstructorObject>;
        syncShapeData(): Generator<never, void, unknown>;
        getVoxel(id: string): import("Meta/index.js").VoxelConstructorObject;
        registerVoxel(voxel: import("Meta/index.js").VoxelConstructorObject): void;
        runVoxelHookForAll(hook: any): void;
        removeVoxelHookForAll(hook: any): void;
    };
    itemManager: {
        itemObjects: Record<string, import("../Meta/Items/Item.types.js").ItemConstructorObject>;
        itemShapes: Record<string, import("../Meta/Constructor/ItemShape.type.js").ItemShapeData>;
        getItem(id: string): import("../Meta/Items/Item.types.js").ItemConstructorObject;
        registerItem(item: import("../Meta/Items/Item.types.js").ItemConstructorObject): void;
        registerItemShape(shapeData: import("../Meta/Constructor/ItemShape.type.js").ItemShapeData): void;
        getItemShapeData(id: string): import("../Meta/Constructor/ItemShape.type.js").ItemShapeData;
        runItemHookForAll(hook: any): void;
        removeItemHookForAll(hook: any): void;
    };
    syncSettings(data: EngineSettingsData): void;
    reStart(): void;
    isReady(): boolean;
    $INIT(initData: DVECInitData): Promise<void>;
};
export declare type DivineVoxelEngineConstructor = typeof DVEC;
