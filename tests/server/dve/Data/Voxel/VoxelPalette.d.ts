import { VoxelPalette, VoxelPaletteMap } from "Meta/Data/WorldData.types";
export declare const VoxelPaletteReader: {
    _palette: Record<number, string>;
    _map: Record<string, number>;
    setVoxelPalette(voxelPalette: VoxelPalette, voxelPaletteMap: VoxelPaletteMap): void;
    id: {
        stringFromNumber(id: number): string;
        numberFromString(id: string): number;
        getPaletteId(voxelId: string, voxelState: number): number;
        baseNumeric(id: number): number;
    };
};
