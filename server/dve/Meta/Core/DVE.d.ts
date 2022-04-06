import { EngineSettingsData } from "Meta/Global/EngineSettings.types";
export declare type DVEInitData = {
    worldWorker: string | Worker;
    builderWorker: string | Worker[];
    fluidBuilderWorker: string | Worker;
    nexusWorker?: string | Worker | null;
} & EngineSettingsData;
