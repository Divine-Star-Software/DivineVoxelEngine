import { BlockData } from "Meta/Blocks/Block.types";


export class BlockManager {


    blockData : BlockData[];
    blocks : Record<number,BlockData> = {};




    registerBlockData(blockData : BlockData[]) {
        this.blockData = blockData;
    
    }

    _processBlocks(blockData : BlockData[]) {

        for(const block of blockData) {
            if(block.animatedTextuveUVs) {
                
            }
        }


    }


    registerBlock(blockId : number,blockData : BlockData) {

    }


}