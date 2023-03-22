import { WorldGenRegister } from "../WorldGeneration/Register/WorldGenRegister.js";
import { BrushTool } from "../../Tools/Brush/Brush.js";
import { WorldPainter } from "../../Data/World/WorldPainter.js";

export class WorldGenBrush extends BrushTool {
 constructor() {
  super();
 }
 requestsId: "";

 paint() {
  if (!this._dt.loadInAtLocation(this.location)) {
   WorldGenRegister.addToRequest(this.requestsId, this.location, [
    ...this.getRaw(),
   ]);
   return this;
  }
  WorldPainter.paint.voxel(this.location, this.data);
  return this;
 }
}
