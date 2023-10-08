import type { Scene } from "@babylonjs/core";
import type { EngineSettingsData } from "Types/Data/Settings/EngineSettings.types";
import type { RecursivePartial } from "Types/Util.types";

export type DVERInitData = {
  worldWorker: Worker;
  constructorWorkers: Worker[];
  scene?: Scene;
  nexusWorker?: Worker;
  dataWorker?: Worker;
  fxWorker?: Worker;
  richWorldWorker?: Worker;
} & RecursivePartial<EngineSettingsData>;
