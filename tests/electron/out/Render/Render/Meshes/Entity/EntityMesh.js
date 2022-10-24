import { DVER } from "../../../DivineVoxelEngineRender.js";
import { SolidMaterial } from "../../Materials/Solid/SolidMaterial.js";
export const EntityMesh = {
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
        mesh.setVerticesData("ocuv3", data.overlayUVArray, false, 4);
        mesh.setVerticesData("faceData", data.faceDataArray, false, 1);
        mesh.setVerticesData("aoColors", data.AOColorsArray, false, 4);
        mesh.setVerticesData("rgbLightColors", data.RGBLightColorsArray, false, 4);
        mesh.setVerticesData("sunLightColors", data.sunLightColorsArray, false, 4);
        mesh.setVerticesData("colors", data.colorsArray, false, 4);
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
        mesh.material = SolidMaterial.getMaterial();
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.scaling.x = 0.5;
        mesh.scaling.y = 0.5;
        mesh.scaling.z = 0.5;
        let k = 0;
        mesh.setPivotPoint(new BABYLON.Vector3(1.5, 0.5, 1.5), BABYLON.Space.LOCAL);
        setInterval(() => {
            mesh.rotationQuaternion = null;
            mesh.rotate(BABYLON.Axis.Y, k);
            k += 0.01;
        }, 17);
        this._applyVertexData(mesh, data);
        return mesh;
    },
};
