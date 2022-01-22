/**
 * Note to self for light removel.
 * When going through the voxels to updated set the voxel
 * light level to be the brigthest neighbor minus 1.
 *
 *
 *
 * New idea for light system.
 * Each air data is set to be its brightest cardinal + top/bottom neighbor minus -1
 * If the loop encounters a block the loop stops for that specfic z axis and goes to the next.
 * On each loop when the air block is updated it also updates any air blocks below it.
 */
const copy = (data) => {
    return [...data];
};
const air = [-1, -1];
const checkNeighbors = (x, y, z, lightByte, worldData) => {
    let vox;
    if ((vox = worldData.getData(x - 1, y, z))) {
        if (vox[0] < 0) {
            updateAirLightBlock(vox, x - 1, y, z, lightByte, worldData);
        }
    }
    else {
        setAirLightBlock(x - 1, y, z, lightByte, worldData);
    }
    if ((vox = worldData.getData(x + 1, y, z))) {
        if (vox[0] < 0) {
            updateAirLightBlock(vox, x + 1, y, z, lightByte, worldData);
        }
    }
    else {
        setAirLightBlock(x + 1, y, z, lightByte, worldData);
    }
    if ((vox = worldData.getData(x, y - 1, z))) {
        if (vox[0] < 0) {
            updateAirLightBlock(vox, x, y - 1, z, lightByte, worldData);
        }
    }
    else {
        setAirLightBlock(x, y - 1, z, lightByte, worldData);
    }
    if ((vox = worldData.getData(x, y + 1, z))) {
        if (vox[0] < 0) {
            updateAirLightBlock(vox, x, y + 1, z, lightByte, worldData);
        }
    }
    else {
        setAirLightBlock(x, y + 1, z, lightByte, worldData);
    }
    if ((vox = worldData.getData(x, y, z - 1))) {
        if (vox[0] < 0) {
            updateAirLightBlock(vox, x, y, z - 1, lightByte, worldData);
        }
    }
    else {
        setAirLightBlock(x, y, z - 1, lightByte, worldData);
    }
    if ((vox = worldData.getData(x, y, z + 1))) {
        if (vox[0] < 0) {
            updateAirLightBlock(vox, x, y, z + 1, lightByte, worldData);
        }
    }
    else {
        setAirLightBlock(x, y, z + 1, lightByte, worldData);
    }
};
const updateAirLightBlock = (airBlock, x, y, z, lightByte, worldData) => {
    const airLightInfo = lightByte.getLightValues(airBlock[airBlock.length - 1]);
    let w = airLightInfo[0];
    let cr = airLightInfo[1] + 1;
    let cg = airLightInfo[2] + 1;
    let cb = airLightInfo[3] + 1;
    const checkX1 = worldData.getData(x - 1, y, z);
    if (checkX1) {
        if (checkX1[0] < 0) {
            const lightColorInfo = lightByte.getLightValues(checkX1[checkX1.length - 1]);
            if (cr < lightColorInfo[1]) {
                cr = lightColorInfo[1];
            }
            if (cg < lightColorInfo[2]) {
                cg = lightColorInfo[2];
            }
            if (cb < lightColorInfo[3]) {
                cb = lightColorInfo[3];
            }
        }
    }
    const checkX2 = worldData.getData(x + 1, y, z);
    if (checkX2) {
        if (checkX2[0] < 0) {
            const lightColorInfo = lightByte.getLightValues(checkX2[checkX2.length - 1]);
            if (cr < lightColorInfo[1]) {
                cr = lightColorInfo[1];
            }
            if (cg < lightColorInfo[2]) {
                cg = lightColorInfo[2];
            }
            if (cb < lightColorInfo[3]) {
                cb = lightColorInfo[3];
            }
        }
    }
    const checkZ1 = worldData.getData(x, y, z - 1);
    if (checkZ1) {
        if (checkZ1[0] < 0) {
            const lightColorInfo = lightByte.getLightValues(checkZ1[checkZ1.length - 1]);
            if (cr < lightColorInfo[1]) {
                cr = lightColorInfo[1];
            }
            if (cg < lightColorInfo[2]) {
                cg = lightColorInfo[2];
            }
            if (cb < lightColorInfo[3]) {
                cb = lightColorInfo[3];
            }
        }
    }
    const checkZ2 = worldData.getData(x, y, z + 1);
    if (checkZ2) {
        if (checkZ2[0] < 0) {
            const lightColorInfo = lightByte.getLightValues(checkZ2[checkZ2.length - 1]);
            if (cr < lightColorInfo[1]) {
                cr = lightColorInfo[1];
            }
            if (cg < lightColorInfo[2]) {
                cg = lightColorInfo[2];
            }
            if (cb < lightColorInfo[3]) {
                cb = lightColorInfo[3];
            }
        }
    }
    const checkY1 = worldData.getData(x, y - 1, z);
    if (checkY1) {
        if (checkY1[0] < 0) {
            const lightColorInfo = lightByte.getLightValues(checkY1[checkY1.length - 1]);
            if (cr < lightColorInfo[1]) {
                cr = lightColorInfo[1];
            }
            if (cg < lightColorInfo[2]) {
                cg = lightColorInfo[2];
            }
            if (cb < lightColorInfo[3]) {
                cb = lightColorInfo[3];
            }
        }
    }
    const checkY2 = worldData.getData(x, y + 1, z);
    if (checkY2) {
        if (checkY2[0] < 0) {
            const lightColorInfo = lightByte.getLightValues(checkY2[checkY2.length - 1]);
            if (cr < lightColorInfo[1]) {
                cr = lightColorInfo[1];
            }
            if (cg < lightColorInfo[2]) {
                cg = lightColorInfo[2];
            }
            if (cb < lightColorInfo[3]) {
                cb = lightColorInfo[3];
            }
        }
    }
    if (cr <= 0) {
        cr = 0;
    }
    else {
        cr--;
    }
    if (cg <= 0) {
        cg = 0;
    }
    else {
        cg--;
    }
    if (cb <= 0) {
        cb = 0;
    }
    else {
        cb--;
    }
    air[air.length - 1] = lightByte.setLightValues([w, cr, cg, cb]);
    worldData.setData(x, y, z, air);
};
const setAirLightBlock = (x, y, z, lightByte, worldData) => {
    air[air.length - 1] = 0;
    let w = 0;
    let cr = 0;
    let cg = 0;
    let cb = 0;
    let set = false;
    const checkX1 = worldData.getData(x - 1, y, z);
    if (checkX1) {
        if (checkX1[0] < 0) {
            const lightColorInfo = lightByte.getLightValues(checkX1[checkX1.length - 1]);
            if (set) {
                if (cr < lightColorInfo[1]) {
                    cr = lightColorInfo[1];
                }
                if (cg < lightColorInfo[2]) {
                    cg = lightColorInfo[2];
                }
                if (cb < lightColorInfo[3]) {
                    cb = lightColorInfo[3];
                }
            }
            else {
                w = lightColorInfo[0];
                cr = lightColorInfo[1];
                cg = lightColorInfo[2];
                cb = lightColorInfo[3];
            }
        }
    }
    const checkX2 = worldData.getData(x + 1, y, z);
    if (checkX2) {
        if (checkX2[0] < 0) {
            const lightColorInfo = lightByte.getLightValues(checkX2[checkX2.length - 1]);
            if (set) {
                if (cr < lightColorInfo[1]) {
                    cr = lightColorInfo[1];
                }
                if (cg < lightColorInfo[2]) {
                    cg = lightColorInfo[2];
                }
                if (cb < lightColorInfo[3]) {
                    cb = lightColorInfo[3];
                }
            }
            else {
                set = true;
                w = lightColorInfo[0];
                cr = lightColorInfo[1];
                cg = lightColorInfo[2];
                cb = lightColorInfo[3];
            }
        }
    }
    const checkZ1 = worldData.getData(x, y, z - 1);
    if (checkZ1) {
        if (checkZ1[0] < 0) {
            const lightColorInfo = lightByte.getLightValues(checkZ1[checkZ1.length - 1]);
            if (set) {
                if (cr < lightColorInfo[1]) {
                    cr = lightColorInfo[1];
                }
                if (cg < lightColorInfo[2]) {
                    cg = lightColorInfo[2];
                }
                if (cb < lightColorInfo[3]) {
                    cb = lightColorInfo[3];
                }
            }
            else {
                set = true;
                w = lightColorInfo[0];
                cr = lightColorInfo[1];
                cg = lightColorInfo[2];
                cb = lightColorInfo[3];
            }
        }
    }
    const checkZ2 = worldData.getData(x, y, z + 1);
    if (checkZ2) {
        if (checkZ2[0] < 0) {
            const lightColorInfo = lightByte.getLightValues(checkZ2[checkZ2.length - 1]);
            if (set) {
                if (cr < lightColorInfo[1]) {
                    cr = lightColorInfo[1];
                }
                if (cg < lightColorInfo[2]) {
                    cg = lightColorInfo[2];
                }
                if (cb < lightColorInfo[3]) {
                    cb = lightColorInfo[3];
                }
            }
            else {
                set = true;
                w = lightColorInfo[0];
                cr = lightColorInfo[1];
                cg = lightColorInfo[2];
                cb = lightColorInfo[3];
            }
        }
    }
    const checkY1 = worldData.getData(x, y - 1, z);
    if (checkY1) {
        if (checkY1[0] < 0) {
            const lightColorInfo = lightByte.getLightValues(checkY1[checkY1.length - 1]);
            if (set) {
                if (cr < lightColorInfo[1]) {
                    cr = lightColorInfo[1];
                }
                if (cg < lightColorInfo[2]) {
                    cg = lightColorInfo[2];
                }
                if (cb < lightColorInfo[3]) {
                    cb = lightColorInfo[3];
                }
            }
            else {
                set = true;
                w = lightColorInfo[0];
                cr = lightColorInfo[1];
                cg = lightColorInfo[2];
                cb = lightColorInfo[3];
            }
        }
    }
    const checkY2 = worldData.getData(x, y + 1, z);
    if (checkY2) {
        if (checkY2[0] < 0) {
            const lightColorInfo = lightByte.getLightValues(checkY2[checkY2.length - 1]);
            if (set) {
                if (cr < lightColorInfo[1]) {
                    cr = lightColorInfo[1];
                }
                if (cg < lightColorInfo[2]) {
                    cg = lightColorInfo[2];
                }
                if (cb < lightColorInfo[3]) {
                    cb = lightColorInfo[3];
                }
            }
            else {
                set = true;
                w = lightColorInfo[0];
                cr = lightColorInfo[1];
                cg = lightColorInfo[2];
                cb = lightColorInfo[3];
            }
        }
    }
    if (cr <= 0) {
        cr = 0;
    }
    else {
        cr--;
    }
    if (cg <= 0) {
        cg = 0;
    }
    else {
        cg--;
    }
    if (cb <= 0) {
        cb = 0;
    }
    else {
        cb--;
    }
    air[air.length - 1] = lightByte.setLightValues([w, cr, cg, cb]);
    worldData.setData(x, y, z, air);
};
const voxelData = [1, 0, 0];
const airSeed = [-1, 0, 0];
export function LightTestA(chunkX, chunkY, chunkZ, startX, startZ, startY, radius) {
    this.visited = {};
    let trueStartX = startX + chunkX;
    let trueStartY = startY + chunkY;
    let trueStartZ = startZ + chunkZ;
    voxelData[voxelData.length - 1] = this.lightSourceColor;
    this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ, voxelData);
    airSeed[voxelData.length - 1] = this.seedLightSourceColor;
    if (this.DVEW.worldData.getData(trueStartX - 1, trueStartY, trueStartZ)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX - 1, trueStartY, trueStartZ, airSeed);
        checkNeighbors(trueStartX - 1, trueStartY, trueStartZ, this.lightByte, this.DVEW.worldData);
    }
    if (this.DVEW.worldData.getData(trueStartX + 1, trueStartY, trueStartZ)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX + 1, trueStartY, trueStartZ, airSeed);
        checkNeighbors(trueStartX + 1, trueStartY, trueStartZ, this.lightByte, this.DVEW.worldData);
    }
    if (this.DVEW.worldData.getData(trueStartX, trueStartY - 1, trueStartZ)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX, trueStartY - 1, trueStartZ, airSeed);
        checkNeighbors(trueStartX, trueStartY - 1, trueStartZ, this.lightByte, this.DVEW.worldData);
    }
    if (this.DVEW.worldData.getData(trueStartX, trueStartY + 1, trueStartZ)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX, trueStartY + 1, trueStartZ, airSeed);
        checkNeighbors(trueStartX, trueStartY + 1, trueStartZ, this.lightByte, this.DVEW.worldData);
    }
    if (this.DVEW.worldData.getData(trueStartX, trueStartY, trueStartZ - 1)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ - 1, airSeed);
        checkNeighbors(trueStartX, trueStartY, trueStartZ - 1, this.lightByte, this.DVEW.worldData);
    }
    if (this.DVEW.worldData.getData(trueStartX, trueStartY, trueStartZ + 1)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ + 1, airSeed);
        checkNeighbors(trueStartX, trueStartY, trueStartZ + 1, this.lightByte, this.DVEW.worldData);
    }
    let vox;
    for (let i = 0; i < radius; i++) {
        for (let j = 0; j < radius; j++) {
            //top
            let y = trueStartY + i;
            let z = trueStartZ;
            let x = trueStartX + j;
            //q0top
            let k = 0;
            for (k = 0; k < radius; k++) {
                let q0z = z + k;
                if ((vox = this.DVEW.worldData.getData(x, y, q0z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        if (!this.visited[`${x}-${y}-${q0z}`]) {
                            updateAirLightBlock(vox, x, y, q0z, this.lightByte, this.DVEW.worldData);
                            checkNeighbors(x, y, q0z, this.lightByte, this.DVEW.worldData);
                            this.visited[`${x}-${y}-${q0z}`] = true;
                        }
                    }
                }
                else {
                    setAirLightBlock(x, y, q0z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q0z, this.lightByte, this.DVEW.worldData);
                }
            }
            //q2top
            for (k = 0; k < radius; k++) {
                let q2z = z - k;
                if ((vox = this.DVEW.worldData.getData(x, y, q2z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        if (!this.visited[`${x}-${y}-${q2z}`]) {
                            updateAirLightBlock(vox, x, y, q2z, this.lightByte, this.DVEW.worldData);
                            checkNeighbors(x, y, q2z, this.lightByte, this.DVEW.worldData);
                            this.visited[`${x}-${y}-${q2z}`] = true;
                        }
                    }
                }
                else {
                    setAirLightBlock(x, y, q2z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q2z, this.lightByte, this.DVEW.worldData);
                }
            }
            x = trueStartX - j;
            //q1top
            for (k = 0; k < radius; k++) {
                let q1z = z + k;
                if ((vox = this.DVEW.worldData.getData(x, y, q1z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        if (!this.visited[`${x}-${y}-${q1z}`]) {
                            updateAirLightBlock(vox, x, y, q1z, this.lightByte, this.DVEW.worldData);
                            checkNeighbors(x, y, q1z, this.lightByte, this.DVEW.worldData);
                            this.visited[`${x}-${y}-${q1z}`] = true;
                        }
                    }
                }
                else {
                    setAirLightBlock(x, y, q1z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q1z, this.lightByte, this.DVEW.worldData);
                }
            }
            //q3top
            for (k = 0; k < radius; k++) {
                let q3z = z - k;
                if ((vox = this.DVEW.worldData.getData(x, y, q3z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        if (!this.visited[`${x}-${y}-${q3z}`]) {
                            updateAirLightBlock(vox, x, y, q3z, this.lightByte, this.DVEW.worldData);
                            checkNeighbors(x, y, q3z, this.lightByte, this.DVEW.worldData);
                            this.visited[`${x}-${y}-${q3z}`] = true;
                        }
                    }
                }
                else {
                    setAirLightBlock(x, y, q3z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q3z, this.lightByte, this.DVEW.worldData);
                }
            }
            //bottom
            y = trueStartY - i;
            z = trueStartZ;
            x = trueStartX + j;
            //q0
            for (k = 0; k < radius; k++) {
                let q0z = z + k;
                if ((vox = this.DVEW.worldData.getData(x, y, q0z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        if (!this.visited[`${x}-${y}-${q0z}`]) {
                            updateAirLightBlock(vox, x, y, q0z, this.lightByte, this.DVEW.worldData);
                            checkNeighbors(x, y, q0z, this.lightByte, this.DVEW.worldData);
                            this.visited[`${x}-${y}-${q0z}`] = true;
                        }
                    }
                }
                else {
                    setAirLightBlock(x, y, q0z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q0z, this.lightByte, this.DVEW.worldData);
                }
            }
            //q2
            for (k = 0; k < radius; k++) {
                let q2z = z - k;
                if ((vox = this.DVEW.worldData.getData(x, y, q2z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        if (!this.visited[`${x}-${y}-${q2z}`]) {
                            updateAirLightBlock(vox, x, y, q2z, this.lightByte, this.DVEW.worldData);
                            checkNeighbors(x, y, q2z, this.lightByte, this.DVEW.worldData);
                            this.visited[`${x}-${y}-${q2z}`] = true;
                        }
                    }
                }
                else {
                    setAirLightBlock(x, y, q2z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q2z, this.lightByte, this.DVEW.worldData);
                }
            }
            x = trueStartX - j;
            //q1
            for (k = 0; k < radius; k++) {
                let q1z = z + k;
                if ((vox = this.DVEW.worldData.getData(x, y, q1z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        if (!this.visited[`${x}-${y}-${q1z}`]) {
                            updateAirLightBlock(vox, x, y, q1z, this.lightByte, this.DVEW.worldData);
                            checkNeighbors(x, y, q1z, this.lightByte, this.DVEW.worldData);
                            this.visited[`${x}-${y}-${q1z}`] = true;
                        }
                    }
                }
                else {
                    setAirLightBlock(x, y, q1z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q1z, this.lightByte, this.DVEW.worldData);
                }
            }
            //q3
            for (k = 0; k < radius; k++) {
                let q3z = z - k;
                if ((vox = this.DVEW.worldData.getData(x, y, q3z))) {
                    if (vox[0] > 0) {
                        break;
                    }
                    else {
                        if (!this.visited[`${x}-${y}-${q3z}`]) {
                            updateAirLightBlock(vox, x, y, q3z, this.lightByte, this.DVEW.worldData);
                            checkNeighbors(x, y, q3z, this.lightByte, this.DVEW.worldData);
                            this.visited[`${x}-${y}-${q3z}`] = true;
                        }
                    }
                }
                else {
                    setAirLightBlock(x, y, q3z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q3z, this.lightByte, this.DVEW.worldData);
                }
            }
        }
    }
}
export function LightTest(chunkX, chunkY, chunkZ, startX, startZ, startY, radius) {
    let trueStartX = startX + chunkX;
    let trueStartY = startY + chunkY;
    let trueStartZ = startZ + chunkZ;
    voxelData[voxelData.length - 1] = this.lightSourceColor;
    this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ, voxelData);
    airSeed[voxelData.length - 1] = this.seedLightSourceColor;
    if (this.DVEW.worldData.getData(trueStartX - 1, trueStartY, trueStartZ)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX - 1, trueStartY, trueStartZ, airSeed);
        checkNeighbors(trueStartX - 1, trueStartY, trueStartZ, this.lightByte, this.DVEW.worldData);
    }
    if (this.DVEW.worldData.getData(trueStartX + 1, trueStartY, trueStartZ)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX + 1, trueStartY, trueStartZ, airSeed);
        checkNeighbors(trueStartX + 1, trueStartY, trueStartZ, this.lightByte, this.DVEW.worldData);
    }
    if (this.DVEW.worldData.getData(trueStartX, trueStartY - 1, trueStartZ)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX, trueStartY - 1, trueStartZ, airSeed);
        checkNeighbors(trueStartX, trueStartY - 1, trueStartZ, this.lightByte, this.DVEW.worldData);
    }
    if (this.DVEW.worldData.getData(trueStartX, trueStartY + 1, trueStartZ)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX, trueStartY + 1, trueStartZ, airSeed);
        checkNeighbors(trueStartX, trueStartY + 1, trueStartZ, this.lightByte, this.DVEW.worldData);
    }
    if (this.DVEW.worldData.getData(trueStartX, trueStartY, trueStartZ - 1)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ - 1, airSeed);
        checkNeighbors(trueStartX, trueStartY, trueStartZ - 1, this.lightByte, this.DVEW.worldData);
    }
    if (this.DVEW.worldData.getData(trueStartX, trueStartY, trueStartZ + 1)) {
    }
    else {
        this.DVEW.worldData.setData(trueStartX, trueStartY, trueStartZ + 1, airSeed);
        checkNeighbors(trueStartX, trueStartY, trueStartZ + 1, this.lightByte, this.DVEW.worldData);
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
                        // if(!this.visited[`${x}-${y}-${q0z}`])
                        updateAirLightBlock(vox, x, y, q0z, this.lightByte, this.DVEW.worldData);
                        checkNeighbors(x, y, q0z, this.lightByte, this.DVEW.worldData);
                    }
                }
                else {
                    setAirLightBlock(x, y, q0z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q0z, this.lightByte, this.DVEW.worldData);
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
                        updateAirLightBlock(vox, x, y, q2z, this.lightByte, this.DVEW.worldData);
                        checkNeighbors(x, y, q2z, this.lightByte, this.DVEW.worldData);
                    }
                }
                else {
                    setAirLightBlock(x, y, q2z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q2z, this.lightByte, this.DVEW.worldData);
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
                        updateAirLightBlock(vox, x, y, q1z, this.lightByte, this.DVEW.worldData);
                        checkNeighbors(x, y, q1z, this.lightByte, this.DVEW.worldData);
                    }
                }
                else {
                    setAirLightBlock(x, y, q1z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q1z, this.lightByte, this.DVEW.worldData);
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
                        updateAirLightBlock(vox, x, y, q3z, this.lightByte, this.DVEW.worldData);
                        checkNeighbors(x, y, q3z, this.lightByte, this.DVEW.worldData);
                    }
                }
                else {
                    setAirLightBlock(x, y, q3z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q3z, this.lightByte, this.DVEW.worldData);
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
                        updateAirLightBlock(vox, x, y, q0z, this.lightByte, this.DVEW.worldData);
                        checkNeighbors(x, y, q0z, this.lightByte, this.DVEW.worldData);
                    }
                }
                else {
                    setAirLightBlock(x, y, q0z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q0z, this.lightByte, this.DVEW.worldData);
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
                        updateAirLightBlock(vox, x, y, q2z, this.lightByte, this.DVEW.worldData);
                        checkNeighbors(x, y, q2z, this.lightByte, this.DVEW.worldData);
                    }
                }
                else {
                    setAirLightBlock(x, y, q2z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q2z, this.lightByte, this.DVEW.worldData);
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
                        updateAirLightBlock(vox, x, y, q1z, this.lightByte, this.DVEW.worldData);
                        checkNeighbors(x, y, q1z, this.lightByte, this.DVEW.worldData);
                    }
                }
                else {
                    setAirLightBlock(x, y, q1z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q1z, this.lightByte, this.DVEW.worldData);
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
                        updateAirLightBlock(vox, x, y, q3z, this.lightByte, this.DVEW.worldData);
                        checkNeighbors(x, y, q3z, this.lightByte, this.DVEW.worldData);
                    }
                }
                else {
                    setAirLightBlock(x, y, q3z, this.lightByte, this.DVEW.worldData);
                    checkNeighbors(x, y, q3z, this.lightByte, this.DVEW.worldData);
                }
            }
        }
    }
}
