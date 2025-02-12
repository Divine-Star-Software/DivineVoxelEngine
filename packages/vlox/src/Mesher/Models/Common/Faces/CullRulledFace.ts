import { VoxelRelativeCubeIndexPositionMap } from "../../../../Voxels/Models/Indexing/VoxelRelativeCubeIndex";
import { VoxelModelBuilder } from "../../VoxelModelBuilder";
import { VoxelModelConstructorRegister } from "../../VoxelModelConstructorRegister";

export function CullRulledFace(
  builder: VoxelModelBuilder,
  trueFaceIndex: number
) {
  const faceIndexes = VoxelModelConstructorRegister.faceCullMap![trueFaceIndex];
  if (!faceIndexes) return true;

  for (let i = 0; i < faceIndexes.length; i++) {
    const directionIndex = faceIndexes[i];
    const p = VoxelRelativeCubeIndexPositionMap[directionIndex];
    const hashed = builder.space.getHash(
      builder.nVoxel,
      builder.position.x + p[0],
      builder.position.y + p[1],
      builder.position.z + p[2]
    );
    if (builder.space.foundHash[hashed] < 2) continue;
    const constructor = builder.space.getConstructor(hashed)!;
    const offsetBaseGometry = builder.space.getGeomtry(hashed);

    if (offsetBaseGometry) {
      for (let i = 0; i < offsetBaseGometry.length; i++) {
        const geoId = offsetBaseGometry[i];
        if (VoxelModelConstructorRegister.rulesless[geoId]) continue;
        const cullingProcedure =
          VoxelModelConstructorRegister.geometry[geoId].cullingProcedure;
        if (cullingProcedure.type == "transparent") {
          if (constructor.id != builder.voxel.getStringId()) continue;
        } else {
          if (cullingProcedure.type != "default") continue;
        }

        if (
          VoxelModelConstructorRegister.faceCullIndex.getValue(
            geoId,
            directionIndex,
            trueFaceIndex
          ) == 1
        ) {
          return false;
        }
      }
    }

    const offsetConditonalGeometry =
      builder.space.getConditionalGeomtry(hashed);

    if (offsetConditonalGeometry) {
      for (let i = 0; i < offsetConditonalGeometry.length; i++) {
        const cond = offsetConditonalGeometry[i];
        for (let k = 0; k < cond.length; k++) {
          const geoId = cond[k];
          if (VoxelModelConstructorRegister.rulesless[geoId]) continue;
          const cullingProcedure =
            VoxelModelConstructorRegister.geometry[geoId].cullingProcedure;
          if (cullingProcedure.type == "transparent") {
            if (constructor.id != builder.voxel.getStringId()) continue;
          } else {
            if (cullingProcedure.type != "default") continue;
          }
          if (VoxelModelConstructorRegister.rulesless[geoId]) continue;
          if (
            VoxelModelConstructorRegister.faceCullIndex.getValue(
              geoId,
              directionIndex,
              trueFaceIndex
            ) == 1
          )
            return false;
        }
      }
    }
  }

  return true;
}
