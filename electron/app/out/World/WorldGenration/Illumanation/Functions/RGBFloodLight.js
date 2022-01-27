export function runRGBLightUpdate() {
    while (this._RGBlightUpdateQue.length != 0) {
        const node = this._RGBlightUpdateQue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const check = this.DVEW.worldData.getData(x, y, z);
        let sl = 0;
        if (check && check[0] <= 1) {
            sl = check[check.length - 1];
        }
        let n1 = 0;
        let n2 = 0;
        let n3 = 0;
        let n4 = 0;
        let n5 = 0;
        let n6 = 0;
        const checkX1 = this.DVEW.worldData.getData(x - 1, y, z);
        if (checkX1) {
            if (checkX1[0] <= 1) {
                n1 = checkX1[checkX1.length - 1];
            }
            else {
                n1 = -1;
            }
        }
        if (n1 > -1 && this.lightByte.isLessThanForRGBAdd(n1, sl)) {
            this._RGBlightUpdateQue.push([x - 1, y, z]);
            const nl = this.lightByte.getMinusOneForRGB(sl);
            if (checkX1) {
                checkX1[checkX1.length - 1] = nl;
            }
            else {
                this.DVEW.worldData.setData(x - 1, y, z, [-1, 0, nl]);
            }
        }
        const checkX2 = this.DVEW.worldData.getData(x + 1, y, z);
        if (checkX2) {
            if (checkX2[0] <= 1) {
                n2 = checkX2[checkX2.length - 1];
            }
            else {
                n2 = -1;
            }
        }
        if (n2 > -1 && this.lightByte.isLessThanForRGBAdd(n2, sl)) {
            this._RGBlightUpdateQue.push([x + 1, y, z]);
            const nl = this.lightByte.getMinusOneForRGB(sl);
            if (checkX2) {
                checkX2[checkX2.length - 1] = nl;
            }
            else {
                this.DVEW.worldData.setData(x + 1, y, z, [-1, 0, nl]);
            }
        }
        const checkZ1 = this.DVEW.worldData.getData(x, y, z - 1);
        if (checkZ1) {
            if (checkZ1[0] <= 1) {
                n3 = checkZ1[checkZ1.length - 1];
            }
            else {
                n3 = -1;
            }
        }
        if (n3 > -1 && this.lightByte.isLessThanForRGBAdd(n3, sl)) {
            this._RGBlightUpdateQue.push([x, y, z - 1]);
            const nl = this.lightByte.getMinusOneForRGB(sl);
            if (checkZ1) {
                checkZ1[checkZ1.length - 1] = nl;
            }
            else {
                this.DVEW.worldData.setData(x, y, z - 1, [-1, 0, nl]);
            }
        }
        const checkZ2 = this.DVEW.worldData.getData(x, y, z + 1);
        if (checkZ2) {
            if (checkZ2[0] <= 1) {
                n4 = checkZ2[checkZ2.length - 1];
            }
            else {
                n4 = -1;
            }
        }
        if (n4 > -1 && this.lightByte.isLessThanForRGBAdd(n4, sl)) {
            this._RGBlightUpdateQue.push([x, y, z + 1]);
            const nl = this.lightByte.getMinusOneForRGB(sl);
            if (checkZ2) {
                checkZ2[checkZ2.length - 1] = this.lightByte.getMinusOneForRGB(sl);
            }
            else {
                this.DVEW.worldData.setData(x, y, z + 1, [-1, 0, nl]);
            }
        }
        const checkY1 = this.DVEW.worldData.getData(x, y - 1, z);
        if (checkY1) {
            if (checkY1[0] <= 1) {
                n5 = checkY1[checkY1.length - 1];
            }
            else {
                n5 = -1;
            }
        }
        if (n5 > -1 && this.lightByte.isLessThanForRGBAdd(n5, sl)) {
            this._RGBlightUpdateQue.push([x, y - 1, z]);
            const nl = this.lightByte.getMinusOneForRGB(sl);
            if (checkY1) {
                checkY1[checkY1.length - 1] = nl;
            }
            else {
                this.DVEW.worldData.setData(x, y - 1, z, [-1, 0, nl]);
            }
        }
        const checkY2 = this.DVEW.worldData.getData(x, y + 1, z);
        if (checkY2) {
            if (checkY2[0] <= 1) {
                n6 = checkY2[checkY2.length - 1];
            }
            else {
                n6 = -1;
            }
        }
        if (n6 > -1 && this.lightByte.isLessThanForRGBAdd(n6, sl)) {
            this._RGBlightUpdateQue.push([x, y + 1, z]);
            const nl = this.lightByte.getMinusOneForRGB(sl);
            if (checkY2) {
                checkY2[checkY2.length - 1] = nl;
            }
            else {
                this.DVEW.worldData.setData(x, y + 1, z, [-1, 0, nl]);
            }
        }
    }
}
export function RGBFloodFill(voxelData, lightEncodedData, chunkX, chunkY, chunkZ, startX, startY, startZ) {
    let trueStartX = startX + chunkX;
    let trueStartY = startY + chunkY;
    let trueStartZ = startZ + chunkZ;
    voxelData[voxelData.length - 1] = lightEncodedData;
    this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ, voxelData);
    this._RGBlightUpdateQue.push([trueStartX, trueStartY, trueStartZ]);
    this.runRGBLightUpdate();
}
export function RGBFloodRemove(chunkX, chunkY, chunkZ, startX, startY, startZ) {
    let trueStartX = startX + chunkX;
    let trueStartY = startY + chunkY;
    let trueStartZ = startZ + chunkZ;
    this._RGBlightRemovalQue.push([trueStartX, trueStartY, trueStartZ]);
    // this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ,[-1,0]);
    while (this._RGBlightRemovalQue.length != 0) {
        const node = this._RGBlightRemovalQue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const check = this.DVEW.worldData.getData(x, y, z);
        let sl = 0;
        if (check) {
            sl = check[check.length - 1];
        }
        let n1 = 0;
        let n2 = 0;
        let n3 = 0;
        let n4 = 0;
        let n5 = 0;
        let n6 = 0;
        const checkX1 = this.DVEW.worldData.getData(x - 1, y, z);
        if (checkX1) {
            if (checkX1[0] < 0) {
                n1 = checkX1[checkX1.length - 1];
            }
        }
        const checkX2 = this.DVEW.worldData.getData(x + 1, y, z);
        if (checkX2) {
            if (checkX2[0] < 0) {
                n2 = checkX2[checkX2.length - 1];
            }
        }
        const checkZ1 = this.DVEW.worldData.getData(x, y, z - 1);
        if (checkZ1) {
            if (checkZ1[0] < 0) {
                n3 = checkZ1[checkZ1.length - 1];
            }
        }
        const checkZ2 = this.DVEW.worldData.getData(x, y, z + 1);
        if (checkZ2) {
            if (checkZ2[0] < 0) {
                n4 = checkZ2[checkZ2.length - 1];
            }
        }
        const checkY1 = this.DVEW.worldData.getData(x, y - 1, z);
        if (checkY1) {
            if (checkY1[0] < 0) {
                n5 = checkY1[checkY1.length - 1];
            }
        }
        const checkY2 = this.DVEW.worldData.getData(x, y + 1, z);
        if (checkY2) {
            if (checkY2[0] < 0) {
                n6 = checkY2[checkY2.length - 1];
            }
        }
        if (n1 != 0 && this.lightByte.isLessThanForRGBRemove(n1, sl)) {
            this._RGBlightRemovalQue.push([x - 1, y, z]);
        }
        else {
            if (n1 != 0) {
                if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n1, sl)) {
                    this._RGBlightUpdateQue.push([x - 1, y, z]);
                }
            }
        }
        if (n2 != 0 && this.lightByte.isLessThanForRGBRemove(n2, sl)) {
            this._RGBlightRemovalQue.push([x + 1, y, z]);
        }
        else {
            if (n2 != 0) {
                if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n1, sl)) {
                    this._RGBlightUpdateQue.push([x + 1, y, z]);
                }
            }
        }
        if (n3 != 0 && this.lightByte.isLessThanForRGBRemove(n3, sl)) {
            this._RGBlightRemovalQue.push([x, y, z - 1]);
        }
        else {
            if (n3 != 0) {
                if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n1, sl)) {
                    this._RGBlightUpdateQue.push([x, y, z - 1]);
                }
            }
        }
        if (n4 != 0 && this.lightByte.isLessThanForRGBRemove(n4, sl)) {
            this._RGBlightRemovalQue.push([x, y, z + 1]);
        }
        else {
            if (n4 != 0) {
                if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n1, sl)) {
                    this._RGBlightUpdateQue.push([x, y, z + 1]);
                }
            }
        }
        if (n5 != 0 && this.lightByte.isLessThanForRGBRemove(n5, sl)) {
            this._RGBlightRemovalQue.push([x, y - 1, z]);
        }
        else {
            if (n5 != 0) {
                if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n1, sl)) {
                    this._RGBlightUpdateQue.push([x, y - 1, z]);
                }
            }
        }
        if (n6 != 0 && this.lightByte.isLessThanForRGBRemove(n6, sl)) {
            this._RGBlightRemovalQue.push([x, y + 1, z]);
        }
        else {
            if (n6 != 0) {
                if (this.lightByte.isGreaterOrEqualThanForRGBRemove(n1, sl)) {
                    this._RGBlightUpdateQue.push([x, y + 1, z]);
                }
            }
        }
        // console.log('sup');
        this.DVEW.worldData.removeData(x, y, z);
    }
    this.runRGBLightUpdate();
    this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ, [-1, 0]);
}
