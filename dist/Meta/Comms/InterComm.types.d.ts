export interface NodeWorker {
    postMessage: (data: any, transfers?: any) => void;
    on(event: 'close', listener: () => void): this;
    on(event: 'message', listener: (value: any) => void): this;
    on(event: 'messageerror', listener: (error: Error) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
}
export declare type InterCommPortTypes = Worker | NodeWorker | MessagePort;
export declare type InterCommInterface = {
    environment: "node" | "browser";
    name: string;
    port: InterCommPortTypes | null;
    __onSetPortRun: Function;
    onSetPort: (set: (port: InterCommPortTypes) => void) => void;
    setPort: (port: InterCommPortTypes) => void;
    messageFunctions: Record<string | number, (data: any, event?: MessageEvent) => void>;
    sendMessage: (message: string | number, data?: any[], transfers?: any[]) => void;
    listenForMessage: (message: string | number, run: (data: any[], event?: MessageEvent) => void) => void;
    onMessage: (event: any) => void;
};
