import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
//data
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { DataCreator } from "../Data/Creator.js";
import { DataSync } from "../Data/DataSync.js";
export const WorldTasks = {
    addChunk: ThreadComm.registerTasks("add-chunk", (data) => {
        const chunk = WorldRegister.chunk.get(data[0], data[1], data[2], data[3]);
        if (!chunk) {
            const chunkData = DataCreator.chunk.getBuffer();
            WorldRegister.chunk.add(data[0], data[1], data[2], data[3], chunkData);
        }
        else {
            DataSync.chunk.sync(data[0], data[1], data[2], data[3]);
        }
    }),
};
