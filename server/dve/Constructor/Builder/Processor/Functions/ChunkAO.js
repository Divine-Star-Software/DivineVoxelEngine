import { DVEC } from "../../../DivineVoxelEngineConstructor.js";
export function OcculsionCalcuation(voxel, voxelX, voxelY, voxelZ, x, y, z) {
    const check = DVEC.worldMatrix.getVoxel(x + voxelX, y + voxelY, z + voxelZ);
    if (!check) {
        return 1;
    }
    if (check[0] == "dve:air") {
        return 1;
    }
    const checkVoxel = DVEC.voxelManager.getVoxel(check[0]);
    if (voxel.substance == "transparent" || voxel.substance == "solid") {
        if (checkVoxel.data.substance != "solid" &&
            checkVoxel.data.substance != "transparent") {
            return 1;
        }
    }
    else {
        if (checkVoxel.data.substance !== voxel.substance) {
            return 1;
        }
    }
    return 0.75;
}
export function BuildAmbientOcclusion(voxel, amientOcculusionTemplate, chunkX, chunkY, chunkZ, x, y, z, face) {
    const trueX = chunkX + x;
    const trueY = chunkY + y;
    const trueZ = chunkZ + z;
    // +x
    if (face == "east") {
        amientOcculusionTemplate.push(OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 0, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 1, -1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 0, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 1, 1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 0, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, -1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, -1, 1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 0, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, -1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, -1, -1));
    }
    // -x
    if (face == "west") {
        amientOcculusionTemplate.push(OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 0, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 1, 1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 0, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 1, -1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 0, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, -1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, -1, -1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 0, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, -1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, -1, 1));
    }
    // +y
    if (face == "top") {
        amientOcculusionTemplate.push(OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, 1, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 1, -1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, 1, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 1, 1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, 1, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 1, 1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, 1, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 1, -1));
    }
    // -y
    if (face == "bottom") {
        amientOcculusionTemplate.push(OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, -1, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, -1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, -1, -1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, -1, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, -1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, -1, -1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, -1, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, -1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, -1, 1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, -1, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, -1, 0) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, -1, 1));
    }
    // +z
    if (face == "north") {
        amientOcculusionTemplate.push(OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 0, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, 1, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 1, 1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 0, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, 1, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 1, 1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 0, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, -1, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, -1, 1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 0, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, -1, 1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, -1, 1));
    }
    // -z
    if (face == "south") {
        amientOcculusionTemplate.push(OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 0, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, 1, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 1, -1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 0, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, 1, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 1, -1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, 0, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, -1, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 1, -1, -1), OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, 0, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, 0, -1, -1) *
            OcculsionCalcuation(voxel, trueX, trueY, trueZ, -1, -1, -1));
    }
}
