import type { AddVoxelData, VoxelPalette, VoxelPaletteMap } from "../Meta/Data/WorldData.types";
export declare const WorldData: {
    _currentionDimension: string;
    voxelPalette: VoxelPalette;
    voxelPaletteMap: VoxelPaletteMap;
    setCurrentDimension(id: string | number): void;
    setVoxelPalette(voxelPalette: VoxelPalette, voxelPaletteMap: VoxelPaletteMap): void;
    rawData: {
        get(dimensionId: string | number, x: number, y: number, z: number, secondary?: boolean): void;
        set(dimensionId: string | number, x: number, y: number, z: number, value: number, secondary?: boolean): void;
    };
    voxel: {
        getData(dimensionId: string | number, x: number, y: number, z: number): void;
        getState(dimensionId: string | number, x: number, y: number, z: number): void;
        getShapeState(dimensionId: string | number, x: number, y: number, z: number): void;
        getLevel(dimensionId: string | number, x: number, y: number, z: number): void;
        setState(dimensionId: string | number, x: number, y: number, z: number, state: number): void;
        setShapeState(dimensionId: string | number, x: number, y: number, z: number, shapeState: number): void;
        setLevel(dimensionId: string | number, x: number, y: number, z: number, level: number): void;
        getStringId(dimensionId: string | number, x: number, y: number, z: number): void;
        getNumrticId(dimensionId: string | number, x: number, y: number, z: number): void;
    };
    paint: {
        voxel(data: AddVoxelData): void;
    };
    light: {
        get(dimesnionId: string | number, x: number, y: number, z: number): void;
        set(dimesnionId: string | number, x: number, y: number, z: number, value: number): void;
        getRed(dimesnionId: string | number, x: number, y: number, z: number): void;
        getBlue(dimesnionId: string | number, x: number, y: number, z: number): void;
        getGreen(dimesnionId: string | number, x: number, y: number, z: number): void;
        getSun(dimesnionId: string | number, x: number, y: number, z: number): void;
        setRed(dimesnionId: string | number, x: number, y: number, z: number, value: number): void;
        setGreen(dimesnionId: string | number, x: number, y: number, z: number, value: number): void;
        setBlue(dimesnionId: string | number, x: number, y: number, z: number, value: number): void;
        setSun(dimesnionId: string | number, x: number, y: number, z: number, value: number): void;
    };
};
