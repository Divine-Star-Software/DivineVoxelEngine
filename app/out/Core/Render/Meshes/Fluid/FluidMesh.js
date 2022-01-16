export class FluidMesh {
    material;
    mesh;
    beenCreated = false;
    constructor(material) {
        this.material = material;
    }
    rebuildMeshGeometory(positions, indicies, linearcColors, fullColors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        const calculatedNormals = [];
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.normals = calculatedNormals;
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.applyToMesh(this.mesh, true);
        this.mesh.setVerticesData("myuvs", uvs, false, 3);
        this.mesh.setVerticesData("colors", linearcColors, false, 4);
        this.mesh.unfreezeWorldMatrix();
        //Babylon throws an error but this functions works
        //So wrapped it in this for now. It works though
        try {
            this.mesh.updateFacetData();
        }
        catch (error) { }
        this.mesh.freezeWorldMatrix();
    }
    createTemplateMesh(scene) {
        this.mesh = new BABYLON.Mesh("fluid", scene);
        this.mesh.alphaIndex = 1;
        this.mesh.checkCollisions = false;
        return this.mesh;
    }
    createMeshGeometory(positions, indicies, linearColors, fullColors, uvs) {
        this.beenCreated = true;
        const chunkVertexData = new BABYLON.VertexData();
        const calculatedNormals = [];
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.normals = calculatedNormals;
        chunkVertexData.applyToMesh(this.mesh, true);
        this.mesh.setVerticesData("myuvs", uvs, false, 3);
        this.mesh.setVerticesData("colors", linearColors, false, 4);
        this.mesh.material = this.material.getMaterial();
        this.mesh.freezeWorldMatrix();
        return this.mesh;
    }
}
