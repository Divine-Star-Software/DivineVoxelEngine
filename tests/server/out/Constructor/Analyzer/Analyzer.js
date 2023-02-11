//propagation
import { FlowUpdate } from "../Propagation/Flow/Functions/FlowUpdate.js";
import { Propagation } from "../Propagation/Propagation.js";
//objects
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { DVEC } from "../../Constructor/DivineVoxelEngineConstructor.js";
import { AnalyzerProcessor } from "./AnalyzerProcessor.js";
import { AnalyzerUpdater } from "./AnalyzerUpdater.js";
import { TasksRequest } from "../Tasks/TasksRequest.js";
//tools
import { GetConstructorDataTool } from "../Tools/Data/ConstructorDataTool.js";
const mainDT = GetConstructorDataTool();
const secondaryDT = GetConstructorDataTool();
export const Analyzer = {
    updater: AnalyzerUpdater,
    processor: AnalyzerProcessor,
    _flowChecks: [
        [0, -1, 0],
        [1, 0, 0],
        [-1, 0, 0],
        [0, 0, 1],
        [0, 0, -1],
    ],
    async runPropagation(data) {
        const options = {
            light: EngineSettings.doLight(),
            flow: EngineSettings.doFlow(),
        };
        mainDT.setDimension(data[0][0]);
        secondaryDT.setDimension(data[0][0]);
        const tasks = TasksRequest.getVoxelUpdateRequests(data[0], "none", "self");
        this.processor.goThroughColumn(data[0], (x, y, z) => {
            if (!mainDT.loadInAt(x, y, z))
                return;
            const substance = mainDT.getSubstance();
            if (options.light) {
                if (mainDT.isLightSource()) {
                    tasks.queues.rgb.update.push(x, y, z);
                }
            }
            if (options.flow) {
                if (substance == "#dve_liquid" || substance == "#dve_magma") {
                    let add = false;
                    for (const check of this._flowChecks) {
                        if (secondaryDT.loadInAt(x + check[0], y + check[1], z + check[2])) {
                            if (secondaryDT.isAir()) {
                                add = true;
                                break;
                            }
                        }
                    }
                    if (add) {
                        tasks.queues.flow.update.queue.push([x, y, z]);
                    }
                }
            }
        });
        tasks.start();
        Propagation.rgb.update(tasks);
        const dimension = data[0][0];
        for (const flowUpdate of tasks.queues.flow.update.queue) {
            const [x, y, z] = flowUpdate;
            if (!mainDT.loadInAt(x, y, z))
                continue;
            await FlowUpdate(TasksRequest.getFlowUpdateRequest([dimension, x, y, z], "none", "self"), false, mainDT.getStringId());
        }
        tasks.stop();
    },
    async runUpdate(data) {
        if (!this.processor.columnTool.setLocation(data[0]).loadIn())
            return;
        const deltaTime = Date.now() - this.processor.columnTool.getLastAnalyzerUpdateTimestamp();
        const location = [...data[0]];
        this.processor.goThroughColumn(data[0], (x, y, z) => {
            if (!mainDT.loadInAt(x, y, z))
                return;
            location[1] = x;
            location[2] = y;
            location[3] = z;
            const run = this.updater.getVoxel(mainDT.getStringId());
            if (!run)
                return;
            run(location, deltaTime, this, DVEC);
        });
        this.processor.columnTool.setLastAnalyzerUpdateTimestamp();
    },
};
