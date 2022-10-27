import { ConstructorTasks } from "../../Common/Threads/Contracts/ConstructorTasks.js";
import { DVEC } from "../DivineVoxelEngineConstructor.js";
import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { BuildTasks, UpdateTasks } from "Meta/Tasks/Tasks.types.js";
import { WorldBounds } from "../../Data/World/WorldBounds.js";
export const Tasks = {
 build: {
  chunk: ThreadComm.registerTasks<BuildTasks>(
   ConstructorTasks.buildChunk,
   async (data) => {
    const chunkPOS = WorldBounds.getChunkPosition(
     data[1],
     data[2],
     data[3]
    );
    await DVEC.DVEB.buildChunk(
     data[0],
     chunkPOS.x,
     chunkPOS.y,
     chunkPOS.z,
     data[4]
    );
   }
  ),
  entity: ThreadComm.registerTasks<any[]>(
   ConstructorTasks.constructEntity,
   (data) => {
    const x = data[0];
    const y = data[1];
    const z = data[2];
    const width = data[3];
    const depth = data[4];
    const height = data[5];
    const composed = data[6];
    const arrays: Uint32Array[] = [];
    for (let i = 7; i < 7 + 2 * composed; i += 2) {
     arrays.push(new Uint32Array(data[i]), new Uint32Array(data[i + 1]));
    }
    DVEC.DVEB.entityConstructor.setEntityData(
     x,
     y,
     z,
     width,
     depth,
     height,
     composed,
     arrays
    );
    DVEC.DVEB.constructEntity();
   }
  ),
  item: ThreadComm.registerTasks<any[]>(
   ConstructorTasks.constructItem,
   (data) => {
    const itemId = data[0];
    const x = data[1];
    const y = data[2];
    const z = data[3];
    DVEC.DVEB.itemMesher.createItem(itemId, x, y, z);
   }
  ),
 },
 rgb: {
  update: ThreadComm.registerTasks<UpdateTasks>(
   ConstructorTasks.RGBlightUpdate,
   (data) => {
    DVEC.DVEP.runRGBFloodFill(data);
   }
  ),
  remove: ThreadComm.registerTasks<UpdateTasks>(
   ConstructorTasks.RGBlightRemove,
   (data) => {
    DVEC.DVEP.runRGBFloodRemove(data);
   }
  ),
 },
 worldSun: {
  fillWorldColumn: ThreadComm.registerTasks<any[]>(
   ConstructorTasks.worldSunStep1,
   (data) => {
    //run sun light propagation for world column
    const x = data[0];
    const z = data[1];
    const maxY = data[2];
    DVEC.DVEP.runSunLightForWorldColumn(x, z, maxY);
   }
  ),
  updateAtMaxY: ThreadComm.registerTasks<any[]>(
   ConstructorTasks.worldSunStep2,
   (data) => {
    const x = data[0];
    const z = data[1];
    const maxY = data[2];
    DVEC.DVEP.runSunFloodFillAtMaxY(x, z, maxY);
   }
  ),
  floodAtMaxY: ThreadComm.registerTasks<any[]>(
   ConstructorTasks.worldSunStep3,
   (data) => {
    const x = data[0];
    const z = data[1];
    const maxY = data[2];
    DVEC.DVEP.runSunFloodFillMaxYFlood(x, z, maxY);
   }
  ),
 },
 sun: {
  update: ThreadComm.registerTasks<UpdateTasks>(
   ConstructorTasks.sunLightUpdate,
   (data) => {
    DVEC.DVEP.runSunLightUpdate(data);
   }
  ),
  remove: ThreadComm.registerTasks<UpdateTasks>(
   ConstructorTasks.sunLightRemove,
   (data) => {
    DVEC.DVEP.runSunLightRemove(data);
   }
  ),
 },
 flow: {
  update: ThreadComm.registerTasks<UpdateTasks>(
   ConstructorTasks.flowUpdate,
   async (data) => {
    await DVEC.DVEP.updateFlowAt(data);
   }
  ),
  remove: ThreadComm.registerTasks<UpdateTasks>(
   ConstructorTasks.flowRemove,
   (data) => {
    DVEC.DVEP.removeFlowAt(data);
   }
  ),
 },
 worldGen: {
  generate: ThreadComm.registerTasks<any[]>(
   ConstructorTasks.generate,
   async (data) => {
    const x = data[0];
    const z = data[1];
    const genData = data[2];
    await DVEC.DVEWG.generate(x, z, genData);
   }
  ),
 },
};
