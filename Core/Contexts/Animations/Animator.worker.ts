import { Util } from "../../../Global/Util.helper.js";
import { MeshBuilder } from "../Meshes/MeshBuilder.js";

const UTIL = new Util();
//console.log("sup");
const meshBuilder = new MeshBuilder();


const buildChunksUVs = (uvs : number[],blocks : Uint16Array,chunkFaces : Uint8Array) : number[] => {

    for (let i = 0; i < blocks.length; i ++) {


      const faceBit = UTIL.getBitArray([chunkFaces[i]]);
      const block = blocks[i];

      //   console.log(faceBit.getBit(0));

      if (faceBit.getBit(0)) {
        meshBuilder.getNextAnimationBoxFaceUVs(uvs,"top",block);
      }

      if (faceBit.getBit(1)) {
        meshBuilder.getNextAnimationBoxFaceUVs(uvs,"bottom",block);
      }

      if (faceBit.getBit(2)) {
        meshBuilder.getNextAnimationBoxFaceUVs(uvs,"west",block);
      }

      if (faceBit.getBit(3)) {
        meshBuilder.getNextAnimationBoxFaceUVs(uvs,"east",block);
      }

      if (faceBit.getBit(4)) {
        meshBuilder.getNextAnimationBoxFaceUVs(uvs,"north",block);
      }

      if (faceBit.getBit(5)) {
        meshBuilder.getNextAnimationBoxFaceUVs(uvs,"south",block);
      }



    }

    return uvs;
}


const worker = self;
const handleAnimatorRequest = (event : MessageEvent) =>{
        const data = event.data;
     

        const chunkX = data[0];
        const chunkZ = data[1];
        const chunkFaceTemplate =  new Uint8Array(data[2]);
        const chunkBlockTemplate = new Uint16Array(data[3]);
        const uvs : number[] = [];
       const newUvs = buildChunksUVs(uvs,chunkBlockTemplate,chunkFaceTemplate);

       const newUvsArray = new Float32Array(newUvs);
    //@ts-ignore
    worker.postMessage([chunkX,chunkZ,newUvsArray.buffer],[newUvsArray.buffer])


}


addEventListener("message",(event : MessageEvent)=>{

    const message = event.data[0];

    if(message == "connect-animator"){
          

        const port = event.ports[0];
       
        port.onmessage = (event : MessageEvent) =>{
            handleAnimatorRequest(event);
        }




    }




});