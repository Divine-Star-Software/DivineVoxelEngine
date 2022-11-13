//types
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { CommPortTypes } from "Libs/ThreadComm/Meta/Comm/Comm.types.js";

const CCMBase = ThreadComm.createCommManager({
 name: "constructor",
 onPortSet(port, commName) {},
});

const CCM = Object.assign(CCMBase, {
 $INIT() {
    CCMBase.connectToCom(ThreadComm.getComm("world"));
 },
 createConstructors(path: string, numBuilders = 4) {
  for (let i = 0; i <= numBuilders; i++) {
   const newWorker = new Worker(new URL(path, import.meta.url), {
    type: "module",
   });
   CCM.addPort(newWorker);
  }
 },
 setConstructors(constructors: CommPortTypes[]) {
  CCM.addPorts(constructors);
 },
 syncSettings(data: any) {
  CCM.sendMessageToAll("sync-settings", [data]);
 },
});

export const ConstructorCommManager = CCM;
