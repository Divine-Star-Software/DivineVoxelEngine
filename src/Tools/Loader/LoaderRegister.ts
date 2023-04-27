import { CommBase } from "threadcomm";
import { LocationData } from "voxelspaces";
import { UtilMap } from "../../Global/Util/UtilMap.js";

export const LoaderRegister = {
 load: new UtilMap<string, Function[]>(),
 dataComm: <CommBase>{},
 $INIT(dataComm: CommBase) {
  this.dataComm = dataComm;
 },

 addToLoad(location: LocationData, run: Function) {
  const key = location.toString();
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
  const key = location.toString();
  const run = this.load.get(key);
  if (!run) return false;
  run.forEach((_) => _(data));
  this.load.remove(key);
 },
};
