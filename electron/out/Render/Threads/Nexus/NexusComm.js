import { DVER } from "../../DivineVoxelEngineRender.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
const nexusCommBase = ThreadComm.createComm("nexus");
nexusCommBase.listenForMessage("spawn-entity", (data) => {
    const entityId = data[1];
    const identiferId = data[2];
    const position = data[3];
    const states = data[4];
    DVER.renderedEntites.spawnEntity(entityId, identiferId, position, states);
});
nexusCommBase.listenForMessage("de-spawn-entity", (data) => {
    const entityId = data[1];
    const identiferId = data[2];
    DVER.renderedEntites.deSpawnEntity(entityId, identiferId);
});
const nexusComm = Object.assign(nexusCommBase, {
    $INIT() {
        nexusComm.connectToComm(DVER.worldComm);
    },
});
export const NexusComm = nexusComm;
