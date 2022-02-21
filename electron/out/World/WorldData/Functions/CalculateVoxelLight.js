export function CalculateVoxelLight(voxel, voxelData, lightTemplate, exposedFaces, chunkX, chunkY, chunkZ, x, y, z) {
    // +y
    if (exposedFaces[0]) {
        let light = this.getLight(x + chunkX, y + chunkY + 1, z + chunkZ);
        const ly = 1;
        lightTemplate.push(
        //top right
        this.voxellightMixCalc(light, voxel, chunkX, chunkY, chunkZ, x, y, z, [
            1,
            ly,
            0,
            0,
            ly,
            1,
            1,
            ly,
            1,
        ]), 
        //bottom right
        this.voxellightMixCalc(light, voxel, chunkX, chunkY, chunkZ, x, y, z, [
            1,
            ly,
            0,
            0,
            ly,
            -1,
            1,
            ly,
            -1,
        ]), 
        //bottom left
        this.voxellightMixCalc(light, voxel, chunkX, chunkY, chunkZ, x, y, z, [
            -1,
            ly,
            0,
            0,
            ly,
            -1,
            -1,
            ly,
            -1,
        ]), 
        //top left
        this.voxellightMixCalc(light, voxel, chunkX, chunkY, chunkZ, x, y, z, [
            -1,
            ly,
            0,
            0,
            ly,
            1,
            -1,
            ly,
            1,
        ]));
    }
    // -y
    if (exposedFaces[1]) {
        let airLight = this.getLight(x + chunkX, y + chunkY - 1, z + chunkZ);
        lightTemplate.push(this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [0, -1, -1, -1, -1, 0, -1, -1, -1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [0, -1, -1, 1, -1, 0, 1, -1, -1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [0, -1, 1, 1, -1, 0, 1, -1, 1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [0, -1, 1, -1, -1, 0, -1, -1, 1]));
    }
    // +x
    if (exposedFaces[2]) {
        let airLight = this.getLight(x + chunkX + 1, y + chunkY, z + chunkZ);
        lightTemplate.push(this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [1, 0, -1, 1, 1, 0, 1, 1, -1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 1, 1, 1, 0, 1, 1, 1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 1, 1, -1, 0, 1, -1, 1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [1, 0, -1, 1, -1, 0, 1, -1, -1]));
    }
    // -x
    if (exposedFaces[3]) {
        let airLight = this.getLight(x + chunkX - 1, y + chunkY, z + chunkZ);
        lightTemplate.push(this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 1, -1, 1, 0, -1, 1, 1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, -1, -1, 1, 0, -1, 1, -1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, -1, -1, -1, 0, -1, -1, -1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 1, -1, -1, 0, -1, -1, 1]));
    }
    // -z
    if (exposedFaces[4]) {
        let airLight = this.getLight(x + chunkX, y + chunkY, z + chunkZ - 1);
        lightTemplate.push(this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, -1, 0, 1, -1, -1, 1, -1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [1, 0, -1, 0, 1, -1, 1, 1, -1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [1, 0, -1, 0, -1, -1, 1, -1, -1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, -1, 0, -1, -1, -1, -1, -1]));
    }
    // +z
    if (exposedFaces[5]) {
        let airLight = this.getLight(x + chunkX, y + chunkY, z + chunkZ + 1);
        lightTemplate.push(this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 1, 0, 1, 1, 1, 1, 1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 1, 0, 1, 1, -1, 1, 1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [-1, 0, 1, 0, -1, 1, -1, -1, 1]), this.voxellightMixCalc(airLight, voxel, chunkX, chunkY, chunkZ, x, y, z, [1, 0, 1, 0, -1, 1, 1, -1, 1]));
    }
}
export function VoxelLightMixCalc(voxelLigtValue, voxel, chunkX, chunkY, chunkZ, voxelX, voxelY, voxelZ, checkSet) {
    const values = this.lightByte.getLightValues(voxelLigtValue);
    let w = values[0];
    let r = values[1];
    let g = values[2];
    let b = values[3];
    //console.log(w);
    for (let i = 6; i > 0; i -= 3) {
        const check = this.getLight(checkSet[i] + chunkX + voxelX, checkSet[i + 1] + chunkY + voxelY, checkSet[i + 2] + chunkZ + voxelZ);
        if (!check) {
            continue;
        }
        let neighborLightValue = check;
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
        if (nr > 0) {
            if (nr < r && r > 0) {
                r--;
            }
            if (nr > r && r < 15) {
                r++;
            }
        }
        if (ng > 0) {
            if (ng < g && g > 0) {
                g--;
            }
            if (ng > g && g < 15) {
                g++;
            }
        }
        if (nb > 0) {
            if (nb < b && b > 0) {
                b--;
            }
            if (nb > b && b < 15) {
                b++;
            }
        }
    }
    return this.lightByte.setLightValues([w, r, g, b]);
}
