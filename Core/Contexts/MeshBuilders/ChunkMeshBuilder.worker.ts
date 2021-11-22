import { MeshData } from "Meta/Util.types.js";
import { Util } from "../../../Global/Util.helper.js";
import { MeshBuilder } from "../Meshes/MeshBuilder.js";
import { ChunkMeshBuilder } from "./ChunkMeshBuilder.js";
const UTIL = new Util();
const meshBuilder = new MeshBuilder();
const builder = new ChunkMeshBuilder(meshBuilder, UTIL);

const worker = self;

function sendChunkData(
  chunkX: number,
  chunkZ: number,
  data: MeshData
) {
  const positionArray = new Float32Array(data.positions);
  const indiciesArray = new Int32Array(data.indices);
  const colorsArray = new Float32Array(data.colors);
  const uvArray = new Float32Array(data.uvs);

  //@ts-ignore
  worker.postMessage(
    [
      chunkX,
      chunkZ,
      positionArray.buffer,
      indiciesArray.buffer,
      colorsArray.buffer,
      uvArray.buffer,
    ],
    //@ts-ignore
    [
      positionArray.buffer,
      indiciesArray.buffer,
      colorsArray.buffer,
      uvArray.buffer,
    ]
  );
}

const messageFromWorld = (event: MessageEvent) => {
  const data = event.data;

    const chunkX = data[0];
    const chunkZ = data[1];
    const chunkPositions = new Uint16Array(data[2]);
    const chunkFaces =new Uint8Array(data[3]);
    const chunkBlocks = new Uint16Array(data[4]);
    const chunkGroups = new Float32Array(data[5]);
    const chunkAmbientOcculusion = new Float32Array(data[6]);



   const meshData = builder.buildChunkMesh(
      chunkX,
      chunkZ,
      chunkPositions,
      chunkFaces,
      chunkBlocks,
      chunkGroups,
      chunkAmbientOcculusion
    );

    sendChunkData(chunkX,chunkZ,meshData);
  
}

addEventListener("message", (event: MessageEvent) => {
  const data = event.data;
  const message = data[0];

  if (message == "connect-world") {
    const port = event.ports[0];

    port.onmessage = (event: MessageEvent) => {
      messageFromWorld(event);
    };
  }
});
