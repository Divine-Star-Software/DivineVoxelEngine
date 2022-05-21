import { MagmaMaterial } from "../../Materials/Magma/MagmaMaterial.js";
export const MagmaMesh = {
    rebuildMeshGeometory(mesh, positions, indicies, aoColors, rgbLightColors, sunLightColors, colors, uvs) {
        mesh.unfreezeWorldMatrix();
        const chunkVertexData = new BABYLON.VertexData();
        const calculatedNormals = [];
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.normals = calculatedNormals;
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("colors", aoColors, false, 4);
        mesh.freezeWorldMatrix();
    },
    createTemplateMesh(scene) {
        const mesh = new BABYLON.Mesh("magma", scene);
        mesh.alphaIndex = 0;
        mesh.isPickable = false;
        mesh.checkCollisions = false;
        mesh.doNotSyncBoundingInfo = true;
        mesh.doNotSerialize = true;
        return mesh;
    },
    createMeshGeometory(mesh, positions, indicies, aoColors, rgbLightColors, sunLightColors, colors, uvs) {
        const chunkVertexData = new BABYLON.VertexData();
        const calculatedNormals = [];
        BABYLON.VertexData.ComputeNormals(positions, indicies, calculatedNormals);
        chunkVertexData.positions = positions;
        chunkVertexData.indices = indicies;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", uvs, false, 3);
        mesh.setVerticesData("colors", aoColors, false, 4);
        mesh.material = MagmaMaterial.getMaterial();
        mesh.freezeWorldMatrix();
        return mesh;
    },
};
