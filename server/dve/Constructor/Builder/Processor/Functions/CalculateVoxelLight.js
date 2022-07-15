import { Util } from "../../../../Global/Util.helper.js";
const lightByte = Util.getLightByte();
const RGBvertexStates = {
    1: {
        totalZero: false,
        value: 0,
    },
    2: {
        totalZero: false,
        value: 0,
    },
    3: {
        totalZero: false,
        value: 0,
    },
    4: {
        totalZero: false,
        value: 0,
    },
};
const sunVertexStates = {
    1: {
        totalZero: false,
        value: 0,
    },
    2: {
        totalZero: false,
        value: 0,
    },
    3: {
        totalZero: false,
        value: 0,
    },
    4: {
        totalZero: false,
        value: 0,
    },
};
const AOVerotexStates = {
    1: {
        totalZero: false,
        value: 1,
    },
    2: {
        totalZero: false,
        value: 1,
    },
    3: {
        totalZero: false,
        value: 1,
    },
    4: {
        totalZero: false,
        value: 1,
    },
};
const flipCheck = () => {
    let t1 = !RGBvertexStates[1].totalZero &&
        RGBvertexStates[2].totalZero &&
        RGBvertexStates[3].totalZero &&
        RGBvertexStates[4].totalZero;
    let t2 = RGBvertexStates[1].totalZero &&
        RGBvertexStates[2].totalZero &&
        !RGBvertexStates[3].totalZero &&
        RGBvertexStates[4].totalZero;
    return t1 || t2;
};
const handleAdd = (data, face) => {
    if (flipCheck()) {
        data.faceStates[face] = 1;
        data.lightTemplate.push(RGBvertexStates[2].value, RGBvertexStates[1].value, RGBvertexStates[4].value, RGBvertexStates[3].value);
        if (!states.ignoreAO) {
            data.aoTemplate.push(AOVerotexStates[4].value, AOVerotexStates[1].value, AOVerotexStates[2].value, AOVerotexStates[3].value);
        }
    }
    else {
        data.lightTemplate.push(RGBvertexStates[1].value, RGBvertexStates[2].value, RGBvertexStates[3].value, RGBvertexStates[4].value);
        if (!states.ignoreAO) {
            data.aoTemplate.push(AOVerotexStates[1].value, AOVerotexStates[2].value, AOVerotexStates[3].value, AOVerotexStates[4].value);
        }
    }
};
const checkSets = {
    top: {
        1: [-1, 1, 0, 0, 1, -1, -1, 1, -1],
        2: [-1, 1, 0, 0, 1, 1, -1, 1, 1],
        3: [1, 1, 0, 0, 1, 1, 1, 1, 1],
        4: [1, 1, 0, 0, 1, -1, 1, 1, -1],
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
    south: {
        1: [-1, 0, -1, 0, 1, -1, -1, 1, -1],
        2: [1, 0, -1, 0, 1, -1, 1, 1, -1],
        3: [1, 0, -1, 0, -1, -1, 1, -1, -1],
        4: [-1, 0, -1, 0, -1, -1, -1, -1, -1],
    },
    north: {
        1: [1, 0, 1, 0, 1, 1, 1, 1, 1],
        2: [-1, 0, 1, 0, 1, 1, -1, 1, 1],
        3: [-1, 0, 1, 0, -1, 1, -1, -1, 1],
        4: [1, 0, 1, 0, -1, 1, 1, -1, 1],
    },
};
const states = { ignoreAO: false };
const newRGBValues = [];
const newSunValues = [];
const zeroCheck = { s: 0, r: 0, g: 0, b: 0 };
const currentVoxelData = {
    light: 0,
    voxelData: false,
};
const RGBValues = { r: 0, g: 0, b: 0 };
const sunValues = { s: 0 };
const nlValues = { s: 0, r: 0, g: 0, b: 0 };
const AOValues = { a: 0 };
export function CalculateVoxelLight(data, tx, ty, tz, ignoreAO = false, LOD = 2) {
    if (this.settings.doAO && !ignoreAO) {
        currentVoxelData.voxelData = this.worldMatrix.getVoxelData(tx, ty, tz);
    }
    if (ignoreAO || !this.settings.doAO) {
        states.ignoreAO = true;
    }
    else {
        states.ignoreAO = false;
    }
    //top
    if (data.exposedFaces[0]) {
        currentVoxelData.light = this.worldMatrix.getLight(tx, ty + 1, tz);
        this.voxellightMixCalc(tx, ty, tz, checkSets.top[1], 1, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.top[2], 2, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.top[3], 3, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.top[4], 4, LOD);
        handleAdd(data, 0);
    }
    //bottom
    if (data.exposedFaces[1]) {
        currentVoxelData.light = this.worldMatrix.getLight(tx, ty - 1, tz);
        this.voxellightMixCalc(tx, ty, tz, checkSets.bottom[1], 1, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.bottom[2], 2, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.bottom[3], 3, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.bottom[4], 4, LOD);
        handleAdd(data, 1);
    }
    //east
    if (data.exposedFaces[2]) {
        currentVoxelData.light = this.worldMatrix.getLight(tx + 1, ty, tz);
        this.voxellightMixCalc(tx, ty, tz, checkSets.east[1], 1, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.east[2], 2, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.east[3], 3, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.east[4], 4, LOD);
        handleAdd(data, 2);
    }
    //west
    if (data.exposedFaces[3]) {
        currentVoxelData.light = this.worldMatrix.getLight(tx - 1, ty, tz);
        this.voxellightMixCalc(tx, ty, tz, checkSets.west[1], 1, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.west[2], 2, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.west[3], 3, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.west[4], 4, LOD);
        handleAdd(data, 3);
    }
    //south
    if (data.exposedFaces[4]) {
        currentVoxelData.light = this.worldMatrix.getLight(tx, ty, tz - 1);
        this.voxellightMixCalc(tx, ty, tz, checkSets.south[1], 1, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.south[2], 2, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.south[3], 3, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.south[4], 4, LOD);
        handleAdd(data, 4);
    }
    //north
    if (data.exposedFaces[5]) {
        currentVoxelData.light = this.worldMatrix.getLight(tx, ty, tz + 1);
        this.voxellightMixCalc(tx, ty, tz, checkSets.north[1], 1, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.north[2], 2, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.north[3], 3, LOD);
        this.voxellightMixCalc(tx, ty, tz, checkSets.north[4], 4, LOD);
        handleAdd(data, 5);
    }
}
const doRGB = (neighborLightValue) => {
    if (nlValues.r == 0)
        zeroCheck.r++;
    if (nlValues.g == 0)
        zeroCheck.g++;
    if (nlValues.b == 0)
        zeroCheck.b++;
    if (!neighborLightValue)
        return;
    if (nlValues.r < RGBValues.r && RGBValues.r > 0) {
        RGBValues.r--;
    }
    if (nlValues.r > RGBValues.r && RGBValues.r < 15) {
        RGBValues.r++;
    }
    if (nlValues.g < RGBValues.g && RGBValues.g > 0) {
        RGBValues.g--;
    }
    if (nlValues.g > RGBValues.g && RGBValues.g < 15) {
        RGBValues.g++;
    }
    if (nlValues.b < RGBValues.b && RGBValues.b > 0) {
        RGBValues.b--;
    }
    if (nlValues.b > RGBValues.b && RGBValues.b < 15) {
        RGBValues.b++;
    }
};
const doSun = (neighborLightValue) => {
    if (nlValues.s == 0)
        zeroCheck.s++;
    if (!neighborLightValue)
        return;
    if (nlValues.s < sunValues.s && sunValues.s > 0) {
        sunValues.s--;
    }
    if (nlValues.s > sunValues.s && sunValues.s < 15) {
        sunValues.s++;
    }
};
const lightEnd = (vertex) => {
    let zeroTolerance = 2;
    let totalZero = true;
    if (zeroCheck.s >= zeroTolerance) {
        sunVertexStates[vertex].totalZero = true;
        newRGBValues[0] = 0;
    }
    else {
        sunVertexStates[vertex].totalZero = false;
        newRGBValues[0] = sunValues.s;
    }
    if (zeroCheck.r >= zeroTolerance) {
        newRGBValues[1] = 0;
    }
    else {
        totalZero = false;
        newRGBValues[1] = RGBValues.r;
    }
    if (zeroCheck.g >= zeroTolerance) {
        newRGBValues[2] = 0;
    }
    else {
        totalZero = false;
        newRGBValues[2] = RGBValues.g;
    }
    if (zeroCheck.b >= zeroTolerance) {
        newRGBValues[3] = 0;
    }
    else {
        totalZero = false;
        newRGBValues[3] = RGBValues.b;
    }
    const returnValue = lightByte.setLightValues(newRGBValues);
    RGBvertexStates[vertex].totalZero = totalZero;
    RGBvertexStates[vertex].value = returnValue;
    zeroCheck.s = 0;
    zeroCheck.r = 0;
    zeroCheck.b = 0;
    zeroCheck.g = 0;
};
const doAO = (checkVoxel) => {
    if (!checkVoxel || !currentVoxelData.voxelData) {
        return;
    }
    const voxel = currentVoxelData.voxelData;
    if (voxel.substance == "transparent" || voxel.substance == "solid") {
        if (checkVoxel.substance != "solid" &&
            checkVoxel.substance != "transparent") {
            return;
        }
    }
    else {
        if (checkVoxel.substance !== voxel.substance) {
            return;
        }
    }
    AOValues.a *= 0.65;
};
const AOEnd = (vertex) => {
    AOVerotexStates[vertex].value = AOValues.a;
};
export function VoxelLightMixCalc(x, y, z, checkSet, vertex, LOD = 1) {
    if (this.settings.doRGB || this.settings.doSun) {
        const values = this.lightByte.getLightValues(currentVoxelData.light);
        if (this.settings.doSun) {
            sunValues.s = values[0];
            if (sunValues.s == 0)
                zeroCheck.s++;
        }
        if (this.settings.doRGB) {
            RGBValues.r = values[1];
            if (RGBValues.r == 0)
                zeroCheck.r++;
            RGBValues.g = values[2];
            if (RGBValues.g == 0)
                zeroCheck.g++;
            RGBValues.b = values[3];
            if (RGBValues.b == 0)
                zeroCheck.b++;
        }
    }
    if (!states.ignoreAO) {
        AOValues.a = 1;
    }
    for (let i = 0; i < 9; i += 3) {
        const cx = checkSet[i] * LOD + x;
        const cy = checkSet[i + 1] * LOD + y;
        const cz = checkSet[i + 2] * LOD + z;
        if (this.settings.doRGB || this.settings.doSun) {
            const nl = this.worldMatrix.getLight(cx, cy, cz);
            if (nl != -1) {
                const values = lightByte.getLightValues(nl);
                nlValues.s = values[0];
                nlValues.r = values[1];
                nlValues.g = values[2];
                nlValues.b = values[3];
                if (this.settings.doRGB) {
                    doRGB(lightByte.removeS(nl));
                }
                if (this.settings.doSun) {
                    doSun(lightByte.getS(nl));
                }
            }
        }
        if (!states.ignoreAO) {
            const checkVoxel = this.worldMatrix.getVoxelData(cx, cy, cz);
            doAO(checkVoxel);
        }
    }
    if (this.settings.doSun || this.settings.doRGB) {
        lightEnd(vertex);
    }
    if (this.settings.doAO) {
        AOEnd(vertex);
    }
}
