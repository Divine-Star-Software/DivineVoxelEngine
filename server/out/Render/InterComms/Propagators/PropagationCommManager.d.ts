import type { InterCommInterface } from "Meta/Comms/InterComm.types";
export declare const PropagationCommManager: {
    count: number;
    worldGens: InterCommInterface[];
    $INIT(): void;
    createPropagators(path: string, numWorldGens?: number): void;
    setPropagators(worldGens: Worker[]): void;
    syncSettings(data: any): void;
};
