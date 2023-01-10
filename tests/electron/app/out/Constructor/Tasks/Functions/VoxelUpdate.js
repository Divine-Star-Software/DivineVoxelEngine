import { Propagation } from "../../Propagation/Propagation.js";
import { EngineSettings as ES } from "../../../Data/Settings/EngineSettings.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { BrushTool } from "../../../Tools/Brush/Brush.js";
import { TasksRequest } from "../TasksRequest.js";
const dataTool = new DataTool();
const nDataTool = new DataTool();
const brushTool = new BrushTool();
const updateLightTask = (tasks) => {
    let doRGB = ES.doRGBPropagation();
    let doSun = ES.doSunPropagation();
    const [dimension, x, y, z] = tasks.origin;
    nDataTool.setDimension(dimension);
    for (const n of $3dCardinalNeighbors) {
        const nx = n[0] + x;
        const ny = n[1] + y;
        const nz = n[2] + z;
        if (!nDataTool.loadInAt(nx, ny, nz))
            continue;
        const l = nDataTool.getLight();
        if (l <= 0)
            continue;
        if (doRGB) {
            if (LightData.hasRGBLight(l)) {
                tasks.queues.rgb.update.push([nx, ny, nz]);
            }
        }
        if (doSun) {
            if (LightData.getS(l) > 0) {
                tasks.queues.sun.update.push([nx, ny, nz]);
            }
        }
    }
};
export async function EreaseAndUpdate(data) {
    if (!dataTool.setLocation(data[0]).loadIn())
        return false;
    const [dimension, x, y, z] = data[0];
    const tasks = TasksRequest.getVoxelUpdateRequests(data[0], data[1], data[2]);
    tasks
        .setPriority(0)
        .start()
        .setBuldMode("sync")
        .addNeighborsToRebuildQueue(x, y, z)
        .syncQueue.reverse();
    tasks.setBuldMode("async");
    if (ES.doFlow()) {
        const substance = dataTool.getSubstance();
        if (substance == "liquid" || substance == "magma") {
            await Propagation.flow.remove(tasks);
            return true;
        }
    }
    const light = dataTool.getLight();
    dataTool
        .setLight(light > 0 ? light : 0)
        .setAir()
        .commit(2);
    if (ES.doLight()) {
        if (ES.doRGBPropagation()) {
            tasks.queues.rgb.rmeove.push([x, y, z]);
            Propagation.rgb.remove(tasks);
        }
        updateLightTask(tasks);
        if (ES.doRGBPropagation()) {
            Propagation.rgb.update(tasks);
        }
        if (ES.doSunPropagation()) {
            Propagation.sun.update(tasks);
        }
    }
    tasks.runRebuildQueue();
    tasks.stop();
    return true;
}
export async function PaintAndUpdate(data) {
    if (!dataTool.setLocation(data[0]).loadIn())
        return false;
    const [dimension, x, y, z] = data[0];
    const raw = data[1];
    const tasks = TasksRequest.getVoxelUpdateRequests(data[0], data[2], data[3]);
    tasks
        .start()
        .setPriority(0)
        .setBuldMode("sync")
        .addNeighborsToRebuildQueue(x, y, z)
        .syncQueue.reverse();
    tasks.setBuldMode("async");
    brushTool.setLocation(data[0]).setRaw(raw);
    let doRGB = ES.doRGBPropagation();
    let doSun = ES.doSunPropagation();
    lighttest: if (ES.doLight()) {
        nDataTool.setLocation(data[0]).loadIn();
        const light = dataTool.getLight();
        if (light <= 0)
            break lighttest;
        if (doSun) {
            if (LightData.getS(light) > 0) {
                tasks.queues.sun.rmeove.push([x, y, z]);
                Propagation.sun.remove(tasks);
            }
        }
        if (doRGB) {
            if (LightData.hasRGBLight(light)) {
                tasks.queues.rgb.rmeove.push([x, y, z]);
                Propagation.rgb.remove(tasks);
            }
        }
    }
    brushTool.paint();
    if (ES.doLight()) {
        updateLightTask(tasks);
        if (doRGB) {
            tasks.queues.rgb.update.push([x, y, z]);
            Propagation.rgb.update(tasks);
        }
        if (doSun) {
            Propagation.sun.update(tasks);
        }
    }
    if (ES.doFlow()) {
        const substance = brushTool._dt.getSubstance();
        if (substance == "liquid" || substance == "magma") {
            Propagation.flow.update(tasks);
        }
    }
    tasks.runRebuildQueue();
    tasks.stop();
    return;
}
