import { DVEW } from "../../../../../out/World/DivineVoxelEngineWorld.js";
import { GenerateDiagonalLine } from "./GenerateLine.js";
const tasks = DVEW.getTasksTool();
const brush = DVEW.getBrush();
const pillarData1 = [
    [0, 0, 1],
    [8, 1, 1],
    [1, 1, 0],
    [10, -1, 1],
    [2, 0, -1],
    [9, 1, -1],
    [3, -1, 0],
    [11, -1, -1],
];
const pillarData2 = [
    [4, 0, 1],
    [12, 1, 1],
    [5, 1, 0],
    [14, -1, 1],
    [6, 0, -1],
    [13, 1, -1],
    [7, -1, 0],
    [15, -1, -1],
];
const generatePillar = (x, y, z) => {
    //bottom
    brush.setId("dve_dreamstone-stair");
    for (const d of pillarData1) {
        brush
            .setShapeState(d[0])
            .setXYZ(x + d[1], y, z + d[2])
            .paint();
    }
    const height = 10;
    const top = 10 + y - 1;
    for (const d of pillarData2) {
        brush
            .setShapeState(d[0])
            .setXYZ(x + d[1], top, z + d[2])
            .paint();
    }
    for (let py = y; py < y + height; py++) {
        brush.setId("dve_dreamstone").setXYZ(x, py, z).paint();
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
                brush.setXYZ(x, y, z);
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
                        brush.setId("dve_liquiddreamether").paint();
                    }
                    if ((x == chunkX + 7 && z == chunkZ + 7) ||
                        (x == chunkX + 8 && z == chunkZ + 7) ||
                        (x == chunkX + 7 && z == chunkZ + 8) ||
                        (x == chunkX + 8 && z == chunkZ + 8)) {
                        brush.setId("dve_dreamstonepillar").paint();
                    }
                    continue;
                }
                if (x == chunkX + 7 && z == chunkZ + 7 && y < baseY + 6 && y > baseY - 2) {
                    brush.setId("dve_dreamstonepillar").paint();
                }
                if (x == chunkX + 8 && z == chunkZ + 7 && y < baseY + 4 && y > baseY - 2) {
                    brush.setId("dve_dreamstonepillar").paint();
                }
                if (x == chunkX + 7 && z == chunkZ + 8 && y < baseY + 2 && y > baseY - 2) {
                    brush.setId("dve_dreamstonepillar").paint();
                }
                if (x == chunkX + 8 && z == chunkZ + 8 && y < baseY + 8 && y > baseY - 2) {
                    brush.setId("dve_dreamstonepillar").paint();
                }
                if (y > 0 && y < baseY - 1) {
                    brush.setId("dve_dreamstonepillar").paint();
                }
                if (y >= baseY - 1) {
                    if (y == baseY - 1) {
                        brush.setState(1).setId("dve_dreamstone").paint().setState(0);
                    }
                }
                if (y >= baseY + 10 && y <= baseY + 12) {
                    brush.setState(1).setId("dve_dreamstone").paint().setState(0);
                }
            }
        }
    }
    brush
        .setXYZ(chunkX + 8, 55, chunkZ + 8)
        .setId("dve_liquiddreamether")
        .paint();
    tasks.flow.update.add(chunkX + 8, 55, chunkZ + 8);
    if (direction == "south" || direction == "north") {
        for (let z = chunkZ; z < chunkZ + this.chunkDepth; z++) {
            let voxel = "dve_dreamstone-stair";
            GenerateDiagonalLine("east", voxel, 3, baseY + 12, z, chunkX, chunkX + 8);
            GenerateDiagonalLine("west", voxel, 1, baseY + 12, z, chunkX + 15, chunkX + 7);
        }
    }
    if (direction == "east" || direction == "west") {
        for (let x = chunkX; x < chunkX + this.chunkDepth; x++) {
            let voxel = "dve_dreamstone-stair";
            GenerateDiagonalLine("north", voxel, 2, baseY + 12, x, chunkZ, chunkZ + 8);
            GenerateDiagonalLine("south", voxel, 0, baseY + 12, x, chunkZ + 15, chunkZ + 7);
        }
    }
}
