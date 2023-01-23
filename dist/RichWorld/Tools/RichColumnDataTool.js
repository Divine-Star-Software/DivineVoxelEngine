import { DBO } from "../../Libs/DivineBinaryObject/DivineBinaryObject.js";
import { RichDataRegister } from "../Register/RichDataRegister.js";
import { RichDataToolBase } from "./Classes/RichDataToolBase.js";
export class RichColumnDataTool extends RichDataToolBase {
    column;
    loadIn() {
        const column = RichDataRegister.column.get(this.location);
        if (column) {
            this.sceham = column.value.data.value;
            this.column = column;
            return true;
        }
        return false;
    }
    toBuffer() {
        return DBO.metaMarkedParser.toBuffer(this.column);
    }
    create() {
        if (!RichDataRegister.column.get(this.location)) {
            RichDataRegister.column.add(this.location);
        }
    }
}
