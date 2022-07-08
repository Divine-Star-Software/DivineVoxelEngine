//objects
import { DVEB } from "../DivineVoxelEngineBuilder.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { ConstructorToRenderMessages, SetChunkDataIndexes, } from "../../../Constants/InterComms/ConstructorToRender.js";
export const ChunkMesher = {
    voxelBuildOrder: [
        "solid",
        "flora",
        "fluid",
        "magma",
    ],
    voxelTypeMap: {
        solid: 0,
        flora: 1,
        fluid: 2,
        magma: 3,
    },
    buildChunkMesh(chunkX, chunkY, chunkZ, template) {
        let i = this.voxelBuildOrder.length;
        while (i--) {
            const type = this.voxelBuildOrder[i];
            const baseTemplate = template[type];
            if (baseTemplate.positionTemplate.length == 0)
                continue;
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
            for (let positionIndex = 0; positionIndex < baseTemplate.positionTemplate.length; positionIndex += 3) {
                const x = baseTemplate.positionTemplate[positionIndex] + chunkX;
                const y = baseTemplate.positionTemplate[positionIndex + 1] + chunkY;
                const z = baseTemplate.positionTemplate[positionIndex + 2] + chunkZ;
                const shapeId = baseTemplate.shapeTemplate[shapeIndex];
                const shape = DVEB.shapeManager.getShape(shapeId);
                const newIndexes = shape.addToChunkMesh({
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
                    shapeStateTemplate: baseTemplate.shapeStateTemplate,
                    shapeStateIndex: shapeStateIndex,
                    unTemplate: baseTemplate.uvTemplate,
                    uvTemplateIndex: uvIndex,
                    overylayUVTemplate: baseTemplate.overlayUVTemplate,
                    overylayUVTemplateIndex: overlayUVIndex,
                    colorTemplate: baseTemplate.colorTemplate,
                    colorIndex: colorIndex,
                    lightTemplate: baseTemplate.lightTemplate,
                    lightIndex: RGBLightIndex,
                    aoTemplate: baseTemplate.aoTemplate,
                    aoIndex: aoIndex,
                    //voxel data
                    face: baseTemplate.faceTemplate[faceIndex],
                    position: { x: x, y: y, z: z },
                });
                indicieIndex = newIndexes.newIndicieIndex;
                aoIndex = newIndexes.newAOIndex;
                uvIndex = newIndexes.newUVTemplateIndex;
                overlayUVIndex = newIndexes.newOverlayUVTemplateIndex;
                RGBLightIndex = newIndexes.newlightIndex;
                colorIndex = newIndexes.newColorIndex;
                shapeStateIndex++;
                shapeIndex++;
                faceIndex++;
            }
            const positionArray = new Float32Array(positions);
            const normalsArray = new Float32Array(normals);
            const indiciesArray = new Int32Array(indices);
            const faceDataArray = new Int32Array(faceData);
            const AOColorsArray = new Float32Array(AOColors);
            const RGBLightColorsArray = new Float32Array(RGBLightColors);
            const sunLightColorsArray = new Float32Array(sunLightColors);
            const colorsArray = new Float32Array(colors);
            const uvArray = new Float32Array(uvs);
            const overlayUVArray = new Float32Array(overlayUVS);
            const message = [];
            message[SetChunkDataIndexes.voxelSubstanceType - 1] =
                this.voxelTypeMap[type];
            message[SetChunkDataIndexes.chunkX - 1] = chunkX;
            message[SetChunkDataIndexes.chunkY - 1] = chunkY;
            message[SetChunkDataIndexes.chunkZ - 1] = chunkZ;
            message[SetChunkDataIndexes.positionArray - 1] = positionArray.buffer;
            message[SetChunkDataIndexes.normalsArray - 1] = normalsArray.buffer;
            message[SetChunkDataIndexes.indiciesArray - 1] = indiciesArray.buffer;
            message[SetChunkDataIndexes.faceDataArray - 1] = faceDataArray.buffer;
            message[SetChunkDataIndexes.AOColorsArray - 1] = AOColorsArray.buffer;
            message[SetChunkDataIndexes.RGBLightColorsArray - 1] =
                RGBLightColorsArray.buffer;
            message[SetChunkDataIndexes.sunLightColorsArray - 1] =
                sunLightColorsArray.buffer;
            message[SetChunkDataIndexes.colorsArray - 1] = colorsArray.buffer;
            message[SetChunkDataIndexes.uvArray - 1] = uvArray.buffer;
            message[SetChunkDataIndexes.overlayUVArray - 1] = overlayUVArray.buffer;
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
            DVEC.renderComm.sendMessage(ConstructorToRenderMessages.setChunk, message, transfers);
        }
        DVEC.queues.finishBuildingChunk();
    },
};
