import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Scene } from "@babylonjs/core/scene";
import { MeshVoxel } from "@divinevoxel/vlox/Mesher/Functions/MeshVoxel";
import { PaintVoxelData } from "@divinevoxel/vlox/Voxels";
import { DVEBRMesh } from "../Meshes/DVEBRMesh";
import { VoxelCursor } from "@divinevoxel/vlox/Voxels/Cursor/VoxelCursor";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
const dataTool = new VoxelCursor();

export class VoxelMesher {
  constructor(public scene: Scene) {}

  meshVoxel(voxel: PaintVoxelData) {
    const raw = PaintVoxelData.ToRaw(voxel);
    const meshedVoxel = MeshVoxel(raw);
    if (!meshedVoxel) return null;
    const mesh = new Mesh("", this.scene);
    mesh.setEnabled(false);
    DVEBRMesh.UpdateVertexData(
      mesh,
      this.scene.getEngine() as any,
      meshedVoxel[0][1][0]
    );
    dataTool.setRaw(raw).process();
    const renderedMaterial = dataTool.getRenderedMaterial()!;

    const material =
      DVEBabylonRenderer.instance.materials.get(renderedMaterial);
    if (!material)
      throw new Error(`Could not load material ${renderedMaterial}`);

    mesh.material = material._material;
    return mesh;
  }
}
