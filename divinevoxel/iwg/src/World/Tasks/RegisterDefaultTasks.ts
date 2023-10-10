import { IWG } from "../IWG.js";

export function RegisterDefaultTasks() {
  IWG.registerTasks("world-gen", {
    id: "#dve_iwg_load",
    name: "load",
    run: (gen, x, y, z, onDone) => {
      if (!gen.dataLoader) {
        if (gen.columnTool.loadInAt(x, y, z)) {
          return onDone();
        }
        gen.builder.setXYZ(x, y, z).fillColumn();
        return onDone();
      }
      if (gen.columnTool.loadInAt(x, y, z)) {
        return onDone();
      }
      let tries = 0;
      let ran = false;
      let cleared = false;
      const inte = setInterval(() => {
        tries++;
        if (!(gen.columnTool.loadInAt(x, y, z) && tries >= 5) && !ran) {
          clearInterval(inte);
          onDone();
          console.error("force quit loading column");
          cleared = true;
        }
        if (ran) clearInterval(inte);
      }, 1_000);
      gen.dataLoader
        .setLocation([gen.dimension, x, y, z])
        .loadIfExists((exists) => {
          if (cleared) return;

          ran = true;
          onDone();
          if (!exists) {
            gen.builder.setXYZ(x, y, z).fillColumn();
            return;
          }
        });
    },
    propagationBlocking: true,
  });

  IWG.registerTasks("world-gen", {
    id: "#dve_iwg_generate",
    name: "generator",
    run: (gen, x, y, z, onDone) => {
      if (
        gen.columnTool.loadInAt(x, y, z) &&
        gen.columnTool.getTagValue("#dve_is_world_gen_done")
      )
        return onDone();
      gen.builder.setDimension(gen.dimension).setXYZ(x, y, z).fillColumn();
      gen.dveTasks.generate.deferred.run(gen.columnTool.location, [], () => {
        onDone();
        if (gen.columnTool.loadInAt(x, y, z))
          return gen.columnTool.setTagValue("#dve_is_world_gen_done", 1);
        console.error(`${x} ${y} ${z} could not be loaded after generted`);
      });
    },
    propagationBlocking: true,
  });
  //#dve_is_world_decor_done
  IWG.registerTasks("world-gen", {
    id: "#dve_iwg_decorate",
    name: "decorate",
    run: (gen, x, y, z, onDone) => {
      if (
        gen.columnTool.loadInAt(x, y, z) &&
        gen.columnTool.getTagValue("#dve_is_world_decor_done")
      )
        return onDone();
      gen.builder.setDimension(gen.dimension).setXYZ(x, y, z).fillColumn();
      gen.dveTasks.decorate.deferred.run(gen.columnTool.location, [], () => {
        onDone();
        if (gen.columnTool.loadInAt(x, y, z))
          return gen.columnTool.setTagValue("#dve_is_world_decor_done", 1);
        console.error(`${x} ${y} ${z} could not be loaded after generted`);
      });
    },
    propagationBlocking: true,
  });

  IWG.registerTasks("world-gen", {
    id: "#dve_iwg_world_sun",
    name: "world sun",
    run: (gen, x, y, z, onDone) => {
      if (
        gen.columnTool.loadInAt(x, y, z) &&
        gen.columnTool.getTagValue("#dve_is_world_sun_done")
      )
        return onDone();
      gen.dveTasks.worldSun.deferred.run(gen.columnTool.location, () => {
        onDone();
        if (gen.columnTool.loadInAt(x, y, z))
          return gen.columnTool.setTagValue("#dve_is_world_sun_done", 1);
      });
    },
    propagationBlocking: true,
  });

  IWG.registerTasks("world-gen", {
    id: "#dve_iwg_propagation",
    name: "propagation",
    run: (gen, x, y, z, onDone) => {
      if (
        gen.columnTool.loadInAt(x, y, z) &&
        gen.columnTool.getTagValue("#dve_is_world_propagation_done")
      )
        return onDone();
      gen.dveTasks.propagation.deferred.run(gen.columnTool.location, () => {
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

  IWG.registerTasks("world-gen", {
    id: "#dve_iwg_build",
    name: "build",
    run: (gen, x, y, z, onDone) => {
      gen._activeColumns.set(IWG.getKey(x, y, z), [x, y, z]);
      gen.builder
        .setDimension(gen.dimension)
        .setXYZ(x, y, z)
        .buildColumn((data) => {
          onDone();
        });
    },
  });

  IWG.registerTasks("saving", {
    id: "#dve_iwg_save",
    name: "save",
    run: (gen, x, y, z, onDone) => {
      if (!gen.dataLoader) return onDone();
      gen.dataLoader
        .setLocation([gen.dimension, x, y, z])
        .saveColumnIfNotStored(() => {
          onDone();
        });
    },
  });

  IWG.registerTasks("saving", {
    id: "#dve_iwg_save_and_unload",
    name: "save and unload",
    run: (gen, x, y, z, onDone) => {
      if (!gen.dataLoader) return onDone();
      gen.dataLoader.setLocation([gen.dimension, x, y, z]).unLoadColumn(() => {
        onDone();
      });
    },
  });
}
