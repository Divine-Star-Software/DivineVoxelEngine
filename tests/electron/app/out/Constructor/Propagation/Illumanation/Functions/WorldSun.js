//data
import { WorldBounds } from "../../../../Data/World/WorldBounds.js";
import { WorldRegister } from "../../../../Data/World/WorldRegister.js";
import { $3dCardinalNeighbors } from "../../../../Data/Constants/Util/CardinalNeighbors.js";
import { WorldSpaces } from "../../../../Data/World/WorldSpaces.js";
import { IlluminationManager as IM } from "../IlluminationManager.js";
const inColumnBounds = (cx, cz, x, z) => {
    if (x >= cx &&
        x <= cx + WorldSpaces.chunk._bounds.x &&
        z >= cz &&
        z <= cz + WorldSpaces.chunk._bounds.z)
        return true;
    return false;
};
export function RunWorldSun(tasks) {
    IM.setDimension(tasks.origin[0]);
    tasks.start();
    if (!WorldRegister.column.get(tasks.origin))
        return false;
    const [dimension, cx, cy, cz] = tasks.origin;
    const queue = tasks.queues.sun;
    IM._sDataTool.setDimension(dimension);
    const RmaxY = WorldRegister.column.height.getRelative(tasks.origin);
    const AmaxY = WorldRegister.column.height.getAbsolute(tasks.origin);
    //fill
    for (let ix = cx; ix < cx + WorldSpaces.chunk._bounds.x; ix++) {
        for (let iz = cz; iz < cz + WorldSpaces.chunk._bounds.z; iz++) {
            for (let iy = AmaxY; iy < WorldBounds.bounds.MaxY; iy++) {
                if (!IM._sDataTool.loadInAt(ix, iy, iz))
                    continue;
                const l = IM._sDataTool.getLight();
                if (l < 0)
                    continue;
                IM._sDataTool.setLight(IM.lightData.setS(0xf, l)).commit();
            }
        }
    }
    //accumulate
    for (let ix = cx; ix < cx + WorldSpaces.chunk._bounds.x; ix++) {
        for (let iz = cz; iz < cz + WorldSpaces.chunk._bounds.z; iz++) {
            for (let iy = AmaxY; iy <= RmaxY; iy++) {
                if (!IM._sDataTool.loadInAt(ix, iy, iz))
                    continue;
                const l = IM._sDataTool.getLight();
                if (l < 0 && IM.lightData.getS(l) != 0xf)
                    continue;
                let add = false;
                for (const n of $3dCardinalNeighbors) {
                    const nx = ix + n[0];
                    const ny = iy + n[1];
                    const nz = iz + n[2];
                    if (IM._nDataTool.loadInAt(nx, ny, nz)) {
                        const nl = IM._nDataTool.getLight();
                        if (nl >= 0 && IM.lightData.getS(nl) < 0xf) {
                            add = true;
                            break;
                        }
                    }
                }
                if (add) {
                    queue.push(ix, iy, iz);
                }
            }
        }
    }
    //flood
    while (queue.length) {
        const x = queue.shift();
        const y = queue.shift();
        const z = queue.shift();
        if (!IM._sDataTool.loadInAt(x, y, z))
            continue;
        const sl = IM._sDataTool.getLight();
        if (sl <= 0)
            continue;
        const sunL = IM.lightData.getS(sl);
        if (sunL >= 0xf && !inColumnBounds(cx, cz, x, z))
            continue;
        if (IM._nDataTool.loadInAt(x - 1, y, z)) {
            const nl = IM._nDataTool.getLight();
            if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push(x - 1, y, z);
                IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (IM._nDataTool.loadInAt(x + 1, y, z)) {
            const nl = IM._nDataTool.getLight();
            if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push(x + 1, y, z);
                IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (IM._nDataTool.loadInAt(x, y, z - 1)) {
            const nl = IM._nDataTool.getLight();
            if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push(x, y, z - 1);
                IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (IM._nDataTool.loadInAt(x, y, z + 1)) {
            const nl = IM._nDataTool.getLight();
            if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push(x, y, z + 1);
                IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (IM._nDataTool.loadInAt(x, y - 1, z)) {
            const nl = IM._nDataTool.getLight();
            if (nl > -1 && IM.lightData.isLessThanForSunAddDown(nl, sl)) {
                if (IM._nDataTool.isAir()) {
                    queue.push(x, y - 1, z);
                    IM._nDataTool
                        .setLight(IM.lightData.getSunLightForUnderVoxel(sl, nl))
                        .commit();
                }
                else {
                    const substance = IM._nDataTool.getSubstance();
                    if (substance != "#dve_magma" && substance != "#dve_solid") {
                        queue.push(x, y - 1, z);
                        IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
                    }
                }
            }
        }
        if (IM._nDataTool.loadInAt(x, y + 1, z)) {
            const nl = IM._nDataTool.getLight();
            if (nl > -1 && IM.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push(x, y + 1, z);
                IM._nDataTool.setLight(IM.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
    }
    tasks.stop();
}
