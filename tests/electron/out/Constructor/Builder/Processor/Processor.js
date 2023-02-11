//functions
import { CalculateVoxelLight, VoxelLightMixCalc, } from "./Functions/CalculateVoxelLight.js";
import { CalculateFlow } from "./Functions/CalculateFlow.js";
//objects
//data
import { FaceByte } from "../../../Data/Meshing/FaceByte.js";
import { LightData } from "../../../Data/Light/LightByte.js";
//maps
import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { FaceMap, FaceRecord } from "../../../Data/Constants/Util/Faces.js";
//tools
import { GetConstructorDataTool } from "../../../Constructor/Tools/Data/ConstructorDataTool.js";
import { HeightMapTool } from "../../../Tools/Data/WorldData/HeightMapTool.js";
import { OverrideManager } from "../Rules/Overrides/OverridesManager.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { VoxelTemplater } from "../Tools/VoxelTemplater.js";
import { SubstanceRules } from "../Rules/SubstanceRules.js";
const mDT = GetConstructorDataTool();
const nDT = GetConstructorDataTool();
const heightMapTool = new HeightMapTool();
/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export const Processor = {
    LOD: 1,
    mDataTool: mDT,
    nDataTool: nDT,
    faceByte: FaceByte,
    lightData: LightData,
    calculatFlow: CalculateFlow,
    voxellightMixCalc: VoxelLightMixCalc,
    doVoxelLight: CalculateVoxelLight,
    nLocation: ["main", 0, 0, 0],
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
    faceDataOverride: {
        face: "south",
        default: false,
        currentVoxel: mDT,
        neighborVoxel: nDT,
    },
    template: {},
    getVoxelTemplate() {
        return {
            aoTemplate: [],
            colorTemplate: [],
            faceTemplate: [],
            flowTemplate: [],
            lightTemplate: [],
            overlayUVTemplate: [],
            positionTemplate: [],
            uvTemplate: [],
        };
    },
    $INIT() {
        SubstanceRules.$INIT();
        VoxelTemplater.currentVoxel = mDT;
        VoxelTemplater.utilDataTool = nDT;
    },
    cullCheck(face, voxelObject, voxelShape, voxelSubstance, faceBit) {
        const voxelExists = this.nDataTool.loadIn();
        let finalResult = false;
        if (voxelExists && this.nDataTool.isRenderable()) {
            let substanceRuleResult = SubstanceRules.exposedCheck(voxelSubstance, this.nDataTool.getSubstance());
            this.faceDataOverride.face = face;
            this.faceDataOverride.default = substanceRuleResult;
            finalResult = substanceRuleResult;
            this.faceDataOverride.default = finalResult;
            finalResult = OverrideManager.runOverride("CullFace", voxelShape.id, "Any", this.faceDataOverride);
            this.faceDataOverride.default = finalResult;
            finalResult = OverrideManager.runOverride("CullFace", voxelShape.id, this.nDataTool.getVoxelShapeObj().id, this.faceDataOverride);
            this.faceDataOverride.default = finalResult;
            finalResult = OverrideManager.runOverride("CullFace", voxelObject.id, this.nDataTool.getVoxelShapeObj().id, this.faceDataOverride);
        }
        else {
            finalResult = true;
        }
        const faceIndex = FaceRecord[face];
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
        const faceIndex = FaceRecord[face];
        if (this.exposedFaces[faceIndex]) {
            faceBit = this.faceByte.setFaceRotateState(face, this.faceStates[faceIndex], faceBit);
            faceBit = this.faceByte.setFaceTextureState(face, this.textureRotation[faceIndex], faceBit);
        }
        return faceBit;
    },
    _process(doSecondCheck = false) {
        if (!this.mDataTool.loadInAtLocation(this.nLocation))
            return;
        if (!this.mDataTool.isRenderable())
            return;
        if (!doSecondCheck) {
            if (this.mDataTool.hasSecondaryVoxel()) {
                this._process(true);
            }
        }
        this.mDataTool.setSecondary(doSecondCheck);
        const voxelObject = this.mDataTool.getVoxelObj();
        if (!voxelObject)
            return;
        const voxelShape = this.mDataTool.getVoxelShapeObj();
        const voxelSubstance = this.mDataTool.getSubstance();
        let faceBit = 0;
        let i = $3dCardinalNeighbors.length;
        while (i--) {
            const point = $3dCardinalNeighbors[i];
            this.nDataTool.setXYZ(this.nLocation[1] + point[0] * this.LOD, this.nLocation[2] + point[1] * this.LOD, this.nLocation[3] + point[2] * this.LOD);
            faceBit = this.cullCheck(FaceMap[i], voxelObject, voxelShape, voxelSubstance, faceBit);
        }
        if (faceBit == 0)
            return;
        let baseTemplate = this.template[SubstanceRules.getSubstanceParent(voxelSubstance)];
        if (!baseTemplate) {
            baseTemplate = this.getVoxelTemplate();
            this.template[SubstanceRules.getSubstanceParent(voxelSubstance)] =
                baseTemplate;
        }
        VoxelTemplater._template = baseTemplate;
        voxelObject.process(VoxelTemplater);
        const voxelPOS = WorldSpaces.voxel.getPositionLocation(this.nLocation);
        baseTemplate.positionTemplate.push(voxelPOS.x, voxelPOS.y, voxelPOS.z);
        i = FaceMap.length;
        while (i--) {
            faceBit = this.faceStateCheck(FaceMap[i], faceBit);
        }
        baseTemplate.faceTemplate.push(faceBit);
        if (this.exposedFaces[0] &&
            (voxelSubstance == "#dve_liquid" || voxelSubstance == "#dve_magma")) {
            this.calculatFlow(this.faceStates[0] == 1, this.nLocation[1], this.nLocation[2], this.nLocation[3], baseTemplate.flowTemplate);
        }
    },
    makeAllChunkTemplates(location, LOD = 1) {
        heightMapTool.chunk.loadInAtLocation(location);
        this.nDataTool.setDimension(location[0]);
        this.mDataTool.setDimension(location[0]);
        this.settings.entity = false;
        this.LOD = LOD;
        const [dimension, cx, cy, cz] = location;
        this.nLocation[0] = dimension;
        let maxX = WorldSpaces.chunk._bounds.x + cx;
        let maxZ = WorldSpaces.chunk._bounds.z + cz;
        let [minY, maxY] = heightMapTool.chunk.getMinMax();
        minY += cy;
        maxY += cy + 1;
        for (let x = cx; x < maxX; x += LOD) {
            for (let z = cz; z < maxZ; z += LOD) {
                for (let y = minY; y < maxY; y += LOD) {
                    this.nLocation[1] = x;
                    this.nLocation[2] = y;
                    this.nLocation[3] = z;
                    this._process();
                }
            }
        }
        return this.template;
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
        this.template = {};
    },
};
