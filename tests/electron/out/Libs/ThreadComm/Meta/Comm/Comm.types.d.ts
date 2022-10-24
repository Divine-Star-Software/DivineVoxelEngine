export interface NodeWorker {
    postMessage: (data: any, transfers?: any) => void;
    on(event: 'close', listener: () => void): this;
    on(event: 'message', listener: (value: any) => void): this;
    on(event: 'messageerror', listener: (error: Error) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
}
export declare type CommPortTypes = Worker | NodeWorker | MessagePort;
