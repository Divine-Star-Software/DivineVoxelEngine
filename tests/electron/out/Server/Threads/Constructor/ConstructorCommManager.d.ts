import { CommPortTypes } from "Libs/ThreadComm/Meta/Comm/Comm.types.js";
export declare const ConstructorCommManager: import("../../../Libs/ThreadComm/Manager/CommManager.js").CommManager & {
    $INIT(): void;
    createConstructors(path: string, numBuilders?: number): void;
    setConstructors(constructors: CommPortTypes[]): void;
    syncSettings(data: any): void;
};
