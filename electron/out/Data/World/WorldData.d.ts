import type { AddVoxelData, VoxelPalette, VoxelPaletteMap, ChunkData } from "../../Meta/Data/WorldData.types";
import type { VoxelSubstanceType } from "Meta/index.js";
declare type ID = string | number;
export declare const WorldData: {
    _currentionDimension: string;
    voxelPalette: VoxelPalette;
    voxelPaletteMap: VoxelPaletteMap;
    setCurrentDimension(id: ID): void;
    setVoxelPalette(voxelPalette: VoxelPalette, voxelPaletteMap: VoxelPaletteMap): void;
    rawData: {
        get(dimensionId: ID, x: number, y: number, z: number, secondary?: boolean): number;
        set(dimensionId: ID, x: number, y: number, z: number, data: number, secondary?: boolean): number;
    };
    util: {
        isSameVoxel(dimensionId: ID, x: number, y: number, z: number, x2: number, y2: number, z2: number, secondary?: boolean): boolean;
    };
    voxel: {
        _air: [string, number];
        _barrier: [string, number];
        air: {
            isAt(dimensionId: ID, x: number, y: number, z: number, secondary?: boolean): true | undefined;
            set(dimensionId: ID, x: number, y: number, z: number, light?: number, secondary?: boolean): void;
        };
        barrier: {
            isAt(dimensionId: ID, x: number, y: number, z: number, secondary?: boolean): true | undefined;
            set(dimensionId: ID, x: number, y: number, z: number, secondary?: boolean): void;
        };
        get(dimensionId: ID, x: number, y: number, z: number, secondary?: boolean): false | [string, number];
        getData(dimensionId: ID, x: number, y: number, z: number, secondary?: boolean): false | {
            substance: VoxelSubstanceType;
            shapeId: number;
            hardness: number;
            material: number;
            checkCollision: number;
            colliderId: number;
            lightSource: number;
            lightValue: number;
        };
        id: {
            string(dimensionId: ID, x: number, y: number, z: number, secondary?: boolean): string | -1;
            stateNumeric(dimensionId: ID, x: number, y: number, z: number, secondary?: boolean): number;
            baseNumeric(id: number): number;
            baseNumericAt(dimensionId: ID, x: number, y: number, z: number, secondary?: boolean): number;
            stringFromNumber(id: number): string;
            numberFromString(id: string): number;
            getPaletteId(voxelId: string, voxelState: number): number;
        };
        data: {
            shapeId: {
                getAt(dimensionId: ID, x: number, y: number, z: number, secondary?: boolean): number;
                get(id: number): number;
            };
            substance: {
                getAt(dimensionId: ID, x: number, y: number, z: number, secondary?: boolean): VoxelSubstanceType;
                get(id: number): VoxelSubstanceType;
            };
            shapeState: {
                getAt(dimensionId: ID, x: number, y: number, z: number): number;
                get(data: number): number;
                set(data: number, state: number): number;
                setAt(dimensionId: ID, x: number, y: number, z: number, state: number): void;
            };
            state: {
                getAt(dimensionId: ID, x: number, y: number, z: number): number;
                get(data: number): number;
                set(data: number, state: number): number;
                setAt(dimensionId: ID, x: number, y: number, z: number, state: number): void;
            };
            lightSource: {
                trueAt(dimensionId: ID, x: number, y: number, z: number, secondary?: boolean): boolean;
                true(voxelId: number): boolean;
            };
            level: {
                getAt(dimensionId: ID, x: number, y: number, z: number): number;
                get(data: number): number;
                set(data: number, level: number): number;
                setAt(dimensionId: ID, x: number, y: number, z: number, level: number): void;
                state: {
                    getAt(dimensionId: ID, x: number, y: number, z: number): number;
                    get(data: number): number;
                    set(data: number, level: number): number;
                    setAt(dimensionId: ID, x: number, y: number, z: number, state: number): void;
                };
            };
        };
    };
    heightMap: {
        update: {
            add(dimensionId: ID, substance: VoxelSubstanceType, x: number, y: number, z: number): void;
            remove(dimensionId: ID, substance: VoxelSubstanceType, x: number, y: number, z: number): void;
        };
    };
    paint: {
        getVoxelBrush(): void;
        voxel(data: AddVoxelData, update?: boolean): void;
        voxelAsync(data: AddVoxelData): Promise<void>;
        __paint(dimension: ID, data: AddVoxelData, chunk: ChunkData, update?: boolean): false | undefined;
        erease(dimensionId: ID, x: number, y: number, z: number): void;
        _worldGen: {
            getPaletteId(voxelId: string, voxelState: number): number;
        };
    };
    light: {
        get(dimesnionId: ID, x: number, y: number, z: number): number;
        set(dimesnionId: ID, x: number, y: number, z: number, lightValue: number): -1 | undefined;
        red: {
            get(dimesnionId: ID, x: number, y: number, z: number): number;
            set(dimesnionId: ID, x: number, y: number, z: number, value: number): 0 | undefined;
        };
        green: {
            get(dimesnionId: ID, x: number, y: number, z: number): number;
            set(dimesnionId: ID, x: number, y: number, z: number, value: number): 0 | undefined;
        };
        blue: {
            get(dimesnionId: ID, x: number, y: number, z: number): number;
            set(dimesnionId: ID, x: number, y: number, z: number, value: number): 0 | undefined;
        };
        sun: {
            get(dimesnionId: ID, x: number, y: number, z: number): number;
            set(dimesnionId: ID, x: number, y: number, z: number, value: number): 0 | undefined;
        };
    };
};
export {};
