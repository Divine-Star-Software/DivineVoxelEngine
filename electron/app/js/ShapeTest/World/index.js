import { DVEW } from "../../../out/index.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelsWorldThread.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);
const start = () => {
    const chunk = WorldGen.generateChunk(0, 0);
    DVEW.worldData.setChunk(0, 0, 0, chunk);
    const chunk2 = WorldGen.generateChunk(-16, 0);
    DVEW.worldData.setChunk(-16, 0, 0, chunk2);
    const chunk3 = WorldGen.generateChunk(16, 0);
    DVEW.worldData.setChunk(16, 0, 0, chunk3);
    const chunk4 = WorldGen.generateChunk(0, 16);
    DVEW.worldData.setChunk(0, 0, 16, chunk4);
    const chunk5 = WorldGen.generateChunk(0, -16);
    DVEW.worldData.setChunk(0, 0, -16, chunk5);
    DVEW.worldData.setChunk(-16, 0, 16, WorldGen.generateChunk(-16, 16, "pillar"));
    DVEW.worldData.setChunk(16, 0, 16, WorldGen.generateChunk(16, 16));
    DVEW.worldData.setChunk(16, 0, -16, WorldGen.generateChunk(16, -16, "pillar"));
    DVEW.worldData.setChunk(-16, 0, -16, WorldGen.generateChunk(-16, -16));
    DVEW.buildChunk(0, 0, 0);
    DVEW.buildChunk(-16, 0, 0);
    DVEW.buildChunk(16, 0, 0);
    DVEW.buildChunk(0, 0, -16);
    DVEW.buildChunk(0, 0, 16);
    DVEW.buildChunk(-16, 0, 16);
    DVEW.buildChunk(16, 0, 16);
    DVEW.buildChunk(16, 0, -16);
    DVEW.buildChunk(-16, 0, -16);
};
DVEW.$INIT({
    onReady: start,
});
