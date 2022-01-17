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
    buildChunkMesh(chunkType, chunkX, chunkZ, positionsTemplate, faceTemplate, shapeTemplate, uvTemplate, lightTemplate, aoTemplate) {
        const positions = [];
        const indices = [];
        const uvs = [];
        const colors = [];
        let indicieIndex = 0;
        let aoIndex = 0;
        let uvIndex = 0;
        let faceIndex = 0;
        let shapeIndex = 0;
        for (let positionIndex = 0; positionIndex < positionsTemplate.length; positionIndex += 3) {
            const x = positionsTemplate[positionIndex] + chunkX;
            const y = positionsTemplate[positionIndex + 1];
            const z = positionsTemplate[positionIndex + 2] + chunkZ;
            const shapeId = shapeTemplate[shapeIndex];
            const shape = this.shapeManager.getShape(shapeId);
            const newIndexes = shape.addToChunkMesh({
                positions: positions,
                indices: indices,
                fullColors: [],
                linearColors: colors,
                uvs: uvs,
                face: faceTemplate[faceIndex],
                indicieIndex: indicieIndex,
                unTemplate: uvTemplate,
                uvTemplateIndex: uvIndex,
                lightTemplate: aoTemplate,
                lightIndex: 0,
                aoTemplate: aoTemplate,
                aoIndex: aoIndex,
                position: { x: x, y: y, z: z },
            });
            indicieIndex = newIndexes.newIndicieIndex;
            aoIndex = newIndexes.newAOIndex;
            uvIndex = newIndexes.newUVTemplateIndex;
            shapeIndex++;
            faceIndex++;
        }
        const positionArray = new Float32Array(positions);
        const indiciesArray = new Int32Array(indices);
        const linearColorsArray = new Float32Array(colors);
        const fullColorsArray = new Float32Array(colors);
        const uvArray = new Float32Array(uvs);
        //@ts-ignore
        this.DVEB.worker.postMessage([
            chunkType,
            chunkX,
            chunkZ,
            positionArray.buffer,
            indiciesArray.buffer,
            linearColorsArray.buffer,
            fullColorsArray.buffer,
            uvArray.buffer,
        ], 
        //@ts-ignore
        [
            positionArray.buffer,
            indiciesArray.buffer,
            linearColorsArray.buffer,
            fullColorsArray.buffer,
            uvArray.buffer,
        ]);
    }
}
