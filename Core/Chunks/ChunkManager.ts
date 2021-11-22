import type { DivineStar } from "Core/DivineStar";

export class ChunkManager {



    constructor(private DS :DivineStar) {



    }



    createSharedArrayBuffers() {
        const maxChunks = 200;

        const chunkWidth = 16;
        const chunkDepth = 16;
        const chunkHeight = 256;

        const xzCordByteAllocation = 32;
        const yCordByteAllocation = 16;

        const chunkXBufferSize = chunkWidth * xzCordByteAllocation;
        const chunkZBufferSize = chunkDepth * xzCordByteAllocation;
        const chunkYBufferSize = chunkHeight * yCordByteAllocation;
     


        const chunkXBuffer = new  SharedArrayBuffer(chunkXBufferSize);
        const chunkZBuffer = new SharedArrayBuffer(chunkZBufferSize);
        const chunkYBuffer = new SharedArrayBuffer(chunkYBufferSize);


     


        const chunkXArray = new Float32Array(chunkXBuffer);
        const chunkZArray = new Float32Array(chunkZBuffer);
        const chunkYArray = new Int16Array(chunkYBuffer);

        
        chunkXArray.set([1,2,3])
        console.log(chunkXArray.keys());

        


    
        







    }


}