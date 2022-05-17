export const ShapeBuilder = {
    faceFunctions: {
        top: (origion, dimensions, data) => {
            data.positions.push(origion.x + -dimensions.width, origion.y + dimensions.height, origion.z + -dimensions.depth, origion.x + -dimensions.width, origion.y + dimensions.height, origion.z + dimensions.depth, origion.x + dimensions.width, origion.y + dimensions.height, origion.z + dimensions.depth, origion.x + dimensions.width, origion.y + dimensions.height, origion.z + -dimensions.depth);
            data.indices.push(data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex, data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex);
            data.indicieIndex += 4;
        },
        bottom: (origion, dimensions, data) => {
            data.positions.push(origion.x + -dimensions.width, origion.y + -dimensions.height, origion.z + -dimensions.depth, origion.x + dimensions.width, origion.y + -dimensions.height, origion.z + -dimensions.depth, origion.x + dimensions.width, origion.y + -dimensions.height, origion.z + dimensions.depth, origion.x + -dimensions.width, origion.y + -dimensions.height, origion.z + dimensions.depth);
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.indicieIndex += 4;
        },
        north: (origion, dimensions, data) => {
            data.positions.push(origion.x + -dimensions.width, origion.y + dimensions.height, origion.z + -dimensions.depth, origion.x + dimensions.width, origion.y + dimensions.height, origion.z + -dimensions.depth, origion.x + dimensions.width, origion.y + -dimensions.height, origion.z + -dimensions.depth, origion.x + -dimensions.width, origion.y + -dimensions.height, origion.z + -dimensions.depth);
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.indicieIndex += 4;
        },
        south: (origion, dimensions, data) => {
            data.positions.push(origion.x + dimensions.width, origion.y + dimensions.height, origion.z + dimensions.depth, origion.x + -dimensions.width, origion.y + dimensions.height, origion.z + dimensions.depth, origion.x + -dimensions.width, origion.y + -dimensions.height, origion.z + dimensions.depth, origion.x + dimensions.width, origion.y + -dimensions.height, origion.z + dimensions.depth);
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.indicieIndex += 4;
        },
        east: (origion, dimensions, data) => {
            data.positions.push(origion.x + -dimensions.width, origion.y + dimensions.height, origion.z + dimensions.depth, origion.x + -dimensions.width, origion.y + dimensions.height, origion.z + -dimensions.depth, origion.x + -dimensions.width, origion.y + -dimensions.height, origion.z + -dimensions.depth, origion.x + -dimensions.width, origion.y + -dimensions.height, origion.z + dimensions.depth);
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.indicieIndex += 4;
        },
        west: (origion, dimensions, data) => {
            data.positions.push(origion.x + dimensions.width, origion.y + dimensions.height, origion.z + -dimensions.depth, origion.x + dimensions.width, origion.y + dimensions.height, origion.z + dimensions.depth, origion.x + dimensions.width, origion.y + -dimensions.height, origion.z + dimensions.depth, origion.x + dimensions.width, origion.y + -dimensions.height, origion.z + -dimensions.depth);
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.indicieIndex += 4;
        },
    },
    addFace(direction, origion, dimensions, data) {
        this.faceFunctions[direction](origion, dimensions, data);
    },
};
