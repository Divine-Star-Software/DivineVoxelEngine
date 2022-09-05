import type { NodeWorker } from "Meta/Comms/NodeWorker.interface";
import type { EngineSettingsData } from "Meta/Global/EngineSettings.types";
import type { RecursivePartial } from "Meta/Util.types";

export type DVESInitData = {
 worldWorker: string | NodeWorker;
 constructorWorker: string | NodeWorker[];
 nexusWorker?: string | NodeWorker | null;
 dataWorker?: string | NodeWorker | null;
 fxWorker?: string | NodeWorker | null;
 richWorldWorker?: string | NodeWorker | null;
} & RecursivePartial<EngineSettingsData>;
