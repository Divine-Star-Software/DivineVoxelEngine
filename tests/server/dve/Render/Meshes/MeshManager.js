import { ConstructEntityIndexes, ConstructItemIndexes, } from "../../Common/Threads/Contracts/ConstructorToRender.js";
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
    removeChunkMesh(dimesnion, type, chunkKey) {
        if (!this.meshes[type][dimesnion])
            return;
        const mesh = this.meshes[type][dimesnion][chunkKey];
        if (!mesh) {
            return;
        }
        mesh.dispose();
        delete this.meshes[type][dimesnion][chunkKey];
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
    handleChunkUpdate(dimesnion, type, chunkKey, data) {
        const meshData = {
            positionArray: data[5],
            normalsArray: data[6],
            indiciesArray: data[7],
            faceDataArray: data[8],
            AOColorsArray: data[9],
            RGBLightColorsArray: data[10],
            sunLightColorsArray: data[11],
            colorsArray: data[12],
            uvArray: data[13],
            overlayUVArray: data[14],
            extra: [],
        };
        if (!this.meshes[type][dimesnion]) {
            this.meshes[type][dimesnion] = {};
        }
        if (!this.meshes[type][dimesnion][chunkKey]) {
            this._buildNewMesh(dimesnion, type, chunkKey, meshData);
        }
        else {
            this._updateMesh(dimesnion, type, chunkKey, meshData);
        }
    },
    requestChunkBeRemoved(dimesnion, chunkKey) {
        for (const substance of Object.keys(this.meshes)) {
            if (this.meshes[substance][dimesnion][chunkKey]) {
                this.meshes[substance][dimesnion][chunkKey].dispose();
                delete this.meshes[substance][dimesnion][chunkKey];
            }
        }
    },
    async _updateMesh(dimesnion, type, chunkKey, data) {
        if (!this.scene)
            return;
        const mesh = this.meshes[type][dimesnion][chunkKey];
        this.scene.unfreezeActiveMeshes();
        this.meshMakers[type].createMeshGeometory(mesh, data);
        this.scene.freeActiveMeshes();
    },
    async _buildNewMesh(dimesnion, type, chunkKey, data) {
        if (!this.scene)
            return;
        this.scene.unfreezeActiveMeshes();
        const mesh = this.meshMakers[type].createTemplateMesh(this.scene);
        mesh.setEnabled(true);
        this.meshMakers[type].createMeshGeometory(mesh, data);
        this.meshes[type][dimesnion][chunkKey] = mesh;
        this.scene.freeActiveMeshes();
    },
};
