import {  ThreadPool } from "@amodx/threads/";
import { LocationData } from "../../../Math";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";

export const LoaderRegister = {
  load: new Map<string, Function[]>(),
  dataComm: <ThreadPool>{},
  $INIT(dataComm: ThreadPool) {
    this.dataComm = dataComm;
  },

  addToLoad(location: LocationData, run: Function) {
    const key = WorldSpaces.column.getKeyXYZ(location[1], 0, location[3]);
    let load = this.load.get(key);
    if (load) return load.push(run);
    const newL: LocationData = [...location];
    load = [];
    this.load.set(key, load);
    load.push(run);

    this.dataComm.runPromiseTasks("load-column", newL, [], (data) => {
      this.runLoad(newL, data);
    });
  },

  runLoad(location: LocationData, data: any) {
    const key = WorldSpaces.column.getKeyXYZ(location[1], 0, location[3]);
    const run = this.load.get(key);
    if (!run) return false;
    run.forEach((_) => _(data));
    this.load.delete(key);
  },
};
