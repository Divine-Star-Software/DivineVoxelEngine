import { NodeWorker } from "Meta/Server/DVES";
declare type InterCommPortTypes = Worker | NodeWorker | MessagePort;
export declare type InterCommInterface = {
    name: string;
    port: InterCommPortTypes | null;
    setPort: (port: InterCommPortTypes) => void;
    messageFunctions: Record<string, (data: any, event?: MessageEvent) => void>;
    sendMessage: (message: string, data: any[], transfers?: any[]) => void;
} & {
    [key: string]: any;
};
export declare function CreateInterComm<T>(name: string, mergeObject: T, messageFunctions: Record<string, () => void>): InterCommInterface & T;
export {};
