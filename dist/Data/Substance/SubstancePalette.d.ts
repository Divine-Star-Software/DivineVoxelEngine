export declare const SubstancePaletteReader: {
    _palette: string[];
    _map: Map<string, number>;
    setPalette(palette: string[], map: Record<string, number>): void;
    id: {
        stringFromNumber(id: number): string;
        numberFromString(id: string): number;
    };
};
