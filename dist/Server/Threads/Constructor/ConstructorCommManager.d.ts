import { CommPortTypes } from "threadcomm";
export declare const ConstructorCommManager: import("threadcomm").CommManager & {
    $INIT(): void;
    createConstructors(path: string, numBuilders?: number): void;
    setConstructors(constructors: CommPortTypes[]): void;
    syncSettings(data: any): void;
};
