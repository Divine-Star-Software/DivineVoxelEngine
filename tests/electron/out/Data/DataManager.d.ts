export declare const DataManager: {
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
            _dt: import("../Tools/Data/DataTool.js").DataTool;
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
