export class ChunkMesh {
    chunkMaterial;
    constructor(chunkMaterial) {
        this.chunkMaterial = chunkMaterial;
    }
    rebuildChunkMesh(chunkMesh, chunkX, chunkZ, positions, indicies, colors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        const calculatedNormals = [];
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.normals = calculatedNormals;
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.applyToMesh(chunkMesh, true);
        chunkMesh.setVerticesData("myuvs", uvs, false, 3);
        chunkMesh.setVerticesData("colors", colors, false, 4);
        chunkMesh.unfreezeWorldMatrix();
        chunkMesh.position.x = chunkX;
        chunkMesh.position.z = chunkZ;
        chunkMesh.freezeWorldMatrix();
        //Babylon throws an error but this functions works
        //So wrapped it in this for now. It works though
        try {
            chunkMesh.updateFacetData();
        }
        catch (error) { }
    }
    makeChunkMesh(chunkMesh, chunkX, chunkZ, positions, indicies, colors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        const calculatedNormals = [];
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.normals = calculatedNormals;
        chunkMesh.alphaIndex = 0;
        chunkVertexData.applyToMesh(chunkMesh, true);
        chunkMesh.setVerticesData("myuvs", uvs, false, 3);
        chunkMesh.setVerticesData("colors", colors, false, 4);
        chunkMesh.material = this.chunkMaterial.getMaterial();
        chunkMesh.checkCollisions = true;
        chunkMesh.position.x = chunkX;
        chunkMesh.position.z = chunkZ;
        chunkMesh.freezeWorldMatrix();
        return chunkMesh;
    }
}
