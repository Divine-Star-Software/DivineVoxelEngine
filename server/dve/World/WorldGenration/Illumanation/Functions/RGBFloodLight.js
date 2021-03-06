//objects
import { DVEW } from "../../../DivineVoxelEngineWorld.js";
export function runRGBFloodFill() {
    while (this._RGBlightUpdateQue.length != 0) {
        const node = this._RGBlightUpdateQue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const sl = DVEW.worldData.getLight(x, y, z);
        const n1 = DVEW.worldData.getLight(x - 1, y, z);
        if (n1 > -1 && this.lightByte.isLessThanForRGBAdd(n1, sl)) {
            this._RGBlightUpdateQue.push([x - 1, y, z]);
            DVEW.worldData.setLight(x - 1, y, z, this.lightByte.getMinusOneForRGB(sl));
            DVEW.worldData.addToRebuildQue(x - 1, y, z, "all");
        }
        const n2 = DVEW.worldData.getLight(x + 1, y, z);
        if (n2 > -1 && this.lightByte.isLessThanForRGBAdd(n2, sl)) {
            this._RGBlightUpdateQue.push([x + 1, y, z]);
            DVEW.worldData.setLight(x + 1, y, z, this.lightByte.getMinusOneForRGB(sl));
            DVEW.worldData.addToRebuildQue(x + 1, y, z, "all");
        }
        const n3 = DVEW.worldData.getLight(x, y, z - 1);
        if (n3 > -1 && this.lightByte.isLessThanForRGBAdd(n3, sl)) {
            this._RGBlightUpdateQue.push([x, y, z - 1]);
            DVEW.worldData.setLight(x, y, z - 1, this.lightByte.getMinusOneForRGB(sl));
            DVEW.worldData.addToRebuildQue(x, y, z - 1, "all");
        }
        const n4 = DVEW.worldData.getLight(x, y, z + 1);
        if (n4 > -1 && this.lightByte.isLessThanForRGBAdd(n4, sl)) {
            this._RGBlightUpdateQue.push([x, y, z + 1]);
            DVEW.worldData.setLight(x, y, z + 1, this.lightByte.getMinusOneForRGB(sl));
            DVEW.worldData.addToRebuildQue(x, y, z + 1, "all");
        }
        const n5 = DVEW.worldData.getLight(x, y - 1, z);
        if (n5 > -1 && this.lightByte.isLessThanForRGBAdd(n5, sl)) {
            this._RGBlightUpdateQue.push([x, y - 1, z]);
            DVEW.worldData.setLight(x, y - 1, z, this.lightByte.getMinusOneForRGB(sl));
            DVEW.worldData.addToRebuildQue(x, y - 1, z, "all");
        }
        const n6 = DVEW.worldData.getLight(x, y + 1, z);
        if (n6 > -1 && this.lightByte.isLessThanForRGBAdd(n6, sl)) {
            this._RGBlightUpdateQue.push([x, y + 1, z]);
            DVEW.worldData.setLight(x, y + 1, z, this.lightByte.getMinusOneForRGB(sl));
            DVEW.worldData.addToRebuildQue(x, y + 1, z, "all");
        }
    }
}
export function runRGBFloodFillAt(x, y, z) {
    this._RGBlightUpdateQue.push([x, y, z]);
    this.runRGBFloodFill();
}
export function runRGBFloodRemoveAt(removeVoxel, x, y, z) {
    this._RGBlightRemovalQue.push([x, y, z]);
    if (removeVoxel) {
        this.runRGBFloodRemove({ x: x, y: y, z: z });
    }
    else {
        this.runRGBFloodRemove();
    }
}
export function runRGBFloodRemove(lightSource) {
    while (this._RGBlightRemovalQue.length != 0) {
        const node = this._RGBlightRemovalQue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const sl = DVEW.worldData.getLight(x, y, z);
        const n1 = DVEW.worldData.getLight(x - 1, y, z);
        if (n1 > 0 && this.lightByte.isLessThanForRGBRemove(n1, sl)) {
            this._RGBlightRemovalQue.push([x - 1, y, z]);
        }
        else {
            if (n1 > 0) {
                if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n1, sl)) {
                    this._RGBlightUpdateQue.push([x - 1, y, z]);
                }
            }
        }
        const n2 = DVEW.worldData.getLight(x + 1, y, z);
        if (n2 > 0 && this.lightByte.isLessThanForRGBRemove(n2, sl)) {
            this._RGBlightRemovalQue.push([x + 1, y, z]);
        }
        else {
            if (n2 > 0) {
                if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n2, sl)) {
                    this._RGBlightUpdateQue.push([x + 1, y, z]);
                }
            }
        }
        const n3 = DVEW.worldData.getLight(x, y, z - 1);
        if (n3 > 0 && this.lightByte.isLessThanForRGBRemove(n3, sl)) {
            this._RGBlightRemovalQue.push([x, y, z - 1]);
        }
        else {
            if (n3 > 0) {
                if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n3, sl)) {
                    this._RGBlightUpdateQue.push([x, y, z - 1]);
                }
            }
        }
        const n4 = DVEW.worldData.getLight(x, y, z + 1);
        if (n4 > 0 && this.lightByte.isLessThanForRGBRemove(n4, sl)) {
            this._RGBlightRemovalQue.push([x, y, z + 1]);
        }
        else {
            if (n4 > 0) {
                if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n4, sl)) {
                    this._RGBlightUpdateQue.push([x, y, z + 1]);
                }
            }
        }
        const n5 = DVEW.worldData.getLight(x, y - 1, z);
        if (n5 > 0 && this.lightByte.isLessThanForRGBRemove(n5, sl)) {
            this._RGBlightRemovalQue.push([x, y - 1, z]);
        }
        else {
            if (n5 > 0) {
                if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n5, sl)) {
                    this._RGBlightUpdateQue.push([x, y - 1, z]);
                }
            }
        }
        const n6 = DVEW.worldData.getLight(x, y + 1, z);
        if (n6 > 0 && this.lightByte.isLessThanForRGBRemove(n6, sl)) {
            this._RGBlightRemovalQue.push([x, y + 1, z]);
        }
        else {
            if (n6 > 0) {
                if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n6, sl)) {
                    this._RGBlightUpdateQue.push([x, y + 1, z]);
                }
            }
        }
        DVEW.worldData.setLight(x, y, z, 0);
        DVEW.worldData.addToRebuildQue(x, y, z, "all");
    }
    if (lightSource) {
        DVEW.worldData.removeData(lightSource.x, lightSource.y, lightSource.z);
        DVEW.worldData.setAir(lightSource.x, lightSource.y, lightSource.z, 0);
        this._RGBlightUpdateQue.push([lightSource.x, lightSource.y, lightSource.z]);
    }
    this.runRGBFloodFill();
}
