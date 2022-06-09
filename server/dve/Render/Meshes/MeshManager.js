import { DVER } from "../DivineVoxelEngineRender.js";
export const MeshManager = {
    scene: null,
    runningUpdate: false,
    meshes: {
        solid: {},
        transparent: {},
        flora: {},
        fluid: {},
        magma: {},
    },
    meshMakers: {},
    $INIT() {
        //@ts-ignore
        this.meshMakers = {
            solid: DVER.renderManager.solidMesh,
            transparent: DVER.renderManager.solidMesh,
            fluid: DVER.renderManager.fluidMesh,
            flora: DVER.renderManager.floraMesh,
            magma: DVER.renderManager.magmaMesh,
        };
    },
    setScene(scene) {
        this.scene = scene;
    },
    reStart() { },
    handleUpdateN(type, chunkKey, data) {
        if (!this.meshes[type][chunkKey]) {
            this._buildNewMesh(type, chunkKey, data);
        }
        else {
            this._updateMesh(type, chunkKey, data);
        }
    },
    requestChunkBeRemoved(chunkKey) {
        for (const substance of Object.keys(this.meshes)) {
            if (this.meshes[substance][chunkKey]) {
                this.meshes[substance][chunkKey].dispose();
                delete this.meshes[substance][chunkKey];
            }
        }
    },
    async _updateMesh(type, chunkKey, data) {
        if (!this.scene)
            return;
        this.scene.unfreezeActiveMeshes();
        this.runningUpdate = true;
        const mesh = this.meshes[type][chunkKey];
        const positions = new Float32Array(data[5]);
        const indicies = new Int32Array(data[6]);
        const aoColors = new Float32Array(data[7]);
        const rgbLightColors = new Float32Array(data[8]);
        const sunLightColors = new Float32Array(data[9]);
        const colors = new Float32Array(data[10]);
        const uvs = new Float32Array(data[11]);
        this.meshMakers[type].rebuildMeshGeometory(mesh, positions, indicies, aoColors, rgbLightColors, sunLightColors, colors, uvs);
        this.runningUpdate = false;
        this.scene.freeActiveMeshes();
    },
    async _buildNewMesh(type, chunkKey, data) {
        if (!this.scene)
            return;
        this.scene.unfreezeActiveMeshes();
        const mesh = this.meshMakers[type].createTemplateMesh(this.scene);
        mesh.setEnabled(true);
        const positions = new Float32Array(data[5]);
        const indicies = new Int32Array(data[6]);
        const aoColors = new Float32Array(data[7]);
        const rgbLightColors = new Float32Array(data[8]);
        const sunLightColors = new Float32Array(data[9]);
        const colors = new Float32Array(data[10]);
        const uvs = new Float32Array(data[11]);
        this.meshMakers[type].createMeshGeometory(mesh, positions, indicies, aoColors, rgbLightColors, sunLightColors, colors, uvs);
        //chunkMesh.updateFacetData();
        this.meshes[type][chunkKey] = mesh;
        this.scene.freeActiveMeshes();
    },
};
