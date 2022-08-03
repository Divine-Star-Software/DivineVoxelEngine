import { Processor } from "../Processor.js";
import { Util } from "../../../../Global/Util.helper.js";
import { DVEC } from "../../../DivineVoxelEngineConstructor.js";
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
        totalLight: false,
        value: 1,
    },
    2: {
        totalLight: false,
        value: 1,
    },
    3: {
        totalLight: false,
        value: 1,
    },
    4: {
        totalLight: false,
        value: 1,
    },
};
const swapSun = () => {
    let v1 = lightByte.getS(RGBvertexStates[1].value);
    let v2 = lightByte.getS(RGBvertexStates[2].value);
    let v3 = lightByte.getS(RGBvertexStates[3].value);
    let v4 = lightByte.getS(RGBvertexStates[4].value);
    RGBvertexStates[1].value = lightByte.setS(v1, RGBvertexStates[1].value);
    RGBvertexStates[2].value = lightByte.setS(v4, RGBvertexStates[2].value);
    RGBvertexStates[3].value = lightByte.setS(v3, RGBvertexStates[3].value);
    RGBvertexStates[4].value = lightByte.setS(v2, RGBvertexStates[4].value);
};
const swapRGB = () => {
    let v1 = lightByte.getRGB(RGBvertexStates[1].value);
    let v2 = lightByte.getRGB(RGBvertexStates[2].value);
    let v3 = lightByte.getRGB(RGBvertexStates[3].value);
    let v4 = lightByte.getRGB(RGBvertexStates[4].value);
    RGBvertexStates[2].value = lightByte.setRGB(v4, RGBvertexStates[2].value);
    RGBvertexStates[1].value = lightByte.setRGB(v1, RGBvertexStates[1].value);
    RGBvertexStates[4].value = lightByte.setRGB(v2, RGBvertexStates[4].value);
    RGBvertexStates[3].value = lightByte.setRGB(v3, RGBvertexStates[3].value);
};
const swapAO = () => {
    let v1 = AOVerotexStates[1].value;
    let v2 = AOVerotexStates[2].value;
    let v3 = AOVerotexStates[3].value;
    let v4 = AOVerotexStates[4].value;
    AOVerotexStates[1].value = v1;
    AOVerotexStates[2].value = v2;
    AOVerotexStates[3].value = v3;
    AOVerotexStates[4].value = v4;
};
const shouldRGBFlip = () => {
    let t1 = !RGBvertexStates[1].totalZero &&
        RGBvertexStates[2].totalZero &&
        RGBvertexStates[3].totalZero &&
        RGBvertexStates[4].totalZero;
    let t2 = RGBvertexStates[1].totalZero &&
        RGBvertexStates[2].totalZero &&
        !RGBvertexStates[3].totalZero &&
        RGBvertexStates[4].totalZero;
    let t3 = !RGBvertexStates[1].totalZero &&
        RGBvertexStates[2].totalZero &&
        !RGBvertexStates[3].totalZero &&
        RGBvertexStates[4].totalZero;
    return t1 || t2 || t3;
};
const shouldSunFlip = () => {
    if (Processor.settings.ignoreSun)
        return false;
    let t1 = !sunVertexStates[1].totalZero &&
        sunVertexStates[2].totalZero &&
        sunVertexStates[3].totalZero &&
        sunVertexStates[4].totalZero;
    let t2 = sunVertexStates[1].totalZero &&
        sunVertexStates[2].totalZero &&
        !sunVertexStates[3].totalZero &&
        sunVertexStates[4].totalZero;
    let t3 = !sunVertexStates[1].totalZero &&
        sunVertexStates[2].totalZero &&
        !sunVertexStates[3].totalZero &&
        sunVertexStates[4].totalZero;
    return t1 || t2 || t3;
};
const shouldAOFlip = () => {
    let check = false;
    if (!states.ignoreAO) {
        let t1 = !AOVerotexStates[1].totalLight &&
            AOVerotexStates[2].totalLight &&
            AOVerotexStates[3].totalLight &&
            AOVerotexStates[4].totalLight;
        let t2 = AOVerotexStates[1].totalLight &&
            AOVerotexStates[2].totalLight &&
            !AOVerotexStates[3].totalLight &&
            AOVerotexStates[4].totalLight;
        let t3 = !AOVerotexStates[1].totalLight &&
            AOVerotexStates[2].totalLight &&
            !AOVerotexStates[3].totalLight &&
            AOVerotexStates[4].totalLight;
        check = t1 || t2 || t3;
    }
    return check;
};
const flipCheck = () => {
    const rgbFlip = shouldRGBFlip();
    const sunFlip = shouldSunFlip();
    if (rgbFlip && !sunFlip) {
        swapSun();
    }
    if (!rgbFlip && sunFlip) {
        swapRGB();
    }
    const aoFlip = shouldAOFlip();
    if ((sunFlip || rgbFlip) && !aoFlip) {
        swapAO();
    }
    if (!sunFlip && aoFlip) {
        swapSun();
    }
    if (!rgbFlip && aoFlip) {
        swapRGB();
    }
    return rgbFlip || sunFlip || aoFlip;
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
const zeroCheck = { s: 0, r: 0, g: 0, b: 0 };
const currentVoxelData = {
    light: 0,
    voxelData: false,
    voxelObject: false,
    shapeState: 0,
    currentShape: false,
    x: 0,
    y: 0,
    z: 0,
};
const RGBValues = { r: 0, g: 0, b: 0 };
const sunValues = { s: 0 };
const nlValues = { s: 0, r: 0, g: 0, b: 0 };
const AOValues = { a: 0 };
const fallBackLight = (processor, x, y, z) => {
    const light = processor.getLight(x, y, z);
    if (light >= 0) {
        currentVoxelData.light = light;
    }
    else {
        currentVoxelData.light = 0;
    }
};
export function CalculateVoxelLight(data, tx, ty, tz, ignoreAO = false, LOD = 2) {
    if (this.settings.doAO && !ignoreAO) {
        const voxelId = this.getVoxel(tx, ty, tz);
        if (voxelId) {
            const voxel = DVEC.voxelManager.getVoxel(voxelId[0]);
            currentVoxelData.voxelObject = voxel;
            currentVoxelData.voxelData = voxel.data;
            currentVoxelData.currentShape = DVEC.DVEB.shapeManager.getShape(voxel.trueShapeId);
        }
        currentVoxelData.shapeState = this.getVoxelShapeState(tx, ty, tz);
        currentVoxelData.x = tx;
        currentVoxelData.y = ty;
        currentVoxelData.z = tz;
        AOVerotexStates[1].value = 1;
        AOVerotexStates[2].value = 1;
        AOVerotexStates[3].value = 1;
        AOVerotexStates[4].value = 1;
        AOVerotexStates[1].totalLight = true;
        AOVerotexStates[2].totalLight = true;
        AOVerotexStates[3].totalLight = true;
        AOVerotexStates[4].totalLight = true;
    }
    if (ignoreAO || !this.settings.doAO) {
        states.ignoreAO = true;
    }
    else {
        states.ignoreAO = false;
    }
    //top
    if (data.exposedFaces[0]) {
        currentVoxelData.light = this.getLight(tx, ty + 1, tz);
        if (currentVoxelData.light < 0) {
            fallBackLight(this, tx, ty, tz);
        }
        this.voxellightMixCalc("top", tx, ty, tz, checkSets.top[1], 1, LOD);
        this.voxellightMixCalc("top", tx, ty, tz, checkSets.top[2], 2, LOD);
        this.voxellightMixCalc("top", tx, ty, tz, checkSets.top[3], 3, LOD);
        this.voxellightMixCalc("top", tx, ty, tz, checkSets.top[4], 4, LOD);
        handleAdd(data, 0);
    }
    //bottom
    if (data.exposedFaces[1]) {
        currentVoxelData.light = this.getLight(tx, ty - 1, tz);
        if (currentVoxelData.light < 0) {
            fallBackLight(this, tx, ty, tz);
        }
        this.voxellightMixCalc("bottom", tx, ty, tz, checkSets.bottom[1], 1, LOD);
        this.voxellightMixCalc("bottom", tx, ty, tz, checkSets.bottom[2], 2, LOD);
        this.voxellightMixCalc("bottom", tx, ty, tz, checkSets.bottom[3], 3, LOD);
        this.voxellightMixCalc("bottom", tx, ty, tz, checkSets.bottom[4], 4, LOD);
        handleAdd(data, 1);
    }
    //east
    if (data.exposedFaces[2]) {
        currentVoxelData.light = this.getLight(tx + 1, ty, tz);
        if (currentVoxelData.light < 0) {
            fallBackLight(this, tx, ty, tz);
        }
        this.voxellightMixCalc("east", tx, ty, tz, checkSets.east[1], 1, LOD);
        this.voxellightMixCalc("east", tx, ty, tz, checkSets.east[2], 2, LOD);
        this.voxellightMixCalc("east", tx, ty, tz, checkSets.east[3], 3, LOD);
        this.voxellightMixCalc("east", tx, ty, tz, checkSets.east[4], 4, LOD);
        handleAdd(data, 2);
    }
    //west
    if (data.exposedFaces[3]) {
        currentVoxelData.light = this.getLight(tx - 1, ty, tz);
        if (currentVoxelData.light < 0) {
            fallBackLight(this, tx, ty, tz);
        }
        this.voxellightMixCalc("west", tx, ty, tz, checkSets.west[1], 1, LOD);
        this.voxellightMixCalc("west", tx, ty, tz, checkSets.west[2], 2, LOD);
        this.voxellightMixCalc("west", tx, ty, tz, checkSets.west[3], 3, LOD);
        this.voxellightMixCalc("west", tx, ty, tz, checkSets.west[4], 4, LOD);
        handleAdd(data, 3);
    }
    //south
    if (data.exposedFaces[4]) {
        currentVoxelData.light = this.getLight(tx, ty, tz - 1);
        if (currentVoxelData.light < 0) {
            fallBackLight(this, tx, ty, tz);
        }
        this.voxellightMixCalc("south", tx, ty, tz, checkSets.south[1], 1, LOD);
        this.voxellightMixCalc("south", tx, ty, tz, checkSets.south[2], 2, LOD);
        this.voxellightMixCalc("south", tx, ty, tz, checkSets.south[3], 3, LOD);
        this.voxellightMixCalc("south", tx, ty, tz, checkSets.south[4], 4, LOD);
        handleAdd(data, 4);
    }
    //north
    if (data.exposedFaces[5]) {
        currentVoxelData.light = this.getLight(tx, ty, tz + 1);
        if (currentVoxelData.light < 0) {
            fallBackLight(this, tx, ty, tz);
        }
        this.voxellightMixCalc("north", tx, ty, tz, checkSets.north[1], 1, LOD);
        this.voxellightMixCalc("north", tx, ty, tz, checkSets.north[2], 2, LOD);
        this.voxellightMixCalc("north", tx, ty, tz, checkSets.north[3], 3, LOD);
        this.voxellightMixCalc("north", tx, ty, tz, checkSets.north[4], 4, LOD);
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
    if (nlValues.r > RGBValues.r && RGBValues.r < 15) {
        RGBValues.r++;
    }
    if (nlValues.g > RGBValues.g && RGBValues.g < 15) {
        RGBValues.g++;
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
    if (sunValues.s < nlValues.s && sunValues.s < 15) {
        sunValues.s += lightByte.SRS;
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
const doAO = (face, vertex, x, y, z) => {
    const neighborVoxelId = Processor.getVoxel(x, y, z);
    if (!neighborVoxelId)
        return;
    if (neighborVoxelId[0] == "dve:air")
        return;
    const neighborVoxel = DVEC.voxelManager.getVoxel(neighborVoxelId[0]);
    if (!neighborVoxel || !currentVoxelData.voxelData) {
        return;
    }
    let finalResult = false;
    let substanceRuleResult = true;
    const voxel = currentVoxelData.voxelData;
    if (voxel.substance == "transparent" || voxel.substance == "solid") {
        if (neighborVoxel.data.substance != "solid" &&
            neighborVoxel.data.substance != "transparent") {
            substanceRuleResult = false;
        }
    }
    else {
        if (neighborVoxel.data.substance !== voxel.substance) {
            substanceRuleResult = false;
        }
    }
    const neighborVoxelShape = DVEC.DVEB.shapeManager.getShape(neighborVoxel.trueShapeId);
    const neighborVoxelShapeState = Processor.getVoxelShapeState(x, y, z);
    const aoCheckData = {
        face: face,
        substanceResult: substanceRuleResult,
        shapeState: currentVoxelData.shapeState,
        voxel: currentVoxelData.voxelData,
        neighborVoxel: neighborVoxel.data,
        neighborVoxelShape: neighborVoxelShape,
        neighborVoxelShapeState: neighborVoxelShapeState,
        x: currentVoxelData.x,
        y: currentVoxelData.y,
        z: currentVoxelData.z,
        nx: x,
        ny: y,
        nz: z,
    };
    if (currentVoxelData.currentShape) {
        finalResult = currentVoxelData.currentShape.aoOverRide(aoCheckData);
    }
    if (currentVoxelData.voxelObject && currentVoxelData.voxelObject.aoOverRide) {
        finalResult = currentVoxelData.voxelObject.aoOverRide(aoCheckData);
    }
    if (finalResult) {
        AOVerotexStates[vertex].totalLight = false;
        AOValues.a *= 0.65;
    }
};
const AOEnd = (vertex) => {
    AOVerotexStates[vertex].value = AOValues.a;
};
export function VoxelLightMixCalc(face, x, y, z, checkSet, vertex, LOD = 1) {
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
            const nl = this.getLight(cx, cy, cz);
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
            doAO(face, vertex, cx, cy, cz);
        }
    }
    if (this.settings.doSun || this.settings.doRGB) {
        lightEnd(vertex);
    }
    if (this.settings.doAO) {
        AOEnd(vertex);
    }
}
