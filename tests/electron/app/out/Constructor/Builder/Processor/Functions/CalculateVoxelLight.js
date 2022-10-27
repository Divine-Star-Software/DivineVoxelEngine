import { Processor } from "../Processor.js";
import { DVEC } from "../../../DivineVoxelEngineConstructor.js";
import { $3dCardinalNeighbors } from "../../../../Data/Constants/Util/CardinalNeighbors.js";
import { FaceMap } from "../../../../Data/Constants/Meshing/Faces.js";
import { LightData } from "../../../../Data/Light/LightByte.js";
const LD = LightData;
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
    let v1 = LD.getS(RGBvertexStates[1].value);
    let v2 = LD.getS(RGBvertexStates[2].value);
    let v3 = LD.getS(RGBvertexStates[3].value);
    let v4 = LD.getS(RGBvertexStates[4].value);
    RGBvertexStates[1].value = LD.setS(v1, RGBvertexStates[1].value);
    RGBvertexStates[2].value = LD.setS(v4, RGBvertexStates[2].value);
    RGBvertexStates[3].value = LD.setS(v3, RGBvertexStates[3].value);
    RGBvertexStates[4].value = LD.setS(v2, RGBvertexStates[4].value);
};
const swapRGB = () => {
    let v1 = LD.getRGB(RGBvertexStates[1].value);
    let v2 = LD.getRGB(RGBvertexStates[2].value);
    let v3 = LD.getRGB(RGBvertexStates[3].value);
    let v4 = LD.getRGB(RGBvertexStates[4].value);
    RGBvertexStates[2].value = LD.setRGB(v4, RGBvertexStates[2].value);
    RGBvertexStates[1].value = LD.setRGB(v1, RGBvertexStates[1].value);
    RGBvertexStates[4].value = LD.setRGB(v2, RGBvertexStates[4].value);
    RGBvertexStates[3].value = LD.setRGB(v3, RGBvertexStates[3].value);
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
const shouldAOFlip = (face) => {
    if (currentVoxelData.currentShape) {
        if (currentVoxelData.currentShape.aoFlipOverride({
            face: face,
            shapeState: currentVoxelData.shapeState,
        })) {
            return false;
        }
    }
    else {
    }
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
const flipCheck = (face) => {
    const rgbFlip = shouldRGBFlip();
    const sunFlip = shouldSunFlip();
    if (rgbFlip && !sunFlip) {
        swapSun();
    }
    if (!rgbFlip && sunFlip) {
        swapRGB();
    }
    const aoFlip = shouldAOFlip(face);
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
const handleAdd = (data, face, direction) => {
    if (flipCheck(direction)) {
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
    isLightSource: false,
    voxelSubstance: "solid",
    voxelId: "",
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
export function CalculateVoxelLight(data, tx, ty, tz, ignoreAO = false, LOD = 2) {
    if (this.settings.doAO && !ignoreAO) {
        if (this.mDataTool.isRenderable()) {
            const voxelId = this.mDataTool.getStringId();
            const voxelObject = DVEC.voxelManager.getVoxel(voxelId);
            currentVoxelData.voxelId = voxelId;
            currentVoxelData.voxelObject = voxelObject;
            currentVoxelData.voxelSubstance = this.mDataTool.getSubstance();
            currentVoxelData.isLightSource = this.mDataTool.isLightSource();
            const shapeId = this.mDataTool.getShapeId();
            currentVoxelData.currentShape = DVEC.DVEB.shapeManager.getShape(shapeId);
        }
        currentVoxelData.shapeState = this.mDataTool.getShapeState();
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
    const currentLight = this.mDataTool.getLight();
    let faceIndex = 0;
    for (const point of $3dCardinalNeighbors) {
        if (data.exposedFaces[faceIndex]) {
            this.nDataTool.loadIn(point[0] + tx, point[1] + ty, point[2] + tz);
            currentVoxelData.light = this.nDataTool.getLight();
            if (currentVoxelData.light < 0) {
                if (currentLight >= 0) {
                    currentVoxelData.light = currentLight;
                }
                else {
                    currentVoxelData.light = 0;
                }
            }
            const face = FaceMap[faceIndex];
            this.voxellightMixCalc(face, tx, ty, tz, checkSets[face][1], 1, LOD);
            this.voxellightMixCalc(face, tx, ty, tz, checkSets[face][2], 2, LOD);
            this.voxellightMixCalc(face, tx, ty, tz, checkSets[face][3], 3, LOD);
            this.voxellightMixCalc(face, tx, ty, tz, checkSets[face][4], 4, LOD);
            handleAdd(data, faceIndex, face);
        }
        faceIndex++;
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
        sunValues.s += LD.SRS;
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
    const returnValue = LD.setLightValues(newRGBValues);
    RGBvertexStates[vertex].totalZero = totalZero;
    RGBvertexStates[vertex].value = returnValue;
    zeroCheck.s = 0;
    zeroCheck.r = 0;
    zeroCheck.b = 0;
    zeroCheck.g = 0;
};
const doAO = (face, vertex, x, y, z) => {
    if (!Processor.nDataTool.isRenderable())
        return;
    const neighborVoxelSubstance = Processor.nDataTool.getSubstance();
    if (!currentVoxelData.voxelSubstance) {
        return;
    }
    let finalResult = false;
    let substanceRuleResult = true;
    const voxelSubstance = currentVoxelData.voxelSubstance;
    if (voxelSubstance == "transparent" || voxelSubstance == "solid") {
        if (neighborVoxelSubstance != "solid" &&
            neighborVoxelSubstance != "transparent") {
            substanceRuleResult = false;
        }
    }
    else {
        if (neighborVoxelSubstance !== voxelSubstance) {
            substanceRuleResult = false;
        }
    }
    const neightLightSource = Processor.nDataTool.isLightSource();
    if (currentVoxelData.isLightSource || neightLightSource) {
        substanceRuleResult = false;
    }
    const aoOverRide = Processor.aoOverRideData;
    aoOverRide.face = face;
    aoOverRide.substanceResult = substanceRuleResult;
    aoOverRide.shapeState = currentVoxelData.shapeState;
    aoOverRide.voxelId = currentVoxelData.voxelId;
    aoOverRide.voxelSubstance = currentVoxelData.voxelSubstance;
    aoOverRide.neighborVoxelId = Processor.nDataTool.getStringId();
    aoOverRide.neighborVoxelSubstance = neighborVoxelSubstance;
    aoOverRide.neighborVoxelShape = DVEC.DVEB.shapeManager.getShape(Processor.nDataTool.getShapeId());
    aoOverRide.neighborVoxelShapeState = Processor.nDataTool.getShapeState();
    aoOverRide.x = currentVoxelData.x;
    aoOverRide.y = currentVoxelData.y;
    aoOverRide.z = currentVoxelData.z;
    aoOverRide.nx = x;
    aoOverRide.ny = y;
    aoOverRide.nz = z;
    if (currentVoxelData.currentShape) {
        finalResult = currentVoxelData.currentShape.aoAddOverride(Processor.aoOverRideData);
    }
    if (currentVoxelData.voxelObject && currentVoxelData.voxelObject.aoOverRide) {
        finalResult = currentVoxelData.voxelObject.aoOverRide(Processor.aoOverRideData);
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
        const values = this.lightData.getLightValues(currentVoxelData.light);
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
            if (!this.nDataTool.loadIn(cx, cy, cz))
                continue;
            const nl = this.nDataTool.getLight();
            if (nl != -1) {
                const values = LD.getLightValues(nl);
                nlValues.s = values[0];
                nlValues.r = values[1];
                nlValues.g = values[2];
                nlValues.b = values[3];
                if (this.settings.doRGB) {
                    doRGB(LD.removeS(nl));
                }
                if (this.settings.doSun) {
                    doSun(LD.getS(nl));
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
