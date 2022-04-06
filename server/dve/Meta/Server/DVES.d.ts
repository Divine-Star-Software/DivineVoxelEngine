import type { EngineSettingsData } from "Meta/index";
interface NodeWorker {
    postMessage: (data: any, transfers?: any) => void;
    on(event: 'close', listener: () => void): this;
    on(event: 'message', listener: (value: any) => void): this;
    on(event: 'messageerror', listener: (error: Error) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
}
export declare type DVESInitData = {
    worldWorker: string | NodeWorker;
    builderWorker: string | NodeWorker[];
    fluidBuilderWorker: string | NodeWorker;
    nexusWorker?: string | NodeWorker | null;
} & EngineSettingsData;
export {};
