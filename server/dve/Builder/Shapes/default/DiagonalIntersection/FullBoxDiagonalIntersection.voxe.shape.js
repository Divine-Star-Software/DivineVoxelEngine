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
            this.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
            return {
                newIndicieIndex: data.indicieIndex + 4,
                newUVTemplateIndex: data.uvTemplateIndex + 1,
                newlightIndex: data.lightIndex + 4,
                newColorIndex: data.colorIndex + 4,
                newAOIndex: data.aoIndex + 4,
            };
        },
        1: (data) => {
            data.positions.push(data.position.x + -this.width, data.position.y + this.height, data.position.z + this.depth, data.position.x + this.width, data.position.y + this.height, data.position.z + -this.depth, data.position.x + this.width, data.position.y + -this.height, data.position.z + -this.depth, data.position.x + -this.width, data.position.y + -this.height, data.position.z + this.depth);
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            const uv = data.unTemplate[data.uvTemplateIndex];
            data.uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
            this.shapeHelper.calculateAOColor(data.AOColors, data.aoTemplate, data.aoIndex);
            return {
                newIndicieIndex: data.indicieIndex + 4,
                newUVTemplateIndex: data.uvTemplateIndex + 1,
                newlightIndex: data.lightIndex + 4,
                newColorIndex: data.colorIndex + 4,
                newAOIndex: data.aoIndex + 4,
            };
        },
    };
    addToChunkMesh(data) {
        data.position.x += this.width;
        data.position.z += this.depth;
        data.position.y += this.height;
        const face1 = this.faces[0](data);
        data.indicieIndex = face1.newIndicieIndex;
        data.uvTemplateIndex = face1.newUVTemplateIndex;
        data.lightIndex = face1.newlightIndex;
        data.aoIndex = face1.newAOIndex;
        data.colorIndex = face1.newColorIndex;
        const face2 = this.faces[1](data);
        data.indicieIndex = face2.newIndicieIndex;
        data.uvTemplateIndex = face2.newUVTemplateIndex;
        data.lightIndex = face2.newlightIndex;
        data.aoIndex = face2.newAOIndex;
        data.colorIndex = face2.newColorIndex;
        return {
            newIndicieIndex: data.indicieIndex,
            newUVTemplateIndex: data.uvTemplateIndex,
            newColorIndex: data.colorIndex,
            newlightIndex: data.lightIndex,
            newAOIndex: data.aoIndex,
        };
    }
}
