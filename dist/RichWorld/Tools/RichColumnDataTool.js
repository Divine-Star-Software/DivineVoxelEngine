import { DBO } from "divine-binary-object";
import { RichDataRegister } from "../Register/RichDataRegister.js";
import { RichDataToolBase } from "./Classes/RichDataToolBase.js";
export class RichColumnDataTool extends RichDataToolBase {
    column;
    loadIn() {
        const column = RichDataRegister.column.get(this.location);
        if (column) {
            this.sceham = column.data;
            this.column = column;
            return true;
        }
        return false;
    }
    toBuffer() {
        return DBO.objectToBuffer(this.sceham);
    }
    create() {
        if (!RichDataRegister.column.get(this.location)) {
            RichDataRegister.column.add(this.location);
        }
    }
}
