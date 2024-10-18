import { WorldGen } from "./WorldGen";
import { TaskTool } from "@divinevoxel/foundation/Default/Tools/Tasks/TasksTool";
import { MesherTool } from "@divinevoxel/foundation/Default/Tools/Mesher/MesherTool";
import { BrushTool } from "@divinevoxel/foundation/Default/Tools/Brush/Brush";
import { SchemaRegister } from "@divinevoxel/foundation/Default/VoxelModels/State/SchemaRegister";
import {
  VoxelFaceNameDirectionsRecord,
  VoxelFaceNames,
} from "@divinevoxel/core/Math/Constants/VoxelFaces";
export async function CPUGenerate() {
  const numChunks = 2;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const mesher = new MesherTool();

  const tasks = new TaskTool();
  tasks.setFocalPoint(["main", 0, 0, 0]);
  const t1 = performance.now();
  /* 
  builder.setXYZ(0, 0, 0).fillColumn();
  WorldGen.flatColumn(0, 0);

 tasks.propagation.queued.add(["main", 0, 0, 0]);
 tasks.worldSun.queued.add(["main", 0, 0, 0]);
 */
  for (let x = startX - 32; x < endX + 32; x += 16) {
    for (let z = startZ - 32; z < endZ + 32; z += 16) {
      mesher.setXYZ(x, 0, z).fillColumn();
      tasks.propagation.queued.add(["main", x, 0, z]);
      tasks.worldSun.queued.add(["main", x, 0, z]);
    }
  }

  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      // if ((x > -10 && x < 10) && (z > -10 && z < 10)) continue;
      // WorldGen.flatColumn(x, z);
    }
  }
  /*   for (let x = 0; x < 16; x += 16) {
    for (let z = 0; z < 16; z += 16) {
      WorldGen.flatColumn(x, z);
    }
  } */
  /*   const brush = new BrushTool();
  brush.setId("dve_dread_stone");
  for (let y = 0; y < 12; y++) {
    if (y % 2 == 0) continue;
    for (let x = 0; x < 16; x++) {
      for (let z = 0; z < 16; z++) {
        if (Math.random() > 0.85) continue;
        brush.setXYZ(x, y, z).paint();
      }
    }
  }
 */
  // brush.setXYZ(5, 1, 5).paint();
  /*
  for (let x = 0; x < 16; x += 2) {
    brush.setXYZ(x, 1, 0).paint();
  }
 */
  /// await MagicGen.g enerate();

  //await ComputeTest(canvas);
  const brush = new BrushTool();
  /*   const { modelSchema, voxelSchema } = SchemaRegister.getVoxelSchemas(
    "dve_dread_stone_stair"
  );

  const connected = ["true", "false"];
  const placemnts = ["up", "down", "north", "south", "west", "east"];
  const directions = ["north", "south", "east", "west"];

  let x = -10;
  let z = -10;
  for (const isConnected of connected) {
    for (const placement of placemnts) {
      x = -10;
      for (const direction of directions) {
        const value = modelSchema
          .startEncoding()
          .setValue("connected", isConnected)
          .setValue("placement", placement)
          .setValue("direction", direction)
          .getEncoded();
        brush
          .setId("dve_dread_stone_stair")
          .setXYZ(z, 2, x)
          .setShapeState(
            value
          )
          .paint();
        x += 2;
      }
      z += 2;
    }
  }
 */

  /*   const { modelSchema, voxelSchema } =
    SchemaRegister.getVoxelSchemas("dve_dread_grass");

    const placemnts = ["up", "down", "north", "south", "west", "east"];
    const directions = ["north", "south", "east", "west"];

  let x = 0;
  let z = 0;

  for (const placement of placemnts) {
    x = 0;
    for (const direction of directions) {
      const value = modelSchema
        .startEncoding()

        .setValue("placement", placement)
        .setValue("direction", direction)
        .getEncoded();
      brush
        .setId("dve_dread_grass")
        .setXYZ(z, 2, x)
        .setShapeState(value)
        .paint();
      x += 2;
    }
    z += 2;
  } */

  const { modelSchema, voxelSchema } =
    SchemaRegister.getVoxelSchemas("dve_dream_lever");

  brush.setId("dve_dread_stone").setXYZ(0, 1, 0).paint();

  const states = ["off", "on"];
  const placemnts = ["up", "down", "north", "south", "west", "east"];
  const directions = ["north", "south", "east", "west"];

  let x = -10;
  let z = -10;

  for (const placement of placemnts) {
    x = -10;
    const [dx, dy, dz] =
      VoxelFaceNameDirectionsRecord[placement as VoxelFaceNames];
    console.warn(dx, dy, dz);
    for (const direction of directions) {
      for (const state of states) {
/*         brush
          .setId("dve_dread_stone")
          .setXYZ(z + dx, 2 + dy, x + dz)
          .paint(); */
        const value = modelSchema
          .startEncoding()
          .setValue("state", state)
          .setValue("placement", placement)
          .setValue("direction", direction)
          .getEncoded();

        brush
          .setId("dve_dream_lever")
          .setXYZ(z, 2, x)
          .setShapeState(value)
          .paint();
        x++;
      }
    }
    z++;
  }
  /*   let count = 0;
  for (let x = 0; x < 2; x++) {
    for (let z = 0; z < 2; z++) {
      const value = modelSchema
        .startEncoding()
        .setValue("placement", "down")
        .setValue("direction", "north")
        .setValue("state", "off")
        .getEncoded();
      brush
        .setId("dve_dream_lever")
        .setXYZ(x, 2, z)
        .setShapeState(value)
        .paint();
      count++;
    }
  }
 */
  /*   brush.setId("dve_dream_stone_pillar");
  for (let y = 0; y < 5; y++) {
    brush.setXYZ(-4, 2 + y, -4).paint();
  }
  //  brush.setId("dve_dread_stone").setXYZ(0, 1, 0).paint();
  brush.setId("dve_dream_log_fence");

  for (let y = 0; y < 5; y++) {
    for (let z = 0; z <= 5; z++) {
      brush.setXYZ(0, 2 + y, z).paint();
      brush.setXYZ(5, 2 + y, z).paint();
    }
    for (let x = 0; x <= 5; x++) {
      brush.setXYZ(x, 2 + y, 0).paint();
      brush.setXYZ(x, 2 + y, 5).paint();
    }
  } */
  /*  
  const { modelSchema, voxelSchema } = SchemaRegister.getVoxelSchemas(
    "dve_dread_stone_stair"
  );

brush
    .setId("dve_dread_stone_slab")
    .setXYZ(0, 2, -10)
    .paint()
    .setMod(1)
    .setXYZ(2, 2, -10)
    .paint()
    .clear(); */

  /*   brush
    .setId("dve_dread_stone")
    .setXYZ(0, 1, -12)
    .paint()
    .setXYZ(2, 1, -12)
    .paint()
    .setId("dve_dread_stone_stair")
    .setXYZ(0, 2, -12)
    .setShapeState(
      modelSchema
        .startEncoding()
        .setValue("direction", "south")
        .setValue("upsidedown", "false")
        .getEncoded()
    )
    .paint()
    .setShapeState(
      modelSchema
        .startEncoding()
        .setValue("direction", "south")
        .setValue("upsidedown", "true")
        .getEncoded()
    )
    .setXYZ(2, 2, -12)
    .paint()
    .clear();
 */
  await tasks.worldSun.queued.runAndAwait();
  await tasks.propagation.queued.runAndAwait();

  for (let x = startX - 16; x < endX + 16; x += 16) {
    for (let z = startZ - 16; z < endZ + 16; z += 16) {
      mesher.setXYZ(x, 0, z).buildColumn();
    }
  }

  const t2 = performance.now();

  console.log("ALL DONE! total time = ", t2 - t1);
}
