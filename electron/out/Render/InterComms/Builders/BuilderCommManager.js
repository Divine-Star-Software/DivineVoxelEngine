//objects
import { DVER } from "../../DivineVoxelEngineRender.js";
//functions
import { GetNewBuilderComm } from "./BuilderComm.js";
export const BuilderCommManager = {
    count: 0,
    builders: [],
    $INIT() {
        for (const builder of this.builders) {
            const channel = new MessageChannel();
            DVER.worldComm.sendMessage("connect-builder", [], [channel.port1]);
            builder.sendMessage("connect-world", [], [channel.port2]);
            builder.sendMessage("sync-uv-texuture-data", [
                DVER.textureManager.uvTextureMap,
            ]);
        }
    },
    createBuilders(path, numBuilders = 4) {
        for (let i = 0; i <= numBuilders; i++) {
            const newWorker = new Worker(new URL(path, import.meta.url), {
                type: "module",
            });
            this.count++;
            const newComm = GetNewBuilderComm(this.count, newWorker);
            this.builders.push(newComm);
        }
    },
    setBuilders(builders) {
        for (const builder of builders) {
            this.count++;
            const newComm = GetNewBuilderComm(this.count, builder);
            this.builders.push(newComm);
        }
    },
    syncSettings(data) {
        for (const builder of this.builders) {
            builder.sendMessage("sync-settings", [data]);
        }
    },
};
