export function runRGBUpdate() {
    while (this._RGBlightUpdateQ.length != 0) {
        const node = this._RGBlightUpdateQ.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        if (!this._sDataTool.loadInAt(x, y, z))
            continue;
        if (this._sDataTool.isBarrier())
            continue;
        const sl = this._sDataTool.getLight();
        if (sl <= 0)
            continue;
        if (this._nDataTool.loadInAt(x - 1, y, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForRGBAdd(nl, sl)) {
                this._RGBlightUpdateQ.push([x - 1, y, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadInAt(x + 1, y, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForRGBAdd(nl, sl)) {
                this._RGBlightUpdateQ.push([x + 1, y, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadInAt(x, y, z - 1)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForRGBAdd(nl, sl)) {
                this._RGBlightUpdateQ.push([x, y, z - 1]);
                this._nDataTool.setLight(this.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadInAt(x, y, z + 1)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForRGBAdd(nl, sl)) {
                this._RGBlightUpdateQ.push([x, y, z + 1]);
                this._nDataTool.setLight(this.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadInAt(x, y - 1, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForRGBAdd(nl, sl)) {
                this._RGBlightUpdateQ.push([x, y - 1, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (this._nDataTool.loadInAt(x, y + 1, z)) {
            const nl = this._nDataTool.getLight();
            if (nl > -1 && this.lightData.isLessThanForRGBAdd(nl, sl)) {
                this._RGBlightUpdateQ.push([x, y + 1, z]);
                this._nDataTool.setLight(this.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        this.addToRebuildQue(x, y, z);
    }
}
export function runRGBUpdateAt(x, y, z) {
    this._RGBlightUpdateQ.push([x, y, z]);
    this.runRGBUpdate();
}
export function runRGBRemoveAt(removeVoxel, x, y, z) {
    this._RGBlightRemovalQ.push([x, y, z]);
    if (removeVoxel) {
        this.runRGBRemove({ x: x, y: y, z: z });
    }
    else {
        this.runRGBRemove();
    }
}
export function runRGBRemove(lightSource) {
    while (this._RGBlightRemovalQ.length != 0) {
        const node = this._RGBlightRemovalQ.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        if (!this._sDataTool.loadInAt(x, y, z))
            continue;
        const sl = this._sDataTool.getLight();
        if (sl <= 0)
            continue;
        if (this._nDataTool.loadInAt(x - 1, y, z)) {
            const nl = this._nDataTool.getLight();
            const n1HasRGB = this.lightData.hasRGBLight(nl);
            if (n1HasRGB && this.lightData.isLessThanForRGBRemove(nl, sl)) {
                this._RGBlightRemovalQ.push([x - 1, y, z]);
            }
            else {
                if (n1HasRGB && this.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    this._RGBlightUpdateQ.push([x - 1, y, z]);
                }
            }
        }
        if (this._nDataTool.loadInAt(x + 1, y, z)) {
            const nl = this._nDataTool.getLight();
            const n1HasRGB = this.lightData.hasRGBLight(nl);
            if (n1HasRGB && this.lightData.isLessThanForRGBRemove(nl, sl)) {
                this._RGBlightRemovalQ.push([x + 1, y, z]);
            }
            else {
                if (n1HasRGB && this.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    this._RGBlightUpdateQ.push([x + 1, y, z]);
                }
            }
        }
        if (this._nDataTool.loadInAt(x, y, z - 1)) {
            const nl = this._nDataTool.getLight();
            const n1HasRGB = this.lightData.hasRGBLight(nl);
            if (n1HasRGB && this.lightData.isLessThanForRGBRemove(nl, sl)) {
                this._RGBlightRemovalQ.push([x, y, z - 1]);
            }
            else {
                if (n1HasRGB && this.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    this._RGBlightUpdateQ.push([x, y, z - 1]);
                }
            }
        }
        if (this._nDataTool.loadInAt(x, y, z + 1)) {
            const nl = this._nDataTool.getLight();
            const n1HasRGB = this.lightData.hasRGBLight(nl);
            if (n1HasRGB && this.lightData.isLessThanForRGBRemove(nl, sl)) {
                this._RGBlightRemovalQ.push([x, y, z + 1]);
            }
            else {
                if (n1HasRGB && this.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    this._RGBlightUpdateQ.push([x, y, z + 1]);
                }
            }
        }
        if (this._nDataTool.loadInAt(x, y - 1, z)) {
            const nl = this._nDataTool.getLight();
            const n1HasRGB = this.lightData.hasRGBLight(nl);
            if (n1HasRGB && this.lightData.isLessThanForRGBRemove(nl, sl)) {
                this._RGBlightRemovalQ.push([x, y - 1, z]);
            }
            else {
                if (n1HasRGB && this.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    this._RGBlightUpdateQ.push([x, y - 1, z]);
                }
            }
        }
        if (this._nDataTool.loadInAt(x, y + 1, z)) {
            const nl = this._nDataTool.getLight();
            const n1HasRGB = this.lightData.hasRGBLight(nl);
            if (n1HasRGB && this.lightData.isLessThanForRGBRemove(nl, sl)) {
                this._RGBlightRemovalQ.push([x, y + 1, z]);
            }
            else {
                if (n1HasRGB && this.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    this._RGBlightUpdateQ.push([x, y + 1, z]);
                }
            }
        }
        this.addToRebuildQue(x, y, z);
        this._sDataTool.setLight(this.lightData.removeRGBLight(sl)).commit();
    }
    if (lightSource) {
        this._sDataTool.loadInAt(lightSource.x, lightSource.y, lightSource.z);
        this._sDataTool.setBarrier().commit();
        this.runRGBUpdate();
        this._sDataTool.loadInAt(lightSource.x, lightSource.y, lightSource.z);
        this._sDataTool.setAir().commit();
    }
    else {
        this.runRGBUpdate();
    }
}
