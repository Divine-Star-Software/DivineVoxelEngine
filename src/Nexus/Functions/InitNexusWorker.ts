import type { DivineVoxelEngineNexus } from "Nexus/DivineVoxelEngineNexus";

export function InitNexusWorker(
 DVEW: DivineVoxelEngineNexus,
 onReady: Function,
 onMessage: Function,
 onRestart?: Function
) {



    addEventListener("message", (event: MessageEvent) => {
        const eventData = event.data;
        const message = eventData[0];
        


        onMessage(message, eventData);
    });


}
