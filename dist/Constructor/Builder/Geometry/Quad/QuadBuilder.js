const defaultTransform = {
    1: { x: 0, y: 0, z: 0 },
    2: { x: 0, y: 0, z: 0 },
    3: { x: 0, y: 0, z: 0 },
    4: { x: 0, y: 0, z: 0 },
};
const qDimensinos = {
    width: 0,
    height: 0,
};
export const QuadBuilder = {
    faceFunctions: {
        top: (origin, data, transform, flip) => {
            if (!flip) {
                data.positions.push(
                //v1
                origin.x - qDimensinos.width + transform[1].x, origin.y + transform[1].y, origin.z - qDimensinos.height + transform[1].z, 
                //v2
                origin.x - qDimensinos.width + transform[2].x, origin.y + transform[2].y, origin.z + qDimensinos.height + transform[2].z, 
                //v3
                origin.x + qDimensinos.width + transform[3].x, origin.y + transform[3].y, origin.z + qDimensinos.height + transform[3].z, 
                //v4
                origin.x + qDimensinos.width + transform[4].x, origin.y + transform[4].y, origin.z - qDimensinos.height + transform[4].z);
            }
            else {
                data.positions.push(
                //v1
                origin.x + qDimensinos.width + transform[4].x, origin.y + transform[4].y, origin.z - qDimensinos.height + transform[4].z, 
                //v2
                origin.x - qDimensinos.width + transform[1].x, origin.y + transform[1].y, origin.z - qDimensinos.height + transform[1].z, 
                //v3
                origin.x - qDimensinos.width + transform[2].x, origin.y + transform[2].y, origin.z + qDimensinos.height + transform[2].z, 
                //v4
                origin.x + qDimensinos.width + transform[3].x, origin.y + transform[3].y, origin.z + qDimensinos.height + transform[3].z);
            }
            data.indices.push(data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex, data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex);
            data.normals.push(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0);
            data.indicieIndex += 4;
        },
        bottom: (origin, data, transform, flip) => {
            if (!flip) {
                data.positions.push(
                //v1
                origin.x - qDimensinos.width + transform[1].x, origin.y + transform[1].y, origin.z - qDimensinos.height + transform[1].z, 
                //v2
                origin.x + qDimensinos.width + transform[2].x, origin.y + transform[2].y, origin.z - qDimensinos.height + transform[2].z, 
                //v3
                origin.x + qDimensinos.width + transform[3].x, origin.y + transform[3].y, origin.z + qDimensinos.height + transform[3].z, 
                //v4
                origin.x - qDimensinos.width + transform[4].x, origin.y + transform[4].y, origin.z + qDimensinos.height + transform[4].z);
            }
            else {
                data.positions.push(
                //v1
                origin.x - qDimensinos.width + transform[4].x, origin.y + transform[4].y, origin.z + qDimensinos.height + transform[4].z, 
                //v2
                origin.x - qDimensinos.width + transform[1].x, origin.y + transform[1].y, origin.z - qDimensinos.height + transform[1].z, 
                //v3
                origin.x + qDimensinos.width + transform[2].x, origin.y + transform[2].y, origin.z - qDimensinos.height + transform[2].z, 
                //v4
                origin.x + qDimensinos.width + transform[3].x, origin.y + transform[3].y, origin.z + qDimensinos.height + transform[3].z);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.normals.push(0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0);
            data.indicieIndex += 4;
        },
        //front
        south: (origin, data, transform, flip) => {
            if (!flip) {
                data.positions.push(
                //v1
                origin.x - qDimensinos.width + transform[1].x, origin.y + qDimensinos.height + transform[1].y, origin.z + transform[1].z, 
                //v2
                origin.x + qDimensinos.width + transform[2].x, origin.y + qDimensinos.height + transform[2].y, origin.z + transform[2].z, 
                //v3
                origin.x + qDimensinos.width + transform[3].x, origin.y - qDimensinos.height + transform[3].y, origin.z + transform[3].z, 
                //v4
                origin.x - qDimensinos.width + transform[4].x, origin.y - qDimensinos.height + transform[4].y, origin.z + transform[4].z);
            }
            else {
                data.positions.push(
                //v1
                origin.x - qDimensinos.width + transform[4].x, origin.y - qDimensinos.height + transform[4].y, origin.z + transform[4].z, 
                //v2
                origin.x - qDimensinos.width + transform[1].x, origin.y + qDimensinos.height + transform[1].y, origin.z + transform[1].z, 
                //v3
                origin.x + qDimensinos.width + transform[2].x, origin.y + qDimensinos.height + transform[2].y, origin.z + transform[2].z, 
                //v4
                origin.x + qDimensinos.width + transform[3].x, origin.y - qDimensinos.height + transform[3].y, origin.z + transform[3].z);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
            data.indicieIndex += 4;
        },
        //back
        north: (origin, data, transform, flip) => {
            if (!flip) {
                data.positions.push(
                //v1
                origin.x + qDimensinos.width + transform[1].x, origin.y + qDimensinos.height + transform[1].y, origin.z + transform[1].z, 
                //v2
                origin.x - qDimensinos.width + transform[2].x, origin.y + qDimensinos.height + transform[2].y, origin.z + transform[2].z, 
                //v3
                origin.x - qDimensinos.width + transform[3].x, origin.y - qDimensinos.height + transform[3].y, origin.z + transform[3].z, 
                //v4
                origin.x + qDimensinos.width + transform[4].x, origin.y - qDimensinos.height + transform[4].y, origin.z + transform[4].z);
            }
            else {
                data.positions.push(
                //v1
                origin.x + qDimensinos.width + transform[4].x, origin.y - qDimensinos.height + transform[4].y, origin.z + transform[4].z, 
                //v2
                origin.x + qDimensinos.width + transform[1].x, origin.y + qDimensinos.height + transform[1].y, origin.z + transform[1].z, 
                //v3
                origin.x - qDimensinos.width + transform[2].x, origin.y + qDimensinos.height + transform[2].y, origin.z + transform[2].z, 
                //v4
                origin.x - qDimensinos.width + transform[3].x, origin.y - qDimensinos.height + transform[3].y, origin.z + transform[3].z);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1);
            data.indicieIndex += 4;
        },
        //left
        west: (origin, data, transform, flip) => {
            if (!flip) {
                data.positions.push(
                //v1
                origin.x + transform[1].x, origin.y + qDimensinos.height + transform[1].y, origin.z + qDimensinos.width + transform[1].z, 
                //v2
                origin.x + transform[2].x, origin.y + qDimensinos.height + transform[2].y, origin.z - qDimensinos.width + transform[2].z, 
                //v3
                origin.x + transform[3].x, origin.y - qDimensinos.height + transform[3].y, origin.z - qDimensinos.width + +transform[3].z, 
                //v4
                origin.x + transform[4].x, origin.y - qDimensinos.height + transform[4].y, origin.z + qDimensinos.width + transform[4].z);
            }
            else {
                data.positions.push(
                //v1
                origin.x + transform[4].x, origin.y - qDimensinos.height + transform[4].y, origin.z + qDimensinos.width + transform[4].z, 
                //v2
                origin.x + transform[1].x, origin.y + qDimensinos.height + transform[1].y, origin.z + qDimensinos.width + transform[1].z, 
                //v3
                origin.x + transform[2].x, origin.y + qDimensinos.height + transform[2].y, origin.z - qDimensinos.width + transform[2].z, 
                //v4
                origin.x + transform[3].x, origin.y - qDimensinos.height + transform[3].y, origin.z - qDimensinos.width + transform[3].z);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.normals.push(-1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0);
            data.indicieIndex += 4;
        },
        //right
        east: (origin, data, transform, flip) => {
            if (!flip) {
                data.positions.push(
                //v1
                origin.x + transform[1].x, origin.y + qDimensinos.height + transform[1].y, origin.z - qDimensinos.width + transform[1].z, 
                //v2
                origin.x + transform[2].x, origin.y + qDimensinos.height + transform[2].y, origin.z + qDimensinos.width + transform[2].z, 
                //v3
                origin.x + transform[3].x, origin.y - qDimensinos.height + transform[3].y, origin.z + qDimensinos.width + transform[3].z, 
                //v4
                origin.x + transform[4].x, origin.y - qDimensinos.height + transform[4].y, origin.z - qDimensinos.width + transform[4].z);
            }
            else {
                data.positions.push(
                //v1
                origin.x + transform[4].x, origin.y - qDimensinos.height + transform[4].y, origin.z - qDimensinos.width + transform[4].z, 
                //v2
                origin.x + transform[1].x, origin.y + qDimensinos.height + transform[1].y, origin.z - qDimensinos.width + transform[1].z, 
                //v3
                origin.x + transform[2].x, origin.y + qDimensinos.height + transform[2].y, origin.z + qDimensinos.width + transform[2].z, 
                //v4
                origin.x + transform[3].x, origin.y - qDimensinos.height + transform[3].y, origin.z + qDimensinos.width + transform[3].z);
            }
            data.indices.push(data.indicieIndex + 2, data.indicieIndex + 1, data.indicieIndex, data.indicieIndex + 3, data.indicieIndex + 2, data.indicieIndex);
            data.normals.push(1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0);
            data.indicieIndex += 4;
        },
    },
    create(direction, origin, dimensions, data, flip = false, transform = defaultTransform) {
        qDimensinos.width = dimensions.width / 2;
        qDimensinos.height = dimensions.height / 2;
        this.faceFunctions[direction](origin, data, transform, flip);
    },
};
