//types
import type { TextureTypeUVMap } from "Meta/Render/Textures/Texture.types.js";
//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";

const CCMBase = ThreadComm.createCommManager({
 name: "constructor",
 onPortSet(port, commName) {},
});

const CCM = Object.assign(CCMBase, {
 $INIT(dasta: TextureTypeUVMap) {
  const worldComm = ThreadComm.getComm("world");

  for (const constructor of CCM.__comms) {
   worldComm.connectToComm(constructor);
   constructor.runTasks("sync-uv-texuture-data", dasta);
  }
 },
 createConstructors(path: string, numBuilders = 4) {
  for (let i = 0; i <= numBuilders; i++) {
   const newWorker = new Worker(new URL(path, import.meta.url), {
    type: "module",
   });
   CCM.addPort(newWorker);
  }
 },
 setConstructors(constructors: Worker[]) {
  CCM.addPorts(constructors);
 },
 syncSettings(data: any) {
  CCM.sendMessageToAll("sync-settings", [data]);
 },
});

export const ConstructorCommManager = CCM;
