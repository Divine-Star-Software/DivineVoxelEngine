import type { InterCommInterface } from "Meta/Comms/InterComm.types";
import { NodeWorker } from "Meta/Comms/NodeWorker.interface.js";
export declare const ConstructorCommManager: {
    count: number;
    constructors: InterCommInterface[];
    $INIT(): void;
    createConstructors(path: string, numBuilders?: number): void;
    setConstructors(constructors: Worker[] | NodeWorker[]): void;
    syncSettings(data: any): void;
};
