//types
import type { LocationData } from "voxelspaces";
import type { SetChunkMeshTask } from "Meta/Tasks/RenderTasks.types.js";

//objects
import { SubstanceRules } from "../Rules/SubstanceRules.js";
import { RenderedSubstances } from "../Rules/RenderedSubstances.js";
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
 nLocation: <LocationData>["main", 0, 0, 0],
 _states: {
  foundVoxel: false,
 },
 _process(doSecondCheck = false) {
  if (!mDataTool.loadInAtLocation(this.nLocation)) return;
  if (!mDataTool.isRenderable()) return;
  this._states.foundVoxel = true;
  if (!doSecondCheck) {
   if (mDataTool.hasSecondaryVoxel()) {
    this._process(true);
   }
  }
  const constructor = mDataTool.getConstructor();
  const mesher = RenderedSubstances.meshers.get(
   SubstanceRules.getSubstanceParent(mDataTool.getSubstnaceData().getRendered())
  );

  if (!mesher || !constructor) return;
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

 build(location: LocationData) {
  WorldRegister.cache.enable();
  heightMapTool.chunk.loadInAtLocation(location);
  mDataTool.setDimension(location[0]);
  const [dimension, cx, cy, cz] = location;
  this.nLocation[0] = dimension;
  let index = 0;
  let lastY = -Infinity;
  const maxIndex = WorldSpaces.chunk.getVolume();
  while (index < maxIndex) {
   const position = WorldSpaces.voxel.getIndexToXYZ(index);
   const x = position.x;
   const y = position.y;
   const z = position.z;

   if (y != lastY) {
    this._states.foundVoxel = false;
    heightMapTool.chunk.setY(y);
    if (!heightMapTool.chunk.hasVoxels() && !heightMapTool.chunk.isDirty()) {
     index += WorldSpaces.chunk.getIndexXYZ(0, 1, 0);
     lastY = y;
     continue;
    }
   }

   this.nLocation[1] = x + cx;
   this.nLocation[2] = y + cy;
   this.nLocation[3] = z + cz;
   this._process();

   if (y != lastY) {
    if (heightMapTool.chunk.isDirty()) {
     heightMapTool.chunk.setHasVoxels(this._states.foundVoxel);
     heightMapTool.chunk.setDirty(false);
    }
   }
   lastY = y;
   index++;
  }

  WorldRegister.cache.disable();

  const chunks = <SetChunkMeshTask>[location, []];
  const trasnfers: any[] = [];
  for (const [substance, mesher] of RenderedSubstances.meshers._map) {
   if (mesher.getAttribute("position").length == 0) {
    chunks[1].push([substance, false]);
    mesher.resetAll();
    continue;
   }

   const [attributes, buffers] = mesher.getAllAttributes();

   trasnfers.push(...buffers);
   chunks[1].push([substance, [location, attributes]]);
   mesher.resetAll();
  }

  DVEC.parentComm.runTasks<SetChunkMeshTask>("set-chunk", chunks, trasnfers);
 },
};
