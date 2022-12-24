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
        while (i--) {
            const type = this.voxelBuildOrder[i];
            const baseTemplate = template[type];
            if (baseTemplate.positionTemplate.length == 0) {
                DVEC.parentComm.runTasks("remove-chunk", [
                    dimension,
                    type,
                    chunkX,
                    chunkY,
                    chunkZ,
                ]);
                continue;
            }
            const meshData = VoxelMesher.$buildMesh(type, baseTemplate, LOD, chunkX, chunkY, chunkZ);
            DVEC.parentComm.runTasks("set-chunk", [
                dimension,
                type,
                chunkX,
                chunkY,
                chunkZ,
                //@ts-ignore
                ...meshData[0],
            ], meshData[1]);
        }
    },
};
