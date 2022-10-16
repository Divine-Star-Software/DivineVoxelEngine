import { ConstructorTasks } from "../../../Constants/InterComms/ConstructorTasks.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const worldComm = ThreadComm.createComm("world", {});
export const WorldComm = worldComm;
