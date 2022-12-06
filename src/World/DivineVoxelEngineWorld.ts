//type
import type { EngineSettingsData } from "Meta/Data/Settings/EngineSettings.types.js";
//threads
import { ParentComm } from "./Threads/Parent/ParentComm.js";
import { NexusComm } from "./Threads/Nexus/NexusComm.js";
import { RichWorldComm } from "./Threads/RichWorld/RichWorldComm.js";
import { DataComm } from "./Threads/Data/DataComm.js";
import { FXComm } from "./Threads/FX/FXComm.js";
import { CCM } from "../Common/Threads/Constructor/ConstructorComm.js";
//queues
import { ConstructorQueues } from "../Common/Queues/ConstructorQueues.js";
//tasks
import { ConstructorTasks } from "../Common/Tasks/ConstructorTasks.js";
//objects
import { EngineSettings } from "../Data/Settings/EngineSettings.js";
import { Util } from "../Global/Util.helper.js";
//data
import { DataSync } from "./Data/DataSync.js";
import { DataManager } from "../Data/DataManager.js";
import { VoxelDataCreator } from "./Data/VoxelDataCreator.js";
import { VoxelManager } from "../Data/Voxel/VoxelManager.js";
import { ItemManager } from "../Data/Items/ItemManager.js";
import { DataCreator } from "./Data/Creator.js";
//tools
import { BuilderTool } from "../Tools/Build/Builder.js";
import { GetAdvancedBrushTool } from "../Tools/Brush/AdvancedBrushTool.js";
import { EntityConstructor } from "./Tools/EntityConstructor/EntityConstructor.js";
import { ChunkDataTool } from "../Tools/Data/ChunkDataTool.js";
import { ColumnDataTool } from "../Tools/Data/ColumnDataTool.js";
import { DataTool } from "../Tools/Data/DataTool.js";
import { TasksTool } from "../Tools/Tasks/TasksTool.js";
import { HeightMapTool } from "../Tools/Data/HeightMapTool.js";
//functions
import { InitWorldWorker } from "./Init/InitWorldWorker.js";
import { ThreadComm } from "../Libs/ThreadComm/ThreadComm.js";
import { VoxelDataTags } from "./Data/Tags/VoxelTags.js";
import { ChunkDataTags } from "./Data/Tags/ChunkTags.js";
import { WorldTasks } from "./Tasks/WorldTasks.js";

/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
export const DVEW = {
 environment: <"node" | "browser">"browser",
 __settingsHaveBeenSynced: false,
 __renderIsDone: false,
 __serverIsDone: false,

 TC: ThreadComm,
 UTIL: Util,
 settings: EngineSettings,
 worldTasks: WorldTasks,

 dataCreator: DataCreator,
 data: DataManager,
 dataSync: DataSync,

 fxComm: FXComm,
 dataComm: DataComm,
 nexusComm: NexusComm,
 parentComm: ParentComm,
 ccm: CCM,
 richWorldComm: RichWorldComm,

 entityConstructor: EntityConstructor,
 voxelManager: VoxelManager,
 itemManager: ItemManager,
 cQueues: ConstructorQueues,
 cTasks: ConstructorTasks,

 tags: {
  voxels: VoxelDataTags,
  chunks: ChunkDataTags,
 },

 isReady() {
  return (
   DVEW.ccm.isReady() &&
   DVEW.dataSync.isReady() &&
   DVEW.__settingsHaveBeenSynced &&
   (DVEW.__renderIsDone || DVEW.__serverIsDone)
  );
 },

 syncSettings(data: EngineSettingsData) {
  this.settings.syncSettings(data);
  this.__settingsHaveBeenSynced = true;
 },

 generate(x: number, z: number, data: any = []) {
  //this.ccm.tasks.worldGen.generate([x, z, data]);
 },

 createItem(itemId: string, x: number, y: number, z: number) {
  this.ccm.tasks.build.item([itemId, x, y, z]);
 },

 async $INIT() {
  await InitWorldWorker(this);
 },

 getAllTools() {
  return {
   brush: this.getBrush(),
   builder: this.getBuilder(),
   data: this.getDataTool(),
   chunkData: this.getChunkDataTool(),
   columnData: this.getColumnDataTool(),
   heightMap: this.getHeightMapTool(),
   tasks: this.getTasksTool(),
  };
 },

 getBrush() {
  return GetAdvancedBrushTool();
 },
 getBuilder() {
  return new BuilderTool();
 },
 getDataTool() {
  return new DataTool();
 },
 getChunkDataTool() {
  return new ChunkDataTool();
 },
 getColumnDataTool() {
  return new ColumnDataTool();
 },
 getHeightMapTool() {
  return new HeightMapTool();
 },
 getTasksTool() {
  return TasksTool();
 },
};

export type DivineVoxelEngineWorld = typeof DVEW;
DVEW.environment = Util.getEnviorment();

DVEW.voxelManager.onRegister((voxel) => {
 VoxelDataCreator.palette.registerVoxel(voxel);
 // DVEW.worldGeneration.voxelPalette.registerVoxel(voxel);
});
