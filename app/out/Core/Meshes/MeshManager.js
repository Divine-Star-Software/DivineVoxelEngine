export class MeshManager {
    DVE;
    scene;
    runningUpdate = false;
    constructor(DVE) {
        this.DVE = DVE;
        this.meshMakes = {
            solid: this.DVE.renderManager.chunkMesh,
            transparent: this.DVE.renderManager.chunkMesh,
            flora: this.DVE.renderManager.floraMesh,
            fluid: this.DVE.renderManager.fluidMesh,
            magma: this.DVE.renderManager.floraMesh,
        };
    }
    chunkMeshes = {};
    meshes = {
        solid: {},
        transparent: {},
        flora: {},
        fluid: {},
        magma: {},
    };
    meshMakes;
    handleUpdate(type, chunkKey, chunkX, chunkZ, data) {
        if (!this.meshes[type][chunkKey]) {
            this._buildNewMesh(type, chunkKey, chunkX, chunkZ, data);
        }
        else {
            this._updateMesh(type, chunkKey, chunkX, chunkZ, data);
        }
    }
    requestChunkBeRemoved(chunkKey) {
        for (const substance of Object.keys(this.meshes)) {
            if (this.meshes[substance][chunkKey]) {
                this.meshes[substance][chunkKey].dispose();
                delete this.meshes[substance][chunkKey];
            }
        }
    }
    async _updateMesh(type, chunkKey, chunkX, chunkZ, data) {
        this.runningUpdate = true;
        const mesh = this.meshes[type][chunkKey];
        const positions = new Float32Array(data[3]);
        const indicies = new Int32Array(data[4]);
        const linearColors = new Float32Array(data[5]);
        const fullColors = new Float32Array(data[6]);
        const uvs = new Float32Array(data[7]);
        this.meshMakes[type].rebuildMeshGeometory(mesh, chunkX, chunkZ, positions, indicies, linearColors, linearColors, uvs);
        this.runningUpdate = false;
    }
    async _buildNewMesh(type, chunkKey, chunkX, chunkZ, data) {
        const mesh = this.meshMakes[type].createTemplateMesh(this.scene);
        mesh.setEnabled(true);
        const positions = new Float32Array(data[3]);
        const indicies = new Int32Array(data[4]);
        const linearColors = new Float32Array(data[5]);
        const fullColors = new Float32Array(data[6]);
        const uvs = new Float32Array(data[7]);
        this.meshMakes[type].createMeshGeometory(mesh, chunkX, chunkZ, positions, indicies, linearColors, linearColors, uvs);
        //chunkMesh.updateFacetData();
        this.meshes[type][chunkKey] = mesh;
    }
}
