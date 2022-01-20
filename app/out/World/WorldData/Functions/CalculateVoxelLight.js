export function CalculateVoxelLight(voxel, voxelData, voxelPallet, lightTemplate, exposedFaces, chunkX, chunkY, chunkZ, x, y, z) {
    // +y
    if (exposedFaces[0]) {
        lightTemplate.push(this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, -1, -1, 0, 0, 0, 0, -1]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 1, -1, 0, 0, 0, 0, 1]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 1, 1, 0, 0, 0, 0, 1]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [1, 0, -1, 1, 0, 0, 0, 0, -1]));
    }
    // -y
    if (exposedFaces[1]) {
        lightTemplate.push(this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [0, -1, -1, -1, -1, 0, -1, -1, -1]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [0, -1, -1, 1, -1, 0, 1, -1, -1]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [0, -1, 1, 1, -1, 0, 1, -1, 1]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [0, -1, 1, -1, -1, 0, -1, -1, 1]));
    }
    // -x
    if (exposedFaces[2]) {
        lightTemplate.push(this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, -1, -1, 1, 0, -1, 1, -1]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 1, -1, 1, 0, -1, 1, 1]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 1, -1, -1, 0, -1, -1, 1]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, -1, -1, -1, 0, -1, -1, -1]));
    }
    // -x
    if (exposedFaces[3]) {
        lightTemplate.push(this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [0, 0, 1, 0, 1, 0, 0, 1, 1]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [0, 0, -1, 0, 1, 0, 0, 1, -1]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [0, 0, -1, 0, -1, 0, 0, -1, -1]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [0, 0, 1, 0, -1, 0, 0, -1, 1]));
    }
    // -z
    if (exposedFaces[4]) {
        lightTemplate.push(this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 0, 0, 1, 0, -1, 1, 0]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 0, 0, 1, 0, 1, 1, 0]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 0, 0, -1, 0, 1, -1, 0]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 0, 0, -1, 0, -1, -1, 0]));
    }
    // +z
    if (exposedFaces[5]) {
        lightTemplate.push(this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 0, 0, 1, 0, 1, 1, 0]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 0, 0, 1, 0, -1, 1, 0]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 0, 0, -1, 0, -1, -1, 0]), this.voxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 0, 0, -1, 0, 1, -1, 0]));
    }
}
export function VoxelLightMixCalc(voxelData, voxel, voxelPallet, chunkX, chunkY, chunkZ, blockX, blockY, blockZ, checkSet) {
    let voxelLigtValue = voxelData[voxelData.length - 1];
    const values = this.lightByte.getLightValues(voxelLigtValue);
    let w = values[0];
    let r = values[1];
    let g = values[2];
    let b = values[3];
    for (let i = 0; i < 9; i += 3) {
        const check = this.getRelativeVoxelData(chunkX, chunkY, chunkZ, blockX, blockY, blockZ, checkSet[i], checkSet[i + 1], checkSet[i + 2]);
        if (!check) {
            continue;
        }
        const voxelTrueId = voxelPallet[check[0]][0];
        const checkVoxel = this.DVEW.voxelManager.getVoxel(voxelTrueId);
        if (checkVoxel.data.substance != voxel.data.substance) {
            continue;
        }
        let neighborLightValue = check[check.length - 1];
        const values = this.lightByte.getLightValues(neighborLightValue);
        let nw = values[0];
        let nr = values[1];
        let ng = values[2];
        let nb = values[3];
        if (nw < w && w > 0) {
            w--;
        }
        if (nw > w && w < 15) {
            w++;
        }
        if (nr < r && r > 0) {
            r--;
        }
        if (nr > r && r < 15) {
            r++;
        }
        if (ng < g && g > 0) {
            g--;
        }
        if (ng > g && g < 15) {
            g++;
        }
        if (nb < b && b > 0) {
            b--;
        }
        if (nb > b && b < 15) {
            b++;
        }
    }
    return this.lightByte.setLightValues([w, r, g, b]);
}
export function VoxelLightMixCalcO(voxelData, voxel, voxelPallet, chunkX, chunkZ, blockX, blockY, blockZ, checkSet) {
    return 0xffffffff;
    let voxelLigtValue = voxelData[voxelData.length - 1];
    this.infoByte.setNumberValue(voxelLigtValue);
    let w = this.infoByte.getHalfByteDec(0);
    let r = this.infoByte.getHalfByteDec(4);
    let g = this.infoByte.getHalfByteDec(8);
    let b = this.infoByte.getHalfByteDec(12);
    for (let i = 0; i < checkSet.length; i += 3) {
        const check = this.getRelativeVoxelData(chunkX, chunkZ, blockX, blockY, blockZ, checkSet[i], checkSet[i + 1], checkSet[i + 2]);
        if (!check) {
            continue;
        }
        const voxelPalletId = check[0];
        const voxelTrueId = voxelPallet[voxelPalletId][0];
        const checkVoxel = this.DVEW.voxelManager.getVoxel(voxelTrueId);
        if (checkVoxel.data.substance !== voxel.data.substance) {
            continue;
        }
        let neighborLightValue = check[check.length - 1];
        this.infoByte.setNumberValue(neighborLightValue);
        let nw = this.infoByte.getHalfByteDec(0);
        if (nw < w && w > 0) {
            w--;
        }
        if (nw > w && w < 15) {
            w++;
        }
        let nr = this.infoByte.getHalfByteDec(4);
        if (nr < r && r > 0) {
            r--;
        }
        if (nr > r && r < 15) {
            r++;
        }
        let ng = this.infoByte.getHalfByteDec(8);
        if (ng < g && g > 0) {
            g--;
        }
        if (ng > g && g < 15) {
            g++;
        }
        let nb = this.infoByte.getHalfByteDec(12);
        if (nb < b && b > 0) {
            b--;
        }
        if (nb > b && b < 15) {
            b++;
        }
    }
    this.infoByte.setNumberValue(0);
    this.infoByte.setHalfByteBits(0, w);
    this.infoByte.setHalfByteBits(4, r);
    this.infoByte.setHalfByteBits(8, g);
    this.infoByte.setHalfByteBits(12, b);
    return this.infoByte.getNumberValue();
}
