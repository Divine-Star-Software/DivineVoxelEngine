import { DVEFB } from "../../DivineVoxelEngineFluidBuilder.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
const setTemplate = (data) => {
    const chunkX = data[1];
    const chunkY = data[2];
    const chunkZ = data[3];
    const positions = new Uint16Array(data[4]);
    const faces = new Uint8Array(data[5]);
    const shapes = new Uint16Array(data[6]);
    const uvs = new Uint16Array(data[7]);
    const colors = new Float32Array(data[8]);
    const light = new Float32Array(data[9]);
    DVEFB.fluidMeshBuilder.addTemplate(chunkX, chunkY, chunkZ, positions, faces, shapes, uvs, colors, light);
};
const builderComm = CreateInterComm("world-builder-base", {});
export const GetNewBuilderComm = (count, port) => {
    const newComm = Object.create(builderComm);
    newComm.onSetPort((port) => {
        newComm.sendMessage("connect-fluid-shape-map", [DVEFB.shapeManager.shapeMap]);
    });
    newComm.setPort(port);
    newComm.messageFunctions = {
        0: (data) => {
            setTemplate(data);
        },
    };
    return newComm;
};
