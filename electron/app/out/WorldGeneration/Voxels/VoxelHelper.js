//objects
import { DVEWG } from "../DivineVoxelEngineWorldGeneration.js";
import { Util } from "../../Global/Util.helper.js";
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
        const rawVoxelData = DVEWG.worldMatrix.getData(x, y, z);
        if (rawVoxelData >= 0) {
            const voxelId = this.voxelByte.getId(rawVoxelData);
            if (voxelId == 0) {
                return this.voxelByte.decodeLightFromVoxelData(rawVoxelData);
            }
            else {
                const voxel = DVEWG.worldMatrix.getVoxel(x, y, z);
                if (!voxel)
                    return 0;
                const voxelData = DVEWG.voxelManager.getVoxel(voxel[0]);
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
    },
    setLight(x, y, z, lightValue) {
        let data = DVEWG.worldMatrix.getData(x, y, z);
        if (data === -1)
            return;
        data = this.lightByte.encodeLightIntoVoxelData(data, lightValue);
        DVEWG.worldMatrix.setData(x, y, z, data);
    },
    setAir(x, y, z, lightValue) {
        let data = this.lightByte.encodeLightIntoVoxelData(0, lightValue);
        DVEWG.worldMatrix.setData(x, y, z, data);
    },
    getLightValue(x, y, z, type) {
        return this.lightValueFunctions[type](this.getLight(x, y, z));
    },
};
