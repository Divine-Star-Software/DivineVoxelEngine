import { ConstructEntityIndexes, ConstructorToRenderMessages, } from "../../../Common/Threads/Contracts/ConstructorToRender.js";
import { DVEB } from "../DivineVoxelEngineBuilder.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
export const EntityMesher = {
    buildEntityMesh(x, y, z, template) {
        const positions = [];
        const normals = [];
        const indices = [];
        const faceData = [];
        const uvs = [];
        const overlayUVS = [];
        const AOColors = [];
        const sunLightColors = [];
        const colors = [];
        const RGBLightColors = [];
        let indicieIndex = 0;
        let faceIndex = 0;
        let shapeIndex = 0;
        let aoIndex = 0;
        let RGBLightIndex = 0;
        let colorIndex = 0;
        let uvIndex = 0;
        let overlayUVIndex = 0;
        let shapeStateIndex = 0;
        let flowTemplateIndex = 0;
        const shapeAddData = {
            substance: "solid",
            LOD: 1,
            //mesh data
            positions: positions,
            normals: normals,
            indices: indices,
            faceData: faceData,
            RGBLightColors: RGBLightColors,
            sunLightColors: sunLightColors,
            colors: colors,
            AOColors: AOColors,
            uvs: uvs,
            overlayUVs: overlayUVS,
            indicieIndex: indicieIndex,
            //chunks template
            shapeState: 0,
            flowTemplateIndex: flowTemplateIndex,
            flowTemplate: template.flowTemplate,
            unTemplate: template.uvTemplate,
            uvTemplateIndex: uvIndex,
            overylayUVTemplate: template.overlayUVTemplate,
            overylayUVTemplateIndex: overlayUVIndex,
            colorTemplate: template.colorTemplate,
            colorIndex: colorIndex,
            lightTemplate: template.lightTemplate,
            lightIndex: RGBLightIndex,
            aoTemplate: template.aoTemplate,
            aoIndex: aoIndex,
            //voxel data
            face: 0,
            position: { x: 0, y: 0, z: 0 },
        };
        for (let positionIndex = 0; positionIndex < template.positionTemplate.length; positionIndex += 3) {
            const x = template.positionTemplate[positionIndex];
            const y = template.positionTemplate[positionIndex + 1];
            const z = template.positionTemplate[positionIndex + 2];
            shapeAddData.indicieIndex = indicieIndex;
            shapeAddData.face = template.faceTemplate[faceIndex];
            shapeAddData.shapeState = template.shapeStateTemplate[shapeStateIndex];
            shapeAddData.flowTemplateIndex = flowTemplateIndex;
            shapeAddData.uvTemplateIndex = uvIndex;
            shapeAddData.overylayUVTemplateIndex = overlayUVIndex;
            shapeAddData.colorIndex = colorIndex;
            shapeAddData.lightIndex = RGBLightIndex;
            shapeAddData.aoIndex = aoIndex;
            shapeAddData.position.x = x;
            shapeAddData.position.y = y;
            shapeAddData.position.z = z;
            const shapeId = template.shapeTemplate[shapeIndex];
            const shape = DVEB.shapeManager.getShape(shapeId);
            const newIndexes = shape.addToChunkMesh(shapeAddData);
            indicieIndex = newIndexes.newIndicieIndex;
            aoIndex = newIndexes.newAOIndex;
            uvIndex = newIndexes.newUVTemplateIndex;
            overlayUVIndex = newIndexes.newOverlayUVTemplateIndex;
            RGBLightIndex = newIndexes.newlightIndex;
            colorIndex = newIndexes.newColorIndex;
            if (newIndexes.newFlowTemplateIndex !== undefined) {
                flowTemplateIndex = newIndexes.newFlowTemplateIndex;
            }
            shapeStateIndex++;
            shapeIndex++;
            faceIndex++;
        }
        const positionArray = new Float32Array(positions);
        const normalsArray = new Float32Array(normals);
        const indiciesArray = new Int32Array(indices);
        const faceDataArray = new Float32Array(faceData);
        const AOColorsArray = new Float32Array(AOColors);
        const RGBLightColorsArray = new Float32Array(RGBLightColors);
        const sunLightColorsArray = new Float32Array(sunLightColors);
        const colorsArray = new Float32Array(colors);
        const uvArray = new Float32Array(uvs);
        const overlayUVArray = new Float32Array(overlayUVS);
        const message = [];
        message[ConstructEntityIndexes.x - 1] = x;
        message[ConstructEntityIndexes.y - 1] = y;
        message[ConstructEntityIndexes.z - 1] = z;
        message[ConstructEntityIndexes.positionArray - 1] = positionArray.buffer;
        message[ConstructEntityIndexes.normalsArray - 1] = normalsArray.buffer;
        message[ConstructEntityIndexes.indiciesArray - 1] = indiciesArray.buffer;
        message[ConstructEntityIndexes.faceDataArray - 1] = faceDataArray.buffer;
        message[ConstructEntityIndexes.AOColorsArray - 1] = AOColorsArray.buffer;
        message[ConstructEntityIndexes.RGBLightColorsArray - 1] =
            RGBLightColorsArray.buffer;
        message[ConstructEntityIndexes.sunLightColorsArray - 1] =
            sunLightColorsArray.buffer;
        message[ConstructEntityIndexes.colorsArray - 1] = colorsArray.buffer;
        message[ConstructEntityIndexes.uvArray - 1] = uvArray.buffer;
        message[ConstructEntityIndexes.overlayUVArray - 1] = overlayUVArray.buffer;
        const transfers = [
            positionArray.buffer,
            normalsArray.buffer,
            indiciesArray.buffer,
            faceDataArray.buffer,
            AOColorsArray.buffer,
            RGBLightColorsArray.buffer,
            sunLightColorsArray.buffer,
            colorsArray.buffer,
            uvArray.buffer,
            overlayUVArray.buffer,
        ];
        DVEC.parentComm.sendMessage(ConstructorToRenderMessages.constructEntity, message, transfers);
    },
};
