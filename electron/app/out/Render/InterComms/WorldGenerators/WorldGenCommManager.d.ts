import type { InterCommInterface } from "Meta/Comms/InterComm.types";
export declare const WorldGenCommManager: {
    count: number;
    worldGens: InterCommInterface[];
    $INIT(): void;
    createWorldGens(path: string, numWorldGens?: number): void;
    setWorldGens(worldGens: Worker[]): void;
    syncSettings(data: any): void;
};
