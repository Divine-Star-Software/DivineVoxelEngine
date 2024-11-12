import { IWGTaskRegister } from "../Classes/Tasks/IWGTaskRegister.js";
import { IWGBuildTasks } from "./Rendering/IWGBuildTasks.js";
import { IWGSaveTasks } from "./Saving/IWGSaveTasks.js";
import { IWGSaveAndUnloadTasks } from "./Saving/IWGSaveAndUnloadTasks.js";
import { IWGLoadTask } from "./WorldGen/IWGLoadTasks.js";
import { IWGGenerateTasks } from "./WorldGen/IWGGenerateTasks.js";
import { IWGDecorateTasks } from "./WorldGen/IWGDecorateTasks.js";
import { IWGWorldSunTasks } from "./WorldGen/IWGWorldSunTasks.js";
import { IWGPropagationTasks } from "./WorldGen/IWGPropagationTasks.js";

export function RegisterDefaultTasks() {
  IWGTaskRegister.registerTask(
    IWGBuildTasks,
    IWGSaveTasks,
    IWGSaveAndUnloadTasks,
    IWGLoadTask,
    IWGGenerateTasks,
    IWGDecorateTasks,
    IWGWorldSunTasks,
    IWGPropagationTasks
  );
}
