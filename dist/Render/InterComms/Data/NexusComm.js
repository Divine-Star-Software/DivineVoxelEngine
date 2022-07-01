import { DVER } from "../../DivineVoxelEngineRender.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
const nexusCommBase = CreateInterComm("render-nexus", {});
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
        const channel = new MessageChannel();
        DVER.worldComm.sendMessage("connect-nexus", [], [channel.port1]);
        nexusComm.sendMessage("connect-world", [], [channel.port2]);
    },
});
export const NexusComm = nexusComm;
