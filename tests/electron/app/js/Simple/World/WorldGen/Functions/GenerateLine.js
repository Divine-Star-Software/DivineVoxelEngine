import { DVEW } from "../../../../../out/World/DivineVoxelEngineWorld.js";
const brush = DVEW.getBrush();
const diagonalLineGenerators = {
    north: (voxel, shapeState, yStart, xzStart, start, end) => {
        let y = yStart;
        for (let z = start; z < end; z++) {
            brush.setXYZ(xzStart, y, z).setId(voxel).setShapeState(shapeState).paint();
            for (let zy = y - 1; zy >= yStart; zy--) {
                brush
                    .setXYZ(xzStart, zy, z)
                    .setId("dve_dreamstonepillar")
                    .setShapeState(shapeState)
                    .paint();
            }
            y++;
        }
    },
    south: (voxel, shapeState, yStart, xzStart, start, end) => {
        let y = yStart;
        for (let z = start; z > end; z--) {
            brush.setXYZ(xzStart, y, z).setId(voxel).setShapeState(shapeState).paint();
            for (let zy = y - 1; zy >= yStart; zy--) {
                brush
                    .setXYZ(xzStart, zy, z)
                    .setId("dve_dreamstonepillar")
                    .setShapeState(shapeState)
                    .paint();
            }
            y++;
        }
    },
    east: (voxel, shapeState, yStart, xzStart, start, end) => {
        let y = yStart;
        for (let x = start; x < end; x++) {
            brush.setXYZ(x, y, xzStart).setId(voxel).setShapeState(shapeState).paint();
            for (let zy = y - 1; zy >= yStart; zy--) {
                brush
                    .setXYZ(x, zy, xzStart)
                    .setId("dve_dreamstonepillar")
                    .setShapeState(shapeState)
                    .paint();
            }
            y++;
        }
    },
    west: (voxel, shapeState, yStart, xzStart, start, end) => {
        let y = yStart;
        for (let x = start; x > end; x--) {
            brush.setXYZ(x, y, xzStart).setId(voxel).setShapeState(shapeState).paint();
            for (let zy = y - 1; zy >= yStart; zy--) {
                brush
                    .setXYZ(x, zy, xzStart)
                    .setId("dve_dreamstonepillar")
                    .setShapeState(shapeState)
                    .paint();
            }
            y++;
        }
    },
};
export const GenerateDiagonalLine = (direction, voxel, shapeState, yStart, xzStart, start, end) => {
    diagonalLineGenerators[direction](voxel, shapeState, yStart, xzStart, start, end);
};
