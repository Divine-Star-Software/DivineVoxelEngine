import type { BuildNodeMesh, SetNodeMesh } from "Types/Tasks/RenderTasks.types";
import type { NodeBuilder } from "./Classes/NodeBuilder";
import { TextureBuilder } from "./Builders/TextureBuilder.js";
import { VoxelBuilder } from "./Builders/VoxelBuilder.js";

export const NodeBuilderManager = {
 builders: new Map<string, NodeBuilder>(),

 registerBuilder(builder: NodeBuilder) {
  this.builders.set(builder.id, builder);
 },

 buildNode(data: BuildNodeMesh): [SetNodeMesh, ArrayBuffer[]] | false {
  const builder = this.builders.get(data[1]);
  if (!builder) return false;

  return builder.build(data);
 },
};

NodeBuilderManager.registerBuilder(TextureBuilder);
NodeBuilderManager.registerBuilder(VoxelBuilder);
