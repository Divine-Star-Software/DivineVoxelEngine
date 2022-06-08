import type { InterCommInterface } from "Meta/Comms/InterComm.types";
export declare const BuilderCommManager: {
    count: number;
    builders: InterCommInterface[];
    $INIT(): void;
    createBuilders(path: string, numBuilders?: number): void;
    setBuilders(builders: Worker[]): void;
    syncSettings(data: any): void;
};
