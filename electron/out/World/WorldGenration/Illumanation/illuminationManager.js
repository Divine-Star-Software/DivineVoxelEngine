import { RGBFloodFill, RGBFloodRemove, RunRGBLightUpdate, } from "./Functions/RGBFloodLight.js";
import { sunLightUpdate } from "./Functions/SunLight.js";
export class IlluminationManager {
    DVEW;
    lightByte;
    air = [-1, 0];
    sunLightUpdate = sunLightUpdate;
    RGBFloodFill = RGBFloodFill;
    RGBFloodRemove = RGBFloodRemove;
    runRGBLightUpdate = RunRGBLightUpdate;
    _RGBlightUpdateQue = [];
    _RGBlightRemovalQue = [];
    _sunLightUpdateQue = [];
    constructor(DVEW) {
        this.DVEW = DVEW;
        this.lightByte = this.DVEW.UTIL.getLightByte();
    }
    populateChunkAirWithInitlSunLight(chunk, chunkX, chunkY, chunkZ) {
        const heightMap = chunk.heightMap;
        const voxels = chunk.voxels;
        for (const x of heightMap.keys()) {
            for (const z of heightMap.keys()) {
                const y = heightMap[x][z];
                if (voxels[x] && voxels[x][z] && voxels[x][z][y]) {
                    const voxel = voxels[x][z][y];
                    if (voxel && voxel[0] < 0) {
                        const vl = voxel[voxel.length - 1];
                        const nl = this.lightByte.getFullSunLight(vl);
                        voxel[voxel.length - 1] = nl;
                        this._sunLightUpdateQue.push([chunkX + x, chunkY + y, chunkZ + z]);
                    }
                }
            }
        }
    }
}
