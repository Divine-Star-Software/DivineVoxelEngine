import {
  candlesGeometry1,
  candlesGeometry2,
  candlesGeometry3,
  candlesGeometry4,
  candlesModel,
  carpetGeometry,
  carpetModel,
  chainGeometry,
  chainModel,
  fence,
  fenceEastWest,
  fenceNorthsouth,
  fencePost,
  leverGeometry,
  leverModel,
} from "../VoxelModels/Examples";
import {
  cube,
  halfDownCube,
  eighthCube,
  quaterCubeSouthNorth,
  quaterCubeUpDown,
  quaterCubeWestEast,
  halfSouthCube,
  halfWestCube,
} from "../VoxelModels/Defaults/CubeVoxelGeometry";
import {
  orientedCube,
  pillarCube,
  simpleCube,
  simpleHalfCube,
} from "../VoxelModels/Defaults/CubeVoxelModels";
import {
  diagonalFlatPanelEastWest,
  diagonalFlatPanelWestEast,
  thinPanelDown,
  thinPanelSouth,
  thinPanelWest,
} from "../VoxelModels/Defaults/PanelVoxelGeometry";
import { stair } from "../VoxelModels/Defaults/StairVoxelModel";

import { VoxelModelManager } from "../VoxelModels/Rules/VoxelModelManager";
import {
  VoxelGeometryData,
  VoxelModelConstructorData,
  VoxelModelData,
} from "../VoxelModels/VoxelModel.types";
import { VoxelData } from "./Voxel.types";
import { Thread, ThreadPool } from "@amodx/threads";

import { BuildRules } from "../VoxelModels/Rules/Functions/BuildRules";
import { BuildStateData } from "./Functions/BuildStateData";
import { BuildGeomtryInputs } from "../VoxelModels/Rules/Functions/BuildGeomtryInputs";
import { BuildFinalInputs } from "../VoxelModels/Rules/Functions/BuildFinalInputs";
import { ConstructorVoxelModelSyncData } from "./VoxelSyncData";
import { SchemaRegister } from "../VoxelState/SchemaRegister";
import {
  simpleCrossedPannel,
  simpleThinPannel,
} from "../VoxelModels/Defaults/PanelVoxelModels";
import { VoxelTagStates } from "../VoxelState/VoxelTagStates";
import { VoxelIndex } from "./VoxelIndex";
import { CacheManager } from "../Cache/CacheManager";

export type InitVoxelDataProps = {
  constructors: ThreadPool;
  world: Thread;
  geometry?: VoxelGeometryData[];
  models?: VoxelModelData[];
  voxels: VoxelData[];
};

export function InitVoxelData(data: InitVoxelDataProps) {
  if (CacheManager.cacheLoadEnabled && CacheManager.cachedData) {
    const syncData = CacheManager.cachedData.models;
    for (const model of syncData.models) {
      SchemaRegister.registerModel(model.id, model.schema);
    }
    for (const voxel of syncData.voxels) {
      SchemaRegister.registerVoxel(voxel.id, voxel.modelId, voxel.modSchema);
    }
    VoxelTagStates.load(syncData.tagState);

    data.world.runAsyncTasks("sync-voxel-model-data", syncData);
    data.constructors.runTasksForAll("sync-voxel-model-data", syncData);
    const voxelIndex = new VoxelIndex(data.voxels);
    return;
  }

  const initTime = performance.now();

  VoxelModelManager.registerGeometry(
    cube,
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

    fencePost,
    fenceEastWest,
    fenceNorthsouth,

    chainGeometry,
    carpetGeometry,

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

    stair,
    simpleCrossedPannel,

    chainModel,
    carpetModel,
    candlesModel,
    leverModel,

    fence,
    ...(data.models || [])
  );

  const syncData: ConstructorVoxelModelSyncData = {
    geometryPalette: VoxelModelManager.geometryPalette._palette,
    geometry: [],
    models: [],
    voxels: [],
    tagState: [],
  };

  for (const voxel of data.voxels) {
    const data = voxel.tags.find((_) => _[0] == "#dve_model_data") as any as [
      string,
      VoxelModelConstructorData,
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
      effects: stateData.effects,
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
  syncData.tagState = VoxelTagStates.toJSON();

  if (CacheManager.cacheStoreEnabled) {
    console.warn("Store sync data", syncData);
    CacheManager.cachedModelData = syncData;
  }

  data.world.runAsyncTasks("sync-voxel-model-data", syncData);
  data.constructors.runTasksForAll("sync-voxel-model-data", syncData);

  console.log("done building inputs", performance.now() - inputStartTime);

  console.log(
    "init voxel models done | totle time: ",
    performance.now() - initTime
  );

  const voxelIndex = new VoxelIndex(data.voxels);

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
