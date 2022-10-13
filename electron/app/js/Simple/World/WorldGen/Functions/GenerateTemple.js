import { DVEW } from "../../../../../out/World/DivineVoxelEngineWorld.js";
import { GenerateDiagonalLine } from "./GenerateLine.js";
const generatePillar = (x, y, z) => {
    //bottom
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 0, x, y, z + 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 8, x + 1, y, z + 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 1, x + 1, y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 10, x - 1, y, z + 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 2, x, y, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 9, x + 1, y, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 3, x - 1, y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 11, x - 1, y, z - 1);
    const height = 10;
    const top = 10 + y - 1;
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 4, x, top, z + 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 12, x + 1, top, z + 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 5, x + 1, top, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 14, x - 1, top, z + 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 6, x, top, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 13, x + 1, top, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 7, x - 1, top, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", 0, 15, x - 1, top, z - 1);
    for (let py = y; py < y + height; py++) {
        DVEW.worldData.paintVoxel("dve:dreamstone", 0, 0, x, py, z);
    }
};
export function GenerateTemple(direction, chunkX, chunkZ) {
    let baseY = 47;
    let yAdd = 0;
    generatePillar(chunkX + 1, baseY, chunkZ + 1);
    generatePillar(chunkX + 14, baseY, chunkZ + 1);
    generatePillar(chunkX + 1, baseY, chunkZ + 14);
    generatePillar(chunkX + 14, baseY, chunkZ + 14);
    for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
        for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
            for (let y = 0; y < this.chunkHeight; y++) {
                if (x >= chunkX + 3 &&
                    x <= chunkX + 12 &&
                    z >= chunkZ + 3 &&
                    z <= chunkZ + 12 &&
                    y >= baseY - 5 &&
                    y <= baseY - 1) {
                    if (y <= baseY - 2 &&
                        !(x == chunkX + 7 && z == chunkZ + 7) &&
                        !(x == chunkX + 8 && z == chunkZ + 7) &&
                        !(x == chunkX + 7 && z == chunkZ + 8) &&
                        !(x == chunkX + 8 && z == chunkZ + 8)) {
                        DVEW.worldData.paintVoxel("dve:liquiddreamether", 0, 0, x, y, z);
                    }
                    if ((x == chunkX + 7 && z == chunkZ + 7) ||
                        (x == chunkX + 8 && z == chunkZ + 7) ||
                        (x == chunkX + 7 && z == chunkZ + 8) ||
                        (x == chunkX + 8 && z == chunkZ + 8)) {
                        DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, x, y, z);
                    }
                    continue;
                }
                if (x == chunkX + 7 && z == chunkZ + 7 && y < baseY + 6 && y > baseY - 2) {
                    DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, x, y, z);
                }
                if (x == chunkX + 8 && z == chunkZ + 7 && y < baseY + 4 && y > baseY - 2) {
                    DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, x, y, z);
                }
                if (x == chunkX + 7 && z == chunkZ + 8 && y < baseY + 2 && y > baseY - 2) {
                    DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, x, y, z);
                }
                if (x == chunkX + 8 && z == chunkZ + 8 && y < baseY + 8 && y > baseY - 2) {
                    DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, x, y, z);
                }
                if (y > 0 && y < baseY - 1) {
                    DVEW.worldData.paintVoxel("dve:dreamstonepillar", 0, 0, x, y, z);
                }
                if (y >= baseY - 1) {
                    if (y == baseY - 1) {
                        DVEW.worldData.paintVoxel("dve:dreamstone", 1, 0, x, y, z);
                    }
                }
                if (y >= baseY + 10 && y <= baseY + 12) {
                    DVEW.worldData.paintVoxel("dve:dreamstone", 1, 0, x, y, z);
                }
            }
        }
    }
    DVEW.worldData.paintVoxel("dve:liquiddreamether", 0, 0, chunkX + 8, 55, chunkZ + 8);
    DVEW.queues.flow.update.add([chunkX + 8, 55, chunkZ + 8]);
    if (direction == "south" || direction == "north") {
        for (let z = chunkZ; z < chunkZ + this.chunkDepth; z++) {
            let voxel = "dve:dreamstone-stair";
            GenerateDiagonalLine("east", voxel, 3, baseY + 12, z, chunkX, chunkX + 8);
            GenerateDiagonalLine("west", voxel, 1, baseY + 12, z, chunkX + 15, chunkX + 7);
        }
    }
    if (direction == "east" || direction == "west") {
        for (let x = chunkX; x < chunkX + this.chunkDepth; x++) {
            let voxel = "dve:dreamstone-stair";
            GenerateDiagonalLine("north", voxel, 2, baseY + 12, x, chunkZ, chunkZ + 8);
            GenerateDiagonalLine("south", voxel, 0, baseY + 12, x, chunkZ + 15, chunkZ + 7);
        }
    }
}
