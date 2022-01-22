export class ChunkMeshBuilder {
    DVEB;
    shapeManager;
    UTIL;
    infoByte;
    constructor(DVEB, shapeManager, UTIL) {
        this.DVEB = DVEB;
        this.shapeManager = shapeManager;
        this.UTIL = UTIL;
        this.infoByte = this.UTIL.getInfoByte();
    }
    buildChunkMesh(chunkType, chunkX, chunkY, chunkZ, positionsTemplate, faceTemplate, shapeTemplate, uvTemplate, colorTemplate, RGBLightTemplate, sunLightTemplate, aoTemplate) {
        const positions = [];
        const indices = [];
        const uvs = [];
        const AOColors = [];
        const sunLightColors = [];
        const colors = [];
        const RGBLightColors = [];
        //console.log(lightTemplate);
        let indicieIndex = 0;
        let aoIndex = 0;
        let RGBLightIndex = 0;
        let sunLightIndex = 0;
        let colorIndex = 0;
        let uvIndex = 0;
        let faceIndex = 0;
        let shapeIndex = 0;
        for (let positionIndex = 0; positionIndex < positionsTemplate.length; positionIndex += 3) {
            const x = positionsTemplate[positionIndex] + chunkX;
            /**@TODO Fix this! ChunkY + y not working*/
            const y = positionsTemplate[positionIndex + 1];
            const z = positionsTemplate[positionIndex + 2] + chunkZ;
            const shapeId = shapeTemplate[shapeIndex];
            const shape = this.shapeManager.getShape(shapeId);
            const newIndexes = shape.addToChunkMesh({
                positions: positions,
                indices: indices,
                RGBLightColors: RGBLightColors,
                sunLightColors: sunLightColors,
                colors: colors,
                AOColors: AOColors,
                uvs: uvs,
                face: faceTemplate[faceIndex],
                indicieIndex: indicieIndex,
                unTemplate: uvTemplate,
                uvTemplateIndex: uvIndex,
                colorTemplate: colorTemplate,
                colorIndex: colorIndex,
                RGBLightTemplate: RGBLightTemplate,
                rgbLightIndex: RGBLightIndex,
                sunLightTemplate: sunLightTemplate,
                sunlightIndex: sunLightIndex,
                aoTemplate: aoTemplate,
                aoIndex: aoIndex,
                position: { x: x, y: y, z: z },
            });
            indicieIndex = newIndexes.newIndicieIndex;
            aoIndex = newIndexes.newAOIndex;
            uvIndex = newIndexes.newUVTemplateIndex;
            RGBLightIndex = newIndexes.newRGBLightIndex;
            sunLightIndex = newIndexes.newSunLightIndex;
            colorIndex = newIndexes.newColorIndex;
            shapeIndex++;
            faceIndex++;
        }
        const positionArray = new Float32Array(positions);
        const indiciesArray = new Int32Array(indices);
        const AOColorsArray = new Float32Array(AOColors);
        const RGBLightColorsArray = new Float32Array(RGBLightColors);
        const sunLightColorsArray = new Float32Array(sunLightColors);
        const colorsArray = new Float32Array(colors);
        const uvArray = new Float32Array(uvs);
        console.log(AOColorsArray.length, sunLightColorsArray.length);
        //@ts-ignore
        this.DVEB.worker.postMessage([
            chunkType,
            chunkX,
            chunkY,
            chunkZ,
            positionArray.buffer,
            indiciesArray.buffer,
            AOColorsArray.buffer,
            RGBLightColorsArray.buffer,
            sunLightColorsArray.buffer,
            colorsArray.buffer,
            uvArray.buffer,
        ], 
        //@ts-ignore
        [
            positionArray.buffer,
            indiciesArray.buffer,
            AOColorsArray.buffer,
            RGBLightColorsArray.buffer,
            sunLightColorsArray.buffer,
            colorsArray.buffer,
            uvArray.buffer,
        ]);
    }
}
