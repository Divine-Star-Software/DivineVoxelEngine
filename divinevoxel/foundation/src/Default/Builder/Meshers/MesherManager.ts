import type { Mesher } from "./Classes/Mesher";
import { TextureBuilder } from "./Meshers/TextureMesher.js";
import { VoxelBuilder } from "./Meshers/VoxelMesher.js";
import { BuildNodeMesh, SetNodeMesh } from "../Tasks/BuidlerTasks.types";

export const MesherManager = {
  builders: new Map<string, Mesher>(),

  registerBuilder(builder: Mesher) {
    this.builders.set(builder.id, builder);
  },

  buildNode(data: BuildNodeMesh): [SetNodeMesh, ArrayBuffer[]] | false {
    const builder = this.builders.get(data[1]);
    if (!builder) return false;
    return builder.build(data);
  },
};

MesherManager.registerBuilder(TextureBuilder);
MesherManager.registerBuilder(VoxelBuilder);
