import { runRGBFloodFillAt, runRGBFloodRemove, runRGBFloodRemoveAt, runRGBFloodFill, } from "./Functions/RGBFloodLight.js";
import { runSunLightRemove, runSunLightRemoveAt, runSunLightUpdate, runSunLightUpdateAt, } from "./Functions/SunLight.js";
export class IlluminationManager {
    DVEW;
    lightByte;
    air = [-1, 0];
    runSunLightUpdateAt = runSunLightUpdateAt;
    runSunLightUpdate = runSunLightUpdate;
    runSunLightRemove = runSunLightRemove;
    runSunLightRemoveAt = runSunLightRemoveAt;
    runRGBFloodFillAt = runRGBFloodFillAt;
    runRGBFloodFill = runRGBFloodFill;
    runRGBFloodRemoveAt = runRGBFloodRemoveAt;
    runRGBFloodRemove = runRGBFloodRemove;
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
                this._sunLightUpdateQue.push([
                    chunkX + x - 1,
                    chunkY + 127,
                    chunkZ + z - 1,
                ]);
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
                if (voxels[x] && voxels[x][z] && voxels[x][z][y] !== undefined) {
                    const voxel = voxels[x][z][y];
                    if (voxel == 0) {
                        const nl = this.lightByte.getFullSunLight(voxel);
                        voxels[x][z][y] = nl;
                    }
                }
            }
        }
    }
}
