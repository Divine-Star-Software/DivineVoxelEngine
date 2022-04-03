import type { DivineVoxelEngineNexus } from "Nexus/DivineVoxelEngineNexus";

export function InitNexusWorker(
 DVEN: DivineVoxelEngineNexus,
 onReady: Function,
 onMessage: Function,
 onRestart?: Function
) {
 const messageFunctions: Record<
  string,
  (data: any, event: MessageEvent) => void
 > = {
  "connect-world": (data, eventData) => {
   const port = eventData.ports[0];
   DVEN.worldComm.setWorldPort(port);
   onReady();
  },
  "sync-settings": (data, eventData) => {
   const settings = data[1];
   DVEN.syncSettings(settings);
  },
 };

 addEventListener("message", (event: MessageEvent) => {
  const eventData = event.data;
  const message = eventData[0];
  if (messageFunctions[message]) {
   messageFunctions[message](eventData, event);
  }
 });
}
