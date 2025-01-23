import type { MesherInterface } from "./MesherInterface";
import { TextureBuilder } from "./TextureMesher.js";
import { VoxelBuilder } from "./VoxelMesher.js";
import { BuildNodeMesh, SetNodeMesh } from "../Tasks/BuidlerTasks.types";

export const MesherManager = {
  builders: new Map<string, MesherInterface>(),

  registerBuilder(builder: MesherInterface) {
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
