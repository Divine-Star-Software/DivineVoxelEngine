export function runSunLightRemove(chunkX, chunkY, chunkZ, startX, startY, startZ) {
    let trueStartX = startX + chunkX;
    let trueStartY = startY + chunkY;
    let trueStartZ = startZ + chunkZ;
    this._sunLightRemoveQue.push([trueStartX, trueStartY, trueStartZ]);
    while (this._sunLightRemoveQue.length != 0) {
        const node = this._sunLightRemoveQue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const sl = this.DVEW.worldData.getLight(x, y, z);
        const n1 = this.DVEW.worldData.getLight(x - 1, y, z);
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
        const n2 = this.DVEW.worldData.getLight(x + 1, y, z);
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
        const n3 = this.DVEW.worldData.getLight(x, y, z - 1);
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
        const n4 = this.DVEW.worldData.getLight(x, y, z + 1);
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
        const n5 = this.DVEW.worldData.getLight(x, y - 1, z);
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
        const n6 = this.DVEW.worldData.getLight(x, y + 1, z);
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
        this.DVEW.worldData.setLight(x, y, z, this.lightByte.removeSunLight(sl));
    }
    this.sunLightUpdate();
}
export function sunLightUpdate() {
    while (this._sunLightUpdateQue.length != 0) {
        const node = this._sunLightUpdateQue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const sl = this.DVEW.worldData.getLight(x, y, z);
        const n1 = this.DVEW.worldData.getLight(x - 1, y, z);
        if (n1 > -1 && this.lightByte.isLessThanForSunAdd(n1, sl)) {
            this._sunLightUpdateQue.push([x - 1, y, z]);
            this.DVEW.worldData.setLight(x - 1, y, z, this.lightByte.getMinusOneForSun(sl));
        }
        const n2 = this.DVEW.worldData.getLight(x + 1, y, z);
        if (n2 > -1 && this.lightByte.isLessThanForSunAdd(n2, sl)) {
            this._sunLightUpdateQue.push([x + 1, y, z]);
            this.DVEW.worldData.setLight(x + 1, y, z, this.lightByte.getMinusOneForSun(sl));
        }
        const n3 = this.DVEW.worldData.getLight(x, y, z - 1);
        if (n3 > -1 && this.lightByte.isLessThanForSunAdd(n3, sl)) {
            this._sunLightUpdateQue.push([x, y, z - 1]);
            this.DVEW.worldData.setLight(x, y, z - 1, this.lightByte.getMinusOneForSun(sl));
        }
        const n4 = this.DVEW.worldData.getLight(x, y, z + 1);
        if (n4 > -1 && this.lightByte.isLessThanForSunAdd(n4, sl)) {
            this._sunLightUpdateQue.push([x, y, z + 1]);
            this.DVEW.worldData.setLight(x, y, z + 1, this.lightByte.getMinusOneForSun(sl));
        }
        const n5 = this.DVEW.worldData.getLight(x, y - 1, z);
        if (n5 > -1 && this.lightByte.isLessThanForSunAddDown(n5, sl)) {
            this._sunLightUpdateQue.push([x, y - 1, z]);
            this.DVEW.worldData.setLight(x, y - 1, z, this.lightByte.getSunLightForUnderVoxel(sl));
        }
        const n6 = this.DVEW.worldData.getLight(x, y + 1, z);
        if (n6 > -1 && this.lightByte.isLessThanForSunAdd(n6, sl)) {
            this._sunLightUpdateQue.push([x, y + 1, z]);
            this.DVEW.worldData.setLight(x, y + 1, z, this.lightByte.getMinusOneForSun(sl));
        }
    }
}
