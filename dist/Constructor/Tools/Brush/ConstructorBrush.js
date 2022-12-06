import { WorldGenRegister } from "../../WorldGeneration/Register/WorldGenRegister.js";
import { Util } from "../../../Global/Util.helper.js";
import { BrushTool } from "../../../Tools/Brush/Brush.js";
import { WorldPainter } from "../../../Data/World/WorldPainter.js";
export function GetConstructorBrush() {
    const newBrush = Util.merge(new BrushTool(), {
        requestsId: "",
        paint() {
            const x = this.data.position[0];
            const y = this.data.position[1];
            const z = this.data.position[2];
            if (!this._dt.loadIn(x, y, z)) {
                WorldGenRegister.addToRequest(newBrush.requestsId, x, y, z, [
                    ...this.getRaw(),
                ]);
                return this;
            }
            WorldPainter.paint.voxel(this.data);
            return this;
        },
    });
    return newBrush;
}
