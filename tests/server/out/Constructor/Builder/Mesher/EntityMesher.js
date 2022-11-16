import { ConstructorToRenderMessages } from "../../../Common/Threads/Contracts/ConstructorToRender.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { VoxelMesher } from "../Tools/VoxelMesher.js";
export const EntityMesher = {
    buildEntityMesh(x, y, z, template) {
        const meshData = VoxelMesher.$buildMesh("solid", template);
        DVEC.parentComm.sendMessage(ConstructorToRenderMessages.constructEntity, [x, y, z, ...meshData[0]], meshData[1]);
    },
};
