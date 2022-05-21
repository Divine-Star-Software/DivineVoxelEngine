import { FloraMaterial } from "../../Materials/Flora/FloraMaterial.js";
export const FloraMesh = {
    async rebuildMeshGeometory(mesh, positions, indicies, aoColors, rgbLightColors, sunLightColors, colors, uvs) {
        mesh.unfreezeWorldMatrix();
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("colors", aoColors, false, 4);
        mesh.freezeWorldMatrix();
    },
    createTemplateMesh(scene) {
        const mesh = new BABYLON.Mesh("flora", scene);
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
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("colors", aoColors, false, 4);
        mesh.material = FloraMaterial.getMaterial();
        mesh.freezeWorldMatrix();
        return mesh;
    },
};
