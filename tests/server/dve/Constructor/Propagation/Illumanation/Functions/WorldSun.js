import { DVEP } from "../../DivineVoxelEnginePropagation.js";
import { Util } from "../../../../Global/Util.helper.js";
import { WorldBounds } from "../../../../Data/World/WorldBounds.js";
export function PopulateWorldColumnWithSunLight(x, z, maxY) {
    for (let ix = x; ix < x + WorldBounds.chunkXSize; ix++) {
        for (let iz = z; iz < z + WorldBounds.chunkZSize; iz++) {
            let iy = maxY;
            let worldY = WorldBounds.bounds.MaxY;
            while (iy <= worldY) {
                this._sDataTool.loadIn(ix, iy, iz);
                this._sDataTool.setLight(0xf).commit();
                iy++;
            }
        }
    }
}
export function SunLightAboveCheck(x, y, z) {
    if (!this._nDataTool.loadIn(x, y + 1, z))
        return false;
    const nl = this._nDataTool.getLight();
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
                    this._sunLightFloodDownQue.enqueue([x, y - 1, z]);
                    this._nDataTool
                        .setLight(this.lightData.getSunLightForUnderVoxel(sl, nl))
                        .commit();
                }
                else {
                    const substance = this._nDataTool.getSubstance();
                    if (substance != "magma" && substance != "solid") {
                        this._sunLightFloodDownQue.enqueue([x, y - 1, z]);
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
        DVEP.addToRebuildQue(x, y, z, "all");
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
