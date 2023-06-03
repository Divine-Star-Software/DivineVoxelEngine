import type { BuildNodeMesh, SetNodeMesh } from "Meta/Tasks/RenderTasks.types";
export declare abstract class NodeBuilder {
    id: string;
    constructor(id: string);
    abstract build(data: BuildNodeMesh): [SetNodeMesh, ArrayBuffer[]] | false;
}
