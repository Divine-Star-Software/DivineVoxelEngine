import { BuildNodeMesh, SetNodeMesh } from "../../Tasks/BuidlerTasks.types";

export abstract class Mesher {
 constructor(public id: string) {}
 abstract build(data: BuildNodeMesh): [SetNodeMesh, ArrayBuffer[]] | false;
}
