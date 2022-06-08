import type { InterCommInterface } from "Meta/Comms/InterComm.types";
export declare const ConstructorCommManager: {
    count: number;
    constructors: InterCommInterface[];
    $INIT(): void;
    createConstructors(path: string, numBuilders?: number): void;
    setConstructors(constructors: Worker[]): void;
    syncSettings(data: any): void;
};
