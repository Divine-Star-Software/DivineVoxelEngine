import { VoxelPalette, VoxelPaletteMap } from "Meta/Data/WorldData.types";
export declare const VoxelPaletteReader: {
    _palette: VoxelPalette;
    _map: Map<string, number>;
    setVoxelPalette(voxelPalette: VoxelPalette, voxelPaletteMap: VoxelPaletteMap): void;
    id: {
        stringFromNumber(id: number): string;
        numberFromString(id: string): number | undefined;
        getPaletteId(voxelId: string, voxelState: number): number;
        baseNumeric(id: number): number;
    };
};
