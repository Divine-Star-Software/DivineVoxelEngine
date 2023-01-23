import { TNM } from "../../Libs/DivineBinaryObject/NodeMaker.js";
import { DBO } from "../../Libs/DivineBinaryObject/DivineBinaryObject.js";
import { RichDataRegister } from "../Register/RichDataRegister.js";
import { RichDataToolBase } from "./Classes/RichDataToolBase.js";
export class RichChunkDataTool extends RichDataToolBase {
    loadIn() {
        const chunk = RichDataRegister.chunk.get(this.location);
        if (chunk) {
            this.sceham = chunk.value;
            return true;
        }
        return false;
    }
    toBuffer() {
        //@ts-ignore
        return DBO.metaMarkedParser.toBuffer(TNM.object(this.sceham));
    }
}
