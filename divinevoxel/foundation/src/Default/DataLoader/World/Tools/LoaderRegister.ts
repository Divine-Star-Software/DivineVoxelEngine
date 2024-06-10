import { CommBase, CommManager } from "@divinestar/threads/";
import { LocationData } from "@divinevoxel/core/Math";
import { UtilMap } from "../../../../Util/UtilMap.js";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";

export const LoaderRegister = {
  load: new UtilMap<string, Function[]>(),
  dataComm: <CommManager>{},
  $INIT(dataComm: CommManager) {
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
    this.load.remove(key);
  },
};
