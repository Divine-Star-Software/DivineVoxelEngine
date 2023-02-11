import { TextureTypeUVMap } from "Meta/index.js";
export declare const ConstructorCommManager: import("../../../Libs/ThreadComm/Manager/CommManager.js").CommManager & {
    $INIT(dasta: TextureTypeUVMap): void;
    createConstructors(path: string, numBuilders?: number): void;
    setConstructors(constructors: Worker[]): void;
    syncSettings(data: any): void;
};
