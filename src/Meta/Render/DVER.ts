import { EngineSettingsData } from "Meta/Global/EngineSettings.types";
export type DVERInitData = {
    worldWorker: string | Worker;
    propagationWorker: string | Worker[];
    builderWorker: string | Worker[];
    nexusWorker?: string | Worker | null; 
} & EngineSettingsData;



