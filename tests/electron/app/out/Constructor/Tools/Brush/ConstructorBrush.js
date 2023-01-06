import { WorldGenRegister } from "../../WorldGeneration/Register/WorldGenRegister.js";
import { Util } from "../../../Global/Util.helper.js";
import { BrushTool } from "../../../Tools/Brush/Brush.js";
import { WorldPainter } from "../../../Data/World/WorldPainter.js";
export function GetConstructorBrush() {
    const newBrush = Util.merge(new BrushTool(), {
        requestsId: "",
        paint() {
            const x = this.location[1];
            const y = this.location[2];
            const z = this.location[3];
            if (!this._dt.loadInAt(x, y, z)) {
                WorldGenRegister.addToRequest(newBrush.requestsId, x, y, z, [
                    ...this.getRaw(),
                ]);
                return this;
            }
            WorldPainter.paint.voxel(this.location, this.data);
            return this;
        },
    });
    return newBrush;
}
