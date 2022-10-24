//objects
import { LightData } from "../../../Data/Light/LightByte.js";
import { FaceByte } from "../../../Data/Meshing/FaceByte.js";
import { MeshFaceDataByte } from "../../../Data/Meshing/MeshFaceDataBytes.js";
/**# Shape Helper
 * ---
 * A class that holds needed function shared betweeen different voxel shapes.
 */
export const ShapeHelper = {
    faceByte: FaceByte,
    lightByte: LightData,
    meshFaceData: MeshFaceDataByte,
    //Use for producing the light gradient
    lightMap: [
        0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64, 0.74,
        0.85, 0.97, 1,
    ],
    shouldFaceFlip(faceBit, faceDirection) {
        return this.faceByte.getFaceRotateState(faceDirection, faceBit) == 1;
    },
    getTextureRotation(faceBit, faceDirection) {
        return this.faceByte.getFaceTextureState(faceDirection, faceBit);
    },
    isFaceExposexd(faceBit, faceDirection) {
        return this.faceByte.isFaceExposed(faceDirection, faceBit);
    },
    produceShapeReturnData(shapeData) {
        return {
            newIndicieIndex: shapeData.indicieIndex,
            newUVTemplateIndex: shapeData.uvTemplateIndex,
            newOverlayUVTemplateIndex: shapeData.overylayUVTemplateIndex,
            newColorIndex: shapeData.colorIndex,
            newlightIndex: shapeData.lightIndex,
            newAOIndex: shapeData.aoIndex,
            newFlowTemplateIndex: shapeData.flowTemplateIndex,
        };
    },
    toLinearSpace(r, g, b, a) {
        r = r ** 2.2;
        g = g ** 2.2;
        b = b ** 2.2;
        a = a * 1;
        return [r, g, b, a];
    },
    addFaceData(faceData, faceDataArray) {
        faceDataArray.push(faceData, faceData, faceData, faceData);
    },
    calculateLightColor(RGBlightColors, sunlightColors, lightTemplate, startIndex) {
        for (let v = 0; v < 4; v++) {
            const values = this.lightByte.getLightValues(lightTemplate[startIndex + v]);
            const s = this.lightMap[values[0]];
            const r = this.lightMap[values[1]];
            const g = this.lightMap[values[2]];
            const b = this.lightMap[values[3]];
            sunlightColors.push(s, s, s, 1);
            RGBlightColors.push(r, g, b, 1);
        }
    },
    calculateLightColorFromValue(RGBlightColors, sunlightColors, lightValue) {
        const values = this.lightByte.getLightValues(lightValue);
        const w = this.lightMap[values[0]];
        const r = this.lightMap[values[1]];
        const g = this.lightMap[values[2]];
        const b = this.lightMap[values[3]];
        for (let v = 0; v < 4; v++) {
            sunlightColors.push(w, w, w, 1);
            RGBlightColors.push(r, g, b, 1);
        }
    },
    calculateSunightColor(sunLight, sunLightTemplate, sunLightIndex) {
        for (let v = 0; v < 4; v++) {
            const values = this.lightByte.getLightValues(sunLightTemplate[sunLightIndex + v]);
            const w = this.lightMap[values[0]];
            sunLight.push(w, w, w, 1);
        }
    },
    calculateAOColor(aoColors, aoTemplate, aoTemplateIndex) {
        for (let v = 0; v < 4; v++) {
            const aColor = aoTemplate[aoTemplateIndex + v];
            const newColor = this.toLinearSpace(aColor, aColor, aColor, aColor);
            aoColors.push(newColor[0], newColor[1], newColor[2], 1);
        }
    },
    calculateAOColorFromValue(aoColors, aoValue) {
        for (let v = 0; v < 4; v++) {
            const newColor = this.toLinearSpace(aoValue, aoValue, aoValue, aoValue);
            aoColors.push(newColor[0], newColor[1], newColor[2], 1);
        }
    },
};
