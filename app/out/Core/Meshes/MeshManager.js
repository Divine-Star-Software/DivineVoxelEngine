export class MeshManager {
    DVE;
    scene;
    runningUpdate = false;
    meshes = {
        solid: {},
        transparent: {},
        flora: {},
        fluid: {},
        magma: {},
    };
    meshMakers;
    constructor(DVE) {
        this.DVE = DVE;
        //@ts-ignore
        this.meshMakers = {
            solid: this.DVE.renderManager.solidMesh,
            transparent: this.DVE.renderManager.solidMesh,
            flora: this.DVE.renderManager.floraMesh,
            magma: this.DVE.renderManager.magmaMesh,
        };
    }
    setScene(scene) {
        this.scene = scene;
    }
    handleUpdate(type, chunkKey, chunkX, chunkY, chunkZ, data) {
        if (type != "fluid") {
            if (!this.meshes[type][chunkKey]) {
                this._buildNewMesh(type, chunkKey, chunkX, chunkY, chunkZ, data);
            }
            else {
                this._updateMesh(type, chunkKey, chunkX, chunkY, chunkZ, data);
            }
        }
        else {
            this._updateFluidMesh(data);
        }
    }
    _updateFluidMesh(data) {
        this.scene.unfreezeActiveMeshes();
        const positions = new Float32Array(data[4]);
        const indicies = new Int32Array(data[5]);
        const linearColors = new Float32Array(data[6]);
        const fullColors = new Float32Array(data[7]);
        const uvs = new Float32Array(data[8]);
        if (this.DVE.renderManager.fluidMesh.beenCreated) {
            this.DVE.renderManager.fluidMesh.rebuildMeshGeometory(positions, indicies, linearColors, fullColors, uvs);
        }
        else {
            this.DVE.renderManager.fluidMesh.createTemplateMesh(this.scene);
            this.DVE.renderManager.fluidMesh.createMeshGeometory(positions, indicies, linearColors, fullColors, uvs);
        }
        this.scene.freeActiveMeshes();
    }
    requestChunkBeRemoved(chunkKey) {
        for (const substance of Object.keys(this.meshes)) {
            if (this.meshes[substance][chunkKey]) {
                this.meshes[substance][chunkKey].dispose();
                delete this.meshes[substance][chunkKey];
            }
        }
    }
    async _updateMesh(type, chunkKey, chunkX, chunkY, chunkZ, data) {
        this.scene.unfreezeActiveMeshes();
        this.runningUpdate = true;
        const mesh = this.meshes[type][chunkKey];
        const positions = new Float32Array(data[4]);
        const indicies = new Int32Array(data[5]);
        const linearColors = new Float32Array(data[6]);
        const fullColors = new Float32Array(data[7]);
        const uvs = new Float32Array(data[8]);
        this.meshMakers[type].rebuildMeshGeometory(mesh, chunkX, chunkZ, positions, indicies, linearColors, fullColors, uvs);
        this.runningUpdate = false;
        this.scene.freeActiveMeshes();
    }
    async _buildNewMesh(type, chunkKey, chunkX, chunkY, chunkZ, data) {
        this.scene.unfreezeActiveMeshes();
        const mesh = this.meshMakers[type].createTemplateMesh(this.scene);
        mesh.setEnabled(true);
        const positions = new Float32Array(data[4]);
        const indicies = new Int32Array(data[5]);
        const linearColors = new Float32Array(data[6]);
        const fullColors = new Float32Array(data[7]);
        const uvs = new Float32Array(data[8]);
        this.meshMakers[type].createMeshGeometory(mesh, chunkX, chunkZ, positions, indicies, linearColors, fullColors, uvs);
        //chunkMesh.updateFacetData();
        this.meshes[type][chunkKey] = mesh;
        this.scene.freeActiveMeshes();
    }
}
