export declare const DataManager: {
    dimensions: {
        dimensionRecord: Record<string, number>;
        dimensionMap: Record<number, string>;
        __defaultDimensionOptions: import("../Meta/Data/DimensionData.types.js").DimensionOptions;
        _dimensions: Record<string, import("../Meta/Data/DimensionData.types.js").DimensionData>;
        addDimension(id: string, option: import("../Meta/Data/DimensionData.types.js").DimensionOptions): void;
        getDimension(id: string): import("../Meta/Data/DimensionData.types.js").DimensionData;
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
        substanceRecord: Record<number, import("../Meta/index.js").VoxelSubstanceType>;
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
        getTrueSubstance(id: number): import("../Meta/index.js").VoxelSubstanceType;
        getShapeId(id: number): number;
        getHardness(id: number): number;
        getCheckCollisions(id: number): number;
        getColliderId(id: number): number;
        isLightSource(id: number): boolean;
        getLightValue(id: number): number;
    };
    world: {
        _currentionDimension: string;
        voxelPalette: import("../Meta/Data/WorldData.types.js").VoxelPalette;
        voxelPaletteMap: import("../Meta/Data/WorldData.types.js").VoxelPaletteMap;
        setCurrentDimension(id: string | number): void;
        setVoxelPalette(voxelPalette: import("../Meta/Data/WorldData.types.js").VoxelPalette, voxelPaletteMap: import("../Meta/Data/WorldData.types.js").VoxelPaletteMap): void;
        rawData: {
            get(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): number;
            set(dimensionId: string | number, x: number, y: number, z: number, data: number, secondary?: boolean): void | -1;
        };
        voxel: {
            _air: [string, number];
            _barrier: [string, number];
            air: {
                isAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): true | undefined;
                set(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): void;
            };
            barrier: {
                isAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): true | undefined;
                set(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): void;
            };
            get(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): false | (string | number)[];
            getData(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): false | {
                substance: number;
                shapeId: number;
                hardness: number;
                material: number;
                checkCollision: number;
                colliderId: number;
                lightSource: number;
                lightValue: number;
            };
            id: {
                string(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): string | number;
                numeric(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): number;
            };
            data: {
                shapeId: {
                    getAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): number;
                    get(id: number): number;
                };
                substance: {
                    getAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): import("../Meta/index.js").VoxelSubstanceType;
                    get(id: number): import("../Meta/index.js").VoxelSubstanceType;
                };
                shapeState: {
                    getAt(dimensionId: string | number, x: number, y: number, z: number): number;
                    get(data: number): number;
                    set(data: number, state: number): number;
                    setAt(dimensionId: string | number, x: number, y: number, z: number, state: number): void;
                };
                state: {
                    getAt(dimensionId: string | number, x: number, y: number, z: number): number;
                    get(data: number): number;
                    set(data: number, state: number): number;
                    setAt(dimensionId: string | number, x: number, y: number, z: number, state: number): void;
                };
                lightSource: {
                    trueAt(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): boolean;
                    true(voxelId: number): boolean;
                };
                level: {
                    getAt(dimensionId: string | number, x: number, y: number, z: number): number;
                    get(data: number): number;
                    set(data: number, level: number): number;
                    setAt(dimensionId: string | number, x: number, y: number, z: number, state: number): void;
                    state: {
                        getAt(dimensionId: string | number, x: number, y: number, z: number): number;
                        get(data: number): number;
                        set(data: number, level: number): number;
                        setAt(dimensionId: string | number, x: number, y: number, z: number, state: number): void;
                    };
                };
            };
        };
        heightMap: {
            update: {
                add(dimensionId: string | number, substance: import("../Meta/index.js").VoxelSubstanceType, x: number, y: number, z: number): void;
                remove(dimensionId: string | number, substance: import("../Meta/index.js").VoxelSubstanceType, x: number, y: number, z: number): void;
            };
        };
        paint: {
            voxel(data: import("../Meta/Data/WorldData.types.js").AddVoxelData): false | undefined;
            erease(dimensionId: string | number, x: number, y: number, z: number): void;
            _worldGen: {
                getChunkId(voxelId: number): number;
                getPaletteId(voxelId: string, voxelState: number): number;
            };
        };
        light: {
            get(dimesnionId: string | number, x: number, y: number, z: number, log?: boolean): number;
            set(dimesnionId: string | number, x: number, y: number, z: number, lightValue: number): -1 | undefined;
            red: {
                get(dimesnionId: string | number, x: number, y: number, z: number): number;
                set(dimesnionId: string | number, x: number, y: number, z: number, value: number): 0 | undefined;
            };
            green: {
                get(dimesnionId: string | number, x: number, y: number, z: number): number;
                set(dimesnionId: string | number, x: number, y: number, z: number, value: number): 0 | undefined;
            };
            blue: {
                get(dimesnionId: string | number, x: number, y: number, z: number): number;
                set(dimesnionId: string | number, x: number, y: number, z: number, value: number): 0 | undefined;
            };
            sun: {
                get(dimesnionId: string | number, x: number, y: number, z: number): number;
                set(dimesnionId: string | number, x: number, y: number, z: number, value: number): 0 | undefined;
            };
        };
    };
    worldRegister: {
        dimensionRecord: Record<string, number>;
        dimensionMap: Record<number, string>;
        _dimensions: import("../Meta/Data/WorldData.types.js").WorldDimensions;
        dimensions: {
            add(id: string | number): {};
            get(id: string | number): Record<string, import("../Meta/Data/WorldData.types.js").WorldRegion>;
        };
        region: {
            add(dimensionId: string | number, x: number, y: number, z: number): import("../Meta/Data/WorldData.types.js").WorldRegion;
            get(dimensionId: string | number, x: number, y: number, z: number): false | import("../Meta/Data/WorldData.types.js").WorldRegion;
        };
        worldColumn: {
            add(dimensionId: string | number, x: number, z: number, y?: number): import("../Meta/Data/WorldData.types.js").WorldColumn;
            get(dimensionId: string | number, x: number, z: number, y?: number): false | import("../Meta/Data/WorldData.types.js").WorldColumn;
        };
        chunk: {
            add(dimensionId: string | number, x: number, y: number, z: number, sab: SharedArrayBuffer): void;
            get(dimensionId: string | number, x: number, y: number, z: number): false | import("../Meta/Data/WorldData.types.js").ChunkData;
        };
    };
    worldColumn: {};
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
        getWorldColumnKey(x: number, z: number, y?: number): string;
        getWorldColumnPosition(x: number, z: number, y?: number): {
            x: number;
            z: number;
            y: number;
        };
    };
    maps: {
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
            };
        };
    };
};
