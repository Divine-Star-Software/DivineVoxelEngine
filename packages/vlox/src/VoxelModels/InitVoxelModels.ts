import {
  candlesGeometry1,
  candlesGeometry2,
  candlesGeometry3,
  candlesGeometry4,
  candlesModel,
  fence,
  fenceEastWest,
  fenceNorthsouth,
  fencePost,
  leverGeometry,
  leverModel,
} from "./Examples";
import {
  cube,
  halfDownCube,
  eighthCube,
  quaterCubeSouthNorth,
  quaterCubeUpDown,
  quaterCubeWestEast,
  halfSouthCube,
  halfWestCube,
} from "./Defaults/CubeVoxelGeometry";
import {
  orientedCube,
  pillarCube,
  simpleCube,
  simpleHalfCube,
} from "./Defaults/CubeVoxelModels";
import {
  diagonalFlatPanelEastWest,
  diagonalFlatPanelWestEast,
  thinPanelDown,
  thinPanelSouth,
  thinPanelWest,
} from "./Defaults/PanelVoxelGeometry";
import { stair } from "./Defaults/StairVoxelModel";

import { VoxelModelManager } from "./Rules/VoxelModelManager";
import {
  VoxelGeometryData,
  VoxelModelConstructorData,
  VoxelModelData,
} from "./VoxelModel.types";
import { VoxelData } from "../Types/Voxel.types";
import { Thread, ThreadPool } from "@amodx/threads";

import { BuildRules } from "./Rules/Functions/BuildRules";
import { BuildStateData } from "./Rules/Functions/BuildStateData";
import { BuildGeomtryInputs } from "./Rules/Functions/BuildGeomtryInputs";
import { BuildFinalInputs } from "./Rules/Functions/BuildFinalInputs";
import { ConstructorVoxelModelSyncData } from "./VoxelModelRules.types";
import { SchemaRegister } from "./State/SchemaRegister";
import {
  simpleCrossedPannel,
  simpleThinPannel,
} from "./Defaults/PanelVoxelModels";

export function InitVoxelModels(data: {
  constructors: ThreadPool;
  world: Thread;
  geometry?: VoxelGeometryData[];
  models?: VoxelModelData[];
  voxels: VoxelData[];
}) {
  const initTime = performance.now();

  VoxelModelManager.registerGeometry(
    cube,
    fencePost,
    fenceEastWest,
    fenceNorthsouth,
    halfDownCube,
    halfSouthCube,
    halfWestCube,
    quaterCubeSouthNorth,
    quaterCubeUpDown,
    quaterCubeWestEast,
    eighthCube,
    thinPanelDown,
    thinPanelSouth,
    thinPanelWest,
    diagonalFlatPanelEastWest,
    diagonalFlatPanelWestEast,

    candlesGeometry1,
    candlesGeometry2,
    candlesGeometry3,
    candlesGeometry4,

    ...leverGeometry,

    ...(data.geometry || [])
  );

  VoxelModelManager.registerModels(
    simpleCube,
    orientedCube,
    simpleHalfCube,
    pillarCube,
    simpleThinPannel,
    fence,
    stair,
    simpleCrossedPannel,

    candlesModel,
    leverModel,

    ...(data.models || [])
  );

  const syncData: ConstructorVoxelModelSyncData = {
    geometryPalette: VoxelModelManager.geometryPalette._palette,
    geometry: [],
    models: [],
    voxels: [],
  };

  for (const voxel of data.voxels) {
    const data = voxel.tags.find((_) => _[0] == "#dve_model_data") as any as [
      string,
      VoxelModelConstructorData
    ];
    if (!data) continue;
    const voxelData = data[1];
    VoxelModelManager.registerVoxel(voxel.id, voxelData);
    const model = VoxelModelManager.models.get(voxelData.id)!;
    if (!model)
      throw new Error(`Voxel model with id ${voxelData.id} does not exist.`);
    model!.voxels.set(voxel.id, voxelData);
  }

  const output: any = {};

  const startTime = performance.now();
  for (const [mainKey, mainGeo] of VoxelModelManager.geometry) {
    if (mainGeo.data.ogData.doNotBuildRules) {
      syncData.geometry.push({
        id: mainKey,
        nodes: mainGeo.data.nodes,
        ruleless: true,
      });
      continue;
    }
    const output = BuildRules(mainGeo, VoxelModelManager.geometryPalette);
    syncData.geometry.push({
      id: mainKey,
      nodes: mainGeo.data.nodes,
      ...output,
    });
  }

  console.log("done building rules", performance.now() - startTime);

  const inputStartTime = performance.now();
  for (const [mainKey, model] of VoxelModelManager.models) {
    const stateData = BuildStateData(model, VoxelModelManager.geometryPalette);
    model.stateData = stateData;
    SchemaRegister.registerModel(mainKey, stateData.schema);
    syncData.models.push({
      id: mainKey,
      schema: stateData.schema,
      geoLinkMap: stateData.geometryLinkStateMap,
      shapeStateMap: stateData.shapeStatePalette,
      shapeStateGeometryMap: stateData.shapeStateGeometryPalette,
      shapeStateTree: stateData.shapeStateTree,
      condiotnalStateTree: stateData.condiotnalNodeStateTree,
      condiotnalStatements: stateData.condiotnalStatements,
      condiotnalStateMap: stateData.condiotnalShapeStatePalette,
      condiotnalShapeStateMap: stateData.condiotanlStatePalette,
      condiotnalShapeStateGeometryMap: stateData.condiotanlGeometryStatePalette,
      shapeStateRelativeGeometryMap: stateData.shapeStateRelativeGeometryMap,
      relativeGeometryByteIndexMap: stateData.relativeGeometryByteIndexMap,
      condiotnalShapeStateRelativeGeometryMap:
        stateData.condiotnalShapeStateRelativeGeometryMap,
    });
  }

  for (const [mainKey, geometry] of VoxelModelManager.geometry) {
    BuildGeomtryInputs(geometry);
  }

  for (const [mainKey, model] of VoxelModelManager.models) {
    const {
      shapeStateVoxelInputs,
      conditionalShapeStateVoxelInputs,
      transparentVoxelFaceIndexes,
    } = BuildFinalInputs(model);

    for (const v in shapeStateVoxelInputs) {
      const stateData = model.voxelModData.get(v)!;
      SchemaRegister.registerVoxel(v, mainKey, stateData.modSchema);
      syncData.voxels.push({
        id: v,
        modelId: mainKey,
        transparentFaceIndex: transparentVoxelFaceIndexes[v].data,
        modSchema: stateData.modSchema,
        modStateTree: stateData.modStateTree,
        baseGeometryInputMap: shapeStateVoxelInputs[v],
        condiotnalGeometryInputMap: conditionalShapeStateVoxelInputs[v],
      });
    }
  }
  data.world.runAsyncTasks("sync-voxel-model-data", syncData);
  data.constructors.runTasksForAll("sync-voxel-model-data", syncData);
  console.log("done building inputs", performance.now() - inputStartTime);

  console.log(
    "init voxel models done | totle time: ",
    performance.now() - initTime
  );

  /* 
  const blob = new Blob([JSON.stringify(output, null, 1)], {});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rules.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
 */
}
