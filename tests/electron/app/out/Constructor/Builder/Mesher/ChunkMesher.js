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
    buildChunkMesh(location, template, LOD = 1) {
        let i = this.voxelBuildOrder.length;
        const chunks = [location, []];
        const trasnfers = [];
        while (i--) {
            const type = this.voxelBuildOrder[i];
            const baseTemplate = template[type];
            if (baseTemplate.positionTemplate.length == 0) {
                chunks[1].push([type, false]);
                continue;
            }
            const meshData = VoxelMesher.$buildMesh(type, baseTemplate, LOD, location);
            if (!meshData)
                return;
            chunks[1].push([
                type,
                //@ts-ignore
                ...meshData[0],
            ]);
            trasnfers.push(...meshData[1]);
        }
        DVEC.parentComm.runTasks("set-chunk", chunks, trasnfers);
    },
};
