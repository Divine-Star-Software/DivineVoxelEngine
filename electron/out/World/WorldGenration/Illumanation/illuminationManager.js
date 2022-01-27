import { RGBFloodFill, RGBFloodRemove, runRGBLightUpdate, } from "./Functions/RGBFloodLight.js";
import { runSunLightRemove, sunLightUpdate } from "./Functions/SunLight.js";
export class IlluminationManager {
    DVEW;
    lightByte;
    air = [-1, 0];
    sunLightUpdate = sunLightUpdate;
    runSunLightRemove = runSunLightRemove;
    RGBFloodFill = RGBFloodFill;
    RGBFloodRemove = RGBFloodRemove;
    runRGBLightUpdate = runRGBLightUpdate;
    _RGBlightUpdateQue = [];
    _RGBlightRemovalQue = [];
    _sunLightUpdateQue = [];
    _sunLightRemoveQue = [];
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.lightByte = this.DVEW.UTIL.getLightByte();
    }
    addChunkToSunLightUpdate(chunk, chunkX, chunkY, chunkZ) {
        const heightMap = chunk.heightMap;
        const voxels = chunk.voxels;
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                this._sunLightUpdateQue.push([chunkX + x - 1, chunkY + 127, chunkZ + z - 1]);
                this._sunLightUpdateQue.push([chunkX + x, chunkY + 127, chunkZ + z]);
            }
        }
    }
    populateChunkAirWithInitlSunLight(chunk) {
        const heightMap = chunk.heightMap;
        const voxels = chunk.voxels;
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                const y = heightMap[x][z];
                if (voxels[x] && voxels[x][z] && voxels[x][z][y]) {
                    const voxel = voxels[x][z][y];
                    if (voxel && voxel[0] < 0) {
                        const vl = voxel[voxel.length - 1];
                        const nl = this.lightByte.getFullSunLight(vl);
                        voxel[voxel.length - 1] = nl;
                    }
                }
            }
        }
    }
}
