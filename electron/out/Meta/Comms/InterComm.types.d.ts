import { NodeWorker } from "./NodeWorker.interface";
export declare type InterCommPortTypes = Worker | NodeWorker | MessagePort;
export declare type InterCommInterface = {
    environment: "node" | "browser";
    name: string;
    port: InterCommPortTypes | null;
    __onSetPortRun: Function;
    onSetPort: (set: (port: InterCommPortTypes) => void) => void;
    setPort: (port: InterCommPortTypes) => void;
    messageFunctions: Record<string, (data: any, event?: MessageEvent) => void>;
    sendMessage: (message: string, data: any[], transfers?: any[]) => void;
    listenForMessage: (message: string, run: (data: any[], event?: MessageEvent) => void) => void;
    onMessage: (event: any) => void;
};
