//objects
import { Util } from "../../../Global/Util.helper.js";
import { WorldMatrix } from "../../../Matrix/WorldMatrix.js";
import { DVEB } from "../DivineVoxelEngineBuilder.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
//functions
import { CalculateVoxelLight, VoxelLightMixCalc, } from "../../../Constants/Meshing/Functions/CalculateVoxelLight.js";
import { CalculateFlow } from "../../../Constants/Meshing/Functions/CalculateFlow.js";
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export const Processor = {
    LOD: 1,
    heightByte: Util.getHeightByte(),
    voxelByte: Util.getVoxelByte(),
    faceByte: Util.getFaceByte(),
    _3dArray: Util.getFlat3DArray(),
    lightByte: Util.getLightByte(),
    worldMatrix: WorldMatrix,
    calculatFlow: CalculateFlow,
    voxellightMixCalc: VoxelLightMixCalc,
    doVoxelLight: CalculateVoxelLight,
    chunkTemplates: {},
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
        voxelState: "",
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
    $INIT() {
        this.voxelProcesseData.faceStates = this.faceStates;
        this.voxelProcesseData.exposedFaces = this.exposedFaces;
        this.voxelProcesseData.textureRotations = this.textureRotation;
    },
    getVoxel(x, y, z, getSecond = false) {
        if (!this.settings.entity) {
            return this.worldMatrix.getVoxel(x, y, z, getSecond);
        }
        else {
            if (getSecond)
                return false;
            return DVEB.entityConstructor.getVoxel(x, y, z);
        }
    },
    getVoxelData(x, y, z, getSecond = false) {
        if (!this.settings.entity) {
            return this.worldMatrix.getVoxelData(x, y, z, getSecond);
        }
        else {
            const voxelCheck = DVEB.entityConstructor.getVoxel(x, y, z);
            if (!voxelCheck)
                return false;
            if (voxelCheck[0] == "dve:air" || voxelCheck[0] == "dve:barrier")
                return false;
            return DVEC.voxelManager.getVoxelData(voxelCheck[0]);
        }
    },
    getVoxelShapeState(x, y, z, getSecond = false) {
        if (!this.settings.entity) {
            return this.worldMatrix.getVoxelShapeState(x, y, z);
        }
        else {
            return DVEB.entityConstructor.getShapeState(x, y, z);
        }
    },
    getVoxelLevel(x, y, z, getSecond = false) {
        if (!this.settings.entity) {
            return this.worldMatrix.getLevel(x, y, z);
        }
        else {
            return DVEB.entityConstructor.getLevel(x, y, z);
        }
    },
    getVoxelLevelState(x, y, z, getSecond = false) {
        if (!this.settings.entity) {
            return this.worldMatrix.getLevelState(x, y, z);
        }
        else {
            return DVEB.entityConstructor.getLevelState(x, y, z);
        }
    },
    getLight(x, y, z) {
        if (!this.settings.entity) {
            return this.worldMatrix.getLight(x, y, z);
        }
        else {
            return DVEB.entityConstructor.getLight(x, y, z);
        }
    },
    cullCheck(face, voxel, voxelState, shapeState, x, y, z, faceBit) {
        const neighborVoxel = this.getVoxelData(x, y, z);
        let finalResult = false;
        if (neighborVoxel) {
            const nv = DVEC.voxelManager.getVoxel(neighborVoxel.id);
            let substanceRuleResult = DVEB.voxelHelper.substanceRuleCheck(voxel.data, neighborVoxel);
            const shape = DVEC.DVEB.shapeManager.getShape(voxel.trueShapeId);
            const neighborVoxelShape = DVEC.DVEB.shapeManager.getShape(nv.trueShapeId);
            const neighborVoxelShapeState = this.getVoxelShapeState(x, y, z);
            this.cullFaceOverrideData.face = face;
            this.cullFaceOverrideData.substanceResult = substanceRuleResult;
            this.cullFaceOverrideData.shapeState = shapeState;
            this.cullFaceOverrideData.voxel = voxel;
            this.cullFaceOverrideData.neighborVoxel = neighborVoxel;
            this.cullFaceOverrideData.neighborVoxelShape = neighborVoxelShape;
            this.cullFaceOverrideData.neighborVoxelShapeState = neighborVoxelShapeState;
            this.cullFaceOverrideData.x = x;
            this.cullFaceOverrideData.y = y;
            this.cullFaceOverrideData.z = z;
            let shapeResult = shape.cullFace(this.cullFaceOverrideData);
            if (!voxel.cullFace) {
                finalResult = shapeResult;
            }
            else {
                finalResult = voxel.cullFace(this.cullFaceOverrideData);
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
    _process(template, x, y, z, doSecondCheck = true) {
        const LOD = this.LOD;
        const voxelCheck = this.getVoxel(x, y, z, !doSecondCheck);
        if (doSecondCheck) {
            const secondVoxel = this.getVoxel(x, y, z, true);
            if (secondVoxel) {
                this._process(template, x, y, z, false);
            }
        }
        if (!voxelCheck ||
            voxelCheck[0] == "dve:air" ||
            voxelCheck[0] == "dve:barrier")
            return;
        const voxelObject = DVEC.voxelManager.getVoxel(voxelCheck[0]);
        if (!voxelObject)
            return;
        const voxelState = voxelCheck[1];
        const voxelShapeState = this.getVoxelShapeState(x, y, z);
        let faceBit = 0;
        faceBit = this.cullCheck("top", voxelObject, voxelState, voxelShapeState, x, y + LOD, z, faceBit);
        faceBit = this.cullCheck("bottom", voxelObject, voxelState, voxelShapeState, x, y - LOD, z, faceBit);
        faceBit = this.cullCheck("east", voxelObject, voxelState, voxelShapeState, x + LOD, y, z, faceBit);
        faceBit = this.cullCheck("west", voxelObject, voxelState, voxelShapeState, x - LOD, y, z, faceBit);
        faceBit = this.cullCheck("south", voxelObject, voxelState, voxelShapeState, x, y, z - LOD, faceBit);
        faceBit = this.cullCheck("north", voxelObject, voxelState, voxelShapeState, x, y, z + LOD, faceBit);
        if (faceBit == 0)
            return;
        let baseTemplate;
        0;
        if (voxelObject.data.substance == "transparent") {
            baseTemplate = template["solid"];
        }
        else {
            baseTemplate = template[voxelObject.data.substance];
        }
        baseTemplate.shapeStateTemplate.push(voxelShapeState);
        let level = 0;
        let levelState = 0;
        level = this.getVoxelLevel(x, y, z);
        levelState = this.getVoxelLevelState(x, y, z);
        this.voxelProcesseData.voxelState = voxelState;
        this.voxelProcesseData.voxelShapeState = voxelShapeState;
        this.voxelProcesseData.level = level;
        this.voxelProcesseData.levelState = levelState;
        this.voxelProcesseData.x = x;
        this.voxelProcesseData.y = y;
        this.voxelProcesseData.z = z;
        this.voxelProcesseData.overlayUVTemplate = baseTemplate.overlayUVTemplate;
        this.voxelProcesseData.uvTemplate = baseTemplate.uvTemplate;
        this.voxelProcesseData.colorTemplate = baseTemplate.colorTemplate;
        this.voxelProcesseData.aoTemplate = baseTemplate.aoTemplate;
        this.voxelProcesseData.lightTemplate = baseTemplate.lightTemplate;
        voxelObject.process(this.voxelProcesseData, DVEB);
        baseTemplate.shapeTemplate.push(voxelObject.trueShapeId);
        baseTemplate.positionTemplate.push(x, y, z);
        faceBit = this.faceStateCheck("top", faceBit);
        faceBit = this.faceStateCheck("bottom", faceBit);
        faceBit = this.faceStateCheck("east", faceBit);
        faceBit = this.faceStateCheck("west", faceBit);
        faceBit = this.faceStateCheck("south", faceBit);
        faceBit = this.faceStateCheck("north", faceBit);
        baseTemplate.faceTemplate.push(faceBit);
        if (this.exposedFaces[0] &&
            (voxelObject.data.substance == "fluid" ||
                voxelObject.data.substance == "magma")) {
            this.calculatFlow(voxelObject.data, this.faceStates[0] == 1, x, y, z, baseTemplate.flowTemplate);
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
    makeAllChunkTemplates(chunk, chunkX, chunkY, chunkZ, LOD = 1) {
        this.settings.entity = false;
        this.LOD = LOD;
        const template = this.template;
        let maxX = DVEC.worldBounds.chunkXSize;
        let maxZ = DVEC.worldBounds.chunkZSize;
        for (let x = 0; x < maxX; x += LOD) {
            for (let z = 0; z < maxZ; z += LOD) {
                let minY = this.heightByte.getLowestExposedVoxel(x, z, chunk.heightMap);
                let maxY = this.heightByte.getHighestExposedVoxel(x, z, chunk.heightMap) + 1;
                for (let y = minY; y < maxY; y += LOD) {
                    let tx = x + chunkX;
                    let ty = y + chunkY;
                    let tz = z + chunkZ;
                    this._process(template, tx, ty, tz);
                }
            }
        }
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
        this.voxelProcesseData.voxelState = "";
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
