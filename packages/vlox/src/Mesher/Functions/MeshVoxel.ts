import { RenderedMaterials } from "../RenderedMaterials";
import { VoxelGeometryLookUp } from "../Models/VoxelGeometryLookUp.js";
import { TemplateCursor } from "../../Templates/Cursor/TemplateCursor.js";
import { VoxelCursor } from "../../Voxels/Cursor/VoxelCursor.js";
import { FullVoxelTemplate } from "../../Templates/FullVoxelTemplate.js";
import { CompactVoxelMesh } from "../Functions/CompactVoxelMesh.js";
import { VoxelModelConstructorRegister } from "../Models/VoxelModelConstructorRegister.js";
import { RawVoxelData } from "../../Voxels/Types/Voxel.types.js";
import { CompactMeshData } from "Mesher/Types";

const templateCursor = new TemplateCursor();
const voxelCursor = new VoxelCursor();
templateCursor.setTemplate(
  new FullVoxelTemplate(FullVoxelTemplate.CreateNew([3, 3, 3], 0xf))
);

const space = VoxelGeometryLookUp.createSpace(3, 3, 3);
export function MeshVoxel(
  rawVoxelData: RawVoxelData
): [mesh: CompactMeshData, tranfers: any[]] | false {
  const voxel = templateCursor.getVoxel(1, 1, 1)!;
  voxel.copyRaw(rawVoxelData);
  voxel.process();
  if (!voxel.isRenderable()) return false;

  const constructor = VoxelModelConstructorRegister.getConstructor(
    voxel.getStringId()
  );

  if (!constructor) {
    throw new Error(
      `Could not find constructor for voxel [id:${voxel.getStringId()} name:${voxel.getName()}] `
    );
  }

  const mesher = RenderedMaterials.meshersMap.get(
    voxel.getRenderedMaterialStringId()
  );
  if (!mesher) {
    throw new Error(
      `Could not find material mesh for voxel [id:${voxel.getStringId()} name:${voxel.getName()}] `
    );
  }
  mesher.bvhTool = null;
  mesher.resetAll();
  VoxelGeometryLookUp.start(space);
  mesher.origin.x = -0.5;
  mesher.origin.y = -0.5;
  mesher.origin.z = -0.5;
  mesher.position.x = 1;
  mesher.position.y = 1;
  mesher.position.z = 1;

  mesher.voxel = voxelCursor.copy(voxel);
  mesher.nVoxel = templateCursor;

  constructor.process(mesher);
  mesher.reset();

  VoxelGeometryLookUp.stop();

  const compacted = CompactVoxelMesh([mesher]);
  mesher.reset();
  mesher.mesh!.clear();

  return compacted;
}
