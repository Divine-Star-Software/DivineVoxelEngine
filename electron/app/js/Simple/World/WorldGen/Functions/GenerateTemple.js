import { DVEW } from "../../../../../out/World/DivineVoxelEngineWorld.js";
const generatePillar = (x, y, z) => {
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 0, x, y, z + 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 8, x + 1, y, z + 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 1, x + 1, y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 10, x - 1, y, z + 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 2, x, y, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 9, x + 1, y, z - 1);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 3, x - 1, y, z);
    DVEW.worldData.paintVoxel("dve:dreamstone-stair", "default", 11, x - 1, y, z - 1);
    const height = 10;
    for (let py = y; py < y + height; py++) {
        DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, py, z);
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
            let tree = Math.random() > 0.9;
            for (let y = 0; y < this.chunkHeight; y++) {
                if (y > 0 && y < baseY - 1) {
                    DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", 0, x, y, z);
                }
                if (y >= baseY - 1) {
                    if (y == baseY - 1) {
                        DVEW.worldData.paintVoxel("dve:dreamstone", "default", 0, x, y, z);
                    }
                }
            }
        }
    }
}
