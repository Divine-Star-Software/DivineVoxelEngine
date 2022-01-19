const face1 = (positions, indices, uvs, colors, position, startingIndices, width = 0.5, height = 0.5, depth = 0.5) => {
    positions.push(position.x - width, position.y + height, position.z + -depth, position.x + width, position.y + height, position.z + depth, position.x + width, position.y + -height, position.z + depth, position.x - width, position.y + -height, position.z + -depth);
    indices.push(startingIndices + 2, startingIndices + 1, startingIndices, startingIndices + 3, startingIndices + 2, startingIndices);
    let uv = 1;
    uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
    colors.push(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
    return startingIndices + 4;
};
const face2 = (positions, indices, uvs, colors, position, startingIndices, width = 0.5, height = 0.5, depth = 0.5) => {
    positions.push(position.x + -width, position.y + height, position.z + depth, position.x + width, position.y + height, position.z + -depth, position.x + width, position.y + -height, position.z + -depth, position.x + -width, position.y + -height, position.z + depth);
    indices.push(startingIndices + 2, startingIndices + 1, startingIndices, startingIndices + 3, startingIndices + 2, startingIndices);
    let uv = 1;
    uvs.push(0, 0, uv, 1, 0, uv, 1, 1, uv, 0, 1, uv);
    colors.push(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
    return startingIndices + 4;
};
export function Shape1(scene, chunkMaterial) {
    const mesh = new BABYLON.Mesh("custom", scene);
    const position = { x: 0, y: 0, z: 0 };
    let startingIndices = 0;
    const positions = [];
    const indices = [];
    const uvs = [];
    const colors = [];
    startingIndices = face1(positions, indices, uvs, colors, position, startingIndices);
    face2(positions, indices, uvs, colors, position, startingIndices);
    const vertexData = new BABYLON.VertexData();
    const normals = [];
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.normals = normals;
    vertexData.colors = colors;
    vertexData.applyToMesh(mesh);
    mesh.setVerticesData("cuv3", uvs, false, 3);
    mesh.setVerticesData("colors", colors, false, 3);
    mesh.material = chunkMaterial;
    mesh.alphaIndex = 1;
    //mesh.material.transparencyMode = 0;
    mesh.position.x = 5.5;
    mesh.position.y = 31.5;
    mesh.position.z = 5.5;
}
