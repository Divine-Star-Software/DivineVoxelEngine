import { DVEP } from "../../DivineVoxelEnginePropagation.js";
import { WorldBounds } from "../../../../Data/World/WorldBounds.js";
export function runSunLightRemoveAt(x, y, z) {
    this._sDataTool.loadIn(x, y, z);
    const l = this.lightData.getS(this._sDataTool.getLight());
    if (l >= 0) {
        this._sunLightRemoveQue.push([x, y, z]);
        this.runSunLightRemove(x, y, z);
        return;
    }
    this._nDataTool.loadIn(x, y - 1, z);
    const l2 = this.lightData.getS(this._nDataTool.getLight());
    if (l2 >= 0) {
        this._sunLightRemoveQue.push([x, y, z]);
        this._sunLightRemoveQue.push([x, y - 1, z]);
        this.runSunLightRemove(x, y, z);
    }
}
export function runSunLightRemove(x, y, z) {
    while (this._sunLightRemoveQue.length != 0) {
        const node = this._sunLightRemoveQue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        if (!this._sDataTool.loadIn(x, y, z))
            continue;
        const sl = this._sDataTool.getLight();
        if (sl < 0)
            continue;
        if (!this.lightData.getS(sl))
            continue;
        if (this._nDataTool.loadIn(x - 1, y, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > 0) {
                if (this.lightData.isLessThanForSunRemove(nl, sl)) {
                    this._sunLightRemoveQue.push([x - 1, y, z]);
                }
                else {
                    if (this.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        this._sunLightUpdateQue.enqueue([x - 1, y, z]);
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x + 1, y, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > 0) {
                if (this.lightData.isLessThanForSunRemove(nl, sl)) {
                    this._sunLightRemoveQue.push([x + 1, y, z]);
                }
                else {
                    if (this.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        this._sunLightUpdateQue.enqueue([x + 1, y, z]);
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x, y, z - 1)) {
            const nl = this._nDataTool.getLight();
            if (nl > 0) {
                if (this.lightData.isLessThanForSunRemove(nl, sl)) {
                    this._sunLightRemoveQue.push([x, y, z - 1]);
                }
                else {
                    if (this.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        this._sunLightUpdateQue.enqueue([x, y, z - 1]);
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x, y, z + 1)) {
            const nl = this._nDataTool.getLight();
            if (nl > 0) {
                if (this.lightData.isLessThanForSunRemove(nl, sl)) {
                    this._sunLightRemoveQue.push([x, y, z + 1]);
                }
                else {
                    if (this.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        this._sunLightUpdateQue.enqueue([x, y, z + 1]);
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x, y - 1, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > 0) {
                if (this.lightData.sunLightCompareForDownSunRemove(nl, sl)) {
                    this._sunLightRemoveQue.push([x, y - 1, z]);
                }
                else {
                    if (this.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        this._sunLightUpdateQue.enqueue([x, y - 1, z]);
                    }
                }
            }
        }
        if (this._nDataTool.loadIn(x, y + 1, z)) {
            const n6 = this._nDataTool.getLight();
            if (n6 > 0) {
                if (this.lightData.isLessThanForSunRemove(n6, sl)) {
                    this._sunLightRemoveQue.push([x, y + 1, z]);
                }
                else {
                    if (this.lightData.isGreaterOrEqualThanForSunRemove(n6, sl)) {
                        this._sunLightUpdateQue.enqueue([x, y + 1, z]);
                    }
                }
            }
        }
        this._sDataTool.setLight(this.lightData.removeSunLight(sl)).commit();
        DVEP.addToRebuildQue(x, y, z, "all");
    }
    this._sDataTool.loadIn(x, y, z);
    this._sDataTool.setBarrier().commit();
    this.runSunLightUpdate();
    this._sDataTool.loadIn(x, y, z);
    this._sDataTool.setAir().commit();
}
export function runSunLightUpdate() {
    const queue = this._sunLightUpdateQue;
    while (this._sunLightUpdateQue.size > 0) {
        const node = this._sunLightUpdateQue.dequeue();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        if (!this._sDataTool.loadIn(x, y, z))
            continue;
        const sl = this._sDataTool.getLight();
        if (sl < 0)
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
        DVEP.addToRebuildQue(x, y, z, "all");
    }
}
export function runSunLightUpdateAt(x, y, z) {
    this._sunLightUpdateQue.enqueue([x, y, z]);
    this.runSunLightUpdate();
}
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
