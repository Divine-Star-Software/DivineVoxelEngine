import { VoxelGeometryBuilderCacheSpace } from "../Models/VoxelGeometryBuilderCacheSpace.js";
import { TemplateCursor } from "../../Templates/Cursor/TemplateCursor.js";
import { FullVoxelTemplate } from "../../Templates/FullVoxelTemplate.js";
import { CompactVoxelMesh } from "../Functions/CompactVoxelMesh.js";
import { VoxelModelConstructorRegister } from "../Models/VoxelModelConstructorRegister.js";
import { RawVoxelData } from "../../Voxels/Types/Voxel.types.js";
import { CompactMeshData } from "Mesher/Types";

const templateCursor = new TemplateCursor();
templateCursor.setTemplate(
  new FullVoxelTemplate(FullVoxelTemplate.CreateNew([3, 3, 3], 0xf))
);

const space = new VoxelGeometryBuilderCacheSpace({ x: 3, y: 3, z: 3 });
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

  const builder = constructor.builder;
  builder.space = space;
  builder.bvhTool = null;
  builder.clear();
  space.start(0, 0, 0);

  builder.effects = {};
  builder.origin.x = -0.5;
  builder.origin.y = -0.5;
  builder.origin.z = -0.5;
  builder.position.x = 1;
  builder.position.y = 1;
  builder.position.z = 1;

  builder.voxel = voxel;
  builder.nVoxel = templateCursor;
  constructor.process();

  const transfers: any[] = [];
  const compacted = CompactVoxelMesh([builder], transfers);
  builder.clear();

  return [compacted, transfers];
}
