import type { DVENInitData } from "Meta/Nexus/DVEN.js";
import type { EngineSettingsData } from "Meta/index.js";
export declare const DVEN: {
    environment: "node" | "browser";
    __connectedToWorld: boolean;
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
        }; /**# Load chunk into Nexus
         * Load a chunk into the shared nexus thread.
         */
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
        context: "MatrixLoadedThread" | "DVEW" | "DVER" | "DVEP" | "DVEB" | "DVEC" | "DVEN" | "DVEFX" | "DVERW";
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
        setContext(context: "MatrixLoadedThread" | "DVEW" | "DVER" | "DVEP" | "DVEB" | "DVEC" | "DVEN" | "DVEFX" | "DVERW"): void;
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
    worldComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface;
    renderComm: import("../Meta/Comms/InterComm.types.js").InterCommInterface & {
        onReady: () => void;
        onRestart: () => void;
    };
    nexusEntites: {
        entityTemplate: Record<string, {
            template: import("Meta/index.js").NexusEntity;
            data: import("Meta/index.js").NexusEntityData;
        }>;
        loaedEntities: Record<import("Meta/index.js").EntityTypes, Record<string, import("Meta/index.js").NexusEntityInterface>>;
        registerEntity(id: string, entityData: import("Meta/index.js").NexusEntityData, nexusEntity: import("Meta/index.js").NexusEntity): void;
        _getID(): string;
        _unqiueId(): string;
        _generateUUI(): string;
        spawnEntity(entityId: string, position: import("Meta/index.js").Position3Matrix, otherData?: any, identiferId?: string | undefined): void;
        ddSepawnEntity(entityId: string, identiferId: string): void;
    };
    voxelManager: {
        voxelData: Record<string, import("Meta/index.js").VoxelData>;
        _onRegister: (data: import("Meta/index.js").VoxelData) => void;
        getVoxelData(id: string): import("Meta/index.js").VoxelData;
        registerVoxelData(data: import("Meta/index.js").VoxelData): void;
        onRegister(func: (data: import("Meta/index.js").VoxelData) => void): void;
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
    $INIT(data: DVENInitData): Promise<void>;
    isReady(): boolean;
    syncSettings(data: EngineSettingsData): void;
    /**# Load chunk into Nexus
     * Load a chunk into the shared nexus thread.
     */
    loadChunkIntoNexus(chunkX: number, chunkY: number, chunkZ: number): Promise<boolean>;
    /**# Release Chunk From Nexus
     * Remve a chunk in the shared nexus thread.
     */
    releaseChunkFromNexus(chunkX: number, chunkY: number, chunkZ: number): void;
};
export declare type DivineVoxelEngineNexus = typeof DVEN;
