import { CommPortTypes } from "Libs/ThreadComm/Meta/Comm/Comm.types";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import type { RecursivePartial } from "Meta/Util.types";
export declare type DVESInitData = {
    worldWorker: string | CommPortTypes;
    constructorWorker: string | CommPortTypes[];
    nexusWorker?: string | CommPortTypes | null;
    dataWorker?: string | CommPortTypes | null;
    fxWorker?: string | CommPortTypes | null;
    richWorldWorker?: string | CommPortTypes | null;
} & RecursivePartial<EngineSettingsData>;
