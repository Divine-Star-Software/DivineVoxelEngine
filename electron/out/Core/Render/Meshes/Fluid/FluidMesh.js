export class FluidMesh {
    material;
    mesh;
    scene;
    beenCreated = false;
    constructor(material) {
        this.material = material;
    }
    async rebuildMeshGeometory(positions, indicies, RGBLightColors, sunLightColors, colors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.applyToMesh(this.mesh, true);
        this.mesh.setVerticesData("cuv3", uvs, false, 3);
        this.mesh.setVerticesData("rgbLightColors", RGBLightColors, false, 4);
        this.mesh.setVerticesData("sunLightColors", sunLightColors, false, 4);
        this.mesh.setVerticesData("colors", colors, false, 4);
    }
    createTemplateMesh(scene) {
        this.mesh = new BABYLON.Mesh("fluid", scene);
        this.scene = scene;
        this.mesh.isPickable = false;
        this.mesh.alphaIndex = 1;
        this.mesh.checkCollisions = false;
        this.mesh.visibility = 0.1;
        this.mesh.hasVertexAlpha = true;
        return this.mesh;
    }
    async createMeshGeometory(positions, indicies, RGBLightColors, sunLightColors, colors, uvs) {
        this.mesh.material = this.material.getMaterial();
        this.beenCreated = true;
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.applyToMesh(this.mesh, true);
        this.mesh.setVerticesData("cuv3", uvs, false, 3);
        console.log(RGBLightColors, sunLightColors);
        this.mesh.setVerticesData("rgbLightColors", RGBLightColors, false, 4);
        this.mesh.setVerticesData("sunLightColors", sunLightColors, false, 4);
        this.mesh.setVerticesData("colors", colors, false, 4);
        this.mesh.freezeWorldMatrix();
        return this.mesh;
    }
}
