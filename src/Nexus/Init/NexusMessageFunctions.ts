import { DivineVoxelEngineNexus } from "index";

export const getNexusWorkerFunctions = (
 resolve: Function,
 DVEN: DivineVoxelEngineNexus,
 onReady: Function
) => {
 const messageFunctions: Record<
  string,
  (data: any, event: MessageEvent) => void
 > = {
  "connect-world": async (data, eventData) => {
   const port = eventData.ports[0];
   DVEN.worldComm.setWorldPort(port);
   await DVEN.worldComm.awaitConnectionToWorldMatrix();
   resolve(true);
   onReady();
  },
  "sync-settings": (data, eventData) => {
   const settings = data[1];
   DVEN.syncSettings(settings);
  },
 };
 return messageFunctions;
};
