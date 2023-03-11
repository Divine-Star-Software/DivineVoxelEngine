import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import type { RecursivePartial } from "Meta/Util.types";
export declare type DVERInitData = {
    worldWorker: Worker;
    constructorWorker: Worker[];
    nexusWorker?: Worker;
    dataWorker?: Worker;
    fxWorker?: Worker;
    richWorldWorker?: Worker;
} & RecursivePartial<EngineSettingsData>;
