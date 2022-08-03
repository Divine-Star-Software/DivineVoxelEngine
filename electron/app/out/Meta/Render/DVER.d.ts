import { EngineSettingsData } from "Meta/Global/EngineSettings.types";
declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
export declare type DVERInitData = {
    worldWorker: string | Worker;
    constructorWorker: string | Worker[];
    nexusWorker?: string | Worker | null;
    dataWorker?: string | Worker | null;
    fxWorker?: string | Worker | null;
    richWorldWorker?: string | Worker | null;
} & RecursivePartial<EngineSettingsData>;
export {};
