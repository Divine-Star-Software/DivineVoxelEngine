export class FloraMesh {
    material;
    constructor(material) {
        this.material = material;
    }
    async rebuildMeshGeometory(mesh, chunkX, chunkZ, positions, indicies, aoColors, rgbLightColors, sunLightColors, colors, uvs) {
        mesh.unfreezeWorldMatrix();
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("colors", aoColors, false, 4);
        mesh.freezeWorldMatrix();
    }
    createTemplateMesh(scene) {
        const mesh = new BABYLON.Mesh("flora", scene);
        mesh.alphaIndex = 1;
        mesh.isPickable = false;
        mesh.checkCollisions = false;
        return mesh;
    }
    async createMeshGeometory(mesh, chunkX, chunkZ, positions, indicies, aoColors, rgbLightColors, sunLightColors, colors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("colors", aoColors, false, 4);
        mesh.material = this.material.getMaterial();
        mesh.freezeWorldMatrix();
        return mesh;
    }
}
