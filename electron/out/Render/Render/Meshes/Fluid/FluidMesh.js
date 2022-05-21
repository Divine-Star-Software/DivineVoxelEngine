import { FluidMaterial } from "../../Materials/Fluid/FluidMaterial.js";
export const FluidMesh = {
    async rebuildMeshGeometory(mesh, positions, indicies, aoColors, rgbLightColors, sunLightColors, colors, uvs) {
        mesh.unfreezeWorldMatrix();
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("aoColors", aoColors, false, 4);
        mesh.setVerticesData("rgbLightColors", rgbLightColors, false, 4);
        mesh.setVerticesData("sunLightColors", sunLightColors, false, 4);
        mesh.setVerticesData("colors", colors, false, 4);
        mesh.freezeWorldMatrix();
    },
    createTemplateMesh(scene) {
        const mesh = new BABYLON.Mesh("fluid", scene);
        mesh.alphaIndex = 0;
        mesh.isPickable = false;
        mesh.checkCollisions = false;
        mesh.doNotSyncBoundingInfo = true;
        mesh.doNotSerialize = true;
        return mesh;
    },
    async createMeshGeometory(mesh, positions, indicies, aoColors, rgbLightColors, sunLightColors, colors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        // chunkVertexData.colors = linearColors;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("aoColors", aoColors, false, 4);
        mesh.setVerticesData("rgbLightColors", rgbLightColors, false, 4);
        mesh.setVerticesData("sunLightColors", sunLightColors, false, 4);
        mesh.setVerticesData("colors", colors, false, 4);
        mesh.material = FluidMaterial.getMaterial();
        mesh.freezeWorldMatrix();
        return mesh;
    },
};
