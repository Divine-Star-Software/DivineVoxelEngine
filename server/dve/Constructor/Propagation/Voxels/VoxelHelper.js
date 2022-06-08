//objects
import { DVEP } from "../DivineVoxelEngineWorldPropagation.js";
import { Util } from "../../../Global/Util.helper.js";
//functions
export const VoxelHelper = {
    voxelByte: Util.getVoxelByte(),
    lightByte: Util.getLightByte(),
    lightValueFunctions: {
        r: (value) => {
            return VoxelHelper.lightByte.getR(value);
        },
        g: (value) => {
            return VoxelHelper.lightByte.getG(value);
        },
        b: (value) => {
            return VoxelHelper.lightByte.getB(value);
        },
        s: (value) => {
            return VoxelHelper.lightByte.getS(value);
        },
    },
    /**# Get Light
     * ---
     * Returns the raw light value for a voxel.
     */
    getLight(x, y, z) {
        const rawVoxelData = DVEP.worldMatrix.getData(x, y, z);
        if (rawVoxelData >= 0) {
            const voxelId = this.voxelByte.getId(rawVoxelData);
            if (voxelId == 0) {
                return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
            }
            else {
                const voxel = DVEP.worldMatrix.getVoxel(x, y, z);
                if (!voxel)
                    return -1;
                const voxelData = DVEP.voxelManager.getVoxel(voxel[0]);
                if (voxelData.lightSource && voxelData.lightValue) {
                    return voxelData.lightValue;
                }
                if (voxelData.substance == "solid") {
                    return -1;
                }
                return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
            }
        }
        return -1;
    },
    setFullSun(x, y, z) {
        let data = DVEP.worldMatrix.getData(x, y, z);
        if (data === -1) {
            return;
        }
        ;
        const voxelId = this.voxelByte.getId(data);
        if (voxelId == 0) {
            const nl = this.lightByte.getFullSunLight(data);
            const newVoxel = this.voxelByte.encodeLightIntoVoxelData(data, nl);
            DVEP.worldMatrix.setData(x, y, z, newVoxel);
        }
    },
    setLight(x, y, z, lightValue) {
        let data = DVEP.worldMatrix.getData(x, y, z);
        if (data === -1)
            return;
        data = this.lightByte.encodeLightIntoVoxelData(data, lightValue);
        DVEP.worldMatrix.setData(x, y, z, data);
    },
    setAir(x, y, z, lightValue) {
        let data = this.lightByte.encodeLightIntoVoxelData(0, lightValue);
        DVEP.worldMatrix.setData(x, y, z, data);
    },
    getLightValue(x, y, z, type) {
        return this.lightValueFunctions[type](this.getLight(x, y, z));
    },
};
