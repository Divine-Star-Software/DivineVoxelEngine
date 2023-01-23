import { WorldGenRegister } from "../../WorldGeneration/Register/WorldGenRegister.js";
import { Util } from "../../../Global/Util.helper.js";
import { BrushTool } from "../../../Tools/Brush/Brush.js";
import { WorldPainter } from "../../../Data/World/WorldPainter.js";
export function GetConstructorBrush() {
    const newBrush = Util.merge(new BrushTool(), {
        requestsId: "",
        paint() {
            if (!this._dt.loadInAtLocation(this.location)) {
                WorldGenRegister.addToRequest(newBrush.requestsId, this.location, [
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
