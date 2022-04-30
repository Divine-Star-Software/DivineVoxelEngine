import { BuildAmbientOcclusion } from "./Functions/ChunkAO.js";
import { CalculateVoxelLight, VoxelLightMixCalc, } from "./Functions/CalculateVoxelLight.js";
export class VoxelHelper {
    DVEB;
    voxellightMixCalc = VoxelLightMixCalc;
    calculdateVoxelLight = CalculateVoxelLight;
    voxelByte;
    lightByte;
    substanceRules = {
        "solid-solid": false,
        "solid-flora": true,
        "solid-transparent": true,
        "solid-fluid": true,
        "solid-magma": true,
        "transparent-solid": true,
        "transparent-flora": true,
        "transparent-transparent": true,
        "transparent-fluid": true,
        "transparent-magma": true,
        "flora-solid": true,
        "flora-flora": true,
        "flora-transparent": true,
        "flora-fluid": true,
        "flora-magma": true,
        "fluid-solid": false,
        "fluid-flora": true,
        "fluid-transparent": true,
        "fluid-fluid": false,
        "fluid-magma": true,
        "magma-solid": false,
        "magma-flora": true,
        "magma-transparent": true,
        "magma-fluid": true,
        "magma-magma": false,
    };
    constructor(DVEB) {
        this.DVEB = DVEB;
        this.voxelByte = this.DVEB.UTIL.getVoxelByte();
        this.lightByte = this.DVEB.UTIL.getLightByte();
    }
    getTrueShapeId(id) {
        return this.DVEB.voxelManager.shapeMap[id];
    }
    getTrueFluidShapeId(id) {
        return this.DVEB.voxelManager.fluidShapeMap[id];
    }
    voxelFaceCheck(voxel, voxelData, x, y, z) {
        const voxelCheck = this.DVEB.worldMatrix.getVoxel(x, y, z);
        return true;
        /*    if(voxelCheck == "dve:air")return true;
      
          if (voxelCheck && voxelCheck == "dve:air") {
           const neighborVoxel: string = voxelCheck[0];
        
           if (
            this.substanceRules[
             `${voxel.data.substance}-${neighborVoxel.data.substance}`
            ]
           ) {
            return true;
           } else {
            return false;
           }
          } else {
           return true;
          } */
    }
    /**# Get Light
     * ---
     * Returns the raw light value for a voxel.
     * @param x
     * @param y
     * @param z
     * @returns
     */
    getLight(x, y, z) {
        const rawVoxelData = this.DVEB.worldMatrix.getData(x, y, z);
        if (rawVoxelData >= 0) {
            const voxelId = this.voxelByte.getId(rawVoxelData);
            if (voxelId == 0) {
                return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
            }
            else {
                const voxel = this.DVEB.worldMatrix.getVoxel(x, y, z);
                if (!voxel)
                    return 0;
                const voxelData = this.DVEB.voxelManager.getVoxel(voxel[0]);
                if (voxelData.lightSource && voxelData.lightValue) {
                    return voxelData.lightValue;
                }
                if (voxelData.substance == "solid") {
                    return 0;
                }
                return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
            }
        }
        return 0;
    }
    processVoxelLight(data, voxel) {
        if (this.DVEB.engineSettings.settings.lighting?.doRGBLight ||
            this.DVEB.engineSettings.settings.lighting?.doSunLight) {
            this.calculateVoxelLight(data, voxel);
        }
        if (this.DVEB.engineSettings.settings.lighting?.doAO) {
            this.calculateVoxelAO(data, voxel);
        }
    }
    calculateVoxelLight(data, voxel) {
        if (!this.DVEB.engineSettings.settings.lighting?.doSunLight &&
            !this.DVEB.engineSettings.settings.lighting?.doRGBLight)
            return;
        this.calculdateVoxelLight(voxel, data.voxelData, data.lightTemplate, data.exposedFaces, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z);
    }
    calculateVoxelAO(data, voxel) {
        if (!this.DVEB.engineSettings.settings.lighting?.doAO)
            return;
        if (data.exposedFaces[0]) {
            BuildAmbientOcclusion(voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "top");
        }
        if (data.exposedFaces[1]) {
            BuildAmbientOcclusion(voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "bottom");
        }
        if (data.exposedFaces[2]) {
            BuildAmbientOcclusion(voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "west");
        }
        if (data.exposedFaces[3]) {
            BuildAmbientOcclusion(voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "east");
        }
        if (data.exposedFaces[4]) {
            BuildAmbientOcclusion(voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "north");
        }
        if (data.exposedFaces[5]) {
            BuildAmbientOcclusion(voxel, data.aoTemplate, data.chunkX, data.chunkY, data.chunkZ, data.x, data.y, data.z, "south");
        }
    }
}