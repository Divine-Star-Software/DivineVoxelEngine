import type { EngineSettingsData } from "Meta/index";
export declare type DVERInitData = {
    worldWorker: string | Worker;
    builderWorker: string | Worker[];
    fluidBuilderWorker: string | Worker;
    nexusWorker?: string | Worker | null;
} & EngineSettingsData;
