import { RegisterEntitesInNexus } from "../../Shared/Functions/RegisterEntitiesInNexus.js";
import { DVEN } from "../../../out/index.js";
console.log("HELLO FROM NEXUS");
RegisterEntitesInNexus(DVEN);
const start = () => { };
await DVEN.$INIT({
    onReady: start,
});
DVEN.worldComm.listenForMessage("done", async (data, event) => {
    await DVEN.loadChunkIntoNexus(0, 0, 0);
    await DVEN.loadChunkIntoNexus(-16, 0, 0);
    await DVEN.loadChunkIntoNexus(0, 0, -16);
    await DVEN.loadChunkIntoNexus(-16, 0, -16);
    await DVEN.loadChunkIntoNexus(0, 0, 0);
    const voxel = DVEN.worldMatrix.getData(0, 0, 0);
    console.log(voxel);
});
DVEN.nexusEntites.spawnEntity("entity-1", { x: 0, y: 15, z: 0 });
DVEN.nexusEntites.spawnEntity("entity-1", { x: 5, y: 20, z: 5 });
DVEN.nexusEntites.spawnEntity("entity-1", { x: -5, y: 30, z: -5 });
DVEN.nexusEntites.spawnEntity("entity-1", { x: -8, y: 15, z: 5 });
DVEN.nexusEntites.spawnEntity("entity-1", { x: 8, y: 25, z: 5 });
