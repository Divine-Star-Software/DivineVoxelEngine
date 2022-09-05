import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import type { RecursivePartial } from "Meta/Util.types";

export type DVERInitData = {
 worldWorker: string | Worker;
 constructorWorker: string | Worker[];
 nexusWorker?: string | Worker | null;
 dataWorker?: string | Worker | null;
 fxWorker?: string | Worker | null;
 richWorldWorker?: string | Worker | null;
} & RecursivePartial<EngineSettingsData>;
