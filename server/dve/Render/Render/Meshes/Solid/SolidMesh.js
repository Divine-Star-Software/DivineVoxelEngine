import { SolidMaterial } from "../../Materials/Solid/SolidMaterial.js";
export const SolidMesh = {
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
        const mesh = new BABYLON.Mesh("solid", scene);
        mesh.alphaIndex = 0;
        mesh.isPickable = false;
        mesh.checkCollisions = true;
        mesh.doNotSerialize = true;
        mesh.receiveShadows = true;
        return mesh;
    },
    async createMeshGeometory(mesh, positions, indicies, aoColors, rgbLightColors, sunLightColors, colors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("aoColors", aoColors, false, 4);
        mesh.setVerticesData("rgbLightColors", rgbLightColors, false, 4);
        mesh.setVerticesData("sunLightColors", sunLightColors, false, 4);
        mesh.setVerticesData("colors", colors, false, 4);
        mesh.material = SolidMaterial.material;
        mesh.freezeWorldMatrix();
        return mesh;
    },
};
