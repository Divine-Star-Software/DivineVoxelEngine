import { SafeInterval } from "@divinestar/utils/Intervals/SafeInterval";
import { IWGSingleTask } from "../../Classes/Tasks/IWGSingleTask";
import { WorldRegister } from "../../../../../Data/World/WorldRegister";
import {
  IWGTasksData,
  IWGTaskBaseInterface,
} from "../../Classes/Tasks/IWGTaskBase";
import { IWGTasksTypes } from "../../Types/IWG.types";
import { IWGBatchTask } from "../../Classes/Tasks/IWGBatchTask";
import { LocationData } from "@divinevoxel/core/Math";

export class IWGLoadBatchTasks extends IWGBatchTask {
  static Data: IWGTasksData = {
    id: "#dve_iwg_load",
    name: "load",
    type: IWGTasksTypes.WorldGen,
    propagationBlocking: true,
  };
  getMeta(): IWGTasksData {
    return this.getClass().Data;
  }
  getClass(): IWGTaskBaseInterface {
    return IWGLoadBatchTasks;
  }

  async run(locations: LocationData[], onDone: Function) {
    if (!this.gen.dataLoader) {
      for (const location of locations) {
        if (!this.gen.columnTool.loadInAtLocation(location)) {
          this.gen.builder.setLocation(location).fillColumn();
        }
      }
      return onDone();
    }
    const existsRecord = await this.gen.dataLoader?.columnExistsBatch(
      locations
    );
    if (!existsRecord) {
      console.warn("no exists record", locations);
      return;
    }

    const toBeLoaded: LocationData[] = [];

    for (const location of locations) {
      if (this.gen.columnTool.loadInAtLocation(location)) continue;
      const key = location.toString();
      if (!existsRecord[key]) {
        this.gen.builder.setLocation(location).fillColumn();
        this.remove(location[1], location[2], location[3]);
      } else {
        toBeLoaded.push(location);
      }
    }

    console.log("GOT THE COLUMNS TO BE LOADED", toBeLoaded);
    onDone();
  }
}
