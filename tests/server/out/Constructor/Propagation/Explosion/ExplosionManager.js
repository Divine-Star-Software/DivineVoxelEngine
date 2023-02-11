//data
import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";
//objects
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { LightData } from "../../../Data/Light/LightByte.js";
//functions
import { Distance3D } from "../../../Math/Functions/Distance3d.js";
import { RGBRemove, RGBUpdate } from "../Illumanation/Functions/RGBUpdate.js";
import { SunRemove, SunUpdate } from "../Illumanation/Functions/SunUpdate.js";
import { FlowManager } from "../Flow/FlowManager.js";
const dataTool = new DataTool();
const nDataTool = new DataTool();
export const ExplosionManager = {
    runExplosion(tasks) {
        tasks.start();
        const [dimension, sx, sy, sz] = tasks.origin;
        FlowManager.setDimension(dimension);
        tasks.setPriority(0);
        const queue = tasks.queues.queue;
        const map = tasks.queues.map;
        queue.push([sx, sy, sz]);
        dataTool.setDimension(dimension);
        nDataTool.setDimension(dimension);
        const radius = tasks.getData();
        while (queue.length) {
            const node = queue.shift();
            if (!node)
                break;
            const x = node[0];
            const y = node[1];
            const z = node[2];
            if (!map.inMap(x + 1, y, z)) {
                if (dataTool.loadInAt(x + 1, y, z)) {
                    const d = Distance3D(sx, sy, sz, x + 1, y, z);
                    if (d <= radius) {
                        queue.push([x + 1, y, z]);
                    }
                    map.add(x + 1, y, z);
                }
            }
            if (!map.inMap(x - 1, y, z)) {
                if (dataTool.loadInAt(x - 1, y, z)) {
                    const d = Distance3D(sx, sy, sz, x - 1, y, z);
                    if (d <= radius) {
                        queue.push([x - 1, y, z]);
                    }
                }
                map.add(x - 1, y, z);
            }
            if (!map.inMap(x, y, z + 1)) {
                if (dataTool.loadInAt(x, y, z + 1)) {
                    const d = Distance3D(sx, sy, sz, x, y, z + 1);
                    if (d <= radius) {
                        queue.push([x, y, z + 1]);
                    }
                }
                map.add(x, y, z + 1);
            }
            if (!map.inMap(x, y, z - 1)) {
                if (dataTool.loadInAt(x, y, z - 1)) {
                    const d = Distance3D(sx, sy, sz, x, y, z - 1);
                    if (d <= radius) {
                        queue.push([x, y, z - 1]);
                    }
                }
                map.add(x, y, z - 1);
            }
            if (!map.inMap(x, y + 1, z)) {
                if (dataTool.loadInAt(x, y + 1, z)) {
                    const d = Distance3D(sx, sy, sz, x, y + 1, z);
                    if (d <= radius) {
                        queue.push([x, y + 1, z]);
                    }
                }
                map.add(x, y + 1, z);
            }
            if (!map.inMap(x, y - 1, z)) {
                if (dataTool.loadInAt(x, y - 1, z)) {
                    const d = Distance3D(sx, sy, sz, x, y - 1, z);
                    if (d <= radius) {
                        queue.push([x, y - 1, z]);
                    }
                }
                map.add(x, y - 1, z);
            }
            if (dataTool.loadInAt(x, y, z)) {
                if (dataTool.isRenderable()) {
                    const substance = dataTool.getSubstance();
                    for (const n of $3dCardinalNeighbors) {
                        const nx = x + n[0];
                        const ny = y + n[1];
                        const nz = z + n[2];
                        if (nDataTool.loadInAt(nx, ny, nz)) {
                            const l = nDataTool.getLight();
                            if (l > 0) {
                                if (LightData.getS(l) > 0) {
                                    tasks.queues.sun.rmeove.push(nx, ny, nz);
                                }
                                if (LightData.hasRGBLight(l)) {
                                    tasks.queues.rgb.rmeove.push(nx, ny, nz);
                                }
                            }
                        }
                    }
                    tasks.addNeighborsToRebuildQueue(x, y, z);
                    if (dataTool.getHardness() > 10_000 ||
                        substance == "#dve_liquid" ||
                        substance == "#dve_magma") {
                        continue;
                    }
                    dataTool.setAir().commit(2);
                }
            }
        }
        RGBRemove(tasks);
        SunRemove(tasks);
        RGBUpdate(tasks);
        SunUpdate(tasks);
        tasks.runRebuildQueue();
        tasks.stop();
    },
};
