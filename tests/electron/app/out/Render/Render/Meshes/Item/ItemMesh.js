import { ItemMaterial } from "../../Materials/Item/ItemMaterial.js";
import { DVER } from "../../../DivineVoxelEngineRender.js";
export const ItemMesh = {
    pickable: false,
    checkCollisions: false,
    seralize: false,
    clearCachedGeometry: false,
    createTemplateMesh(scene) {
        const mesh = new BABYLON.Mesh("solid", scene);
        mesh.isPickable = this.pickable;
        mesh.checkCollisions = this.checkCollisions;
        if (!this.checkCollisions) {
            mesh.doNotSyncBoundingInfo = true;
        }
        mesh.doNotSerialize = this.seralize;
        return mesh;
    },
    syncSettings(settings) {
        if (settings.meshes.pickable) {
            this.pickable = true;
        }
        if (settings.meshes.clearChachedGeometry) {
            this.clearCachedGeometry = true;
        }
        if (settings.meshes.checkSolidCollisions) {
            this.checkCollisions = true;
        }
        if (settings.meshes.seralize) {
            this.seralize = true;
        }
    },
    _applyVertexData(mesh, data) {
        mesh.unfreezeWorldMatrix();
        const chunkVertexData = new BABYLON.VertexData();
        chunkVertexData.positions = data.positionArray;
        chunkVertexData.indices = data.indiciesArray;
        chunkVertexData.normals = data.normalsArray;
        chunkVertexData.applyToMesh(mesh, false);
        mesh.setVerticesData("cuv3", data.uvArray, false, 3);
        mesh.setVerticesData("rgbLightColors", data.RGBLightColorsArray, false, 4);
        mesh.setVerticesData("sunLightColors", data.sunLightColorsArray, false, 4);
        if (this.clearCachedGeometry) {
            mesh.geometry?.clearCachedData();
        }
        mesh.freezeWorldMatrix();
    },
    async rebuildMeshGeometory(mesh, data) {
        this._applyVertexData(mesh, data);
        return mesh;
    },
    async createMesh(x, y, z, data) {
        if (!DVER.renderManager.scene) {
            throw new Error("Scene must be set to create entity mesh.");
        }
        const mesh = this.createTemplateMesh(DVER.renderManager.scene);
        mesh.unfreezeWorldMatrix();
        mesh.material = ItemMaterial.getMaterial();
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        this._applyVertexData(mesh, data);
        return mesh;
    },
};
