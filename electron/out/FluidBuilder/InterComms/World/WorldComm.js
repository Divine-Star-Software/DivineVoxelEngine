import { DVEFB } from "../../DivineVoxelEngineFluidBuilder.js";
import { CreateInterComm } from "../../../Comms/InterComm.js";
const worldComm = CreateInterComm("fluid-builder-world", {});
export const WorldComm = worldComm;
worldComm.onMessage = (event) => {
    console.log("message from world");
    console.log(event);
};
worldComm.messageFunctions = {
    1: (data) => {
        console.log(DVEFB.fluidMeshBuilder.templateMap);
        console.log(DVEFB.shapeManager.shapes);
        const meshData = DVEFB.fluidMeshBuilder.generateMesh();
        const positionArray = new Float32Array(meshData[0]);
        const indiciesArray = new Int32Array(meshData[1]);
        const RGBLightColorsArray = new Float32Array(meshData[2]);
        const sunLightColorsArray = new Float32Array(meshData[3]);
        const colorsArray = new Float32Array(meshData[4]);
        const uvArray = new Float32Array(meshData[5]);
        DVEFB.renderComm.sendMessage(0, [
            0,
            0,
            0,
            positionArray.buffer,
            indiciesArray.buffer,
            RGBLightColorsArray.buffer,
            sunLightColorsArray.buffer,
            colorsArray.buffer,
            uvArray.buffer,
        ], [
            positionArray.buffer,
            indiciesArray.buffer,
            RGBLightColorsArray.buffer,
            sunLightColorsArray.buffer,
            colorsArray.buffer,
            uvArray.buffer,
        ]);
    },
};
