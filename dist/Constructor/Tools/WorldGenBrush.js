import { WorldGenRegister } from "../WorldGeneration/Register/WorldGenRegister.js";
import { BrushTool } from "../../Tools/Brush/Brush.js";
import { WorldPainter } from "../../Data/World/WorldPainter.js";
import { TasksRequest } from "../Tasks/TasksRequest.js";
import { LightData } from "../../Data/Light/LightByte.js";
import { Propagation } from "../Propagation/Propagation.js";
import { WorldComm } from "../Threads/ConstrcutorTheads.js";
import { RichDataTool } from "../../Tools/Data/RichDataTool.js";
import { SunRemove, SunUpdate, } from "../Propagation/Illumanation/Functions/SunUpdate.js";
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
            this.tasks.queues.rgb.remove.push(this.x, this.y, this.z);
            Propagation.rgb.remove(this.tasks);
        }
        if (LightData.hasSunLight(sl)) {
            this.tasks.queues.sun.remove.push(this.x, this.y, this.z);
            SunRemove(this.tasks, false);
        }
        WorldPainter.paint.voxel(this.location, this.data);
        return this;
    }
    erease() {
        const sl = this._dt.getLight();
        this._dt
            .setAir()
            .setLight(sl > 0 ? sl : 0)
            .commit(2);
        if (LightData.hasRGBLight(sl)) {
            this.tasks.queues.rgb.remove.push(this.x, this.y, this.z);
            Propagation.rgb.remove(this.tasks);
        }
        if (LightData.hasSunLight(sl)) {
            this.tasks.queues.sun.remove.push(this.x, this.y, this.z);
            SunRemove(this.tasks, false);
        }
        WorldPainter.paint.erase(this.location);
    }
    runUpdates() {
        Propagation.rgb.update(this.tasks);
        SunUpdate(this.tasks);
        this.tasks.queues.sun.updateMap.clear();
    }
    worldAlloc(start, end) {
        return new Promise((resolve) => {
            WorldComm.runPromiseTasks("world-alloc", [this.dimension, start, end], [], () => {
                resolve(true);
            });
        });
    }
    worldDealloc(start, end) {
        return new Promise((resolve) => {
            WorldComm.runPromiseTasks("world-dealloc", [this.dimension, start, end], [], () => {
                resolve(true);
            });
        });
    }
}
