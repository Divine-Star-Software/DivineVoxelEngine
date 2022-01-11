/**# Mesh Builder
 * ---
 * This class handles the actual creation of the mesh.
 */
export class MeshBuilder {
    getBoxFace(postions, indices, colors, uvs, face, position, startingIndices, width = 0.5, depth = 0.5, height = 0.5) {
        let uv = Math.floor(Math.random() * 5);
        let numIndices = 0;
        position.x += width;
        position.z += depth;
        position.y += height;
        switch (face) {
            case "top":
                postions.push(position.x + -width, position.y + height, position.z + -depth, position.x + -width, position.y + height, position.z + depth, position.x + width, position.y + height, position.z + depth, position.x + width, position.y + height, position.z + -depth);
                indices.push(startingIndices + 3, startingIndices + 2, startingIndices, startingIndices + 2, startingIndices + 1, startingIndices);
                numIndices = 4;
                uvs.push(
                //1
                0, 0, uv, 
                //2
                1, 0, uv, 
                //3
                1, 1, uv, 
                //4
                0, 1, uv);
                break;
            case "bottom":
                postions.push(position.x + -width, position.y + -height, position.z + -depth, position.x + width, position.y + -height, position.z + -depth, position.x + width, position.y + -height, position.z + depth, position.x + -width, position.y + -height, position.z + depth);
                indices.push(startingIndices + 2, startingIndices + 1, startingIndices, startingIndices + 3, startingIndices + 2, startingIndices);
                numIndices = 4;
                uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
                //   this._getLightLevelColors(Math.floor(Math.random() * 16) + 1, 1, colors);
                break;
            case "north":
                postions.push(position.x + -width, position.y + -height, position.z + -depth, position.x + -width, position.y + height, position.z + -depth, position.x + width, position.y + height, position.z + -depth, position.x + width, position.y + -height, position.z + -depth);
                indices.push(startingIndices + 2, startingIndices + 1, startingIndices, startingIndices + 3, startingIndices + 2, startingIndices);
                numIndices = 4;
                uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
                //  this._getLightLevelColors(Math.floor(Math.random() * 16) + 1, 1, colors);
                break;
            case "south":
                postions.push(position.x + -width, position.y + -height, position.z + depth, position.x + width, position.y + -height, position.z + depth, position.x + width, position.y + height, position.z + depth, position.x + -width, position.y + height, position.z + depth);
                indices.push(startingIndices + 3, startingIndices + 2, startingIndices, startingIndices + 2, startingIndices + 1, startingIndices);
                numIndices = 4;
                uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
                //   this._getLightLevelColors(Math.floor(Math.random() * 16) + 1, 1, colors);
                break;
            case "east":
                postions.push(position.x + -width, position.y + -height, position.z + -depth, position.x + -width, position.y + -height, position.z + depth, position.x + -width, position.y + height, position.z + depth, position.x + -width, position.y + height, position.z + -depth);
                indices.push(startingIndices + 2, startingIndices + 1, startingIndices, startingIndices + 3, startingIndices + 2, startingIndices);
                numIndices = 4;
                uvs.push(
                //1
                0, 0, uv, 
                //2
                1, 0, uv, 
                //3
                1, 1, uv, 
                //4
                0, 1, uv);
                //     this._getLightLevelColors(Math.floor(Math.random() * 16) + 1, 1, colors);
                break;
            case "west":
                postions.push(position.x + width, position.y + -height, position.z + -depth, position.x + width, position.y + height, position.z + -depth, position.x + width, position.y + height, position.z + depth, position.x + width, position.y + -height, position.z + depth);
                indices.push(startingIndices + 2, startingIndices + 1, startingIndices, startingIndices + 3, startingIndices + 2, startingIndices);
                numIndices = 4;
                uvs.push(
                //1
                0, 0, uv, 
                //2
                1, 0, uv, 
                //3
                1, 1, uv, 
                //4
                0, 1, uv);
                // this._getLightLevelColors(Math.floor(Math.random() * 16) + 1, 1, colors);
                break;
        }
        return startingIndices + numIndices;
    }
    _getLightLevelColors(level, color, colors) {
        const lightMulti = level / 16;
        colors.push(
        //1
        1 * lightMulti, 1 * lightMulti, 1 * lightMulti, 1, 
        //2
        1 * lightMulti, 1 * lightMulti, 1 * lightMulti, 1, 
        //3
        1 * lightMulti, 1 * lightMulti, 1 * lightMulti, 1, 
        //4
        1 * lightMulti, 1 * lightMulti, 1 * lightMulti, 1, 
        //5
        1 * lightMulti, 1 * lightMulti, 1 * lightMulti, 1, 
        //6
        1 * lightMulti, 1 * lightMulti, 1 * lightMulti, 1);
    }
}
