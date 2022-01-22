import { RegisterDefaultFluidShapes } from "../Shapes/Functions/RegisterDefaultFluidShapes.js";
export function InitWorker(DVEFB) {
    RegisterDefaultFluidShapes(DVEFB);
    addEventListener("message", (event) => {
        const data = event.data;
        const message = data[0];
        if (message == "connect-world") {
            const port = event.ports[0];
            port.onmessage = (event) => {
                messageFromWorld(event);
            };
            port.postMessage(["connect-fluid-shape-map", DVEFB.shapeManager.shapeMap]);
        }
    });
    const messageFromWorld = (event) => {
        const data = event.data;
        const eventType = data[0];
        if (eventType == 0) {
            const chunkX = data[1];
            const chunkY = data[2];
            const chunkZ = data[3];
            const positions = new Uint16Array(data[4]);
            const faces = new Uint8Array(data[5]);
            const shapes = new Uint16Array(data[6]);
            const uvs = new Uint16Array(data[7]);
            const rgbLight = new Float32Array(data[8]);
            const sunLight = new Float32Array(data[9]);
            const ao = new Float32Array(data[10]);
            DVEFB.fluidMeshBuilder.addTemplate(chunkX, chunkY, chunkZ, positions, faces, shapes, uvs, rgbLight, ao);
        }
        if (eventType == 1) {
            const meshData = DVEFB.fluidMeshBuilder.generateMesh();
            const positionArray = new Float32Array(meshData[0]);
            const indiciesArray = new Int32Array(meshData[1]);
            const linearColorsArray = new Float32Array(meshData[2]);
            const fullColorsArray = new Float32Array(meshData[2]);
            const uvArray = new Float32Array(meshData[3]);
            //@ts-ignore
            DVEFB.worker.postMessage([
                0,
                0,
                0,
                0,
                positionArray.buffer,
                indiciesArray.buffer,
                linearColorsArray.buffer,
                fullColorsArray.buffer,
                uvArray.buffer,
            ], 
            //@ts-ignore
            [
                positionArray.buffer,
                indiciesArray.buffer,
                linearColorsArray.buffer,
                fullColorsArray.buffer,
                uvArray.buffer,
            ]);
        }
    };
}
