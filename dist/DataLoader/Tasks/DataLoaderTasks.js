import { DVEDL } from "../DivineVoxelEngineDataLoader.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
export const DataLoaderTasks = {
    saveRegion: ThreadComm.registerTasks("save-region", async (data, onDone) => {
        await DVEDL.serializer.saveRegion(data);
        return onDone ? onDone() : false;
    }, "deffered"),
    loadRegion: ThreadComm.registerTasks("load-region", async (data, onDone) => {
        await DVEDL.serializer.loadRegion(data);
        return onDone ? onDone() : false;
    }, "deffered"),
};
