import type { CommPortTypes } from "../Meta/Comm/Comm.types";
import type { MessageFunction, MessageRecord } from "../Meta/Util.types.js";
import type { CommManager } from "../Manager/CommManager.js";
export declare class CommBase {
    name: string;
    managerName: string;
    environment: "node" | "browser";
    __ready: boolean;
    port: CommPortTypes | null;
    messageFunctions: MessageRecord;
    _manager: CommManager | null;
    constructor(name: string, managerName?: string, commManager?: CommManager | null);
    isReady(): boolean;
    sendReadySignal(): void;
    __onSetPortRun: (port: CommPortTypes) => void;
    isPortSet(): boolean;
    onSetPort(set: (port: CommPortTypes) => void): void;
    __handleMessage(data: any, event: any): void;
    setPort(port: CommPortTypes): void;
    __throwError(message: string): void;
    sendMessage(message: string | number, data?: any[], transfers?: any[]): void;
    listenForMessage(message: string | number, run: MessageFunction): void;
    connectToComm(commToConnectTo: CommBase): void;
    runTasks<T>(id: string, data: T, queue?: string): void;
    __syncQueue(id: string, sab: SharedArrayBuffer): void;
    __unSyqncQueue(id: string): void;
    onMessage(event: any): void;
}
export declare function CreateComm<T>(name: string, mergeObject: T): CommBase & T;
