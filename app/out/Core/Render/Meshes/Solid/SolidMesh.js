export class SolidMesh {
    material;
    constructor(material) {
        this.material = material;
    }
    async rebuildMeshGeometory(mesh, chunkX, chunkZ, positions, indicies, linearColors, fullColors, uvs) {
        mesh.unfreezeWorldMatrix();
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("linearcColors", linearColors, false, 4);
        mesh.setVerticesData("fullcolors", fullColors, false, 4);
        mesh.freezeWorldMatrix();
    }
    createTemplateMesh(scene) {
        const mesh = new BABYLON.Mesh("solid", scene);
        mesh.alphaIndex = 0;
        mesh.isPickable = false;
        mesh.checkCollisions = true;
        return mesh;
    }
    async createMeshGeometory(mesh, chunkX, chunkZ, positions, indicies, linearColors, fullColors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        // chunkVertexData.colors = linearColors;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("linearcColors", linearColors, false, 4);
        mesh.setVerticesData("fullcolors", fullColors, false, 4);
        mesh.material = this.material.getMaterial();
        mesh.freezeWorldMatrix();
        return mesh;
    }
}
