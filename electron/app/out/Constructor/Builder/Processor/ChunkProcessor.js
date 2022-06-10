//objects
import { Util } from "../../../Global/Util.helper.js";
import { WorldMatrix } from "../../../Matrix/WorldMatrix.js";
import { DVEB } from "../DivineVoxelEngineBuilder.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
//functions
import { CalculateVoxelLight, VoxelLightMixCalc, } from "./Functions/CalculateVoxelLight.js";
import { CalculateVoxelAO, voxelAOCalc } from "./Functions/CalculateVoxelAO.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export const ChunkProcessor = {
    heightByte: Util.getHeightByte(),
    voxelByte: Util.getVoxelByte(),
    faceByte: Util.getFaceByte(),
    _3dArray: Util.getFlat3DArray(),
    lightByte: Util.getLightByte(),
    worldMatrix: WorldMatrix,
    voxellightMixCalc: VoxelLightMixCalc,
    calculdateVoxelLight: CalculateVoxelLight,
    calculateVoxelAO: CalculateVoxelAO,
    voxelAOCalc: voxelAOCalc,
    chunkTemplates: {},
    exposedFaces: [],
    faceStates: [],
    getBaseTemplateNew() {
        return {
            solid: {
                positionTemplate: [],
                faceTemplate: [],
                uvTemplate: [],
                shapeTemplate: [],
                shapeStateTemplate: [],
                colorTemplate: [],
                lightTemplate: [],
                aoTemplate: [],
            },
            transparent: {
                positionTemplate: [],
                faceTemplate: [],
                uvTemplate: [],
                shapeTemplate: [],
                shapeStateTemplate: [],
                colorTemplate: [],
                lightTemplate: [],
                aoTemplate: [],
            },
            flora: {
                positionTemplate: [],
                faceTemplate: [],
                uvTemplate: [],
                shapeTemplate: [],
                shapeStateTemplate: [],
                colorTemplate: [],
                lightTemplate: [],
                aoTemplate: [],
            },
            fluid: {
                positionTemplate: [],
                faceTemplate: [],
                uvTemplate: [],
                shapeTemplate: [],
                shapeStateTemplate: [],
                colorTemplate: [],
                lightTemplate: [],
                aoTemplate: [],
            },
            magma: {
                positionTemplate: [],
                faceTemplate: [],
                uvTemplate: [],
                shapeTemplate: [],
                shapeStateTemplate: [],
                colorTemplate: [],
                lightTemplate: [],
                aoTemplate: [],
            },
        };
    },
    makeAllChunkTemplates(chunk, chunkX, chunkY, chunkZ) {
        const voxels = chunk.voxels;
        const template = this.getBaseTemplateNew();
        let maxX = DVEC.worldBounds.chunkXSize;
        let maxZ = DVEC.worldBounds.chunkZSize;
        // let maxY = DVEB.worldBounds.chunkYSize;
        //  let minY = 0;
        for (let x = 0; x < maxX; x++) {
            for (let z = 0; z < maxZ; z++) {
                let minY = this.heightByte.getLowestExposedVoxel(x, z, chunk.heightMap);
                let maxY = this.heightByte.getHighestExposedVoxel(x, z, chunk.heightMap) + 1;
                // console.log(minY,maxY);
                for (let y = minY; y < maxY; y++) {
                    const rawVoxelData = this._3dArray.getValue(x, y, z, voxels);
                    if (this.voxelByte.getId(rawVoxelData) == 0)
                        continue;
                    const voxelCheck = DVEC.worldMatrix.getVoxel(chunkX + x, chunkY + y, chunkZ + z);
                    if (!voxelCheck)
                        continue;
                    const voxelObject = DVEC.voxelManager.getVoxel(voxelCheck[0]);
                    const voxelState = voxelCheck[1];
                    let baseTemplate;
                    if (voxelObject.data.substance == "transparent") {
                        baseTemplate = template["solid"];
                    }
                    else {
                        baseTemplate = template[voxelObject.data.substance];
                    }
                    let faceBit = 0;
                    if (DVEB.voxelHelper.voxelFaceCheck("top", voxelObject, x + chunkX, y + chunkY + 1, z + chunkZ)) {
                        this.exposedFaces[0] = 1;
                        this.faceStates[0] = 0;
                        faceBit = this.faceByte.markFaceAsExposed("top", faceBit);
                    }
                    else {
                        this.exposedFaces[0] = 0;
                        this.faceStates[0] = -1;
                    }
                    if (DVEB.voxelHelper.voxelFaceCheck("bottom", voxelObject, x + chunkX, y + chunkY - 1, z + chunkZ)) {
                        this.exposedFaces[1] = 1;
                        this.faceStates[1] = 0;
                        faceBit = this.faceByte.markFaceAsExposed("bottom", faceBit);
                    }
                    else {
                        this.exposedFaces[1] = 0;
                        this.faceStates[1] = -1;
                    }
                    if (DVEB.voxelHelper.voxelFaceCheck("east", voxelObject, x + chunkX + 1, y + chunkY, z + chunkZ)) {
                        this.exposedFaces[2] = 1;
                        this.faceStates[2] = 0;
                        faceBit = this.faceByte.markFaceAsExposed("east", faceBit);
                    }
                    else {
                        this.exposedFaces[2] = 0;
                        this.faceStates[2] = -1;
                    }
                    if (DVEB.voxelHelper.voxelFaceCheck("west", voxelObject, x + chunkX - 1, y + chunkY, z + chunkZ)) {
                        this.exposedFaces[3] = 1;
                        this.faceStates[3] = 0;
                        faceBit = this.faceByte.markFaceAsExposed("west", faceBit);
                    }
                    else {
                        this.exposedFaces[3] = 0;
                        this.faceStates[3] = -1;
                    }
                    if (DVEB.voxelHelper.voxelFaceCheck("south", voxelObject, x + chunkX, y + chunkY, z + chunkZ - 1)) {
                        this.exposedFaces[4] = 1;
                        this.faceStates[4] = 0;
                        faceBit = this.faceByte.markFaceAsExposed("south", faceBit);
                    }
                    else {
                        this.exposedFaces[4] = 0;
                        this.faceStates[4] = -1;
                    }
                    if (DVEB.voxelHelper.voxelFaceCheck("north", voxelObject, x + chunkX, y + chunkY, z + chunkZ + 1)) {
                        this.exposedFaces[5] = 1;
                        this.faceStates[5] = 0;
                        faceBit = this.faceByte.markFaceAsExposed("north", faceBit);
                    }
                    else {
                        this.exposedFaces[5] = 0;
                        this.faceStates[5] = -1;
                    }
                    if (faceBit == 0)
                        continue;
                    voxelObject.process({
                        voxelState: voxelState,
                        voxelData: rawVoxelData,
                        exposedFaces: this.exposedFaces,
                        faceStates: this.faceStates,
                        shapeTemplate: baseTemplate.shapeTemplate,
                        shapeStateTemplate: baseTemplate.shapeStateTemplate,
                        uvTemplate: baseTemplate.uvTemplate,
                        colorTemplate: baseTemplate.colorTemplate,
                        aoTemplate: baseTemplate.aoTemplate,
                        lightTemplate: baseTemplate.lightTemplate,
                        chunkX: chunkX,
                        chunkY: chunkY,
                        chunkZ: chunkZ,
                        x: x,
                        y: y,
                        z: z,
                    }, DVEB);
                    baseTemplate.positionTemplate.push(x, y, z);
                    if (this.exposedFaces[0]) {
                        faceBit = this.faceByte.setFaceRotateState("top", this.faceStates[0], faceBit);
                    }
                    if (this.exposedFaces[1]) {
                        faceBit = this.faceByte.setFaceRotateState("bottom", this.faceStates[1], faceBit);
                    }
                    if (this.exposedFaces[2]) {
                        faceBit = this.faceByte.setFaceRotateState("east", this.faceStates[2], faceBit);
                    }
                    if (this.exposedFaces[3]) {
                        faceBit = this.faceByte.setFaceRotateState("west", this.faceStates[3], faceBit);
                    }
                    if (this.exposedFaces[4]) {
                        faceBit = this.faceByte.setFaceRotateState("south", this.faceStates[4], faceBit);
                    }
                    if (this.exposedFaces[5]) {
                        faceBit = this.faceByte.setFaceRotateState("north", this.faceStates[5], faceBit);
                    }
                    baseTemplate.faceTemplate.push(faceBit);
                }
            }
        }
        return template;
    },
    processVoxelLight(data, voxel) {
        if (DVEC.settings.settings.lighting?.doRGBLight ||
            DVEC.settings.settings.lighting?.doSunLight) {
            this.calculateVoxelLight(data, voxel);
        }
        if (DVEC.settings.settings.lighting?.doAO) {
            this.calculateVoxelAO(data, voxel, data.chunkX + data.x, data.chunkY + data.y, data.chunkZ + data.z);
        }
    },
    calculateVoxelLight(data, voxel) {
        if (!DVEC.settings.settings.lighting?.doSunLight &&
            !DVEC.settings.settings.lighting?.doRGBLight)
            return;
        this.calculdateVoxelLight(data, data.chunkX + data.x, data.chunkY + data.y, data.chunkZ + data.z);
    },
};
