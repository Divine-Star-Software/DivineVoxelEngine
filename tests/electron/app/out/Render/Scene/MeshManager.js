import { DVER } from "../DivineVoxelEngineRender.js";
import { MeshRegister } from "./MeshRegister.js";
export const MeshManager = {
    scene: null,
    runningUpdate: false,
    meshes: {
        solid: {},
        transparent: {},
        flora: {},
        liquid: {},
        magma: {},
    },
    meshMakers: {},
    $INIT(scene) {
        this.scene = scene;
        //@ts-ignore
        this.meshMakers = {
            solid: DVER.renderManager.solidMesh,
            transparent: DVER.renderManager.solidMesh,
            liquid: DVER.renderManager.liquidMesh,
            flora: DVER.renderManager.floraMesh,
            magma: DVER.renderManager.magmaMesh,
        };
    },
    removeChunk(data) {
        const dimension = data[0];
        const substance = data[1];
        const chunkX = data[2];
        const chunkY = data[3];
        const chunkZ = data[4];
        MeshRegister.chunk.remove(dimension, chunkX, chunkY, chunkZ, substance);
    },
    updateChunk(data) {
        if (!this.scene)
            return;
        const dimension = data[0];
        const substance = data[1];
        const chunkX = data[2];
        const chunkY = data[3];
        const chunkZ = data[4];
        let chunk = MeshRegister.chunk.get(dimension, chunkX, chunkY, chunkZ, substance);
        this.scene.unfreezeActiveMeshes();
        let mesh;
        if (!chunk) {
            mesh = this.meshMakers[substance].createTemplateMesh(this.scene);
            this.meshMakers[substance].createMeshGeometory(mesh, data);
            MeshRegister.chunk.add(dimension, chunkX, chunkY, chunkZ, mesh, substance);
        }
        else {
            mesh = chunk.mesh;
            this.meshMakers[substance].rebuildMeshGeometory(mesh, data);
        }
        this.scene.freeActiveMeshes();
    },
    removeColumn(data) {
        const dimension = data[0];
        const chunkX = data[1];
        const chunkY = data[2];
        const chunkZ = data[3];
        MeshRegister.column.remove(dimension, chunkX, chunkZ, chunkY);
    },
    handleItemUpdate(x, y, z, data) {
        /*   const meshData: ItemMeshSetData = {
         positionArray: new Float32Array(data[ConstructItemIndexes.positionArray]),
         normalsArray: new Float32Array(data[ConstructItemIndexes.normalsArray]),
         indiciesArray: new Int32Array(data[ConstructItemIndexes.indiciesArray]),
         RGBLightColorsArray: new Float32Array(
          data[ConstructItemIndexes.RGBLightColorsArray]
         ),
         sunLightColorsArray: new Float32Array(
          data[ConstructItemIndexes.sunLightColorsArray]
         ),
         uvArray: new Float32Array(data[ConstructItemIndexes.uvArray]),
         extra: [],
        };
      
        RenderManager.itemMesh.createTemplateMesh(x, y, z, meshData); */
    },
    handleEntityUpdate(x, y, z, data) {
        /*   const meshData: MeshSetData = {
         positionArray: new Float32Array(data[ConstructEntityIndexes.positionArray]),
         normalsArray: new Float32Array(data[ConstructEntityIndexes.normalsArray]),
         indiciesArray: new Int32Array(data[ConstructEntityIndexes.indiciesArray]),
         faceDataArray: new Float32Array(data[ConstructEntityIndexes.faceDataArray]),
         AOColorsArray: new Float32Array(data[ConstructEntityIndexes.AOColorsArray]),
         RGBLightColorsArray: new Float32Array(
          data[ConstructEntityIndexes.RGBLightColorsArray]
         ),
         sunLightColorsArray: new Float32Array(
          data[ConstructEntityIndexes.sunLightColorsArray]
         ),
         colorsArray: new Float32Array(data[ConstructEntityIndexes.colorsArray]),
         uvArray: new Float32Array(data[ConstructEntityIndexes.uvArray]),
         overlayUVArray: new Float32Array(
          data[ConstructEntityIndexes.overlayUVArray]
         ),
         extra: [],
        };
        this.entityMesh.createMesh(x, y, z, meshData); */
    },
};
