import { EngineSettingsData } from "Meta/Global/EngineSettings.types";


export type DVEInitData = {
    worldWorkerPath: string;
    builderWorkerPath: string;
    fluidBuilderWorkerPath: string;
} & EngineSettingsData;


