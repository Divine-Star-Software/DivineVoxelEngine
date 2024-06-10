import { SafeInterval } from "@divinestar/utils/Intervals/SafeInterval.js";
import { IWG } from "../IWG.js";
import { WorldRegister } from "../../../../Data/World/WorldRegister.js";
import { IWGTasksTypes } from "../Types/IWG.types.js";
import { IWGTaskRegister } from "../Classes/Tasks/IWGTaskRegister.js";
import { IWGBuildTasks } from "./Rendering/IWGBuildTasks.js";
import { IWGSaveTasks } from "./Saving/IWGSaveTasks.js";
import { IWGSaveAndUnloadTasks } from "./Saving/IWGSaveAndUnloadTasks.js";
import { IWGLoadTask } from "./WorldGen/IWGLoadTasks.js";
import { IWGGenerateTasks } from "./WorldGen/IWGGenerateTasks.js";
import { IWGGenerateSectionTasks } from "./WorldGen/IWGGenerateSectionTasks .js";
import { IWGDecorateTasks } from "./WorldGen/IWGDecorateTasks.js";
import { IWGWorldSunTasks } from "./WorldGen/IWGWorldSunTasks.js";
import { IWGPropagationTasks } from "./WorldGen/IWGPropagationTasks.js";
import { IWGLoadBatchTasks } from "./WorldGen/IWGLoadBatchTasks.js";

export function RegisterDefaultTasks() {
  IWGTaskRegister.registerTask(
    IWGBuildTasks,
    IWGSaveTasks,
    IWGSaveAndUnloadTasks,
  //  IWGLoadBatchTasks,
    IWGLoadTask,
    IWGGenerateTasks,
    IWGGenerateSectionTasks,
    IWGDecorateTasks,
    IWGWorldSunTasks,
    IWGPropagationTasks
  );
  /*  IWG.registerTasks({
    id: "#dve_iwg_load",
    type: IWGTasksTypes.WorldGen,
    name: "load",
    run: async (gen, x, y, z, onDone) => {
      const start = performance.now();
      const end = () => {
        console.log("DONE LOADING WORLD COLUMN", performance.now() - start);
        onDone();
      };
      if (!gen.dataLoader) {
        if (gen.columnTool.loadInAt(x, y, z)) {
          return end();
        }
        gen.builder.setXYZ(x, y, z).fillColumn();
        return end();
      }
      if (gen.columnTool.loadInAt(x, y, z)) {
        return end();
      }
      let tries = 0;
      let ran = false;
      let cleared = false;
      const inte = new SafeInterval();
      inte.setInterval(1_000);
      inte.setOnRun(() => {
        if (ran) {
          inte.stop();
          return;
        }
        tries++;

        if (!gen.columnTool.loadInAt(x, y, z) && tries >= 120 && !ran) {
          inte.stop();
          end();
          console.error(
            "force quit loading column",
            ran,
            [gen.dimension, x, y, z],
            gen.columnTool.loadInAt(x, y, z),
            WorldRegister.instance.column.get([gen.dimension, x, y, z])
          );
          cleared = true;
        }
      });
      inte.start();
      const exists = await gen.dataLoader.loadIfExists([
        gen.dimension,
        x,
        y,
        z,
      ]);
      ran = true;
      if (cleared) return;

      end();
      if (!exists) {
        gen.builder.setXYZ(x, y, z).fillColumn();
        return;
      }
    },
    propagationBlocking: true,
  });

  IWG.registerTasks({
    id: "#dve_iwg_generate",
    type: IWGTasksTypes.WorldGen,
    name: "generator",
    run: (gen, x, y, z, onDone) => {
      if (
        gen.columnTool.loadInAt(x, y, z) &&
        gen.columnTool.getStructValue("#dve_is_world_gen_done")
      )
        return onDone();
      gen.builder.setDimension(gen.dimension).setXYZ(x, y, z).fillColumn();
      gen.dveTasks.generate.deferred.run([gen.dimension, x, y, z], [], () => {
        onDone();
        if (gen.columnTool.loadInAt(x, y, z))
          return gen.columnTool.setTagValue("#dve_is_world_gen_done", 1);
        console.error(`${x} ${y} ${z} could not be loaded after generted`);
      });
    },
    propagationBlocking: true,
  });

  IWG.registerTasks({
    id: "#dve_iwg_generate_section",
    type: IWGTasksTypes.WorldGen,
    name: "generator",
    run: (gen, cx, y, cz, onDone) => {
      for (let x = cx; x < cx + 32; x += 16) {
        for (let z = cz; z < cz + 32; z += 16) {
          gen.builder
            .setDimension(gen.dimension)
            .setXYZ(cx, y, cz)
            .fillColumn();
        }
      }
      gen.builder.setDimension(gen.dimension).setXYZ(cx, y, cz).fillColumn();
      gen.dveTasks.generate.deferred.run([gen.dimension, cx, y, cz], [], () => {
        onDone();
        for (let x = cx; x < cx + 32; x += 16) {
          for (let z = cz; z < cz + 32; z += 16) {
            if (gen.columnTool.loadInAt(x, y, z)) {
              gen.columnTool.setTagValue("#dve_is_world_gen_done", 1);
            } else {
              console.error(
                `${x} ${y} ${z} could not be loaded after generted`
              );
            }
          }
        }
      });
    },
    propagationBlocking: true,
  });
  //#dve_is_world_decor_done
  IWG.registerTasks({
    id: "#dve_iwg_decorate",
    type: IWGTasksTypes.WorldGen,
    name: "decorate",
    run: (gen, x, y, z, onDone) => {
      if (
        gen.columnTool.loadInAt(x, y, z) &&
        gen.columnTool.getStructValue("#dve_is_world_decor_done")
      )
        return onDone();
      gen.builder.setDimension(gen.dimension).setXYZ(x, y, z).fillColumn();
      gen.dveTasks.decorate.deferred.run([gen.dimension, x, y, z], [], () => {
        onDone();
        if (gen.columnTool.loadInAt(x, y, z))
          return gen.columnTool.setTagValue("#dve_is_world_decor_done", 1);
        console.error(`${x} ${y} ${z} could not be loaded after generted`);
      });
    },
    propagationBlocking: true,
  });

  IWG.registerTasks({
    id: "#dve_iwg_world_sun",
    type: IWGTasksTypes.WorldGen,
    name: "world sun",
    run: (gen, x, y, z, onDone) => {
      if (
        gen.columnTool.loadInAt(x, y, z) &&
        gen.columnTool.getStructValue("#dve_is_world_sun_done")
      )
        return onDone();
      gen.dveTasks.worldSun.deferred.run([gen.dimension, x, y, z], () => {
        onDone();
        if (gen.columnTool.loadInAt(x, y, z))
          return gen.columnTool.setTagValue("#dve_is_world_sun_done", 1);
      });
    },
    propagationBlocking: true,
  });

  IWG.registerTasks({
    id: "#dve_iwg_propagation",
    type: IWGTasksTypes.WorldGen,
    name: "propagation",
    run: (gen, x, y, z, onDone) => {
      if (
        gen.columnTool.loadInAt(x, y, z) &&
        gen.columnTool.getStructValue("#dve_is_world_propagation_done")
      )
        return onDone();
      gen.dveTasks.propagation.deferred.run([gen.dimension, x, y, z], () => {
        onDone();
        if (gen.columnTool.loadInAt(x, y, z))
          return gen.columnTool.setTagValue(
            "#dve_is_world_propagation_done",
            1
          );
      });
    },
    propagationBlocking: true,
  });

  IWG.registerTasks({
    id: "#dve_iwg_build",
    type: IWGTasksTypes.Rendering,
    name: "build",
    run: (gen, x, y, z, onDone) => {
      gen._builtColumns.set(IWG.getKey(x, y, z), [x, y, z]);
      gen.builder
        .setDimension(gen.dimension)
        .setXYZ(x, y, z)
        .buildColumn((data) => {
          onDone();
        });
    },
  });

  IWG.registerTasks({
    id: "#dve_iwg_save",
    type: IWGTasksTypes.Saving,
    name: "save",
    run: async (gen, x, y, z, onDone) => {
      if (!gen.dataLoader) return onDone();
      await gen.dataLoader.saveColumnIfNotStored([gen.dimension, x, y, z]);
      onDone();
    },
  });

  IWG.registerTasks({
    id: "#dve_iwg_save_and_unload",
    type: IWGTasksTypes.Saving,
    name: "save and unload",
    run: async (gen, x, y, z, onDone) => {
      if (!gen.dataLoader) return onDone();
      gen.dataLoader.unLoadColumn([gen.dimension, x, y, z]);
      await onDone();
    },
  });


 */
}
