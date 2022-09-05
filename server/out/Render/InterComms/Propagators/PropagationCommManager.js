//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
//functions
import { GetNewPropagationComm } from "./PropagationComm.js";
export const PropagationCommManager = {
    count: 0,
    worldGens: [],
    $INIT() {
        for (const worldGens of this.worldGens) {
            const channel = new MessageChannel();
            DVER.worldComm.sendMessage("connect-propagator", [worldGens.name], [channel.port1]);
            worldGens.sendMessage("connect-world", [], [channel.port2]);
        }
    },
    createPropagators(path, numWorldGens = 4) {
        for (let i = 0; i <= numWorldGens; i++) {
            const newWorker = new Worker(new URL(path, import.meta.url), {
                type: "module",
            });
            this.count++;
            const newComm = GetNewPropagationComm(this.count, newWorker);
            this.worldGens.push(newComm);
        }
    },
    setPropagators(worldGens) {
        for (const worldGen of worldGens) {
            this.count++;
            const newComm = GetNewPropagationComm(this.count, worldGen);
            this.worldGens.push(newComm);
        }
    },
    syncSettings(data) {
        for (const worldGen of this.worldGens) {
            worldGen.sendMessage("sync-settings", [data]);
        }
    },
};
