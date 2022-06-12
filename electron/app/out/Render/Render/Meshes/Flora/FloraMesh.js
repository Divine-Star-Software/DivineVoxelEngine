import { FloraMaterial } from "../../Materials/Flora/FloraMaterial.js";
export const FloraMesh = {
    async rebuildMeshGeometory(mesh, data) {
        mesh.unfreezeWorldMatrix();
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = data.positionArray;
        chunkVertexData.indices = data.indiciesArray;
        chunkVertexData.normals = data.normalsArray;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", data.uvArray, false, 3);
        mesh.setVerticesData("aoColors", data.AOColorsArray, false, 4);
        mesh.setVerticesData("rgbLightColors", data.RGBLightColorsArray, false, 4);
        mesh.setVerticesData("sunLightColors", data.sunLightColorsArray, false, 4);
        mesh.setVerticesData("colors", data.colorsArray, false, 4);
        mesh.freezeWorldMatrix();
    },
    createTemplateMesh(scene) {
        const mesh = new BABYLON.Mesh("flora", scene);
        mesh.isPickable = false;
        mesh.checkCollisions = false;
        mesh.doNotSerialize = true;
        return mesh;
    },
    async createMeshGeometory(mesh, data) {
        mesh.unfreezeWorldMatrix();
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = data.positionArray;
        chunkVertexData.indices = data.indiciesArray;
        chunkVertexData.normals = data.normalsArray;
        chunkVertexData.applyToMesh(mesh, true);
        mesh.setVerticesData("cuv3", data.uvArray, false, 3);
        mesh.setVerticesData("aoColors", data.AOColorsArray, false, 4);
        mesh.setVerticesData("rgbLightColors", data.RGBLightColorsArray, false, 4);
        mesh.setVerticesData("sunLightColors", data.sunLightColorsArray, false, 4);
        mesh.setVerticesData("colors", data.colorsArray, false, 4);
        mesh.freezeWorldMatrix();
        mesh.material = FloraMaterial.getMaterial();
        return mesh;
    },
};
