import { WorldGenRegister } from "../WorldGeneration/Register/WorldGenRegister.js";
import { BrushTool } from "../../Tools/Brush/Brush.js";
import { WorldPainter } from "../../Data/World/WorldPainter.js";
import { TasksRequest } from "../Tasks/TasksRequest.js";
import { LightData } from "../../Data/Light/LightByte.js";
import { Propagation } from "../Propagation/Propagation.js";
import { WorldComm } from "../Threads/ConstrcutorTheads.js";
import { WorldRegister } from "../../Data/World/WorldRegister.js";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";
import { RichDataTool } from "../../Tools/Data/RichDataTool.js";
export class WorldGenBrush extends BrushTool {
    constructor() {
        super();
    }
    requestsId;
    tasks = TasksRequest.getVoxelUpdateRequests(this.location);
    richData = new RichDataTool();
    paint() {
        if (!this._dt.loadInAtLocation(this.location) && this.requestsId != "") {
            WorldGenRegister.addToRequest(this.requestsId, this.location, [
                ...this.getRaw(),
            ]);
            return this;
        }
        const sl = this._dt.getLight();
        if (LightData.hasRGBLight(sl)) {
            this.tasks.queues.rgb.rmeove.push(this.x, this.y, this.z);
            Propagation.rgb.remove(this.tasks);
        }
        if (LightData.hasSunLight(sl)) {
            this.tasks.queues.sun.rmeove.push(this.x, this.y, this.z);
            Propagation.sun.remove(this.tasks);
        }
        WorldPainter.paint.voxel(this.location, this.data);
        if (LightData.hasRGBLight(sl)) {
            Propagation.rgb.update(this.tasks);
        }
        if (LightData.hasSunLight(sl)) {
            Propagation.sun.update(this.tasks);
        }
        return this;
    }
    worldAlloc(start, end) {
        const [sx, sy, sz] = start;
        const [ex, ey, ez] = end;
        return new Promise((resolve) => {
            let attempts = 0;
            const inte = setInterval(() => {
                let done = true;
                for (let y = sy; y < ey; y += WorldSpaces.chunk._bounds.y) {
                    for (let x = sx; x < ex; x += WorldSpaces.chunk._bounds.x) {
                        for (let z = sz; z < ez; z += WorldSpaces.chunk._bounds.z) {
                            if (!WorldRegister.chunk.get(this.setXYZ(x, y, z).location)) {
                                WorldComm.runTasks("add-chunk", this.location);
                                done = false;
                            }
                        }
                    }
                }
                if (done) {
                    clearInterval(inte);
                    resolve(true);
                }
                attempts++;
                if (attempts > 1_000) {
                    clearInterval(inte);
                    resolve(false);
                }
            }, 10);
        });
    }
}
