import { LocationData } from "@divinevoxel/core/Math";
import {
  ExplosionTaskRequests,
  FlowTaskRequests,
  LightTaskRequest,
  WorldSunTaskRequest,
} from "../../Contexts/Constructor/Tasks/TasksRequest";

export abstract class DVEPropagation {
  abstract worldSun(tasks: WorldSunTaskRequest): void;
  abstract flowUpdate(tasks: FlowTaskRequests,rebuild?:boolean): Promise<void>;
  abstract flowRemove(tasks: FlowTaskRequests,rebuild?:boolean): Promise<void>;
  abstract rgbUpdate(tasks: LightTaskRequest): void;
  abstract rgbRemove(tasks: LightTaskRequest): void;
  abstract sunUpdate(tasks: LightTaskRequest,update?:boolean): void;
  abstract sunRemove(tasks: LightTaskRequest,update?:boolean): void;
  abstract explosion(tasks: ExplosionTaskRequests): void;
}
