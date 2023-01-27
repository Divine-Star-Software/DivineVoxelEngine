//functions
import { CalculateVoxelLight, VoxelLightMixCalc, } from "./Functions/CalculateVoxelLight.js";
import { CalculateFlow } from "./Functions/CalculateFlow.js";
//objects
import { Builder } from "../Builder.js";
//data
import { FaceByte } from "../../../Data/Meshing/FaceByte.js";
import { LightData } from "../../../Data/Light/LightByte.js";
//maps
import { $3dCardinalNeighbors } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { FaceMap, FaceRecord } from "../../../Data/Constants/Util/Faces.js";
//tools
import { GetConstructorDataTool } from "../../../Constructor/Tools/Data/ConstructorDataTool.js";
import { HeightMapTool } from "../../../Tools/Data/WorldData/HeightMapTool.js";
import { OverrideManager } from "../Overrides/OverridesManager.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { VoxelTemplater } from "../Tools/VoxelTemplater.js";
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
        liquid: {
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
    $INIT() {
        VoxelTemplater.currentVoxel = mDT;
        VoxelTemplater.utilDataTool = nDT;
    },
    cullCheck(face, voxelObject, voxelShape, voxelSubstance, faceBit) {
        const voxelExists = this.nDataTool.loadIn();
        let finalResult = false;
        if (voxelExists && this.nDataTool.isRenderable()) {
            let substanceRuleResult = Builder.voxelHelper.substanceRuleCheck(voxelSubstance, this.nDataTool.getSubstance());
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
    _process(location, doSecondCheck = false) {
        if (!this.mDataTool.loadInAtLocation(location))
            return;
        if (!this.mDataTool.isRenderable())
            return;
        if (!doSecondCheck) {
            if (this.mDataTool.hasSecondaryVoxel()) {
                this._process(location, true);
            }
        }
        this.mDataTool.setSecondary(doSecondCheck);
        const voxelObject = this.mDataTool.getVoxelObj();
        if (!voxelObject)
            return;
        const voxelShape = this.mDataTool.getVoxelShapeObj();
        const voxelShapeState = this.mDataTool.getShapeState();
        const voxelSubstance = this.mDataTool.getSubstance();
        let faceBit = 0;
        let i = $3dCardinalNeighbors.length;
        while (i--) {
            const point = $3dCardinalNeighbors[i];
            this.nDataTool.setXYZ(location[1] + point[0] * this.LOD, location[2] + point[1] * this.LOD, location[3] + point[2] * this.LOD);
            faceBit = this.cullCheck(FaceMap[i], voxelObject, voxelShape, voxelSubstance, faceBit);
        }
        if (faceBit == 0)
            return;
        let baseTemplate;
        if (voxelSubstance == "transparent") {
            baseTemplate = this.template["solid"];
        }
        else {
            baseTemplate = this.template[voxelSubstance];
        }
        VoxelTemplater._template = baseTemplate;
        baseTemplate.shapeStateTemplate.push(voxelShapeState);
        voxelObject.process(VoxelTemplater);
        baseTemplate.shapeTemplate.push(this.mDataTool.getShapeId());
        const voxelPOS = WorldSpaces.voxel.getPositionLocation(location);
        baseTemplate.positionTemplate.push(voxelPOS.x, voxelPOS.y, voxelPOS.z);
        i = FaceMap.length;
        while (i--) {
            faceBit = this.faceStateCheck(FaceMap[i], faceBit);
        }
        baseTemplate.faceTemplate.push(faceBit);
        if (this.exposedFaces[0] &&
            (voxelSubstance == "liquid" || voxelSubstance == "magma")) {
            this.calculatFlow(this.faceStates[0] == 1, location[1], location[2], location[3], baseTemplate.flowTemplate);
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
                    this._process(this.nLocation);
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
        for (const substance of Object.keys(this.template)) {
            //@ts-ignore
            for (const templateKey of Object.keys(this.template[substance])) {
                this.template[substance][templateKey] = [];
            }
        }
    },
};
