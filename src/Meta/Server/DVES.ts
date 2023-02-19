import { CommPortTypes } from "threadcomm"
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types";
import type { RecursivePartial } from "Meta/Util.types";

export type DVESInitData = {
 worldWorker: string | CommPortTypes;
 constructorWorker: string | CommPortTypes[];
 nexusWorker?: string | CommPortTypes | null;
 dataWorker?: string | CommPortTypes | null;
 fxWorker?: string | CommPortTypes | null;
 richWorldWorker?: string | CommPortTypes | null;
} & RecursivePartial<EngineSettingsData>;
