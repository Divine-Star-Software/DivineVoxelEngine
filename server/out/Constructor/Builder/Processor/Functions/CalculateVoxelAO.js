const vertexStates = {
    1: {
        value: 0,
    },
    2: {
        value: 0,
    },
    3: {
        value: 0,
    },
    4: {
        value: 0,
    },
};
const AOCheckSets = {
    top: {
        1: [0, 1, -1, -1, 1, 0, -1, 1, -1],
        2: [0, 1, 1, -1, 1, 0, -1, 1, 1],
        3: [0, 1, 1, 1, 1, 0, 1, 1, 1],
        4: [0, 1, -1, 1, 1, 0, 1, 1, -1],
    },
    bottom: {
        1: [0, -1, -1, -1, -1, 0, -1, -1, -1],
        2: [0, -1, -1, 1, -1, 0, 1, -1, -1],
        3: [0, -1, 1, 1, -1, 0, 1, -1, 1],
        4: [0, -1, 1, -1, -1, 0, -1, -1, 1],
    },
    east: {
        1: [1, 0, -1, 1, 1, 0, 1, 1, -1],
        2: [1, 0, 1, 1, 1, 0, 1, 1, 1],
        3: [1, 0, 1, 1, -1, 0, 1, -1, 1],
        4: [1, 0, -1, 1, -1, 0, 1, -1, -1],
    },
    west: {
        1: [-1, 0, 1, -1, 1, 0, -1, 1, 1],
        2: [-1, 0, -1, -1, 1, 0, -1, 1, -1],
        3: [-1, 0, -1, -1, -1, 0, -1, -1, -1],
        4: [-1, 0, 1, -1, -1, 0, -1, -1, 1],
    },
    north: {
        1: [1, 0, 1, 0, 1, 1, 1, 1, 1],
        2: [-1, 0, 1, 0, 1, 1, -1, 1, 1],
        3: [-1, 0, 1, 0, -1, 1, -1, -1, 1],
        4: [1, 0, 1, 0, -1, 1, 1, -1, 1],
    },
    south: {
        1: [-1, 0, -1, 0, 1, -1, -1, 1, -1],
        2: [1, 0, -1, 0, 1, -1, 1, 1, -1],
        3: [1, 0, -1, 0, -1, -1, 1, -1, -1],
        4: [-1, 0, -1, 0, -1, -1, -1, -1, -1],
    },
};
const handleAdd = (data, face) => {
    if (data.faceStates[face] == 1) {
        data.aoTemplate.push(vertexStates[2].value, vertexStates[1].value, vertexStates[4].value, vertexStates[3].value);
    }
    else {
        data.aoTemplate.push(vertexStates[1].value, vertexStates[2].value, vertexStates[3].value, vertexStates[4].value);
    }
};
export function CalculateVoxelAO(data, voxelData, tx, ty, tz) {
    if (data.exposedFaces[0]) {
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.top[1], 1);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.top[2], 2);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.top[3], 3);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.top[4], 4);
        handleAdd(data, 0);
    }
    if (data.exposedFaces[1]) {
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.bottom[1], 1);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.bottom[2], 2);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.bottom[3], 3);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.bottom[4], 4);
        handleAdd(data, 1);
    }
    if (data.exposedFaces[2]) {
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.east[1], 1);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.east[2], 2);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.east[3], 3);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.east[4], 4);
        handleAdd(data, 2);
    }
    if (data.exposedFaces[3]) {
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.west[1], 1);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.west[2], 2);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.west[3], 3);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.west[4], 4);
        handleAdd(data, 3);
    }
    if (data.exposedFaces[4]) {
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.south[1], 1);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.south[2], 2);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.south[3], 3);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.south[4], 4);
        handleAdd(data, 4);
    }
    if (data.exposedFaces[5]) {
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.north[1], 1);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.north[2], 2);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.north[3], 3);
        this.voxelAOCalc(voxelData, tx, ty, tz, AOCheckSets.north[4], 4);
        handleAdd(data, 5);
    }
}
export function voxelAOCalc(voxelData, tx, ty, tz, checkSet, vertex) {
    //vertexStates[vertex].value = 1;
    let value = 1;
    for (let i = 0; i < 9; i += 3) {
        const checkVoxel = this.worldMatrix.getVoxelData(checkSet[i] + tx, checkSet[i + 1] + ty, checkSet[i + 2] + tz);
        //console.log(checkSet[i] + tx, checkSet[i + 1] + ty, checkSet[i + 2] + tz);
        if (!checkVoxel) {
            continue;
        }
        if (voxelData.substance == "transparent" || voxelData.substance == "solid") {
            if (checkVoxel.substance != "solid" &&
                checkVoxel.substance != "transparent") {
                continue;
            }
        }
        else {
            if (checkVoxel.substance !== voxelData.substance) {
                continue;
            }
        }
        value *= 0.65;
    }
    vertexStates[vertex].value = value;
}
