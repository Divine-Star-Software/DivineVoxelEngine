import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import type { RecursivePartial } from "Meta/Util.types";
export declare type DVERInitData = {
    worldWorker: string | Worker;
    constructorWorker: string | Worker[];
    nexusWorker?: string | Worker | null;
    dataWorker?: string | Worker | null;
    fxWorker?: string | Worker | null;
    richWorldWorker?: string | Worker | null;
} & RecursivePartial<EngineSettingsData>;
