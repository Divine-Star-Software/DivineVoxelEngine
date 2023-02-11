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
let currentId = "";
const flowStates = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
};
export function CalculateFlow(faceFlipped, x, y, z, flowTemplate) {
    currentId = this.mDataTool.getStringId();
    const currentLevel = this.mDataTool.getLevel();
    const state = this.mDataTool.getLevelState();
    //flowTemplate.push(state);
    calculateFlowV(this, state, currentLevel, 1, x, y, z);
    calculateFlowV(this, state, currentLevel, 2, x, y, z);
    calculateFlowV(this, state, currentLevel, 3, x, y, z);
    calculateFlowV(this, state, currentLevel, 4, x, y, z);
    flowTemplate.push(flowStates[1], flowStates[2], flowStates[3], flowStates[4]);
}
const getLevel = (process) => {
    if (!process.nDataTool.isRenderable())
        return -1;
    if (process.nDataTool.getStringId() != currentId)
        return -1;
    const level = process.nDataTool.getLevel();
    return level;
};
const getState = (process) => {
    if (!process.nDataTool.isRenderable())
        return -1;
    if (process.nDataTool.getStringId() != currentId)
        return -1;
    const state = process.nDataTool.getLevelState();
    return state;
};
const calculateFlowV = (process, cs, cl, vertex, x, y, z) => {
    const checkSet = checkSets[vertex];
    if (cl == 15 && cs != 1) {
        flowStates[vertex] = 15;
        return;
    }
    let finalLevel = cl;
    let voxelCount = 0;
    let zeroCount = 0;
    let totalZero = true;
    let ovveride = false;
    let totalLevel = 0;
    for (let iy = 0; iy < 2; iy++) {
        for (let i = 0; i < 6; i += 2) {
            const cx = checkSet[i] + x;
            const cz = checkSet[i + 1] + z;
            const loadedIn = process.nDataTool.loadInAt(cx, y + iy, cz);
            if (!loadedIn)
                continue;
            const level = getLevel(process);
            const hasVoxel = process.nDataTool.isRenderable();
            if (hasVoxel && process.nDataTool.getSubstance() == "#dve_solid") {
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
    flowStates[vertex] = finalLevel;
};
