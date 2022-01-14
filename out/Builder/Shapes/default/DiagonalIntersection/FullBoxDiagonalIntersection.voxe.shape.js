export class FullBoxDiagonalIntersection {
    shapeHelper;
    id = "FullBoxDiagonalIntersection";
    width = 0.5;
    depth = 0.5;
    height = 0.5;
    constructor(shapeHelper) {
        this.shapeHelper = shapeHelper;
    }
    faces = {
        0: (data) => {
            data.positions.push(data.position.x - this.width, data.position.y + this.height, data.position.z + -this.depth, data.position.x + this.width, data.position.y + this.height, data.position.z + this.depth, data.position.x + this.width, data.position.y + -this.height, data.position.z + this.depth, data.position.x - this.width, data.position.y + -this.height, data.position.z + -this.depth);
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            const uv = data.unTemplate[data.uvTemplateIndex];
            data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
            this.shapeHelper.calculateAOColor(data.linearColors, data.aoTemplate, data.aoIndex);
            return {
                newIndicieIndex: data.indicieIndex + 4,
                newUVTemplateIndex: data.uvTemplateIndex + 1,
                newLightIndex: data.lightIndex + 4,
                newAOIndex: data.aoIndex + 4,
            };
        },
        1: (data) => {
            data.positions.push(data.position.x + -this.width, data.position.y + this.height, data.position.z + this.depth, data.position.x + this.width, data.position.y + this.height, data.position.z + -this.depth, data.position.x + this.width, data.position.y + -this.height, data.position.z + -this.depth, data.position.x + -this.width, data.position.y + -this.height, data.position.z + this.depth);
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            const uv = data.unTemplate[data.uvTemplateIndex];
            data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
            this.shapeHelper.calculateAOColor(data.linearColors, data.aoTemplate, data.aoIndex);
            return {
                newIndicieIndex: data.indicieIndex + 4,
                newUVTemplateIndex: data.uvTemplateIndex + 1,
                newLightIndex: data.lightIndex + 4,
                newAOIndex: data.aoIndex + 4,
            };
        },
    };
    addToChunkMesh(data) {
        data.position.x += this.width;
        data.position.z += this.depth;
        data.position.y += this.height;
        const newData1 = this.faces[0](data);
        data.indicieIndex = newData1.newIndicieIndex;
        data.uvTemplateIndex = newData1.newUVTemplateIndex;
        data.lightIndex = newData1.newLightIndex;
        data.aoIndex = newData1.newAOIndex;
        const newData2 = this.faces[1](data);
        return {
            newIndicieIndex: newData2.newIndicieIndex,
            newUVTemplateIndex: newData2.newUVTemplateIndex,
            newLightIndex: newData2.newLightIndex,
            newAOIndex: newData2.newAOIndex,
        };
    }
}
