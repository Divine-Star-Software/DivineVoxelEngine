import { DVEC } from "../../../DivineVoxelEngineConstructor.js";
import { DVEP } from "../../DivineVoxelEnginePropagation.js";
export function runSunLightRemoveAt(x, y, z) {
    this._sunLightRemoveQue.push([x, y, z]);
    this.runSunLightRemove(x, y, z);
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
        const sl = DVEC.worldMatrix.getLight(x, y, z);
        const sunLightLevel = this.lightByte.getS(sl);
        if (sunLightLevel == 0)
            continue;
        DVEP.addToRebuildQue(x, y, z, "all");
        const n1 = DVEC.worldMatrix.getLight(x - 1, y, z);
        if (n1 > 0) {
            if (this.lightByte.isLessThanForSunRemove(n1, sl)) {
                this._sunLightRemoveQue.push([x - 1, y, z]);
            }
            else {
                if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
                    this._sunLightUpdateQue.push([x - 1, y, z]);
                }
            }
        }
        const n2 = DVEC.worldMatrix.getLight(x + 1, y, z);
        if (n2 > 0) {
            if (this.lightByte.isLessThanForSunRemove(n2, sl)) {
                this._sunLightRemoveQue.push([x + 1, y, z]);
            }
            else {
                if (this.lightByte.isGreaterOrEqualThanForSunRemove(n2, sl)) {
                    this._sunLightUpdateQue.push([x + 1, y, z]);
                }
            }
        }
        const n3 = DVEC.worldMatrix.getLight(x, y, z - 1);
        if (n3 > 0) {
            if (this.lightByte.isLessThanForSunRemove(n3, sl)) {
                this._sunLightRemoveQue.push([x, y, z - 1]);
            }
            else {
                if (this.lightByte.isGreaterOrEqualThanForSunRemove(n3, sl)) {
                    this._sunLightUpdateQue.push([x, y, z - 1]);
                }
            }
        }
        const n4 = DVEC.worldMatrix.getLight(x, y, z + 1);
        if (n4 > 0) {
            if (this.lightByte.isLessThanForSunRemove(n4, sl)) {
                this._sunLightRemoveQue.push([x, y, z + 1]);
            }
            else {
                if (this.lightByte.isGreaterOrEqualThanForSunRemove(n4, sl)) {
                    this._sunLightUpdateQue.push([x, y, z + 1]);
                }
            }
        }
        const n5 = DVEC.worldMatrix.getLight(x, y - 1, z);
        if (n5 > 0) {
            if (this.lightByte.sunLightCompareForDownSunRemove(n5, sl)) {
                this._sunLightRemoveQue.push([x, y - 1, z]);
            }
            else {
                if (this.lightByte.isGreaterOrEqualThanForSunRemove(n5, sl)) {
                    this._sunLightUpdateQue.push([x, y - 1, z]);
                }
            }
        }
        const n6 = DVEC.worldMatrix.getLight(x, y + 1, z);
        if (n6 > 0) {
            if (this.lightByte.isLessThanForSunRemove(n6, sl)) {
                this._sunLightRemoveQue.push([x, y + 1, z]);
            }
            else {
                if (this.lightByte.isGreaterOrEqualThanForSunRemove(n6, sl)) {
                    this._sunLightUpdateQue.push([x, y + 1, z]);
                }
            }
        }
        DVEC.worldMatrix.setLight(x, y, z, this.lightByte.removeSunLight(sl));
    }
    DVEC.worldMatrix.setData(x, y, z, DVEC.UTIL.getVoxelByte().setId(1, 0));
    this.runSunLightUpdate();
}
export function runSunLightUpdate() {
    while (this._sunLightUpdateQue.length != 0) {
        const node = this._sunLightUpdateQue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const sl = DVEC.worldMatrix.getLight(x, y, z);
        const sunLightLevel = this.lightByte.getS(sl);
        if (sunLightLevel == 0)
            continue;
        DVEP.addToRebuildQue(x, y, z, "all");
        const n1 = DVEC.worldMatrix.getLight(x - 1, y, z);
        if (n1 > -1 && this.lightByte.isLessThanForSunAdd(n1, sl)) {
            this._sunLightUpdateQue.push([x - 1, y, z]);
            DVEC.worldMatrix.setLight(x - 1, y, z, this.lightByte.getMinusOneForSun(sl, n1));
        }
        const n2 = DVEC.worldMatrix.getLight(x + 1, y, z);
        if (n2 > -1 && this.lightByte.isLessThanForSunAdd(n2, sl)) {
            this._sunLightUpdateQue.push([x + 1, y, z]);
            DVEC.worldMatrix.setLight(x + 1, y, z, this.lightByte.getMinusOneForSun(sl, n2));
        }
        const n3 = DVEC.worldMatrix.getLight(x, y, z - 1);
        if (n3 > -1 && this.lightByte.isLessThanForSunAdd(n3, sl)) {
            this._sunLightUpdateQue.push([x, y, z - 1]);
            DVEC.worldMatrix.setLight(x, y, z - 1, this.lightByte.getMinusOneForSun(sl, n3));
        }
        const n4 = DVEC.worldMatrix.getLight(x, y, z + 1);
        if (n4 > -1 && this.lightByte.isLessThanForSunAdd(n4, sl)) {
            this._sunLightUpdateQue.push([x, y, z + 1]);
            DVEC.worldMatrix.setLight(x, y, z + 1, this.lightByte.getMinusOneForSun(sl, n4));
        }
        const n5 = DVEC.worldMatrix.getLight(x, y - 1, z);
        if (n5 > -1 && this.lightByte.isLessThanForSunAddDown(n5, sl)) {
            const voxelData = DVEC.worldMatrix.getVoxel(x, y - 1, z);
            if (!voxelData || voxelData[0] == "dve:air") {
                this._sunLightUpdateQue.push([x, y - 1, z]);
                DVEC.worldMatrix.setLight(x, y - 1, z, this.lightByte.getSunLightForUnderVoxel(sl, n5));
            }
            else {
                const voxel = DVEC.voxelManager.getVoxel(voxelData[0]).data;
                if (voxel.substance == "flora" || voxel.substance == "fluid") {
                    this._sunLightUpdateQue.push([x, y - 1, z]);
                    DVEC.worldMatrix.setLight(x, y - 1, z, this.lightByte.getMinusOneForSun(sl, n5));
                }
            }
        }
        const n6 = DVEC.worldMatrix.getLight(x, y + 1, z);
        if (n6 > -1 && this.lightByte.isLessThanForSunAddUp(n6, sl)) {
            this._sunLightUpdateQue.push([x, y + 1, z]);
            DVEC.worldMatrix.setLight(x, y + 1, z, this.lightByte.getMinusOneForSun(sl, n6));
        }
    }
}
export function runSunLightUpdateAt(x, y, z) {
    this._sunLightUpdateQue.push([x, y, z]);
    this.runSunLightUpdate();
}
export function PopulateWorldColumnWithSunLight(x, z, maxY) {
    for (let ix = x; ix < x + DVEC.worldBounds.chunkXSize; ix++) {
        for (let iz = z; iz < z + DVEC.worldBounds.chunkZSize; iz++) {
            let iy = maxY;
            let worldY = DVEC.worldBounds.bounds.MaxY;
            while (iy <= worldY) {
                DVEC.worldMatrix.setFullSun(ix, iy, iz);
                iy++;
            }
        }
    }
}
export function SunLightAboveCheck(x, y, z) {
    const nl = DVEC.worldMatrix.getLight(x, y + 1, z);
    const sunLevel = this.lightByte.getS(nl);
    if (sunLevel != 0xf || nl == -1) {
        const voxelData = DVEC.worldMatrix.getVoxel(x, y, z);
        if (!voxelData) {
            return false;
        }
        if (voxelData[0] == "dve:air") {
            return true;
        }
        else {
            const voxel = DVEC.voxelManager.getVoxel(voxelData[0]).data;
            if (voxel.substance != "magma") {
                return true;
            }
        }
    }
    return false;
}
export function RunSunLightFloodDown(x, z) {
    const floodOutQueue = [];
    this._sunLightFloodOutQue[`${x}-${z}`] = floodOutQueue;
    while (this._sunLightFloodDownQue.length != 0) {
        const node = this._sunLightFloodDownQue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const sl = DVEC.worldMatrix.getLight(x, y, z);
        const sunLightLevel = this.lightByte.getS(sl);
        this._visitMap[`${x}-${y}-${z}`] = true;
        if (sunLightLevel == 0)
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
            floodOutQueue.push([x, y, z]);
        }
        const n5 = DVEC.worldMatrix.getLight(x, y - 1, z);
        if (n5 > -1 && this.lightByte.isLessThanForSunAddDown(n5, sl)) {
            const voxelData = DVEC.worldMatrix.getVoxel(x, y - 1, z);
            if (!voxelData || voxelData[0] == "dve:air") {
                this._sunLightFloodDownQue.push([x, y - 1, z]);
                DVEC.worldMatrix.setLight(x, y - 1, z, this.lightByte.getSunLightForUnderVoxel(sl, n5));
            }
            else {
                const voxel = DVEC.voxelManager.getVoxel(voxelData[0]).data;
                if (voxel.substance == "flora" || voxel.substance == "fluid") {
                    this._sunLightFloodDownQue.push([x, y - 1, z]);
                    DVEC.worldMatrix.setLight(x, y - 1, z, this.lightByte.getMinusOneForSun(sl, n5));
                }
            }
        }
    }
}
export function RunSunLightFloodOut(x, z) {
    const queue = this._sunLightFloodOutQue[`${x}-${z}`];
    while (queue.length != 0) {
        const node = queue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const sl = DVEC.worldMatrix.getLight(x, y, z);
        const n1 = DVEC.worldMatrix.getLight(x - 1, y, z);
        if (n1 > -1 && this.lightByte.isLessThanForSunAdd(n1, sl)) {
            queue.push([x - 1, y, z]);
            DVEC.worldMatrix.setLight(x - 1, y, z, this.lightByte.getMinusOneForSun(sl, n1));
        }
        const n2 = DVEC.worldMatrix.getLight(x + 1, y, z);
        if (n2 > -1 && this.lightByte.isLessThanForSunAdd(n2, sl)) {
            queue.push([x + 1, y, z]);
            DVEC.worldMatrix.setLight(x + 1, y, z, this.lightByte.getMinusOneForSun(sl, n2));
        }
        const n3 = DVEC.worldMatrix.getLight(x, y, z - 1);
        if (n3 > -1 && this.lightByte.isLessThanForSunAdd(n3, sl)) {
            queue.push([x, y, z - 1]);
            DVEC.worldMatrix.setLight(x, y, z - 1, this.lightByte.getMinusOneForSun(sl, n3));
        }
        const n4 = DVEC.worldMatrix.getLight(x, y, z + 1);
        if (n4 > -1 && this.lightByte.isLessThanForSunAdd(n4, sl)) {
            queue.push([x, y, z + 1]);
            DVEC.worldMatrix.setLight(x, y, z + 1, this.lightByte.getMinusOneForSun(sl, n4));
        }
        const n5 = DVEC.worldMatrix.getLight(x, y - 1, z);
        if (n5 > -1 && this.lightByte.isLessThanForSunAddDown(n5, sl)) {
            const voxelData = DVEC.worldMatrix.getVoxel(x, y - 1, z);
            if (!voxelData || voxelData[0] == "dve:air") {
                queue.push([x, y - 1, z]);
                DVEC.worldMatrix.setLight(x, y - 1, z, this.lightByte.getSunLightForUnderVoxel(sl, n5));
            }
            else {
                const voxel = DVEC.voxelManager.getVoxel(voxelData[0]).data;
                if (voxel.substance == "flora" || voxel.substance == "fluid") {
                    queue.push([x, y - 1, z]);
                    DVEC.worldMatrix.setLight(x, y - 1, z, this.lightByte.getMinusOneForSun(sl, n5));
                }
            }
        }
        const n6 = DVEC.worldMatrix.getLight(x, y + 1, z);
        if (n6 > -1 && this.lightByte.isLessThanForSunAddUp(n6, sl)) {
            queue.push([x, y + 1, z]);
            DVEC.worldMatrix.setLight(x, y + 1, z, this.lightByte.getMinusOneForSun(sl, n6));
        }
    }
}
export function RunSunLightUpdateAtMaxY(x, z, maxY) {
    for (let ix = x; ix < x + DVEC.worldBounds.chunkXSize; ix++) {
        for (let iz = z; iz < z + DVEC.worldBounds.chunkZSize; iz++) {
            this._sunLightFloodDownQue.push([ix, maxY, iz]);
        }
    }
    this.runSunLightFloodDown(x, z);
}
