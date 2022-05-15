//objects
import { Util } from "../../Global/Util.helper.js";
/**# Shape Helper
 * ---
 * A class that holds needed function shared betweeen different voxel shapes.
 */
export const ShapeHelper = {
    infoByte: Util.getInfoByte(),
    lightByte: Util.getLightByte(),
    //Use for producing the light gradient
    lightMap: [
        0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64, 0.74,
        0.85, 0.97, 1,
    ],
    exposedFaceRecord: {
        top: 0,
        bottom: 1,
        west: 2,
        east: 3,
        north: 4,
        south: 5,
    },
    isFaceExposexd(voxelExposedFaceEncodedBit, faceDirection) {
        this.infoByte.setNumberValue(voxelExposedFaceEncodedBit);
        return this.infoByte.getBit(this.exposedFaceRecord[faceDirection]) == 1;
    },
    processReturnData(shapeData, returnData) {
        shapeData.indicieIndex = returnData.newIndicieIndex;
        shapeData.uvTemplateIndex = returnData.newUVTemplateIndex;
        shapeData.lightIndex = returnData.newlightIndex;
        shapeData.aoIndex = returnData.newAOIndex;
        shapeData.colorIndex = returnData.newColorIndex;
    },
    produceShapeReturnData(shapeData) {
        return {
            newIndicieIndex: shapeData.indicieIndex,
            newUVTemplateIndex: shapeData.uvTemplateIndex,
            newColorIndex: shapeData.colorIndex,
            newlightIndex: shapeData.lightIndex,
            newAOIndex: shapeData.aoIndex,
        };
    },
    toLinearSpace(r, g, b, a) {
        r = r ** 2.2;
        g = g ** 2.2;
        b = b ** 2.2;
        a = a * 1;
        return [r, g, b, a];
    },
    calculateLightColor(RGBlightColors, sunlightColors, lightTemplate, startIndex) {
        const alpha = 1;
        for (let v = 0; v < 4; v++) {
            const values = this.lightByte.getLightValues(lightTemplate[startIndex + v]);
            const w = this.lightMap[values[0]];
            const r = this.lightMap[values[1]];
            const g = this.lightMap[values[2]];
            const b = this.lightMap[values[3]];
            sunlightColors.push(w, w, w, 1);
            RGBlightColors.push(r, g, b, alpha);
        }
    },
    calculateSunightColor(sunLight, sunLightTemplate, sunLightIndex) {
        for (let v = 0; v < 4; v++) {
            const values = this.lightByte.getLightValues(sunLightTemplate[sunLightIndex + v]);
            const w = this.lightMap[values[0]];
            sunLight.push(w, w, w, 1);
        }
    },
    calculateAOColor(colors, chunkAmbientOcculusion, startIndex) {
        const Cr = 1;
        const Cg = 1;
        const Cb = 1;
        const Ca = 1;
        for (let v = 0; v < 4; v++) {
            const aColor = chunkAmbientOcculusion[startIndex + v];
            const Ar = aColor * Cr;
            const Ag = aColor * Cg;
            const Ab = aColor * Cb;
            const Aa = aColor * Ca;
            const newColor = this.toLinearSpace(Ar, Ag, Ab, Aa);
            colors.push(newColor[0], newColor[1], newColor[2], 1);
        }
    },
};
