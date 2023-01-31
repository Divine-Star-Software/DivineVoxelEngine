import { IlluminationManager as IM } from "../IlluminationManager.js";
export function RGBUpdate(tasks) {
    IM.setDimension(tasks.origin[0]);
    const queue = tasks.queues.rgb.update;
    while (queue.length != 0) {
        const x = queue.shift();
        const y = queue.shift();
        const z = queue.shift();
        if (!IM._sDataTool.loadInAt(x, y, z))
            continue;
        if (IM._sDataTool.isBarrier())
            continue;
        const sl = IM._sDataTool.getLight();
        if (sl <= 0)
            continue;
        if (IM._nDataTool.loadInAt(x - 1, y, z)) {
            const nl = IM._nDataTool.getLight();
            if (nl > -1 && IM.lightData.isLessThanForRGBAdd(nl, sl)) {
                queue.push(x - 1, y, z);
                IM._nDataTool.setLight(IM.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (IM._nDataTool.loadInAt(x + 1, y, z)) {
            const nl = IM._nDataTool.getLight();
            if (nl > -1 && IM.lightData.isLessThanForRGBAdd(nl, sl)) {
                queue.push(x + 1, y, z);
                IM._nDataTool.setLight(IM.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (IM._nDataTool.loadInAt(x, y, z - 1)) {
            const nl = IM._nDataTool.getLight();
            if (nl > -1 && IM.lightData.isLessThanForRGBAdd(nl, sl)) {
                queue.push(x, y, z - 1);
                IM._nDataTool.setLight(IM.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (IM._nDataTool.loadInAt(x, y, z + 1)) {
            const nl = IM._nDataTool.getLight();
            if (nl > -1 && IM.lightData.isLessThanForRGBAdd(nl, sl)) {
                queue.push(x, y, z + 1);
                IM._nDataTool.setLight(IM.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (IM._nDataTool.loadInAt(x, y - 1, z)) {
            const nl = IM._nDataTool.getLight();
            if (nl > -1 && IM.lightData.isLessThanForRGBAdd(nl, sl)) {
                queue.push(x, y - 1, z);
                IM._nDataTool.setLight(IM.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (IM._nDataTool.loadInAt(x, y + 1, z)) {
            const nl = IM._nDataTool.getLight();
            if (nl > -1 && IM.lightData.isLessThanForRGBAdd(nl, sl)) {
                queue.push(x, y + 1, z);
                IM._nDataTool.setLight(IM.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        tasks.addNeighborsToRebuildQueue(x, y, z);
    }
}
export function RGBRemove(tasks) {
    IM.setDimension(tasks.origin[0]);
    const remove = tasks.queues.rgb.rmeove;
    const update = tasks.queues.rgb.update;
    const map = tasks.queues.rgb.map;
    while (remove.length != 0) {
        const x = remove.shift();
        const y = remove.shift();
        const z = remove.shift();
        if (map.inMap(x, y, z))
            continue;
        map.add(x, y, z);
        if (!IM._sDataTool.loadInAt(x, y, z))
            continue;
        const sl = IM._sDataTool.getLight();
        if (sl <= 0)
            continue;
        if (IM._nDataTool.loadInAt(x - 1, y, z)) {
            const nl = IM._nDataTool.getLight();
            const n1HasRGB = IM.lightData.hasRGBLight(nl);
            if (n1HasRGB && IM.lightData.isLessThanForRGBRemove(nl, sl)) {
                remove.push(x - 1, y, z);
                if (IM._nDataTool.isLightSource()) {
                    update.push(x - 1, y, z);
                }
            }
            else {
                if (n1HasRGB && IM.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    update.push(x - 1, y, z);
                }
            }
        }
        if (IM._nDataTool.loadInAt(x + 1, y, z)) {
            const nl = IM._nDataTool.getLight();
            const n1HasRGB = IM.lightData.hasRGBLight(nl);
            if (n1HasRGB && IM.lightData.isLessThanForRGBRemove(nl, sl)) {
                remove.push(x + 1, y, z);
                if (IM._nDataTool.isLightSource()) {
                    update.push(x + 1, y, z);
                }
            }
            else {
                if (n1HasRGB && IM.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    update.push(x + 1, y, z);
                }
            }
        }
        if (IM._nDataTool.loadInAt(x, y, z - 1)) {
            const nl = IM._nDataTool.getLight();
            const n1HasRGB = IM.lightData.hasRGBLight(nl);
            if (n1HasRGB && IM.lightData.isLessThanForRGBRemove(nl, sl)) {
                remove.push(x, y, z - 1);
            }
            else {
                if (n1HasRGB && IM.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    update.push(x, y, z - 1);
                }
            }
        }
        if (IM._nDataTool.loadInAt(x, y, z + 1)) {
            const nl = IM._nDataTool.getLight();
            const n1HasRGB = IM.lightData.hasRGBLight(nl);
            if (n1HasRGB && IM.lightData.isLessThanForRGBRemove(nl, sl)) {
                remove.push(x, y, z + 1);
                if (IM._nDataTool.isLightSource()) {
                    update.push(x, y, z + 1);
                }
            }
            else {
                if (n1HasRGB && IM.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    update.push(x, y, z + 1);
                }
            }
        }
        if (IM._nDataTool.loadInAt(x, y - 1, z)) {
            const nl = IM._nDataTool.getLight();
            const n1HasRGB = IM.lightData.hasRGBLight(nl);
            if (n1HasRGB && IM.lightData.isLessThanForRGBRemove(nl, sl)) {
                remove.push(x, y - 1, z);
                if (IM._nDataTool.isLightSource()) {
                    update.push(x, y - 1, z);
                }
            }
            else {
                if (n1HasRGB && IM.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    update.push(x, y - 1, z);
                }
            }
        }
        if (IM._nDataTool.loadInAt(x, y + 1, z)) {
            const nl = IM._nDataTool.getLight();
            const n1HasRGB = IM.lightData.hasRGBLight(nl);
            if (n1HasRGB && IM.lightData.isLessThanForRGBRemove(nl, sl)) {
                remove.push(x, y + 1, z);
                if (IM._nDataTool.isLightSource()) {
                    update.push(x, y + 1, z);
                }
            }
            else {
                if (n1HasRGB && IM.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    update.push(x, y + 1, z);
                }
            }
        }
        tasks.addNeighborsToRebuildQueue(x, y, z);
        IM._sDataTool.setLight(IM.lightData.removeRGBLight(sl)).commit();
    }
    map.clear();
}
