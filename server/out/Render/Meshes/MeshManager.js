import { ConstructEntityIndexes, ConstructItemIndexes, SetChunkDataIndexes, } from "../../Constants/InterComms/ConstructorToRender.js";
import { DVER } from "../DivineVoxelEngineRender.js";
import { EntityMesh } from "../Render/Meshes/Entity/EntityMesh.js";
import { ItemMesh } from "../Render/Meshes/Item/ItemMesh.js";
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
    entityMesh: EntityMesh,
    itemMesh: ItemMesh,
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
    removeChunkMesh(type, chunkKey) {
        const mesh = this.meshes[type][chunkKey];
        if (!mesh) {
            return;
        }
        mesh.dispose();
        delete this.meshes[type][chunkKey];
    },
    handleItemUpdate(x, y, z, data) {
        const meshData = {
            positionArray: new Float32Array(data[ConstructItemIndexes.positionArray]),
            normalsArray: new Float32Array(data[ConstructItemIndexes.normalsArray]),
            indiciesArray: new Int32Array(data[ConstructItemIndexes.indiciesArray]),
            RGBLightColorsArray: new Float32Array(data[ConstructItemIndexes.RGBLightColorsArray]),
            sunLightColorsArray: new Float32Array(data[ConstructItemIndexes.sunLightColorsArray]),
            uvArray: new Float32Array(data[ConstructItemIndexes.uvArray]),
            extra: [],
        };
        this.itemMesh.createMesh(x, y, z, meshData);
    },
    handleEntityUpdate(x, y, z, data) {
        const meshData = {
            positionArray: new Float32Array(data[ConstructEntityIndexes.positionArray]),
            normalsArray: new Float32Array(data[ConstructEntityIndexes.normalsArray]),
            indiciesArray: new Int32Array(data[ConstructEntityIndexes.indiciesArray]),
            faceDataArray: new Float32Array(data[ConstructEntityIndexes.faceDataArray]),
            AOColorsArray: new Float32Array(data[ConstructEntityIndexes.AOColorsArray]),
            RGBLightColorsArray: new Float32Array(data[ConstructEntityIndexes.RGBLightColorsArray]),
            sunLightColorsArray: new Float32Array(data[ConstructEntityIndexes.sunLightColorsArray]),
            colorsArray: new Float32Array(data[ConstructEntityIndexes.colorsArray]),
            uvArray: new Float32Array(data[ConstructEntityIndexes.uvArray]),
            overlayUVArray: new Float32Array(data[ConstructEntityIndexes.overlayUVArray]),
            extra: [],
        };
        this.entityMesh.createMesh(x, y, z, meshData);
    },
    handleChunkUpdate(type, chunkKey, data) {
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
