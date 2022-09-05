export const ShapeBuilder = {
    faceFunctions: {
        top: (origin, dimensions, data, flip) => {
            if (!flip) {
                data.positions.push(origin.x + -dimensions.width, origin.y + dimensions.height, origin.z + -dimensions.depth, origin.x + -dimensions.width, origin.y + dimensions.height, origin.z + dimensions.depth, origin.x + dimensions.width, origin.y + dimensions.height, origin.z + dimensions.depth, origin.x + dimensions.width, origin.y + dimensions.height, origin.z + -dimensions.depth);
            }
            else {
                data.positions.push(origin.x + dimensions.width, origin.y + dimensions.height, origin.z + -dimensions.depth, origin.x + -dimensions.width, origin.y + dimensions.height, origin.z + -dimensions.depth, origin.x + -dimensions.width, origin.y + dimensions.height, origin.z + dimensions.depth, origin.x + dimensions.width, origin.y + dimensions.height, origin.z + dimensions.depth);
            }
            data.indices.push(data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex, data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex);
            data.indicieIndex += 4;
        },
        bottom: (origin, dimensions, data, flip) => {
            if (!flip) {
                data.positions.push(origin.x + -dimensions.width, origin.y + -dimensions.height, origin.z + -dimensions.depth, origin.x + dimensions.width, origin.y + -dimensions.height, origin.z + -dimensions.depth, origin.x + dimensions.width, origin.y + -dimensions.height, origin.z + dimensions.depth, origin.x + -dimensions.width, origin.y + -dimensions.height, origin.z + dimensions.depth);
            }
            else {
                data.positions.push(origin.x + -dimensions.width, origin.y + -dimensions.height, origin.z + dimensions.depth, origin.x + -dimensions.width, origin.y + -dimensions.height, origin.z + -dimensions.depth, origin.x + dimensions.width, origin.y + -dimensions.height, origin.z + -dimensions.depth, origin.x + dimensions.width, origin.y + -dimensions.height, origin.z + dimensions.depth);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.indicieIndex += 4;
        },
        south: (origin, dimensions, data, flip) => {
            if (!flip) {
                data.positions.push(origin.x + -dimensions.width, origin.y + dimensions.height, origin.z + -dimensions.depth, origin.x + dimensions.width, origin.y + dimensions.height, origin.z + -dimensions.depth, origin.x + dimensions.width, origin.y + -dimensions.height, origin.z + -dimensions.depth, origin.x + -dimensions.width, origin.y + -dimensions.height, origin.z + -dimensions.depth);
            }
            else {
                data.positions.push(origin.x + -dimensions.width, origin.y + -dimensions.height, origin.z + -dimensions.depth, origin.x + -dimensions.width, origin.y + dimensions.height, origin.z + -dimensions.depth, origin.x + dimensions.width, origin.y + dimensions.height, origin.z + -dimensions.depth, origin.x + dimensions.width, origin.y + -dimensions.height, origin.z + -dimensions.depth);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.indicieIndex += 4;
        },
        north: (origin, dimensions, data, flip) => {
            if (!flip) {
                data.positions.push(origin.x + dimensions.width, origin.y + dimensions.height, origin.z + dimensions.depth, origin.x + -dimensions.width, origin.y + dimensions.height, origin.z + dimensions.depth, origin.x + -dimensions.width, origin.y + -dimensions.height, origin.z + dimensions.depth, origin.x + dimensions.width, origin.y + -dimensions.height, origin.z + dimensions.depth);
            }
            else {
                data.positions.push(origin.x + dimensions.width, origin.y + -dimensions.height, origin.z + dimensions.depth, origin.x + dimensions.width, origin.y + dimensions.height, origin.z + dimensions.depth, origin.x + -dimensions.width, origin.y + dimensions.height, origin.z + dimensions.depth, origin.x + -dimensions.width, origin.y + -dimensions.height, origin.z + dimensions.depth);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.indicieIndex += 4;
        },
        west: (origin, dimensions, data, flip) => {
            if (!flip) {
                data.positions.push(origin.x + -dimensions.width, origin.y + dimensions.height, origin.z + dimensions.depth, origin.x + -dimensions.width, origin.y + dimensions.height, origin.z + -dimensions.depth, origin.x + -dimensions.width, origin.y + -dimensions.height, origin.z + -dimensions.depth, origin.x + -dimensions.width, origin.y + -dimensions.height, origin.z + dimensions.depth);
            }
            else {
                data.positions.push(origin.x + -dimensions.width, origin.y + -dimensions.height, origin.z + dimensions.depth, origin.x + -dimensions.width, origin.y + dimensions.height, origin.z + dimensions.depth, origin.x + -dimensions.width, origin.y + dimensions.height, origin.z + -dimensions.depth, origin.x + -dimensions.width, origin.y + -dimensions.height, origin.z + -dimensions.depth);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.indicieIndex += 4;
        },
        east: (origin, dimensions, data, flip) => {
            if (!flip) {
                data.positions.push(origin.x + dimensions.width, origin.y + dimensions.height, origin.z + -dimensions.depth, origin.x + dimensions.width, origin.y + dimensions.height, origin.z + dimensions.depth, origin.x + dimensions.width, origin.y + -dimensions.height, origin.z + dimensions.depth, origin.x + dimensions.width, origin.y + -dimensions.height, origin.z + -dimensions.depth);
            }
            else {
                data.positions.push(origin.x + dimensions.width, origin.y + -dimensions.height, origin.z + -dimensions.depth, origin.x + dimensions.width, origin.y + dimensions.height, origin.z + -dimensions.depth, origin.x + dimensions.width, origin.y + dimensions.height, origin.z + dimensions.depth, origin.x + dimensions.width, origin.y + -dimensions.height, origin.z + dimensions.depth);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.indicieIndex += 4;
        },
    },
    addFace(direction, origin, dimensions, data, flip = false) {
        this.faceFunctions[direction](origin, dimensions, data, flip);
    },
};
