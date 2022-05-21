import { EngineSettingsData } from "Meta/Global/EngineSettings.types";
export type DVERInitData = {
    worldWorker: string | Worker;
    worldGenWorker: string | Worker[];
    builderWorker: string | Worker[];
    nexusWorker?: string | Worker | null; 
} & EngineSettingsData;



