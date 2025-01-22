import { BuildNodeMesh, SetNodeMesh } from "../Tasks/BuidlerTasks.types";

export interface MesherInterface {
  id: string;
  build(data: BuildNodeMesh): [SetNodeMesh, ArrayBuffer[]] | false;
}
