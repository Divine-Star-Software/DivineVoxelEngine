import { OverrideManager } from "../../Rules/Overrides/OverridesManager.js";
import { FaceNormals } from "../../../../Data/Constants/Util/Faces.js";
import { LightData } from "../../../../Data/Light/LightByte.js";
import { QuadVertexData } from "../../Classes/VertexData.js";
import { SubstanceRules } from "../../Rules/SubstanceRules.js";
const LD = LightData;
const LightValue = new QuadVertexData();
const RGBState = new QuadVertexData();
const SunState = new QuadVertexData();
const AOValue = new QuadVertexData();
const AOState = new QuadVertexData();
const swapSun = () => {
    LightValue.set(LD.setS(LD.getS(LightValue.vetexes[4]), LightValue.vetexes[1]), LD.setS(LD.getS(LightValue.vetexes[1]), LightValue.vetexes[2]), LD.setS(LD.getS(LightValue.vetexes[2]), LightValue.vetexes[3]), LD.setS(LD.getS(LightValue.vetexes[3]), LightValue.vetexes[4]));
};
const swapRGB = () => {
    LightValue.set(LD.setRGB(LD.getRGB(LightValue.vetexes[4]), LightValue.vetexes[1]), LD.setRGB(LD.getRGB(LightValue.vetexes[1]), LightValue.vetexes[2]), LD.setRGB(LD.getRGB(LightValue.vetexes[2]), LightValue.vetexes[3]), LD.setRGB(LD.getRGB(LightValue.vetexes[3]), LightValue.vetexes[4]));
};
const swapAO = () => {
    AOValue.set(AOValue.vetexes[1], AOValue.vetexes[2], AOValue.vetexes[3], AOValue.vetexes[4]);
};
const shouldAOFlip = (face) => {
    if (LightGradient.settings.doAO)
        return false;
    LightGradient.tool.faceDataOverride.face = face;
    LightGradient.tool.faceDataOverride.default = false;
    if (OverrideManager.runOverride("AOFlipFace", LightGradient.tool.voxel.getShapeId(), "Any", LightGradient.tool.faceDataOverride)) {
        return false;
    }
    let check = false;
    if (!states.ignoreAO) {
        check = AOState.isEqualTo(0, 1, 1, 1);
        AOState.isEqualTo(1, 1, 0, 1) || AOState.isEqualTo(0, 1, 0, 1);
    }
    return check;
};
const flipCheck = (face) => {
    const rgbFlip = RGBState.isEqualTo(0, 1, 1, 1) ||
        RGBState.isEqualTo(1, 1, 0, 1) ||
        RGBState.isEqualTo(0, 1, 0, 1);
    const sunFlip = SunState.isEqualTo(0, 1, 1, 1) ||
        SunState.isEqualTo(1, 1, 0, 1) ||
        SunState.isEqualTo(0, 1, 0, 1);
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
const RGBValues = { r: 0, g: 0, b: 0 };
const sunValues = { s: 0 };
const nlValues = { s: 0, r: 0, g: 0, b: 0 };
const AOValues = { a: 0 };
export const LightGradient = {
    tool: {},
    settings: {
        doAO: true,
        doRGB: true,
        doSun: true,
    },
    calculate(face, tool, ignoreAO) {
        this.tool = tool;
        const voxelSubstance = SubstanceRules.getSubstanceParent(tool.voxel.getSubstance());
        const isLightSource = tool.voxel.isLightSource();
        let light = tool.voxel.getLight();
        let aoOverRide = -1;
        if (this.settings.doAO && !ignoreAO) {
            AOValue.setAll(1);
            AOState.setAll(1);
            states.ignoreAO = false;
        }
        else {
            states.ignoreAO = true;
        }
        const faceNormal = FaceNormals[face];
        tool.nVoxel.loadInAt(tool.voxel.x + faceNormal[0], tool.voxel.y + faceNormal[1], tool.voxel.z + faceNormal[2]);
        light = tool.nVoxel.getLight();
        if (light < 0) {
            if (tool.voxel.getLight() >= 0) {
                light = tool.voxel.getLight();
            }
            else {
                light = 0;
            }
        }
        if (tool.nVoxel.isRenderable() && !tool.nVoxel.isLightSource()) {
            tool.faceDataOverride.face = face;
            tool.faceDataOverride.default = false;
            if (OverrideManager.runOverride("DarkenFaceUnderneath", tool.nVoxel.getShapeId(), "All", tool.faceDataOverride)) {
                aoOverRide = 2;
            }
        }
        for (let vertex = 1; vertex <= 4; vertex++) {
            const checkSet = checkSets[face][vertex];
            if (this.settings.doRGB || this.settings.doSun) {
                const values = LD.getLightValues(light);
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
                if (this.settings.doRGB || this.settings.doSun) {
                    if (!tool.nVoxel.loadInAt(checkSet[i] + tool.voxel.x, checkSet[i + 1] + tool.voxel.y, checkSet[i + 2] + tool.voxel.z))
                        continue;
                    const nl = tool.nVoxel.getLight();
                    if (nl >= 0) {
                        const values = LD.getLightValues(nl);
                        nlValues.s = values[0];
                        nlValues.r = values[1];
                        nlValues.g = values[2];
                        nlValues.b = values[3];
                        doRGB: if (this.settings.doRGB) {
                            if (nlValues.r == 0)
                                zeroCheck.r++;
                            if (nlValues.g == 0)
                                zeroCheck.g++;
                            if (nlValues.b == 0)
                                zeroCheck.b++;
                            if (!LD.removeS(nl))
                                break doRGB;
                            if (nlValues.r > RGBValues.r && RGBValues.r < 15) {
                                RGBValues.r++;
                            }
                            if (nlValues.g > RGBValues.g && RGBValues.g < 15) {
                                RGBValues.g++;
                            }
                            if (nlValues.b > RGBValues.b && RGBValues.b < 15) {
                                RGBValues.b++;
                            }
                        }
                        doSun: if (this.settings.doSun) {
                            if (nlValues.s == 0)
                                zeroCheck.s++;
                            if (!LD.getS(nl))
                                break doSun;
                            if (sunValues.s < nlValues.s && sunValues.s < 15) {
                                sunValues.s += LD.SRS;
                            }
                        }
                    }
                }
                /*
                Do AO
                */
                doAO: if (!states.ignoreAO) {
                    if (aoOverRide > 0) {
                        AOState.setVertex(vertex, 0);
                        AOValues.a = aoOverRide;
                        break doAO;
                    }
                    if (!tool.nVoxel.isRenderable())
                        break doAO;
                    const neighborVoxelSubstance = SubstanceRules.getSubstanceParent(tool.nVoxel.getSubstance());
                    const neightLightSource = tool.nVoxel.isLightSource();
                    let finalResult = true;
                    if (neighborVoxelSubstance != voxelSubstance) {
                        finalResult = false;
                    }
                    if (isLightSource || neightLightSource) {
                        finalResult = false;
                    }
                    tool.faceDataOverride.face = face;
                    tool.faceDataOverride.default = finalResult;
                    finalResult = OverrideManager.runOverride("AO", tool.voxel.getShapeId(), tool.nVoxel.getShapeId(), tool.faceDataOverride);
                    if (!finalResult)
                        break doAO;
                    AOState.setVertex(vertex, 0);
                    AOValues.a++;
                }
            }
            /*
            Light End
            */
            if (this.settings.doSun || this.settings.doRGB) {
                let zeroTolerance = 2;
                let totalZero = true;
                if (zeroCheck.s >= zeroTolerance) {
                    SunState.setVertex(vertex, 1);
                    newRGBValues[0] = 0;
                }
                else {
                    SunState.setVertex(vertex, 0);
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
                RGBState.setVertex(vertex, totalZero ? 1 : 0);
                LightValue.setVertex(vertex, LD.setLightValues(newRGBValues));
                zeroCheck.s = 0;
                zeroCheck.r = 0;
                zeroCheck.b = 0;
                zeroCheck.g = 0;
            }
            /*
            AO End
            */
            if (this.settings.doAO) {
                AOValue.setVertex(vertex, AOValues.a);
            }
        }
        if (flipCheck(face)) {
            tool
                .setFaceFlipped(true)
                .getWorldLight()
                .set(LightValue.vetexes[2], LightValue.vetexes[1], LightValue.vetexes[4], LightValue.vetexes[3]);
            if (!states.ignoreAO) {
                tool
                    .getWorldAO()
                    .set(AOValue.vetexes[4], AOValue.vetexes[1], AOValue.vetexes[2], AOValue.vetexes[3]);
            }
            return;
        }
        tool
            .setFaceFlipped(false)
            .getWorldLight()
            .set(LightValue.vetexes[1], LightValue.vetexes[2], LightValue.vetexes[3], LightValue.vetexes[4]);
        if (!states.ignoreAO) {
            tool
                .getWorldAO()
                .set(AOValue.vetexes[1], AOValue.vetexes[2], AOValue.vetexes[3], AOValue.vetexes[4]);
        }
    },
};
