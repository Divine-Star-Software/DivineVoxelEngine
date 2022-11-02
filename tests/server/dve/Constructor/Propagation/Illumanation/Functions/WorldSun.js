import { Util } from "../../../../Global/Util.helper.js";
import { WorldBounds } from "../../../../Data/World/WorldBounds.js";
export function PopulateWorldColumnWithSunLight(x, z, maxY) {
    for (let ix = x; ix < x + WorldBounds.chunkXSize; ix++) {
        for (let iz = z; iz < z + WorldBounds.chunkZSize; iz++) {
            for (let iy = maxY; iy < WorldBounds.bounds.MaxY; iy++) {
                if (!this._sDataTool.loadIn(ix, iy, iz))
                    continue;
                const l = this._sDataTool.getLight();
                if (l < 0)
                    continue;
                this._sDataTool.setLight(this.lightData.setS(0xf, l)).commit();
            }
        }
    }
}
export function SunLightAboveCheck(x, y, z) {
    if (!this._nDataTool.loadIn(x, y + 1, z))
        return false;
    const nl = this._nDataTool.getLight();
    if (nl <= 0)
        return false;
    const sunLevel = this.lightData.getS(nl);
    if (sunLevel == 0xf)
        return true;
}
export function RunSunLightFloodDown(cx, cz) {
    const floodOutQueue = Util.getAQueue();
    this._sunLightFloodOutQue[`${cx}-${cz}`] = floodOutQueue;
    while (this._sunLightFloodDownQue.size > 0) {
        const node = this._sunLightFloodDownQue.dequeue();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        if (!this._sDataTool.loadIn(x, y, z))
            continue;
        const sl = this._sDataTool.getLight();
        if (sl <= 0)
            continue;
        if (!this.lightData.getS(sl))
            continue;
        let add = false;
        if (this.sunLightAboveCheck(x - 1, y, z)) {
            add = true;
        }
        if (this.sunLightAboveCheck(x + 1, y, z)) {
            add = true;
        }
        if (this.sunLightAboveCheck(x, y, z - 1)) {
            add = true;
        }
        if (this.sunLightAboveCheck(x, y, z + 1)) {
            add = true;
        }
        if (add) {
            floodOutQueue.enqueue([x, y, z]);
        }
        if (this._nDataTool.loadIn(x, y - 1, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAddDown(nl, sl)) {
                if (this._nDataTool.isAir()) {
                    floodOutQueue.enqueue([x, y - 1, z]);
                    this._nDataTool
                        .setLight(this.lightData.getSunLightForUnderVoxel(sl, nl))
                        .commit();
                }
                else {
                    const substance = this._nDataTool.getSubstance();
                    if (substance != "magma" && substance != "solid") {
                        floodOutQueue.enqueue([x, y - 1, z]);
                        this._nDataTool
                            .setLight(this.lightData.getMinusOneForSun(sl, nl))
                            .commit();
                    }
                }
            }
        }
    }
}
export function RunSunLightFloodOut(x, z) {
    const queue = this._sunLightFloodOutQue[`${x}-${z}`];
    while (queue.size > 0) {
        const node = queue.dequeue();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        if (!this._sDataTool.loadIn(x, y, z))
            continue;
        const sl = this._sDataTool.getLight();
        if (sl <= 0)
            continue;
        if (!this.lightData.getS(sl))
            continue;
        if (this._nDataTool.loadIn(x - 1, y, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.enqueue([x - 1, y, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadIn(x + 1, y, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.enqueue([x + 1, y, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadIn(x, y, z - 1)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.enqueue([x, y, z - 1]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadIn(x, y, z + 1)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.enqueue([x, y, z + 1]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadIn(x, y - 1, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAddDown(nl, sl)) {
                if (this._nDataTool.isAir()) {
                    queue.enqueue([x, y - 1, z]);
                    this._nDataTool
                        .setLight(this.lightData.getSunLightForUnderVoxel(sl, nl))
                        .commit();
                }
                else {
                    const substance = this._nDataTool.getSubstance();
                    if (substance != "magma" && substance != "solid") {
                        queue.enqueue([x, y - 1, z]);
                        this._nDataTool
                            .setLight(this.lightData.getMinusOneForSun(sl, nl))
                            .commit();
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x, y + 1, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.enqueue([x, y + 1, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
    }
}
export function RunSunLightUpdateAtMaxY(x, z, maxY) {
    for (let ix = x; ix < x + WorldBounds.chunkXSize; ix++) {
        for (let iz = z; iz < z + WorldBounds.chunkZSize; iz++) {
            this._sunLightFloodDownQue.enqueue([ix, maxY, iz]);
        }
    }
    this.runSunLightFloodDown(x, z);
}
