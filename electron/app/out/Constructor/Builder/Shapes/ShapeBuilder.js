const defaultTransform = {
    v1: { x: 0, y: 0, z: 0 },
    v2: { x: 0, y: 0, z: 0 },
    v3: { x: 0, y: 0, z: 0 },
    v4: { x: 0, y: 0, z: 0 },
};
export const ShapeBuilder = {
    faceFunctions: {
        top: (origin, dimensions, data, transform, flip) => {
            if (!flip) {
                data.positions.push(
                //v1
                origin.x + -dimensions.width + transform.v1.x, origin.y + dimensions.height + transform.v1.y, origin.z + -dimensions.depth + transform.v1.z, 
                //v2
                origin.x + -dimensions.width + transform.v2.x, origin.y + dimensions.height + transform.v2.y, origin.z + dimensions.depth + transform.v2.z, 
                //v3
                origin.x + dimensions.width + transform.v3.x, origin.y + dimensions.height + transform.v3.y, origin.z + dimensions.depth + transform.v3.z, 
                //v4
                origin.x + dimensions.width + transform.v4.x, origin.y + dimensions.height + transform.v4.y, origin.z + -dimensions.depth + transform.v4.z);
            }
            else {
                data.positions.push(
                //v1
                origin.x + dimensions.width + transform.v4.x, origin.y + dimensions.height + transform.v4.y, origin.z + -dimensions.depth + transform.v4.z, 
                //v2
                origin.x + -dimensions.width + transform.v1.x, origin.y + dimensions.height + transform.v1.y, origin.z + -dimensions.depth + transform.v1.z, 
                //v3
                origin.x + -dimensions.width + transform.v2.x, origin.y + dimensions.height + transform.v2.y, origin.z + dimensions.depth + transform.v2.z, 
                //v4
                origin.x + dimensions.width + transform.v3.x, origin.y + dimensions.height + transform.v3.y, origin.z + dimensions.depth + transform.v3.z);
            }
            data.indices.push(data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex, data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex);
            data.normals.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0);
            data.indicieIndex += 4;
        },
        bottom: (origin, dimensions, data, transform, flip) => {
            if (!flip) {
                data.positions.push(
                //v1
                origin.x + -dimensions.width + transform.v1.x, origin.y + -dimensions.height + transform.v1.y, origin.z + -dimensions.depth + transform.v1.z, 
                //v2
                origin.x + dimensions.width + transform.v2.x, origin.y + -dimensions.height + transform.v2.y, origin.z + -dimensions.depth + transform.v2.z, 
                //v3
                origin.x + dimensions.width + transform.v3.x, origin.y + -dimensions.height + transform.v3.y, origin.z + dimensions.depth + transform.v3.z, 
                //v4
                origin.x + -dimensions.width + transform.v4.x, origin.y + -dimensions.height + transform.v4.y, origin.z + dimensions.depth + transform.v4.z);
            }
            else {
                data.positions.push(
                //v1
                origin.x + -dimensions.width + transform.v4.x, origin.y + -dimensions.height + transform.v4.y, origin.z + dimensions.depth + transform.v4.z, 
                //v2
                origin.x + -dimensions.width + transform.v1.x, origin.y + -dimensions.height + transform.v1.y, origin.z + -dimensions.depth + transform.v1.z, 
                //v3
                origin.x + dimensions.width + transform.v2.x, origin.y + -dimensions.height + transform.v2.y, origin.z + -dimensions.depth + transform.v2.z, 
                //v4
                origin.x + dimensions.width + transform.v3.x, origin.y + -dimensions.height + transform.v3.y, origin.z + dimensions.depth + transform.v3.z);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.normals.push(0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0);
            data.indicieIndex += 4;
        },
        //front
        south: (origin, dimensions, data, transform, flip) => {
            if (!flip) {
                data.positions.push(
                //v1
                origin.x + -dimensions.width + transform.v1.x, origin.y + dimensions.height + transform.v1.y, origin.z + -dimensions.depth + transform.v1.z, 
                //v2
                origin.x + dimensions.width + transform.v2.x, origin.y + dimensions.height + transform.v2.y, origin.z + -dimensions.depth + transform.v2.z, 
                //v3
                origin.x + dimensions.width + transform.v3.x, origin.y + -dimensions.height + transform.v3.y, origin.z + -dimensions.depth + transform.v3.z, 
                //v4
                origin.x + -dimensions.width + transform.v4.x, origin.y + -dimensions.height + transform.v4.y, origin.z + -dimensions.depth + transform.v4.z);
            }
            else {
                data.positions.push(
                //v1
                origin.x + -dimensions.width + transform.v4.x, origin.y + -dimensions.height + transform.v4.y, origin.z + -dimensions.depth + transform.v4.z, 
                //v2
                origin.x + -dimensions.width + transform.v1.x, origin.y + dimensions.height + transform.v1.y, origin.z + -dimensions.depth + transform.v1.z, 
                //v3
                origin.x + dimensions.width + transform.v2.x, origin.y + dimensions.height + transform.v2.y, origin.z + -dimensions.depth + transform.v2.z, 
                //v4
                origin.x + dimensions.width + transform.v3.x, origin.y + -dimensions.height + transform.v3.y, origin.z + -dimensions.depth + transform.v3.z);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
            data.indicieIndex += 4;
        },
        //back
        north: (origin, dimensions, data, transform, flip) => {
            if (!flip) {
                data.positions.push(
                //v1
                origin.x + dimensions.width + transform.v1.x, origin.y + dimensions.height + transform.v1.y, origin.z + dimensions.depth + transform.v1.z, 
                //v2
                origin.x + -dimensions.width + transform.v2.x, origin.y + dimensions.height + transform.v2.y, origin.z + dimensions.depth + transform.v2.z, 
                //v3
                origin.x + -dimensions.width + transform.v3.x, origin.y + -dimensions.height + transform.v3.y, origin.z + dimensions.depth + transform.v3.z, 
                //v4
                origin.x + dimensions.width + transform.v4.x, origin.y + -dimensions.height + transform.v4.y, origin.z + dimensions.depth + transform.v4.z);
            }
            else {
                data.positions.push(
                //v1
                origin.x + dimensions.width + transform.v4.x, origin.y + -dimensions.height + transform.v4.y, origin.z + dimensions.depth + transform.v4.z, 
                //v2
                origin.x + dimensions.width + transform.v1.x, origin.y + dimensions.height + transform.v1.y, origin.z + dimensions.depth + transform.v1.z, 
                //v3
                origin.x + -dimensions.width + transform.v2.x, origin.y + dimensions.height + transform.v2.y, origin.z + dimensions.depth + transform.v2.z, 
                //v4
                origin.x + -dimensions.width + transform.v3.x, origin.y + -dimensions.height + transform.v3.y, origin.z + dimensions.depth + transform.v3.z);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1);
            data.indicieIndex += 4;
        },
        //left
        west: (origin, dimensions, data, transform, flip) => {
            if (!flip) {
                data.positions.push(
                //v1
                origin.x + -dimensions.width + transform.v1.x, origin.y + dimensions.height + transform.v1.y, origin.z + dimensions.depth + transform.v1.z, 
                //v2
                origin.x + -dimensions.width + transform.v2.x, origin.y + dimensions.height + transform.v2.y, origin.z + -dimensions.depth + transform.v2.z, 
                //v3
                origin.x + -dimensions.width + transform.v3.x, origin.y + -dimensions.height + transform.v3.y, origin.z + -dimensions.depth + transform.v3.z, 
                //v4
                origin.x + -dimensions.width + transform.v4.x, origin.y + -dimensions.height + transform.v4.y, origin.z + dimensions.depth + transform.v4.z);
            }
            else {
                data.positions.push(
                //v1
                origin.x + -dimensions.width + transform.v4.x, origin.y + -dimensions.height + transform.v4.y, origin.z + dimensions.depth + transform.v4.z, 
                //v2
                origin.x + -dimensions.width + transform.v1.x, origin.y + dimensions.height + transform.v1.y, origin.z + dimensions.depth + transform.v1.z, 
                //v3
                origin.x + -dimensions.width + transform.v2.x, origin.y + dimensions.height + transform.v2.y, origin.z + -dimensions.depth + transform.v2.z, 
                //v4
                origin.x + -dimensions.width + transform.v3.x, origin.y + -dimensions.height + transform.v3.y, origin.z + -dimensions.depth + transform.v3.z);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.normals.push(-1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0);
            data.indicieIndex += 4;
        },
        //right
        east: (origin, dimensions, data, transform, flip) => {
            if (!flip) {
                data.positions.push(
                //v1
                origin.x + dimensions.width + transform.v1.x, origin.y + dimensions.height + transform.v1.y, origin.z + -dimensions.depth + transform.v1.z, 
                //v2
                origin.x + dimensions.width + transform.v2.x, origin.y + dimensions.height + transform.v2.y, origin.z + dimensions.depth + transform.v2.z, 
                //v3
                origin.x + dimensions.width + transform.v3.x, origin.y + -dimensions.height + transform.v3.y, origin.z + dimensions.depth + transform.v3.z, 
                //v4
                origin.x + dimensions.width + transform.v4.x, origin.y + -dimensions.height + transform.v4.y, origin.z + -dimensions.depth + transform.v4.z);
            }
            else {
                data.positions.push(
                //v1
                origin.x + dimensions.width + transform.v4.x, origin.y + -dimensions.height + transform.v4.y, origin.z + -dimensions.depth + transform.v4.z, 
                //v2
                origin.x + dimensions.width + transform.v1.x, origin.y + dimensions.height + transform.v1.y, origin.z + -dimensions.depth + transform.v1.z, 
                //v3
                origin.x + dimensions.width + transform.v2.x, origin.y + dimensions.height + transform.v2.y, origin.z + dimensions.depth + transform.v2.z, 
                //v4
                origin.x + dimensions.width + transform.v3.x, origin.y + -dimensions.height + transform.v3.y, origin.z + dimensions.depth + transform.v3.z);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.normals.push(1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0);
            data.indicieIndex += 4;
        },
    },
    addFace(direction, origin, dimensions, data, flip = false, transform = defaultTransform) {
        this.faceFunctions[direction](origin, dimensions, data, transform, flip);
    },
};
