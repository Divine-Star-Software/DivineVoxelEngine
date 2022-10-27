//functions
import { CalculateVoxelLight, VoxelLightMixCalc, } from "./Functions/CalculateVoxelLight.js";
import { CalculateFlow } from "./Functions/CalculateFlow.js";
//objects
import { DVEB } from "../DivineVoxelEngineBuilder.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
//data
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { HeightMapData } from "../../../Data/Chunk/HeightMapData.js";
import { FaceByte } from "../../../Data/Meshing/FaceByte.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { WorldBounds } from "../../../Data/World/WorldBounds.js";
//maps
import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { FaceMap } from "../../../Data/Constants/Meshing/Faces.js";
//tools
import { DataTool } from "../../../Tools/Data/DataTool.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export const Processor = {
    LOD: 1,
    mDataTool: new DataTool(),
    nDataTool: new DataTool(),
    heightByte: HeightMapData,
    faceByte: FaceByte,
    lightData: LightData,
    calculatFlow: CalculateFlow,
    voxellightMixCalc: VoxelLightMixCalc,
    doVoxelLight: CalculateVoxelLight,
    exposedFaces: [],
    faceStates: [],
    textureRotation: [],
    settings: {
        doAO: true,
        doSun: true,
        doRGB: true,
        ignoreSun: false,
        entity: false,
        composedEntity: 1,
    },
    voxelProcesseData: {
        dimension: 0,
        voxelState: 0,
        voxelShapeState: 0,
        level: 0,
        levelState: 0,
        exposedFaces: [],
        faceStates: [],
        textureRotations: [],
        overlayUVTemplate: [],
        uvTemplate: [],
        colorTemplate: [],
        aoTemplate: [],
        lightTemplate: [],
        x: 0,
        y: 0,
        z: 0,
    },
    cullFaceOverrideData: {
        face: "south",
        substanceResult: true,
        shapeState: 0,
        voxel: {},
        neighborVoxel: 0,
        neighborVoxelShape: {},
        neighborVoxelShapeState: 0,
        x: 0,
        y: 0,
        z: 0,
    },
    aoOverRideData: {
        face: "",
        substanceResult: true,
        shapeState: 0,
        voxel: {},
        neighborVoxel: {},
        neighborVoxelShape: {},
        neighborVoxelShapeState: 0,
        x: 0,
        y: 0,
        z: 0,
        nx: 0,
        ny: 0,
        nz: 0,
    },
    template: {
        solid: {
            positionTemplate: [],
            faceTemplate: [],
            uvTemplate: [],
            overlayUVTemplate: [],
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
            overlayUVTemplate: [],
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
            overlayUVTemplate: [],
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
            overlayUVTemplate: [],
            shapeTemplate: [],
            shapeStateTemplate: [],
            colorTemplate: [],
            lightTemplate: [],
            aoTemplate: [],
            flowTemplate: [],
        },
        magma: {
            positionTemplate: [],
            faceTemplate: [],
            uvTemplate: [],
            overlayUVTemplate: [],
            shapeTemplate: [],
            shapeStateTemplate: [],
            colorTemplate: [],
            lightTemplate: [],
            aoTemplate: [],
            flowTemplate: [],
        },
    },
    faceIndexMap: {
        top: 0,
        bottom: 1,
        east: 2,
        west: 3,
        south: 4,
        north: 5,
    },
    dimension: 0,
    $INIT() {
        this.voxelProcesseData.faceStates = this.faceStates;
        this.voxelProcesseData.exposedFaces = this.exposedFaces;
        this.voxelProcesseData.textureRotations = this.textureRotation;
    },
    cullCheck(face, voxelId, voxelShapeId, voxelSubstance, shapeState, x, y, z, faceBit) {
        const voxelExists = this.nDataTool.loadIn(x, y, z);
        let finalResult = false;
        if (voxelExists && this.nDataTool.isRenderable()) {
            let neighorSustance = this.nDataTool.getSubstance();
            let substanceRuleResult = DVEB.voxelHelper.substanceRuleCheck(voxelSubstance, neighorSustance);
            const voxelShape = DVEC.DVEB.shapeManager.getShape(voxelShapeId);
            const cullFaceOverride = this.cullFaceOverrideData;
            cullFaceOverride.face = face;
            cullFaceOverride.substanceResult = substanceRuleResult;
            cullFaceOverride.shapeState = shapeState;
            cullFaceOverride.voxelId = voxelId;
            cullFaceOverride.voxelSubstance = voxelSubstance;
            cullFaceOverride.neighborVoxelId = this.nDataTool.getStringId();
            cullFaceOverride.neighborVoxelSubstance =
                neighorSustance;
            cullFaceOverride.neighborVoxelShape = DVEC.DVEB.shapeManager.getShape(this.nDataTool.getShapeId());
            cullFaceOverride.neighborVoxelShapeState = this.nDataTool.getShapeState();
            cullFaceOverride.x = x;
            cullFaceOverride.y = y;
            cullFaceOverride.z = z;
            let shapeResult = voxelShape.cullFaceOverride(this.cullFaceOverrideData);
            if (!voxelShape.cullFaceOverride) {
                finalResult = shapeResult;
            }
            else {
                finalResult = voxelShape.cullFaceOverride(this.cullFaceOverrideData);
            }
        }
        else {
            finalResult = true;
        }
        const faceIndex = this.faceIndexMap[face];
        if (finalResult) {
            this.exposedFaces[faceIndex] = 1;
            this.faceStates[faceIndex] = 0;
            this.textureRotation[faceIndex] = 0;
            faceBit = this.faceByte.markFaceAsExposed(face, faceBit);
        }
        else {
            this.exposedFaces[faceIndex] = 0;
            this.faceStates[faceIndex] = -1;
            this.textureRotation[faceIndex] = 0;
        }
        return faceBit;
    },
    faceStateCheck(face, faceBit) {
        const faceIndex = this.faceIndexMap[face];
        if (this.exposedFaces[faceIndex]) {
            faceBit = this.faceByte.setFaceRotateState(face, this.faceStates[faceIndex], faceBit);
            faceBit = this.faceByte.setFaceTextureState(face, this.textureRotation[faceIndex], faceBit);
        }
        return faceBit;
    },
    _process(template, x, y, z, doSecondCheck = false) {
        const LOD = this.LOD;
        if (!this.mDataTool.loadIn(x, y, z))
            return;
        if (!this.mDataTool.isRenderable())
            return;
        if (!doSecondCheck) {
            if (this.mDataTool.hasSecondaryVoxel()) {
                this._process(template, x, y, z, true);
            }
        }
        this.mDataTool.setSecondary(doSecondCheck);
        const voxelId = this.mDataTool.getStringId();
        const voxelObject = DVEC.voxelManager.getVoxel(voxelId);
        if (!voxelObject)
            return;
        const voxelState = this.mDataTool.getState();
        const voxelShapeId = this.mDataTool.getShapeId();
        const voxelShapeState = this.mDataTool.getShapeState();
        const voxelSubstance = this.mDataTool.getSubstance();
        let faceBit = 0;
        let faceIndex = 0;
        for (const point of $3dCardinalNeighbors) {
            faceBit = this.cullCheck(FaceMap[faceIndex], voxelId, voxelShapeId, voxelSubstance, voxelShapeState, x + point[0] * LOD, y + point[1] * LOD, z + point[2] * LOD, faceBit);
            faceIndex++;
        }
        if (faceBit == 0)
            return;
        let baseTemplate;
        if (voxelSubstance == "transparent") {
            baseTemplate = template["solid"];
        }
        else {
            baseTemplate = template[voxelSubstance];
        }
        baseTemplate.shapeStateTemplate.push(voxelShapeState);
        this.voxelProcesseData.voxelState = voxelState;
        this.voxelProcesseData.voxelShapeState = voxelShapeState;
        this.voxelProcesseData.level = this.mDataTool.getLevel();
        this.voxelProcesseData.levelState = this.mDataTool.getLevelState();
        this.voxelProcesseData.x = x;
        this.voxelProcesseData.y = y;
        this.voxelProcesseData.z = z;
        this.voxelProcesseData.overlayUVTemplate = baseTemplate.overlayUVTemplate;
        this.voxelProcesseData.uvTemplate = baseTemplate.uvTemplate;
        this.voxelProcesseData.colorTemplate = baseTemplate.colorTemplate;
        this.voxelProcesseData.aoTemplate = baseTemplate.aoTemplate;
        this.voxelProcesseData.lightTemplate = baseTemplate.lightTemplate;
        voxelObject.process(this.voxelProcesseData, DVEB);
        baseTemplate.shapeTemplate.push(voxelShapeId);
        baseTemplate.positionTemplate.push(x, y, z);
        for (const face of FaceMap) {
            faceBit = this.faceStateCheck(face, faceBit);
        }
        baseTemplate.faceTemplate.push(faceBit);
        if (this.exposedFaces[0] &&
            (voxelSubstance == "fluid" || voxelSubstance == "magma")) {
            this.calculatFlow(voxelId, this.faceStates[0] == 1, x, y, z, baseTemplate.flowTemplate);
        }
    },
    constructEntity(composed = 1) {
        this.settings.entity = true;
        this.settings.composedEntity = composed;
        const maxX = DVEB.entityConstructor.width;
        const maxY = DVEB.entityConstructor.height;
        const maxZ = DVEB.entityConstructor.depth;
        for (let x = 0; x < maxX; x++) {
            for (let z = 0; z < maxZ; z++) {
                for (let y = 0; y < maxY; y++) {
                    this._process(this.template, x, y, z);
                }
            }
        }
        return this.template;
    },
    makeAllChunkTemplates(dimension, chunk, chunkX, chunkY, chunkZ, LOD = 1) {
        WorldRegister.cache.enable();
        this.nDataTool.setDimension(dimension);
        this.mDataTool.setDimension(dimension);
        this.voxelProcesseData.dimension = this.dimension;
        this.settings.entity = false;
        this.LOD = LOD;
        const template = this.template;
        let maxX = WorldBounds.chunkXSize;
        let maxZ = WorldBounds.chunkZSize;
        for (let x = 0; x < maxX; x += LOD) {
            for (let z = 0; z < maxZ; z += LOD) {
                let minY = this.heightByte.getLowestExposedVoxel(x, z, chunk.data);
                let maxY = this.heightByte.getHighestExposedVoxel(x, z, chunk.data) + 1;
                for (let y = minY; y < maxY; y += LOD) {
                    this._process(template, x + chunkX, y + chunkY, z + chunkZ);
                }
            }
        }
        WorldRegister.cache.disable();
        return this.template;
    },
    processVoxelLight(data, ignoreAO = false) {
        this.doVoxelLight(data, data.x, data.y, data.z, ignoreAO, this.LOD);
    },
    syncSettings(settings) {
        const materials = settings.materials;
        if (materials?.doAO) {
            this.settings.doAO = true;
        }
        if (materials?.doRGBLight) {
            this.settings.doRGB = true;
        }
        if (materials?.doSunLight) {
            this.settings.doSun = true;
        }
    },
    flush() {
        this.voxelProcesseData.voxelState = 0;
        this.voxelProcesseData.voxelShapeState = 0;
        this.voxelProcesseData.level = 0;
        this.voxelProcesseData.levelState = 0;
        this.voxelProcesseData.x = 0;
        this.voxelProcesseData.y = 0;
        this.voxelProcesseData.z = 0;
        this.voxelProcesseData.overlayUVTemplate = [];
        this.voxelProcesseData.uvTemplate = [];
        this.voxelProcesseData.colorTemplate = [];
        this.voxelProcesseData.aoTemplate = [];
        this.voxelProcesseData.lightTemplate = [];
        for (const substance of Object.keys(this.template)) {
            //@ts-ignore
            for (const templateKey of Object.keys(this.template[substance])) {
                this.template[substance][templateKey] = [];
            }
        }
    },
};
