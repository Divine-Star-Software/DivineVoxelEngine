import { DVEW } from "../../../../../out/World/DivineVoxelEngineWorld.js";
const diagonalLineGenerators = {
    north: (voxel, shapeState, yStart, xzStart, start, end) => {
        let y = yStart;
        for (let z = start; z < end; z++) {
            DVEW.worldData.paintVoxel(voxel, "default", shapeState, xzStart, y, z);
            for (let zy = y - 1; zy >= yStart; zy--) {
                DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", shapeState, xzStart, zy, z);
            }
            y++;
        }
    },
    south: (voxel, shapeState, yStart, xzStart, start, end) => {
        let y = yStart;
        for (let z = start; z > end; z--) {
            DVEW.worldData.paintVoxel(voxel, "default", shapeState, xzStart, y, z);
            for (let zy = y - 1; zy >= yStart; zy--) {
                DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", shapeState, xzStart, zy, z);
            }
            y++;
        }
    },
    east: (voxel, shapeState, yStart, xzStart, start, end) => {
        let y = yStart;
        for (let x = start; x < end; x++) {
            DVEW.worldData.paintVoxel(voxel, "default", shapeState, x, y, xzStart);
            for (let zy = y - 1; zy >= yStart; zy--) {
                DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", shapeState, x, zy, xzStart);
            }
            y++;
        }
    },
    west: (voxel, shapeState, yStart, xzStart, start, end) => {
        let y = yStart;
        for (let x = start; x > end; x--) {
            DVEW.worldData.paintVoxel(voxel, "default", shapeState, x, y, xzStart);
            for (let zy = y - 1; zy >= yStart; zy--) {
                DVEW.worldData.paintVoxel("dve:dreamstonepillar", "default", shapeState, x, zy, xzStart);
            }
            y++;
        }
    },
};
export const GenerateDiagonalLine = (direction, voxel, shapeState, yStart, xzStart, start, end) => {
    diagonalLineGenerators[direction](voxel, shapeState, yStart, xzStart, start, end);
};
