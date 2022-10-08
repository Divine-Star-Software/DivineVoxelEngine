import type { InterCommPortTypes } from "./InterComm.types";
declare class InterCommBase {
    environment: "node" | "browser";
    name: string;
    port: InterCommPortTypes | null;
    messageFunctions: Record<string | number, (data: any, event?: MessageEvent) => void>;
    __onSetPortRun: (port: InterCommPortTypes) => void;
    onSetPort(set: (port: InterCommPortTypes) => void): void;
    setPort(port: InterCommPortTypes): void;
    _errorMessage(message: string): void;
    sendMessage(message: string | number, data?: any[], transfers?: any[]): void;
    listenForMessage(message: string | number, run: (data: any[], event?: MessageEvent) => void): void;
    onMessage(event: any): void;
}
export declare function CreateInterComm<T>(name: string, mergeObject: T): InterCommBase & T;
export {};
