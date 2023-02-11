//objects
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { VoxelMesher } from "../Tools/VoxelMesher.js";
export const ChunkMesher = {
    voxelBuildOrder: [
        "#dve_solid",
        "#dve_flora",
        "#dve_liquid",
        "#dve_magma",
    ],
    buildChunkMesh(location, template, LOD = 1) {
        let i = this.voxelBuildOrder.length;
        const chunks = [location, []];
        const trasnfers = [];
        for (const key of this.voxelBuildOrder) {
            const baseTemplate = template[key];
            if (!baseTemplate) {
                chunks[1].push([key, false]);
                continue;
            }
            const meshData = VoxelMesher.$buildMesh(key, baseTemplate, LOD, location);
            if (!meshData)
                return;
            chunks[1].push([
                key,
                //@ts-ignore
                ...meshData[0],
            ]);
            trasnfers.push(...meshData[1]);
        }
        DVEC.parentComm.runTasks("set-chunk", chunks, trasnfers);
    },
};
