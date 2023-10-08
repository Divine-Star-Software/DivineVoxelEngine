import { CommPortTypes } from "@divinestar/threads/"
import type { EngineSettingsData } from "Types/Data/Settings/EngineSettings.types";
import type { RecursivePartial } from "Types/Util.types";

export type DVESInitData = {
 worldWorker: string | CommPortTypes;
 constructorWorker: string | CommPortTypes[];
 nexusWorker?: string | CommPortTypes | null;
 dataWorker?: string | CommPortTypes | null;
 fxWorker?: string | CommPortTypes | null;
 richWorldWorker?: string | CommPortTypes | null;
} & RecursivePartial<EngineSettingsData>;
