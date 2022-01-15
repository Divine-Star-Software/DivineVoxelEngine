export class ChunkMesh {
    material;
    constructor(material) {
        this.material = material;
    }
    rebuildMeshGeometory(chunkMesh, chunkX, chunkZ, positions, indicies, linearcColors, fullColors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        const calculatedNormals = [];
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.normals = calculatedNormals;
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.applyToMesh(chunkMesh, true);
        chunkMesh.setVerticesData("myuvs", uvs, false, 3);
        chunkMesh.setVerticesData("colors", linearcColors, false, 4);
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
    createTemplateMesh(scene) {
        const mesh = new BABYLON.Mesh("solid", scene);
        mesh.alphaIndex = 0;
        return mesh;
    }
    createMeshGeometory(chunkMesh, chunkX, chunkZ, positions, indicies, linearColors, fullColors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        const calculatedNormals = [];
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.normals = calculatedNormals;
        chunkVertexData.applyToMesh(chunkMesh, true);
        chunkMesh.setVerticesData("myuvs", uvs, false, 3);
        chunkMesh.setVerticesData("colors", linearColors, false, 4);
        chunkMesh.material = this.material.getMaterial();
        chunkMesh.checkCollisions = true;
        chunkMesh.position.x = chunkX;
        chunkMesh.position.z = chunkZ;
        chunkMesh.freezeWorldMatrix();
        return chunkMesh;
    }
}
