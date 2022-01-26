export function RGBFloodFillCheckNeighbors(x, y, z) {
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
export function RGBFloodFillUpdateAirLightVoxel(airBlock, x, y, z) {
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
export function RGBFloodFillSetAirLightVoxels(x, y, z) {
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
export function RGBFloodFill(voxelData, lightEncodedData, chunkX, chunkY, chunkZ, startX, startY, startZ, radius) {
    let trueStartX = startX + chunkX;
    let trueStartY = startY + chunkY;
    let trueStartZ = startZ + chunkZ;
    voxelData[voxelData.length - 1] = lightEncodedData;
    this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ, voxelData);
    this.air[this.air.length - 1] = 0b1111_1110_1110_1110;
    if (this.DVEW.worldData.getData(trueStartX - 1, trueStartY, trueStartZ)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX - 1, trueStartY, trueStartZ, this.air);
        this.RGBFloodFillCheckNeighbors(trueStartX - 1, trueStartY, trueStartZ);
    }
    if (this.DVEW.worldData.getData(trueStartX + 1, trueStartY, trueStartZ)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX + 1, trueStartY, trueStartZ, this.air);
        this.RGBFloodFillCheckNeighbors(trueStartX + 1, trueStartY, trueStartZ);
    }
    if (this.DVEW.worldData.getData(trueStartX, trueStartY - 1, trueStartZ)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX, trueStartY - 1, trueStartZ, this.air);
        this.RGBFloodFillCheckNeighbors(trueStartX, trueStartY - 1, trueStartZ);
    }
    if (this.DVEW.worldData.getData(trueStartX, trueStartY + 1, trueStartZ)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX, trueStartY + 1, trueStartZ, this.air);
        this.RGBFloodFillCheckNeighbors(trueStartX, trueStartY + 1, trueStartZ);
    }
    if (this.DVEW.worldData.getData(trueStartX, trueStartY, trueStartZ - 1)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ - 1, this.air);
        this.RGBFloodFillCheckNeighbors(trueStartX, trueStartY, trueStartZ - 1);
    }
    if (this.DVEW.worldData.getData(trueStartX, trueStartY, trueStartZ + 1)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ + 1, this.air);
        this.RGBFloodFillCheckNeighbors(trueStartX, trueStartY, trueStartZ + 1);
    }
    let vox;
    for (let i = 0; i < radius; i++) {
        for (let j = 0; j < radius; j++) {
            //top
            let y = trueStartY + i;
            let z = trueStartZ;
            let x = trueStartX + j;
            //q0top
            for (let k = 0; k < radius; k++) {
                let q0z = z + k;
                if ((vox = this.DVEW.worldData.getData(x, y, q0z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        this.RGBFloodFillUpdateAirLightVoxel(vox, x, y, q0z);
                        this.RGBFloodFillCheckNeighbors(x, y, q0z);
                    }
                }
                else {
                    this.RGBFloodFillSetAirLightVoxel(x, y, q0z);
                    this.RGBFloodFillCheckNeighbors(x, y, q0z);
                }
            }
            //q2top
            for (let k = 0; k < radius; k++) {
                let q2z = z - k;
                if ((vox = this.DVEW.worldData.getData(x, y, q2z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        this.RGBFloodFillUpdateAirLightVoxel(vox, x, y, q2z);
                        this.RGBFloodFillCheckNeighbors(x, y, q2z);
                    }
                }
                else {
                    this.RGBFloodFillSetAirLightVoxel(x, y, q2z);
                    this.RGBFloodFillCheckNeighbors(x, y, q2z);
                }
            }
            x = trueStartX - j;
            //q1top
            for (let k = 0; k < radius; k++) {
                let q1z = z + k;
                if ((vox = this.DVEW.worldData.getData(x, y, q1z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        this.RGBFloodFillUpdateAirLightVoxel(vox, x, y, q1z);
                        this.RGBFloodFillCheckNeighbors(x, y, q1z);
                    }
                }
                else {
                    this.RGBFloodFillSetAirLightVoxel(x, y, q1z);
                    this.RGBFloodFillCheckNeighbors(x, y, q1z);
                }
            }
            //q3top
            for (let k = 0; k < radius; k++) {
                let q3z = z - k;
                if ((vox = this.DVEW.worldData.getData(x, y, q3z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        this.RGBFloodFillUpdateAirLightVoxel(vox, x, y, q3z);
                        this.RGBFloodFillCheckNeighbors(x, y, q3z);
                    }
                }
                else {
                    this.RGBFloodFillSetAirLightVoxel(x, y, q3z);
                    this.RGBFloodFillCheckNeighbors(x, y, q3z);
                }
            }
            //bottom
            y = trueStartY - i;
            z = trueStartZ;
            x = trueStartX + j;
            //q0
            for (let k = 0; k < radius; k++) {
                let q0z = z + k;
                if ((vox = this.DVEW.worldData.getData(x, y, q0z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        this.RGBFloodFillUpdateAirLightVoxel(vox, x, y, q0z);
                        this.RGBFloodFillCheckNeighbors(x, y, q0z);
                    }
                }
                else {
                    this.RGBFloodFillSetAirLightVoxel(x, y, q0z);
                    this.RGBFloodFillCheckNeighbors(x, y, q0z);
                }
            }
            //q2
            for (let k = 0; k < radius; k++) {
                let q2z = z - k;
                if ((vox = this.DVEW.worldData.getData(x, y, q2z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        this.RGBFloodFillUpdateAirLightVoxel(vox, x, y, q2z);
                        this.RGBFloodFillCheckNeighbors(x, y, q2z);
                    }
                }
                else {
                    this.RGBFloodFillSetAirLightVoxel(x, y, q2z);
                    this.RGBFloodFillCheckNeighbors(x, y, q2z);
                }
            }
            x = trueStartX - j;
            //q1
            for (let k = 0; k < radius; k++) {
                let q1z = z + k;
                if ((vox = this.DVEW.worldData.getData(x, y, q1z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        this.RGBFloodFillUpdateAirLightVoxel(vox, x, y, q1z);
                        this.RGBFloodFillCheckNeighbors(x, y, q1z);
                    }
                }
                else {
                    this.RGBFloodFillSetAirLightVoxel(x, y, q1z);
                    this.RGBFloodFillCheckNeighbors(x, y, q1z);
                }
            }
            //q3
            for (let k = 0; k < radius; k++) {
                let q3z = z - k;
                if ((vox = this.DVEW.worldData.getData(x, y, q3z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        this.RGBFloodFillUpdateAirLightVoxel(vox, x, y, q3z);
                        this.RGBFloodFillCheckNeighbors(x, y, q3z);
                    }
                }
                else {
                    this.RGBFloodFillSetAirLightVoxel(x, y, q3z);
                    this.RGBFloodFillCheckNeighbors(x, y, q3z);
                }
            }
        }
    }
}
