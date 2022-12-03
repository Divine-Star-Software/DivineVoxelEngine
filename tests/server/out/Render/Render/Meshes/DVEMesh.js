export class DVEMesh {
    name;
    dveMat;
    pickable = false;
    checkCollisions = false;
    seralize = false;
    clearCachedGeometry = false;
    constructor(name, dveMat) {
        this.name = name;
        this.dveMat = dveMat;
    }
    createTemplateMesh(scene) {
        const mesh = new BABYLON.Mesh(this.name, scene);
        mesh.isPickable = this.pickable;
        mesh.checkCollisions = this.checkCollisions;
        if (!this.checkCollisions) {
            mesh.doNotSyncBoundingInfo = true;
        }
        mesh.doNotSerialize = this.seralize;
        mesh.cullingStrategy =
            BABYLON.AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY;
        return mesh;
    }
    syncSettings(settings) {
        if (settings.meshes.pickable) {
            this.pickable = true;
        }
        if (settings.meshes.clearChachedGeometry) {
            this.clearCachedGeometry = true;
        }
        if (settings.meshes.seralize) {
            this.seralize = true;
        }
    }
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
        mesh.setVerticesData("aoColors", data.AOColorsArray, false, 1);
        mesh.setVerticesData("lightColors", data.lightColorsArray, false, 4);
        mesh.setVerticesData("colors", data.colorsArray, false, 4);
        if (this.clearCachedGeometry) {
            const bbInfo = mesh.getBoundingInfo();
            if (mesh.subMeshes) {
                for (const sm of mesh.subMeshes) {
                    sm.setBoundingInfo(bbInfo);
                }
            }
            mesh.geometry?.clearCachedData();
        }
        mesh.freezeWorldMatrix();
    }
    async rebuildMeshGeometory(mesh, data) {
        this._applyVertexData(mesh, data);
        return mesh;
    }
    async createMeshGeometory(mesh, data) {
        mesh.material = this.dveMat.getMaterial();
        this._applyVertexData(mesh, data);
        return mesh;
    }
}
