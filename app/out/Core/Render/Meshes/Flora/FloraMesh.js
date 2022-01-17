export class FloraMesh {
    material;
    constructor(material) {
        this.material = material;
    }
    rebuildMeshGeometory(mesh, chunkX, chunkZ, positions, indicies, linearcColors, fullColors, uvs) {
        mesh.unfreezeWorldMatrix();
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("myuvs", uvs, false, 3);
        mesh.setVerticesData("colors", linearcColors, false, 4);
        mesh.freezeWorldMatrix();
    }
    createTemplateMesh(scene) {
        const mesh = new BABYLON.Mesh("flora", scene);
        mesh.alphaIndex = 1;
        mesh.isPickable = false;
        mesh.checkCollisions = false;
        return mesh;
    }
    createMeshGeometory(mesh, chunkX, chunkZ, positions, indicies, linearColors, fullColors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("myuvs", uvs, false, 3);
        mesh.setVerticesData("colors", linearColors, false, 4);
        mesh.material = this.material.getMaterial();
        mesh.freezeWorldMatrix();
        return mesh;
    }
}
