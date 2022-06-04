import { DVEP } from "../../DivineVoxelEngineWorldPropagation.js";
export function runSunLightRemoveAt(x, y, z) {
    this._sunLightRemoveQue.push([x, y, z]);
    this.runSunLightRemove();
}
export function runSunLightRemove() {
    while (this._sunLightRemoveQue.length != 0) {
        const node = this._sunLightRemoveQue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const sl = DVEP.voxelHelper.getLight(x, y, z);
        const n1 = DVEP.voxelHelper.getLight(x - 1, y, z);
        if (n1 > 0 && this.lightByte.isLessThanForSunRemove(n1, sl)) {
            this._sunLightRemoveQue.push([x - 1, y, z]);
        }
        else {
            if (n1 > 0) {
                if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
                    this._sunLightUpdateQue.push([x - 1, y, z]);
                }
            }
        }
        const n2 = DVEP.voxelHelper.getLight(x + 1, y, z);
        if (n2 > 0 && this.lightByte.isLessThanForSunRemove(n2, sl)) {
            this._sunLightRemoveQue.push([x + 1, y, z]);
        }
        else {
            if (n2 > 0) {
                if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
                    this._sunLightUpdateQue.push([x + 1, y, z]);
                }
            }
        }
        const n3 = DVEP.voxelHelper.getLight(x, y, z - 1);
        if (n3 > 0 && this.lightByte.isLessThanForSunRemove(n3, sl)) {
            this._sunLightRemoveQue.push([x, y, z - 1]);
        }
        else {
            if (n3 > 0) {
                if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
                    this._sunLightUpdateQue.push([x, y, z - 1]);
                }
            }
        }
        const n4 = DVEP.voxelHelper.getLight(x, y, z + 1);
        if (n4 > 0 && this.lightByte.isLessThanForSunRemove(n4, sl)) {
            this._sunLightRemoveQue.push([x, y, z + 1]);
        }
        else {
            if (n4 > 0) {
                if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
                    this._sunLightUpdateQue.push([x, y, z + 1]);
                }
            }
        }
        const n5 = DVEP.voxelHelper.getLight(x, y - 1, z);
        if (n5 > 0 && this.lightByte.sunLightCompareForDownSunRemove(n5, sl)) {
            this._sunLightRemoveQue.push([x, y - 1, z]);
        }
        else {
            if (n5 > 0) {
                if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
                    this._sunLightUpdateQue.push([x, y - 1, z]);
                }
            }
        }
        const n6 = DVEP.voxelHelper.getLight(x, y + 1, z);
        if (n6 > 0 && this.lightByte.isLessThanForSunRemove(n6, sl)) {
            this._sunLightRemoveQue.push([x, y + 1, z]);
        }
        else {
            if (n6 > 0) {
                if (this.lightByte.isGreaterOrEqualThanForSunRemove(n1, sl)) {
                    this._sunLightUpdateQue.push([x, y + 1, z]);
                }
            }
        }
        DVEP.voxelHelper.setLight(x, y, z, this.lightByte.removeSunLight(sl));
    }
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
        const sl = DVEP.voxelHelper.getLight(x, y, z);
        if (this._visitSunMap[`${x}-${y}-${z}`]) {
            continue;
        }
        this._visitSunMap[`${x}-${y}-${z}`] = true;
        if (sl == 0)
            continue;
        const n1 = DVEP.voxelHelper.getLight(x - 1, y, z);
        if (n1 > -1 && this.lightByte.isLessThanForSunAdd(n1, sl)) {
            if (!this._visitSunMap[`${x - 1}-${y}-${z}`]) {
                this._sunLightUpdateQue.push([x - 1, y, z]);
                DVEP.voxelHelper.setLight(x - 1, y, z, this.lightByte.getMinusOneForSun(sl));
            }
        }
        const n2 = DVEP.voxelHelper.getLight(x + 1, y, z);
        if (n2 > -1 && this.lightByte.isLessThanForSunAdd(n2, sl)) {
            if (!this._visitSunMap[`${x + 1}-${y}-${z}`]) {
                this._sunLightUpdateQue.push([x + 1, y, z]);
                DVEP.voxelHelper.setLight(x + 1, y, z, this.lightByte.getMinusOneForSun(sl));
            }
        }
        const n3 = DVEP.voxelHelper.getLight(x, y, z - 1);
        if (n3 > -1 && this.lightByte.isLessThanForSunAdd(n3, sl)) {
            if (!this._visitSunMap[`${x}-${y}-${z - 1}`]) {
                this._sunLightUpdateQue.push([x, y, z - 1]);
                DVEP.voxelHelper.setLight(x, y, z - 1, this.lightByte.getMinusOneForSun(sl));
            }
        }
        const n4 = DVEP.voxelHelper.getLight(x, y, z + 1);
        if (n4 > -1 && this.lightByte.isLessThanForSunAdd(n4, sl)) {
            if (!this._visitSunMap[`${x}-${y}-${z + 1}`]) {
                this._sunLightUpdateQue.push([x, y, z + 1]);
                DVEP.voxelHelper.setLight(x, y, z + 1, this.lightByte.getMinusOneForSun(sl));
            }
        }
        const n5 = DVEP.voxelHelper.getLight(x, y - 1, z);
        if (n5 > -1 && this.lightByte.isLessThanForSunAddDown(n5, sl)) {
            if (!this._visitSunMap[`${x}-${y - 1}-${z}`]) {
                this._sunLightUpdateQue.push([x, y - 1, z]);
                DVEP.voxelHelper.setLight(x, y - 1, z, this.lightByte.getSunLightForUnderVoxel(sl));
            }
        }
        const n6 = DVEP.voxelHelper.getLight(x, y + 1, z);
        if (n6 > -1 && this.lightByte.isLessThanForSunAddUp(n6, sl)) {
            if (!this._visitSunMap[`${x}-${y + 1}-${z}`]) {
                this._sunLightUpdateQue.push([x, y + 1, z]);
                DVEP.voxelHelper.setLight(x, y + 1, z, this.lightByte.getMinusOneForSun(sl));
            }
        }
    }
    this._visitSunMap = {};
}
export function runSunLightUpdateAt(x, y, z) {
    this._sunLightUpdateQue.push([x, y, z]);
    this.runSunLightUpdate();
}
export function PopulateWorldColumnWithSunLight(x, z, maxY) {
    for (let ix = x; ix < x + DVEP.worldBounds.chunkXSize; ix++) {
        for (let iz = z; iz < z + DVEP.worldBounds.chunkZSize; iz++) {
            let iy = maxY;
            let worldY = DVEP.worldBounds.bounds.MaxY;
            while (iy <= worldY) {
                DVEP.voxelHelper.setFullSun(ix, iy, iz);
                iy++;
            }
        }
    }
}
export function RunSunLightUpdateAtMaxY(x, z, maxY) {
    for (let ix = x; ix < x + DVEP.worldBounds.chunkXSize; ix++) {
        for (let iz = z; iz < z + DVEP.worldBounds.chunkZSize; iz++) {
            this._sunLightUpdateQue.push([ix, maxY, iz]);
            this.runSunLightUpdate();
        }
    }
}
