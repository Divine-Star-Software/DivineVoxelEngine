import { ChunkReader } from "../../../Data/Chunk/ChunkReader.js";
import { DataHooks } from "../../../Data/DataHooks.js";
import { DataCreator } from "../../Data/Creator.js";
import { DataSync } from "../../Data/DataSync.js";
import { DVEW } from "../../DivineVoxelEngineWorld.js";
export const RegisterDataHooks = () => {
    const tasks = DVEW.getTasksManager();
    DataHooks.chunk.onGetAsync.addToRun(async (data) => {
        const chunkData = DataCreator.chunk.getBuffer();
        ChunkReader.setChunkPosition(new DataView(chunkData), {
            x: data[1],
            y: data[2],
            z: data[3],
        });
        return chunkData;
    });
    DataHooks.chunk.onGetSync.addToRun((data) => {
        const chunkData = DataCreator.chunk.getBuffer();
        ChunkReader.setChunkPosition(new DataView(chunkData), {
            x: data[1],
            y: data[2],
            z: data[3],
        });
        return chunkData;
    });
    DataHooks.chunk.onNew.addToRun(async (data) => {
        DataSync.chunk.sync(data[0], data[1], data[2], data[3]);
        return;
    });
    DataHooks.paint.onAddToRGBUpdate.addToRun((data) => {
        tasks.light.rgb.update.add(data[1], data[2], data[3], "main");
    });
    DataHooks.paint.onRichVoxelPaint.addToRun((data) => {
        DVEW.richWorldComm.setInitalData(data);
    });
    DataHooks.dimension.onRegisterDimension.addToRun((data) => {
        DVEW.cQueues.addQueue(data.id);
        DataSync.dimesnion.sync(data);
    });
};
