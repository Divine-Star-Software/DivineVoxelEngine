import { ConstructorRemoteThreadTasks } from "../../../Common/Threads/Contracts/WorldTasks.js";
import { Propagation } from "../../Propagation/Propagation.js";
import { ThreadComm } from "../../../Libs/ThreadComm/ThreadComm.js";
import { EngineSettings as ES } from "../../../Data/Settings/EngineSettings.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { BrushTool } from "../../../Tools/Brush/Brush.js";
const dataTool = new DataTool();
const nDataTool = new DataTool();
const brushTool = new BrushTool();
export async function EreaseAndUpdate(data) {
    const dimenson = data[0];
    const x = data[1];
    const y = data[2];
    const z = data[3];
    const rebuildQueue = data[4];
    const threadId = data[5];
    dataTool.setDimension(dimenson).loadIn(x, y, z);
    if (ES.doFlow()) {
        const substance = dataTool.getSubstance();
        if (substance == "fluid" || substance == "magma") {
            console.log("");
            await Propagation.removeFlowAt(data);
            return true;
        }
    }
    const light = dataTool.getLight();
    if (light > 0) {
        dataTool.setLight(light);
    }
    dataTool.setAir().commit(2);
    if (ES.doLight()) {
        let doRGB = ES.doRGBPropagation();
        let doSun = ES.doSunPropagation();
        const sl = dataTool.getLight();
        if (doRGB) {
            if (sl >= 0) {
                Propagation.runRGBRemove(data);
            }
        }
        for (const n of $3dCardinalNeighbors) {
            const nx = n[0] + x;
            const ny = n[1] + y;
            const nz = n[2] + z;
            if (!nDataTool.loadIn(nx, ny, nz))
                continue;
            const l = nDataTool.getLight();
            if (l <= 0)
                continue;
            if (doRGB) {
                if (LightData.hasRGBLight(l)) {
                    Propagation.illumination._RGBlightUpdateQ.push([nx, ny, nz]);
                }
            }
            if (doSun) {
                if (LightData.getS(l) > 0) {
                    Propagation.illumination._sunLightUpdate.enqueue([nx, ny, nz]);
                }
            }
        }
        if (doRGB) {
            if (sl >= 0) {
                Propagation.runRGBUpdate(data);
            }
        }
        if (doSun) {
            Propagation.runSunLightUpdate(data);
        }
    }
    const thread = ThreadComm.getComm(threadId);
    thread.runTasks(ConstructorRemoteThreadTasks.runRebuildQue, [
        rebuildQueue,
    ]);
    return true;
}
export async function PaintAndUpdate(data) {
    const dimension = data[0];
    const x = data[1];
    const y = data[2];
    const z = data[3];
    const raw = data[4];
    const rebuildQueue = data[5];
    const threadId = data[6];
    const tasks = [dimension, x, y, z, rebuildQueue, threadId];
    brushTool.setDimension(dimension).setXYZ(x, y, z).setRaw(raw);
    dataTool.setDimension(dimension).loadIn(x, y, z);
    let doRGB = ES.doRGBPropagation();
    let doSun = ES.doSunPropagation();
    lighttest: if (ES.doLight()) {
        const light = dataTool.getLight();
        if (light <= 0)
            break lighttest;
        if (doSun) {
            if (LightData.getS(light) > 0) {
                Propagation.runSunLightRemove(tasks);
            }
        }
        if (doRGB) {
            if (LightData.hasRGBLight(light)) {
                Propagation.runRGBRemove(tasks);
            }
        }
    }
    brushTool.paint();
    if (ES.doLight()) {
        if (doRGB) {
            if (brushTool._dt.isLightSource()) {
                Propagation.runRGBUpdate(tasks);
            }
        }
    }
    const thread = ThreadComm.getComm(threadId);
    thread.runTasks(ConstructorRemoteThreadTasks.runRebuildQue, [
        rebuildQueue,
    ]);
    if (ES.doFlow()) {
        const substance = brushTool._dt.getSubstance();
        if (substance == "fluid" || substance == "magma") {
            Propagation.updateFlowAt(tasks);
        }
    }
}
