import type { DivineVoxelEngineWorld } from "../DivineVoxelEngineWorld";

export function InitWorldWorker(
 DVEW: DivineVoxelEngineWorld,
 onReady: Function,
 onMessage: Function
): Promise<any> {

 const prom = new Promise((resolve) => {
    
  addEventListener("message", (event: MessageEvent) => {
   const eventData = event.data;

   const message = eventData[0];

   if (message == "get-world-data") {
    const textures = DVEW.textureManager.generateTexturesData();
    DVEW.worker.postMessage(["set-world-data", { texturePaths: textures }]);
   }

   if (message == "block-add") {
    const chunkXZ = DVEW.UTIL.calculateGameZone(eventData[1], eventData[3]);
    DVEW.worldData.requestBlockAdd(
     chunkXZ[0],
     chunkXZ[1],
     eventData[1],
     eventData[2],
     eventData[3]
    );
   }
   if (message == "block-remove") {
    const chunkXZ = DVEW.UTIL.calculateGameZone(eventData[1], eventData[3]);
    DVEW.worldData.requestBlockRemove(
     chunkXZ[0],
     chunkXZ[1],
     eventData[1],
     eventData[2],
     eventData[3]
    );
   }

   if (eventData == "start") {
    onReady();
    return;
   }

   if (message == "connect-builder") {
    const port = event.ports[0];
    DVEW.builderManager.addBuilder(port);

    port.onmessage = (event: MessageEvent) => {
     if (DVEW.voxelManager.shapMapIsSet()) return;
     if (event.data[0] == "connect-shape-map") {
         console.log(event.data[1]);
      DVEW.voxelManager.setShapeMap(event.data[1]);
      resolve(true);
     }
    };
   }

   onMessage(message, eventData);
  });
 });
 return prom;
}
