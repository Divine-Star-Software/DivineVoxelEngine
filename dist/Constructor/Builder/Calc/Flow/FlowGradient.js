import { QuadVertexData } from "../../Classes/VertexData.js";
const checkSets = {
    1: [
        -1, 0, 0, -1,
        //corner
        -1, -1,
    ],
    2: [
        -1, 0, 0, 1,
        //corner
        -1, 1,
    ],
    3: [
        1, 0, 0, 1,
        //corner
        1, 1,
    ],
    4: [
        1, 0, 0, -1,
        //corner
        1, -1,
    ],
};
const flowStates = new QuadVertexData();
export const FlowGradient = {
    getLevel(tool) {
        if (!tool.nVoxel.isRenderable())
            return -1;
        if (!tool.voxel.isSameVoxel(tool.nVoxel.x, tool.nVoxel.y, tool.nVoxel.z))
            return -1;
        const level = tool.nVoxel.getLevel();
        return level;
    },
    calculate(tool) {
        const cl = tool.voxel.getLevel();
        const cs = tool.voxel.getLevelState();
        for (let vertex = 1; vertex <= 4; vertex++) {
            const checkSet = checkSets[vertex];
            if (cl == 15 && cs != 1) {
                flowStates.vetexes[vertex] = 15;
                continue;
            }
            let finalLevel = cl;
            let voxelCount = 0;
            let zeroCount = 0;
            let totalZero = true;
            let ovveride = false;
            let totalLevel = 0;
            for (let iy = 0; iy < 2; iy++) {
                for (let i = 0; i < 6; i += 2) {
                    const cx = checkSet[i] + tool.voxel.x;
                    const cz = checkSet[i + 1] + tool.voxel.z;
                    const loadedIn = tool.nVoxel.loadInAt(cx, tool.voxel.y + iy, cz);
                    if (!loadedIn)
                        continue;
                    const level = this.getLevel(tool);
                    const hasVoxel = tool.nVoxel.isRenderable();
                    if (hasVoxel && tool.nVoxel.getSubstance() == "#dve_solid") {
                        voxelCount++;
                    }
                    if (iy == 1) {
                        if (level > 0) {
                            finalLevel = 15;
                            totalZero = false;
                            ovveride = true;
                            totalLevel += level;
                        }
                    }
                    if (level <= 0 && !hasVoxel) {
                        if (iy == 0) {
                            zeroCount++;
                        }
                        continue;
                    }
                    if (level == 15) {
                        finalLevel = 15;
                        totalZero = false;
                        zeroCount = 0;
                        break;
                    }
                    if (level > 0 && !hasVoxel) {
                        totalZero = false;
                    }
                    if (finalLevel < level) {
                        finalLevel += level - finalLevel;
                    }
                }
            }
            if (ovveride && totalLevel == 1 && voxelCount == 3) {
                finalLevel = cl;
            }
            if (zeroCount >= 1 && cs == 0 && !ovveride) {
                finalLevel = 0;
            }
            if (totalZero && cs == 1 && cl == 15) {
                finalLevel = 7;
            }
            if (finalLevel > 15)
                finalLevel = 15;
            if (finalLevel < 1)
                finalLevel = 1;
            flowStates.vetexes[vertex] = finalLevel;
        }
        tool.getWorldLevel().setFromQuadData(flowStates);
    },
};
