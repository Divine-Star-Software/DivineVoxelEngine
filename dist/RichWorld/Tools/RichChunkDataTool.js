import { TNM } from "divine-binary-object/NodeMaker";
import { DBO } from "divine-binary-object";
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
        return DBO.toBuffer(TNM.object(this.sceham));
    }
}
