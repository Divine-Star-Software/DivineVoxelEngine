//objects
import { SubstanceRules } from "../Rules/SubstanceRules.js";
import { RenderedSubstances } from "../Substances/RenderedSubstances.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
//data
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
//tools
import { HeightMapTool } from "../../../Tools/Data/WorldData/HeightMapTool.js";
import { BuilderDataTool } from "../Tools/BuilderDataTool.js";
import { ShapeTool } from "../Shapes/ShapeTool.js";
const mDataTool = new BuilderDataTool();
const heightMapTool = new HeightMapTool();
export const ChunkProcessor = {
    relative: { x: 0, y: 0, z: 0 },
    nLocation: ["main", 0, 0, 0],
    _process(doSecondCheck = false) {
        if (!mDataTool.loadInAtLocation(this.nLocation))
            return;
        if (!mDataTool.isRenderable())
            return;
        if (!doSecondCheck) {
            if (mDataTool.hasSecondaryVoxel()) {
                this._process(true);
            }
        }
        const constructor = mDataTool.getConstructor();
        const mesher = RenderedSubstances.meshers.get(SubstanceRules.getSubstanceParent(mDataTool.getSubstance()));
        if (!mesher || !constructor)
            return;
        const voxelPOS = WorldSpaces.voxel.setLocation(this.nLocation).getPosition();
        mesher.voxel.loadInAtLocation(this.nLocation);
        mesher.nVoxel.loadInAtLocation(this.nLocation);
        ShapeTool.setMesher(mesher);
        ShapeTool.builder.quad
            .clear()
            .setPosition(voxelPOS.x, voxelPOS.y, voxelPOS.z);
        constructor.process(mesher);
        mesher.resetSegments();
        mesher.resetVars();
    },
    build(location) {
        WorldRegister.cache.enable();
        heightMapTool.chunk.loadInAtLocation(location);
        mDataTool.setDimension(location[0]);
        const [dimension, cx, cy, cz] = location;
        this.nLocation[0] = dimension;
        let maxX = WorldSpaces.chunk._bounds.x + cx;
        let maxZ = WorldSpaces.chunk._bounds.z + cz;
        let [minY, maxY] = heightMapTool.chunk.getMinMax();
        minY += cy;
        maxY += cy + 1;
        for (let y = minY; y < maxY; y++) {
            for (let z = cz; z < maxZ; z++) {
                for (let x = cx; x < maxX; x++) {
                    this.nLocation[1] = x;
                    this.nLocation[2] = y;
                    this.nLocation[3] = z;
                    this._process();
                }
            }
        }
        WorldRegister.cache.disable();
        const chunks = [location, []];
        const trasnfers = [];
        for (const [substance, mesher] of RenderedSubstances.meshers._map) {
            if (mesher.getAttribute("position").length == 0) {
                chunks[1].push([substance, false]);
                mesher.resetAll();
                continue;
            }
            const [attributes, buffers] = mesher.getAllAttributes();
            const [meshData, traf] = mesher.getMeshData();
            trasnfers.push(...buffers);
            chunks[1].push([substance, [location, attributes]]);
            mesher.resetAll();
        }
        DVEC.parentComm.runTasks("set-chunk", chunks, trasnfers);
    },
};
