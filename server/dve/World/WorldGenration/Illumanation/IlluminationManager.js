//objects
import { Util } from "../../../Global/Util.helper.js";
//functions
import { runRGBFloodFillAt, runRGBFloodRemove, runRGBFloodRemoveAt, runRGBFloodFill, } from "./Functions/RGBFloodLight.js";
import { runSunLightRemove, runSunLightRemoveAt, runSunLightUpdate, runSunLightUpdateAt, } from "./Functions/SunLight.js";
export const IlluminationManager = {
    lightByte: Util.getLightByte(),
    voxelByte: Util.getVoxelByte(),
    _3dArray: Util.getFlat3DArray(),
    air: [-1, 0],
    runSunLightUpdateAt: runSunLightUpdateAt,
    runSunLightUpdate: runSunLightUpdate,
    runSunLightRemove: runSunLightRemove,
    runSunLightRemoveAt: runSunLightRemoveAt,
    runRGBFloodFillAt: runRGBFloodFillAt,
    runRGBFloodFill: runRGBFloodFill,
    runRGBFloodRemoveAt: runRGBFloodRemoveAt,
    runRGBFloodRemove: runRGBFloodRemove,
    _RGBlightUpdateQue: [],
    _RGBlightRemovalQue: [],
    _sunLightUpdateQue: [],
    _sunLightRemoveQue: [],
    addChunkToSunLightUpdate(chunk, chunkX, chunkY, chunkZ) {
        const heightMap = chunk.heightMap;
        const voxels = chunk.voxels;
        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                this._sunLightUpdateQue.push([chunkX + x, chunkY + 127, chunkZ + z]);
            }
        }
    },
    populateChunkAirWithInitlSunLight(chunk) {
        /*   const heightMap = chunk.heightMap;
          const voxels = chunk.voxels;
          for (let x = 0; x < 16; x++) {
           for (let z = 0; z < 16; z++) {
            const y = heightMap[x][z];
            const voxel = this._3dArray.getValue(x, y, z, voxels);
            const voxelId = this.voxelByte.getId(voxel);
            if (voxelId == 0) {
             const nl = this.lightByte.getFullSunLight(voxel);
             const newVoxel = this.voxelByte.encodeLightIntoVoxelData(voxel, nl);
             this._3dArray.setValue(x, y, z, voxels, newVoxel);
            }
           }
          } */
    },
};
