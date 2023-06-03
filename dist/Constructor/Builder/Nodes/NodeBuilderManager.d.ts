import type { BuildNodeMesh, SetNodeMesh } from "Meta/Tasks/RenderTasks.types";
import type { NodeBuilder } from "./Classes/NodeBuilder";
export declare const NodeBuilderManager: {
    builders: Map<string, NodeBuilder>;
    registerBuilder(builder: NodeBuilder): void;
    buildNode(data: BuildNodeMesh): [SetNodeMesh, ArrayBuffer[]] | false;
};
