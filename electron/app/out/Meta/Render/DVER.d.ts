import { EngineSettingsData } from "Meta/Global/EngineSettings.types";
export declare type DVERInitData = {
    worldWorker: string | Worker;
    constructorWorker: string | Worker[];
    nexusWorker?: string | Worker | null;
} & EngineSettingsData;
