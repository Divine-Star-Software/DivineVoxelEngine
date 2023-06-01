import type { SubstanceData } from "Meta/Data/Substances/Substances.types.js";
export declare const SubstanceDataGenerator: {
    $generate(): void;
    palette: {
        _count: number;
        _palette: string[];
        _map: Record<string, number>;
        register(sustance: SubstanceData): void;
        get(): string[];
        getMap(): Record<string, number>;
    };
};
