import { SetChunkDataIndexes } from "../../Constants/InterComms/ConstructorToRender.js";
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
    handleUpdate(type, chunkKey, data) {
        const meshData = {
            positionArray: new Float32Array(data[SetChunkDataIndexes.positionArray]),
            normalsArray: new Float32Array(data[SetChunkDataIndexes.normalsArray]),
            indiciesArray: new Int32Array(data[SetChunkDataIndexes.indiciesArray]),
            faceDataArray: new Float32Array(data[SetChunkDataIndexes.faceDataArray]),
            AOColorsArray: new Float32Array(data[SetChunkDataIndexes.AOColorsArray]),
            RGBLightColorsArray: new Float32Array(data[SetChunkDataIndexes.RGBLightColorsArray]),
            sunLightColorsArray: new Float32Array(data[SetChunkDataIndexes.sunLightColorsArray]),
            colorsArray: new Float32Array(data[SetChunkDataIndexes.colorsArray]),
            uvArray: new Float32Array(data[SetChunkDataIndexes.uvArray]),
            overlayUVArray: new Float32Array(data[SetChunkDataIndexes.overlayUVArray]),
            extra: [],
        };
        if (!this.meshes[type][chunkKey]) {
            this._buildNewMesh(type, chunkKey, meshData);
        }
        else {
            this._updateMesh(type, chunkKey, meshData);
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
        const mesh = this.meshes[type][chunkKey];
        this.scene.unfreezeActiveMeshes();
        this.meshMakers[type].createMeshGeometory(mesh, data);
        this.scene.freeActiveMeshes();
    },
    async _buildNewMesh(type, chunkKey, data) {
        if (!this.scene)
            return;
        this.scene.unfreezeActiveMeshes();
        const mesh = this.meshMakers[type].createTemplateMesh(this.scene);
        mesh.setEnabled(true);
        this.meshMakers[type].createMeshGeometory(mesh, data);
        this.meshes[type][chunkKey] = mesh;
        this.scene.freeActiveMeshes();
    },
};
