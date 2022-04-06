import { DVESInitData } from "Meta/Server/DVES";
declare class DivineVoxelEngineServer {
    $INIT(data: DVESInitData): Promise<void>;
}
export declare const DVES: DivineVoxelEngineServer;
export {};
