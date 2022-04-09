import type { EngineSettingsData } from "Meta/index";
import { NodeWorker } from "Meta/Comms/NodeWorker.interface";



export type DVESInitData = { 
 worldWorker: string | NodeWorker;
 builderWorker: string | NodeWorker[];
 fluidBuilderWorker: string | NodeWorker;
 nexusWorker?: string | NodeWorker | null;
} & EngineSettingsData;
