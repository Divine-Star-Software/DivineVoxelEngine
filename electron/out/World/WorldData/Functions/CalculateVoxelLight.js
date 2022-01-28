export function CalculateVoxelLight(voxel, voxelData, voxelPalette, RGBlightTemplate, exposedFaces, chunkX, chunkY, chunkZ, x, y, z) {
    // +y
    if (exposedFaces[0]) {
        let airLight = this.getData(x + chunkX, y + chunkY + 1, z + chunkZ);
        if (!airLight) {
            airLight = [0];
        }
        if (airLight[0] > 0) {
            airLight = [0];
        }
        RGBlightTemplate.push(this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [-1, 1, 1, -1, 1, 0, 0, 1, 1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [-1, 1, 1, -1, 1, 0, 0, 1, 1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [1, 1, -1, 1, 1, 0, 0, 1, -1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [1, 1, -1, 1, 1, 0, 0, 1, -1]));
    }
    // -y
    if (exposedFaces[1]) {
        let airLight = this.getData(x + chunkX, y + chunkY - 1, z + chunkZ);
        if (!airLight) {
            airLight = [0];
        }
        if (airLight[0] > 0) {
            airLight = [0];
        }
        RGBlightTemplate.push(this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [0, -1, -1, -1, -1, 0, -1, -1, -1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [0, -1, -1, 1, -1, 0, 1, -1, -1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [0, -1, 1, 1, -1, 0, 1, -1, 1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [0, -1, 1, -1, -1, 0, -1, -1, 1]));
    }
    // +x
    if (exposedFaces[2]) {
        let airLight = this.getData(x + chunkX + 1, y + chunkY, z + chunkZ);
        if (!airLight) {
            airLight = [0];
        }
        if (airLight[0] > 0) {
            airLight = [0];
        }
        RGBlightTemplate.push(this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [1, 0, -1, 1, 1, 0, 1, 1, -1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 1, 1, 1, 0, 1, 1, 1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 1, 1, -1, 0, 1, -1, 1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [1, 0, -1, 1, -1, 0, 1, -1, -1]));
    }
    // -x
    if (exposedFaces[3]) {
        let airLight = this.getData(x + chunkX - 1, y + chunkY, z + chunkZ);
        if (!airLight) {
            airLight = [0];
        }
        if (airLight[0] > 0) {
            airLight = [0];
        }
        RGBlightTemplate.push(this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 1, -1, 1, 0, -1, 1, 1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, -1, -1, 1, 0, -1, 1, -1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, -1, -1, -1, 0, -1, -1, -1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 1, -1, -1, 0, -1, -1, 1]));
        /*   RGBlightTemplate.push(
           this.voxelRGBLightMixCalc(
            airLight,
            voxel,
            voxelPalette,
            chunkX,
            chunkY,
            chunkZ,
            x,
            y,
            z,
            [-1, 0, -1, -1, 1, 0, -1, 1, 1]
           ),
           this.voxelRGBLightMixCalc(
            airLight,
            voxel,
            voxelPalette,
            chunkX,
            chunkY,
            chunkZ,
            x,
            y,
            z,
            [-1, 0, -1, -1, 1, 0, -1, 1, -1]
           ),
           this.voxelRGBLightMixCalc(
            airLight,
            voxel,
            voxelPalette,
            chunkX,
            chunkY,
            chunkZ,
            x,
            y,
            z,
            [-1, 0, 1, -1, -1, 0, -1, -1, 1]
           ),
           this.voxelRGBLightMixCalc(
            airLight,
            voxel,
            voxelPalette,
            chunkX,
            chunkY,
            chunkZ,
            x,
            y,
            z,
            [-1, 0, 1, -1, -1, 0, -1, -1, 1]
           )
          ); */
    }
    // -z
    if (exposedFaces[4]) {
        let airLight = this.getData(x + chunkX, y + chunkY, z + chunkZ - 1);
        if (!airLight) {
            airLight = [0];
        }
        if (airLight[0] > 0) {
            airLight = [0];
        }
        RGBlightTemplate.push(this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, -1, 0, 1, -1, -1, 1, -1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [1, 0, -1, 0, 1, -1, 1, 1, -1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [1, 0, -1, 0, -1, -1, 1, -1, -1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, -1, 0, -1, -1, -1, -1, -1]));
    }
    // +z
    if (exposedFaces[5]) {
        let airLight = this.getData(x + chunkX, y + chunkY, z + chunkZ + 1);
        if (!airLight) {
            airLight = [0];
        }
        if (airLight[0] > 0) {
            airLight = [0];
        }
        RGBlightTemplate.push(this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 1, 0, 1, 1, 1, 1, 1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 1, 0, 1, 1, -1, 1, 1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 1, 0, -1, 1, -1, -1, 1]), this.voxelRGBLightMixCalc(airLight, voxel, voxelPalette, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 1, 0, -1, 1, 1, -1, 1]));
    }
}
export function VoxelLightMixCalc(airData, voxel, voxelPalette, chunkX, chunkY, chunkZ, voxelX, voxelY, voxelZ, checkSet) {
    let voxelLigtValue = airData[airData.length - 1];
    const values = this.lightByte.getLightValues(voxelLigtValue);
    let w = values[0];
    let r = values[1];
    let g = values[2];
    let b = values[3];
    //console.log(w);
    for (let i = 0; i < 9; i += 3) {
        const check = this.getData(checkSet[i] + chunkX + voxelX, checkSet[i + 1] + chunkY + voxelY, checkSet[i + 2] + chunkZ + voxelZ);
        if (!check) {
            continue;
        }
        let neighborLightValue;
        if (check[0] < 0) {
            neighborLightValue = check[check.length - 1];
        }
        else {
            const voxelTrueId = voxelPalette[check[0]][0];
            const checkVoxel = this.DVEW.voxelManager.getVoxel(voxelTrueId);
            if (checkVoxel.data.substance == "solid") {
                continue;
            }
            neighborLightValue = check[check.length - 1];
        }
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
