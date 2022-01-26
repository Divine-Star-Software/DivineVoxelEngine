export function RGBFloodRemoveCheckNeighors(x, y, z) {
    let vox;
    if ((vox = this.DVEW.worldData.getData(x - 1, y, z))) {
        if (vox[0] < 0) {
            this.RGBFloodFillUpdateAirLightVoxel(vox, x - 1, y, z);
        }
    }
    else {
        this.RGBFloodFillSetAirLightVoxel(x - 1, y, z);
    }
    if ((vox = this.DVEW.worldData.getData(x + 1, y, z))) {
        if (vox[0] < 0) {
            this.RGBFloodFillUpdateAirLightVoxel(vox, x + 1, y, z);
        }
    }
    else {
        this.RGBFloodFillSetAirLightVoxel(x + 1, y, z);
    }
    if ((vox = this.DVEW.worldData.getData(x, y - 1, z))) {
        if (vox[0] < 0) {
            this.RGBFloodFillUpdateAirLightVoxel(vox, x, y - 1, z);
        }
    }
    else {
        this.RGBFloodFillSetAirLightVoxel(x, y - 1, z);
    }
    if ((vox = this.DVEW.worldData.getData(x, y + 1, z))) {
        if (vox[0] < 0) {
            this.RGBFloodFillUpdateAirLightVoxel(vox, x, y + 1, z);
        }
    }
    else {
        this.RGBFloodFillSetAirLightVoxel(x, y + 1, z);
    }
    if ((vox = this.DVEW.worldData.getData(x, y, z - 1))) {
        if (vox[0] < 0) {
            this.RGBFloodFillUpdateAirLightVoxel(vox, x, y, z - 1);
        }
    }
    else {
        this.RGBFloodFillSetAirLightVoxel(x, y, z - 1);
    }
    if ((vox = this.DVEW.worldData.getData(x, y, z + 1))) {
        if (vox[0] < 0) {
            this.RGBFloodFillUpdateAirLightVoxel(vox, x, y, z + 1);
        }
    }
    else {
        this.RGBFloodFillSetAirLightVoxel(x, y, z + 1);
    }
}
export function RGBFloodRemoveUpdateAirLightVoxel(airBlock, x, y, z) {
    const l1 = airBlock[airBlock.length - 1];
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
    this.air[this.air.length - 1] = this.lightByte.calculateRGBUpdateLight(l1, n1, n2, n3, n4, n5, n6);
    this.DVEW.worldData.setData(x, y, z, this.air);
}
export function RGBFloodRemoveSetAirLightVoxel(x, y, z) {
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
    this.air[this.air.length - 1] = this.lightByte.calculateRGBSetLight(n1, n2, n3, n4, n5, n6);
    this.DVEW.worldData.setData(x, y, z, this.air);
}
export function RGBFloodRemove(chunkX, chunkY, chunkZ, startX, startY, startZ) {
    let trueStartX = startX + chunkX;
    let trueStartY = startY + chunkY;
    let trueStartZ = startZ + chunkZ;
    this.lightRemovalQue.push([trueStartX, trueStartY, trueStartZ]);
    // this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ,[-1,0]);
    while (this.lightRemovalQue.length != 0) {
        const node = this.lightRemovalQue.shift();
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
        if (n1 != 0 && this.lightByte.isLessThanForRemove(n1, sl)) {
            this.lightRemovalQue.push([x - 1, y, z]);
        }
        else {
            if (n1 != 0) {
                if (this.lightByte.isGreaterOrEqualThan(n1, sl)) {
                    this.lightUpdateQue.push([x - 1, y, z]);
                }
            }
        }
        if (n2 != 0 && this.lightByte.isLessThanForRemove(n2, sl)) {
            this.lightRemovalQue.push([x + 1, y, z]);
        }
        else {
            if (n2 != 0) {
                if (this.lightByte.isGreaterOrEqualThan(n1, sl)) {
                    this.lightUpdateQue.push([x + 1, y, z]);
                }
            }
        }
        if (n3 != 0 && this.lightByte.isLessThanForRemove(n3, sl)) {
            this.lightRemovalQue.push([x, y, z - 1]);
        }
        else {
            if (n3 != 0) {
                if (this.lightByte.isGreaterOrEqualThan(n1, sl)) {
                    this.lightUpdateQue.push([x, y, z - 1]);
                }
            }
        }
        if (n4 != 0 && this.lightByte.isLessThanForRemove(n4, sl)) {
            this.lightRemovalQue.push([x, y, z + 1]);
        }
        else {
            if (n4 != 0) {
                if (this.lightByte.isGreaterOrEqualThan(n1, sl)) {
                    this.lightUpdateQue.push([x, y, z + 1]);
                }
            }
        }
        if (n5 != 0 && this.lightByte.isLessThanForRemove(n5, sl)) {
            this.lightRemovalQue.push([x, y - 1, z]);
        }
        else {
            if (n5 != 0) {
                if (this.lightByte.isGreaterOrEqualThan(n1, sl)) {
                    this.lightUpdateQue.push([x, y - 1, z]);
                }
            }
        }
        if (n6 != 0 && this.lightByte.isLessThanForRemove(n6, sl)) {
            this.lightRemovalQue.push([x, y + 1, z]);
        }
        else {
            if (n6 != 0) {
                if (this.lightByte.isGreaterOrEqualThan(n1, sl)) {
                    this.lightUpdateQue.push([x, y + 1, z]);
                }
            }
        }
        // console.log('sup');
        this.DVEW.worldData.removeData(x, y, z);
    }
    this.runRGBLightUpdate();
    this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ, [-1, 0]);
}
