import { RegisterEntitesInNexus } from "../../Shared/Functions/RegisterEntitiesInNexus.js";
import { DVEN } from "../../../out/Nexus/DivineVoxelEngineNexus.js";
console.log("HELLO FROM NEXUS");
RegisterEntitesInNexus(DVEN);
await DVEN.$INIT();
console.log("good to go");
DVEN.worldComm.listenForMessage("done", async (data, event) => {
    DVEN.nexusEntites.spawnEntity("entity-1", { x: 0, y: 15, z: 0 });
    DVEN.nexusEntites.spawnEntity("entity-1", { x: 5, y: 20, z: 5 });
    DVEN.nexusEntites.spawnEntity("entity-1", { x: -5, y: 30, z: -5 });
    DVEN.nexusEntites.spawnEntity("entity-1", { x: -8, y: 15, z: 5 });
    DVEN.nexusEntites.spawnEntity("entity-1", { x: 8, y: 25, z: 5 });
});
