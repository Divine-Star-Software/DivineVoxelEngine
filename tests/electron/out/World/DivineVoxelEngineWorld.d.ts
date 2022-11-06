import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
import { DataTool } from "../Tools/Data/DataTool.js";
import { BuilderTool } from "../Tools/Build/Builder.js";
/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export declare const DVEW: {
    environment: "node" | "browser";
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
        getEnviorment(): "node" | "browser";
        getAQueue<T>(): import("../Global/Util/Queue.js").Queue<T>;
        merge<T_1, K>(target: T_1, newObject: K): T_1 & K;
        degtoRad(degrees: number): number;
        radToDeg(radians: number): number;
    };
    settings: {
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
            flow: {
                enable: boolean;
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
        getSettings(): EngineSettingsData;
        syncSettings(data: EngineSettingsData): void;
        __syncWithObjects(): void;
        syncWithWorldBounds(worldBounds: {
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            _hashMask(n: number): number;
            hash(x: number, y: number, z: number): number;
            chunkXPow2: number;
            chunkYPow2: number;
            chunkZPow2: number;
            chunkXSize: number;
            chunkYSize: number;
            chunkZSize: number;
            chunkTotalVoxels: number;
            chunkArea: number;
            regionColumnWidth: number;
            regionXPow2: number;
            regionYPow2: number;
            regionZPow2: number;
            regionXSize: number;
            regionYSize: number;
            /**# Divine Voxel Engine World
             * ---
             * This handles everything in the world worker context.
             */
            regionZSize: number;
            __regionPosition: {
                x: number;
                y: number;
                z: number;
            };
            __worldColumnPosition: {
                x: number;
                z: number;
                y: number;
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
            __columnPosition: {
                x: number;
                z: number;
                y: number;
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
            _columnIndexPosition: {
                x: number;
                y: number;
                z: number;
            };
            getColumnIndex(x: number, z: number, y: number): number;
            getChunkColumnIndex(y: number): number;
            getColumnKey(x: number, z: number, y?: number): string;
            getColumnPosition(x: number, z: number, y?: number): {
                x: number;
                z: number;
                y: number;
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
        doFlow(): boolean;
    };
    dataCreator: {
        chunk: {
            getBuffer(buffer?: false | ArrayBuffer): SharedArrayBuffer;
        };
    };
    data: {
        dimensions: {
            _count: number;
            dimensionRecord: Record<string, number>;
            dimensionMap: Record<number, string>;
            __defaultDimensionOptions: import("../Meta/Data/DimensionData.types.js").DimensionOptions;
            _dimensions: Record<string, import("../Meta/Data/DimensionData.types.js").DimensionData>;
            registerDimension(id: string, option: import("../Meta/Data/DimensionData.types.js").DimensionOptions): void;
            getDimension(id: string | number): import("../Meta/Data/DimensionData.types.js").DimensionData;
            getDimensionStringId(id: string | number): string;
            getDimensionNumericId(id: string | number): number;
        };
        voxel: {
            byteLength: {
                substance: number;
                shapeId: number;
                hardness: number;
                material: number;
                checkCollision: number;
                colliderId: number;
                lightSource: number;
                lightValue: number;
                isRich: number;
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
                isRich: number;
            };
            substanceRecord: Record<number, import("../Meta/index.js").VoxelSubstanceType>;
            voxelData: {
                substance: import("../Meta/index.js").VoxelSubstanceType;
                shapeId: number;
                hardness: number;
                material: number;
                checkCollision: number;
                colliderId: number;
                lightSource: number;
                lightValue: number;
                isRich: number;
            };
            voxelDataView: DataView;
            voxelMap: Uint16Array;
            syncData(voxelBuffer: SharedArrayBuffer, voxelMapBuffer: SharedArrayBuffer): void;
            getVoxelData(id: number): {
                substance: import("../Meta/index.js").VoxelSubstanceType;
                shapeId: number;
                hardness: number;
                material: number;
                checkCollision: number;
                colliderId: number;
                lightSource: number;
                lightValue: number;
                isRich: number;
            };
            getSubstance(id: number): number;
            getTrueSubstance(id: number): import("../Meta/index.js").VoxelSubstanceType;
            getShapeId(id: number): number;
            getHardness(id: number): number;
            getCheckCollisions(id: number): number;
            getColliderId(id: number): number;
            isLightSource(id: number): boolean;
            getLightValue(id: number): number;
            isRich(id: number): boolean;
        };
        world: {
            _currentionDimension: string;
            util: {
                isSameVoxel(dimensionId: string | number, x: number, y: number, z: number, x2: number, y2: number, z2: number, secondary?: boolean): boolean;
            };
            paint: {
                _dt: DataTool;
                voxel(data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): void;
                voxelAsync(data: import("../Meta/Data/WorldData.types.js").AddVoxelData): Promise<void>;
                __paint(dimension: number, data: import("../Meta/Data/WorldData.types.js").AddVoxelData, update?: boolean): false | undefined;
                erease(dimensionId: string | number, x: number, y: number, z: number): void;
            };
        };
        worldRegister: {
            _dimensions: import("../Meta/Data/WorldData.types.js").WorldDimensions;
            _cacheOn: boolean;
            _cache: Map<string, import("../Meta/Data/WorldData.types.js").ChunkData>;
            $INIT(): void;
            cache: {
                enable(): void;
                disable(): void;
                _add(key: string, data: import("../Meta/Data/WorldData.types.js").ChunkData): void;
                _get(key: string): import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
            };
            dimensions: {
                add(id: string | number): Map<any, any>;
                get(id: string | number): Map<string, import("../Meta/Data/WorldData.types.js").Region> | undefined;
            };
            region: {
                add(dimensionId: string | number, x: number, y: number, z: number): import("../Meta/Data/WorldData.types.js").Region;
                get(dimensionId: string | number, x: number, y: number, z: number): false | import("../Meta/Data/WorldData.types.js").Region;
            };
            column: {
                add(dimensionId: string | number, x: number, z: number, y?: number): import("../Meta/Data/WorldData.types.js").Column;
                get(dimensionId: string | number, x: number, z: number, y?: number): false | import("../Meta/Data/WorldData.types.js").Column | undefined;
                fill(dimensionId: string | number, x: number, z: number, y?: number): void;
                height: {
                    getRelative(dimensionId: string | number, x: number, z: number, y?: number): number;
                    getAbsolute(dimensionId: string | number, x: number, z: number, y?: number): number;
                };
            };
            chunk: {
                add(dimensionId: string | number, x: number, y: number, z: number, sab: SharedArrayBuffer): import("../Meta/Data/WorldData.types.js").ChunkData;
                get(dimensionId: string | number, x: number, y: number, z: number): false | import("../Meta/Data/WorldData.types.js").ChunkData | undefined;
            };
        };
        worldColumn: {};
        worldBounds: {
            bounds: {
                MinZ: number;
                MaxZ: number;
                MinX: number;
                MaxX: number;
                MinY: number;
                MaxY: number;
            };
            _hashMask(n: number): number;
            hash(x: number, y: number, z: number): number;
            chunkXPow2: number;
            chunkYPow2: number;
            chunkZPow2: number;
            chunkXSize: number;
            chunkYSize: number;
            chunkZSize: number;
            chunkTotalVoxels: number;
            chunkArea: number;
            regionColumnWidth: number;
            regionXPow2: number;
            regionYPow2: number;
            regionZPow2: number;
            regionXSize: number;
            regionYSize: number;
            /**# Divine Voxel Engine World
             * ---
             * This handles everything in the world worker context.
             */
            regionZSize: number;
            __regionPosition: {
                x: number;
                y: number;
                z: number;
            };
            __worldColumnPosition: {
                x: number;
                z: number;
                y: number;
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
            __columnPosition: {
                x: number;
                z: number;
                y: number;
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
            _columnIndexPosition: {
                x: number;
                y: number;
                z: number;
            };
            getColumnIndex(x: number, z: number, y: number): number;
            getChunkColumnIndex(y: number): number;
            getColumnKey(x: number, z: number, y?: number): string;
            getColumnPosition(x: number, z: number, y?: number): {
                x: number;
                z: number;
                y: number;
            };
        };
        register: {
            voxels: {
                substanceMap: Record<import("../Meta/index.js").VoxelSubstanceType, number>;
                substanceRecord: Record<number, import("../Meta/index.js").VoxelSubstanceType>;
                byteLengths: {
                    substance: number;
                    shapeId: number;
                    hardness: number;
                    material: number;
                    checkCollision: number;
                    colliderId: number;
                    lightSource: number;
                    lightValue: number;
                    isRich: number;
                    totalLength: number;
                };
                dataIndexes: {
                    substance: number;
                    shapeId: number;
                    hardness: number;
                    material: number;
                    checkCollision: number;
                    colliderId: number;
                    lightSource: number;
                    lightValue: number;
                    isRich: number;
                };
            };
        };
        chunks: {
            reader: {
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
                getVoxelData(chunkData: import("../Meta/Data/WorldData.types.js").ChunkData, x: number, y: number, z: number, secondary?: boolean): number;
                setVoxelData(chunkData: import("../Meta/Data/WorldData.types.js").ChunkData, x: number, y: number, z: number, data: number, secondary?: boolean): number;
                getVoxelDataUseObj(chunkData: import("../Meta/Data/WorldData.types.js").ChunkData, position: import("../Meta/Util.types.js").Position3Matrix, secondary?: boolean): number;
                setVoxelDataUseObj(chunkData: import("../Meta/Data/WorldData.types.js").ChunkData, position: import("../Meta/Util.types.js").Position3Matrix, data: number, secondary?: boolean): number;
                getHeightMapData(chunkData: DataView, x: number, y: number, z: number): number;
                setHeightMapData(chunkData: DataView, x: number, y: number, z: number, data: number): void;
                getChunkMinData(chunkData: DataView): number;
                setChunkMinData(chunkData: DataView, data: number): void;
                getChunkMaxData(chunkData: DataView): number;
                setChunkMaxData(chunkData: DataView, data: number): void;
            };
            heightMap: {
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
            state: {
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
                indexes: {
                    states: number;
                    minHeight: number;
                    maxHeight: number;
                    voxelCount1: number;
                    voxelCount2: number;
                    voxelCount3: number;
                };
                _chunkStates: {
                    empty: boolean;
                    worldGenDone: boolean;
                    sunLightDone: boolean;
                    RGBLightDone: boolean;
                    fluidDone: boolean;
                    magmaDone: boolean;
                };
                _chunkStateMask: {
                    empty: number;
                    emptyIndex: number;
                    worldGenDone: number;
                    worldGenIndex: number;
                    sunLightDone: number;
                    sunLightIndex: number;
                    RGBLightDone: number;
                    RGBLightIndex: number;
                    fluidDone: number;
                    fluidIndex: number;
                    magmaDone: number;
                    magmaIndex: number;
                };
                updateChunkMinMax(voxelPOS: import("../Meta/Util.types.js").Position3Matrix, chunkStatesData: Uint32Array): void;
                getChunkMin(chunkStatesData: Uint32Array): number;
                getChunkMax(chunkStatesData: Uint32Array): number;
                isEmpty(chunkStatesData: Uint32Array): boolean;
                isWorldGenDone(chunkStatesData: Uint32Array): boolean;
                isSunLightUpdatesDone(chunkStatesData: Uint32Array): boolean;
                isRGBLightUpdatesDone(chunkStatesData: Uint32Array): boolean;
                isFluidFlowDone(chunkStatesData: Uint32Array): boolean;
                isMagmaFlowDone(chunkStatesData: Uint32Array): boolean;
                getFullChunkStates(chunkStatesData: Uint32Array): {
                    empty: boolean;
                    worldGenDone: boolean;
                    sunLightDone: boolean;
                    RGBLightDone: boolean;
                    fluidDone: boolean;
                    magmaDone: boolean;
                };
                addToVoxelCount(voxelSubstance: import("../Meta/index.js").VoxelSubstanceType, chunkStatesData: Uint32Array): void;
                subtractFromVoxelCount(voxelSubstance: import("../Meta/index.js").VoxelSubstanceType, chunkStatesData: Uint32Array): void;
                getTotalVoxels(chunkStatesData: Uint32Array): void;
                getTotalVoxelsOfASubstance(voxelSubstance: import("../Meta/index.js").VoxelSubstanceType, chunkStatesData: Uint32Array): void;
            };
        };
    };
    dataSync: {
        voxelDataCreator: {
            voxelBuffer: SharedArrayBuffer;
            voxelMapBuffer: SharedArrayBuffer;
            shapeMap: Record<string, number>;
            __shapeMapSet: boolean;
            isReady(): boolean;
            $createVoxelData(): void;
            setShapeMap(shapeMap: Record<string, number>): void;
            palette: {
                _count: number;
                _palette: Record<number, string>;
                _map: Record<string, number>;
                registerVoxel(voxel: import("../Meta/index.js").VoxelData): void;
                getVoxelBaseId(id: number): number;
                getVoxelStateId(voxelId: string, voxelState: number): number;
                getVoxelStringId(voxelId: number): string;
                getVoxelState(voxelId: number): number;
                get(): Record<number, string>;
                getMap(): Record<string, number>;
            };
        };
        comms: Record<string, import("../Libs/ThreadComm/Comm/Comm.js").CommBase | import("../Libs/ThreadComm/Manager/CommManager.js").CommManager>;
        commOptions: Record<string, {
            chunks: boolean;
            voxelPalette: boolean;
            voxelData: boolean;
        }>;
        $INIT(): void;
        isReady(): boolean;
        /**# Divine Voxel Engine World
         * ---
         * This handles everything in the world worker context.
         */
        registerComm(comm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase | import("../Libs/ThreadComm/Manager/CommManager.js").CommManager): void;
        dimesnion: {
            unSync(id: string | number): void;
            unSyncInThread(commName: string, id: string | number): void;
            sync(data: import("../Meta/Data/DimensionData.types.js").DimensionData): void;
            syncInThread(commName: string, data: import("../Meta/Data/DimensionData.types.js").DimensionData): void;
        };
        chunk: {
            unSync(dimesnion: string | number, chunkX: number, chunkY: number, chunkZ: number): void;
            unSyncInThread(commName: string, dimension: string | number, chunkX: number, chunkY: number, chunkZ: number): void;
            sync(dimension: string | number, x: number, y: number, z: number): void;
            syncInThread(commName: string, dimesnion: string | number, x: number, y: number, z: number): void;
        };
        voxelData: {
            sync(): void;
            syncInThread(commName: string): void;
        };
        voxelPalette: {
            sync(): void;
            syncInThread(commName: string): void;
        };
    };
    fxComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    dataComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    nexusComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    parentComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase;
    ccm: import("../Libs/ThreadComm/Manager/CommManager.js").CommManager & {
        tasks: {
            build: {
                chunk: (data: import("../Meta/Tasks/Tasks.types.js").BuildTasks) => number;
                entity: (x: number, y: number, z: number, width: number, depth: number, height: number, composed: number, voxelData: Uint32Array[], voxelStateData: Uint32Array[]) => number;
                item: (data: any) => number;
            };
        };
    };
    richWorldComm: import("../Libs/ThreadComm/Comm/Comm.js").CommBase & {
        setInitalData(data: import("../Meta/Data/RichWorldData.types.js").SetRichVoxel): void;
        removeRichData(data: import("../Meta/Data/CommonTypes.js").LocationData): void;
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
            getValue(x: number, y: number, z: number, array: number[] | Uint32Array): number;
            getValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: number[] | Uint32Array): number;
            getValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: number[] | Uint32Array): number;
            setValue(x: number, y: number, z: number, array: number[] | Uint32Array, value: number): void;
            setValueUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: number[] | Uint32Array, value: number): void;
            setValueUseObjSafe(position: import("../Meta/Util.types.js").Position3Matrix, array: number[] | Uint32Array, value: number): void;
            deleteValue(x: number, y: number, z: number, array: number[] | Uint32Array): void;
            deleteUseObj(position: import("../Meta/Util.types.js").Position3Matrix, array: number[] | Uint32Array): void;
            getIndex(x: number, y: number, z: number): number;
            getXYZ(index: number): import("../Meta/Util.types.js").Position3Matrix;
        };
        voxelByte: {
            setId(id: number, value: number): number;
            getId(value: number): number;
            getLight(voxelData: number): number;
            setLight(voxelData: number, encodedLight: number): number;
            getLevel(stateData: number): number;
            setLevel(stateData: number, level: number): number;
            getLevelState(stateData: number): number;
            setLevelState(stateData: number, levelState: number): number;
            getShapeState(voxelData: number): number;
            setShapeState(voxelData: number, shapeState: number): number;
        };
        lightByte: {
            SRS: number;
            _lightValues: [s: number, r: number, g: number, b: number];
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
            getLightValues(value: number): [s: number, r: number, g: number, b: number];
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
        itemData: Record<string, import("../Meta/Data/Items/Item.types.js").ItemData>;
        _onRegister: (data: import("../Meta/Data/Items/Item.types.js").ItemData) => void;
        getItemData(id: string): import("../Meta/Data/Items/Item.types.js").ItemData;
        registerItemData(data: import("../Meta/Data/Items/Item.types.js").ItemData): void;
        onRegister(func: (data: import("../Meta/Data/Items/Item.types.js").ItemData) => void): void;
    };
    cQueues: {
        $INIT(): void;
        _queueMap: Map<string | number, number>;
        addQueue(queueKey: string | number): boolean;
        removeQueue(queueKey: string | number): boolean;
        filterQueues(filter: (queueKey: string | number) => boolean): void;
        filterOldQueues(maxTime?: number): void;
        rgb: {
            update: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
            remove: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
        };
        worldSun: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
        voxelUpdate: {
            erease: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
            paint: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").PaintTasks>;
        };
        sun: {
            update: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
            remove: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
        };
        explosion: {
            run: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").ExplosionTasks>;
        };
        flow: {
            update: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
            remove: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").UpdateTasksO>;
        };
        build: {
            chunk: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").BuildTasks>;
        };
        generate: {
            chunk: import("../Libs/ThreadComm/Queue/QueueManager.js").QueueManager<import("../Meta/Tasks/Tasks.types.js").LightUpdateTask>;
        };
    };
    cTasks: {
        runQueue: {
            rgb: {
                update: null;
                remove: null;
            };
            worldSun: {
                fill: null;
                columnFill: null;
                flood: null;
            };
            sun: {
                update: null;
                remove: null;
            };
            flow: {
                update: null;
                remove: null;
            };
            build: {
                chunk: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").RunRebuildTasks>;
            };
            generate: {
                chunk: null;
            };
        };
        addToQueue: {
            rgb: {
                update: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<any>;
                remove: null;
            };
            worldSun: {
                fill: null;
                columnFill: null;
                flood: null;
            };
            sun: {
                update: null;
                remove: null;
            };
            flow: {
                update: null;
                remove: null;
            };
            build: {
                chunk: import("../Libs/ThreadComm/Tasks/Tasks.js").Task<import("../Meta/Tasks/Tasks.types.js").ReBuildTasks>;
            };
            generate: {
                chunk: null;
            };
        };
    };
    isReady(): boolean;
    syncSettings(data: EngineSettingsData): void;
    generate(x: number, z: number, data?: any): void;
    createItem(itemId: string, x: number, y: number, z: number): void;
    $INIT(): Promise<void>;
    getBrush(): import("../Tools/Brush/Brush.js").BrushTool & {
        paintAndAwaitUpdate(): Promise<unknown>;
        ereaseAndAwaitUpdate(): Promise<unknown>;
        paintAndUpdate(onDone?: Function | undefined): void;
        ereaseAndUpdate(onDone?: Function | undefined): void;
        explode(radius?: number, onDone?: Function | undefined): void;
    };
    getBuilder(): BuilderTool;
    getDataTool(): DataTool;
    getTasksManager(): {
        _data: {
            dimension: string;
            queue: string;
        };
        _thread: string;
        setFocalPoint(x: number, y: number, z: number, dimension?: string): void;
        voxelUpdate: {
            erease: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            paint: {
                _s: any;
                add(x: number, y: number, z: number, raw: number[]): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        build: {
            chunk: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        explosion: {
            run: {
                _s: any;
                add(x: number, y: number, z: number, radius: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        flow: {
            update: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
            remove: {
                _s: any;
                add(x: number, y: number, z: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
        light: {
            rgb: {
                update: {
                    _s: any;
                    add(x: number, y: number, z: number, queue?: string | null): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
                remove: {
                    _s: any;
                    add(x: number, y: number, z: number, queue?: string | null): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            sun: {
                update: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
                remove: {
                    _s: any;
                    add(x: number, y: number, z: number): void;
                    run(onDone: Function): void;
                    runAndAwait(): Promise<void>;
                };
            };
            worldSun: {
                _s: any;
                add(x: number, z: number, y?: number): void;
                run(onDone: Function): void;
                runAndAwait(): Promise<void>;
            };
        };
    };
};
export declare type DivineVoxelEngineWorld = typeof DVEW;
