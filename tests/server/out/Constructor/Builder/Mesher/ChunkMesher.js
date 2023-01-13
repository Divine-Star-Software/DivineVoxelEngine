//objects
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { VoxelMesher } from "../Tools/VoxelMesher.js";
export const ChunkMesher = {
    voxelBuildOrder: [
        "solid",
        "flora",
        "liquid",
        "magma",
    ],
    buildChunkMesh(dimension, chunkX, chunkY, chunkZ, template, LOD = 1) {
        let i = this.voxelBuildOrder.length;
        const chunks = [dimension, chunkX, chunkY, chunkZ, []];
        const trasnfers = [];
        while (i--) {
            const type = this.voxelBuildOrder[i];
            const baseTemplate = template[type];
            if (baseTemplate.positionTemplate.length == 0) {
                chunks[4].push([type, false]);
                continue;
            }
            const meshData = VoxelMesher.$buildMesh(type, baseTemplate, LOD, chunkX, chunkY, chunkZ);
            chunks[4].push([
                type,
                //@ts-ignore
                ...meshData[0],
            ]);
            trasnfers.push(...meshData[1]);
        }
        DVEC.parentComm.runTasks("set-chunk", chunks, trasnfers);
    },
};
