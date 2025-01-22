import { DataSyncData } from "../Types/DataSync.types";
import { VoxelDataGenerator } from "./Segments/VoxelDataGenerator";
import { SubstanceDataGenerator } from "./Segments/SubstanceDataGenerator";
import { DataGeneratorData } from "./DataGenerator.types";
import { VoxelData } from "../../VoxelData/Voxel.types";
import { SubstanceData } from "../Types/Substances.types";
import { SubstanceStructIds } from "../Constants/Structs/SubstanceStructIds";
import { VoxelStructBuilder } from "../Structs/Builder/VoxelStructBuilder";
import { SubstanceStructBuilder } from "../Structs/Builder/SubstanceStructBuilder";
import { VoxelStruct } from "../Structs/VoxelStruct";
import { SubstanceStruct } from "../Structs/SubstanceStruct";
import { ChunkStatStruct } from "../../Data/Structs/ChunkStruct";
import { ColumnStateStruct } from "../../Data/Structs/ColumnStruct";
import { RegionStateStruct } from "../../Data/Structs/RegionStruct";
import { LightData } from "../../VoxelData/LightData";
import { InitalizeChunkTags } from "../Structs/ChunkStruct.js";
import { InitalizeColumnTags } from "../Structs/ColumnStruct.js";
import { InitalizeRegionTags } from "../Structs/RegionStruct.js";
import { EngineSettings } from "../../Settings/EngineSettings";
import { VoxelStructIds } from "../Constants/Structs/VoxelStructIds";
import { WorldRegister } from "../World/WorldRegister";
import { MappedDataRegister } from "../Register/MappedDataRegister";
export default function InitDataGenerator(
  data: DataGeneratorData
): DataSyncData {
  const register = new WorldRegister();
  const materials: { id: string }[] = [
    { id: "dve_solid" },
    { id: "dve_flora" },
    { id: "dve_transparent" },
    { id: "dve_glow" },
    { id: "dve_liquid" },
    ...data.materials,
  ];
  const voxels: VoxelData[] = [
    {
      id: "dve_air",
      properties: [
        ["dve_substance", "dve_air"],
        ["dve_shape_id", "dve_cube"],
      ],
    },
    {
      id: "dve_barrier",
      properties: [
        ["dve_substance", "dve_air"],
        ["dve_shape_id", "dve_cube"],
      ],
    },
    ...data.voxels,
  ];
  const substances: SubstanceData[] = [
    {
      id: "dve_air",
      tags: [
        [SubstanceStructIds.parent, "dve_air"],
        [SubstanceStructIds.rendered, "dve_air"],
        [SubstanceStructIds.isSolid, false],
        [SubstanceStructIds.isLiquid, false],
        [SubstanceStructIds.isTransparent, true],
        [SubstanceStructIds.flowRate, 0],
        [SubstanceStructIds.culledSubstnaces, []],
      ],
    },
    {
      id: "dve_solid",
      tags: [
        [SubstanceStructIds.parent, "dve_solid"],
        [SubstanceStructIds.rendered, "dve_solid"],
        [SubstanceStructIds.isSolid, true],
        [SubstanceStructIds.isLiquid, false],
        [SubstanceStructIds.isTransparent, false],
        [SubstanceStructIds.flowRate, 0],
        [SubstanceStructIds.culledSubstnaces, ["dve_solid"]],
      ],
    },
    {
      id: "dve_glow",
      tags: [
        [SubstanceStructIds.parent, "dve_solid"],
        [SubstanceStructIds.rendered, "dve_glow"],
        [SubstanceStructIds.isSolid, true],
        [SubstanceStructIds.isLiquid, false],
        [SubstanceStructIds.isTransparent, false],
        [SubstanceStructIds.flowRate, 0],
        [SubstanceStructIds.culledSubstnaces, ["dve_solid"]],
      ],
    },
    {
      id: "dve_translucent",
      tags: [
        [SubstanceStructIds.parent, "dve_flora"],
        [SubstanceStructIds.rendered, "dve_solid"],
        [SubstanceStructIds.isSolid, true],
        [SubstanceStructIds.isLiquid, false],
        [SubstanceStructIds.isTransparent, true],
        [SubstanceStructIds.flowRate, 0],
        [SubstanceStructIds.culledSubstnaces, []],
      ],
    },
    {
      id: "dve_transparent",
      tags: [
        [SubstanceStructIds.parent, "dve_transparent"],
        [SubstanceStructIds.rendered, "dve_transparent"],
        [SubstanceStructIds.isSolid, true],
        [SubstanceStructIds.isLiquid, false],
        [SubstanceStructIds.isTransparent, true],
        [SubstanceStructIds.flowRate, 0],
        [SubstanceStructIds.culledSubstnaces, ["dve_transparent"]],
      ],
    },
    {
      id: "dve_flora",
      tags: [
        [SubstanceStructIds.parent, "dve_flora"],
        [SubstanceStructIds.rendered, "dve_flora"],
        [SubstanceStructIds.isSolid, true],
        [SubstanceStructIds.isLiquid, false],
        [SubstanceStructIds.isTransparent, true],
        [SubstanceStructIds.flowRate, 0],
        [SubstanceStructIds.culledSubstnaces, []],
        [SubstanceStructIds.cullDense, true],
        [SubstanceStructIds.isWindAffected, true],
        [SubstanceStructIds.isBackFaceCulled, false],
      ],
    },
    {
      id: "dve_liquid",
      tags: [
        [SubstanceStructIds.parent, "dve_liquid"],
        [SubstanceStructIds.rendered, "dve_liquid"],
        [SubstanceStructIds.isSolid, false],
        [SubstanceStructIds.isLiquid, true],
        [SubstanceStructIds.isTransparent, true],
        [SubstanceStructIds.flowRate, 1],
        [
          SubstanceStructIds.culledSubstnaces,
          ["dve_liquid", "dve_solid", "dve_glow"],
        ],
        [SubstanceStructIds.isBackFaceCulled, false],
      ],
    },
    {
      id: "dve_magma",
      tags: [
        [SubstanceStructIds.parent, "dve_liquid"],
        [SubstanceStructIds.rendered, "dve_liquid"],
        [SubstanceStructIds.isSolid, false],
        [SubstanceStructIds.isLiquid, true],
        [SubstanceStructIds.isTransparent, false],
        [SubstanceStructIds.flowRate, 3],
        [SubstanceStructIds.culledSubstnaces, ["dve_liquid", "dve_solid"]],
        [SubstanceStructIds.isBackFaceCulled, false],
      ],
    },
  ];
  SubstanceDataGenerator.generate(substances);

  VoxelDataGenerator.overrides.set(VoxelStructIds.lightValue, (tags, value) => {
    const v = <number[]>value;
    let sl = 0;
    sl = LightData.setR(v[0], sl);
    sl = LightData.setG(v[1], sl);
    sl = LightData.setB(v[2], sl);
    tags.setProperty(VoxelStructIds.lightValue, sl);
  });
  VoxelDataGenerator.overrides.set(VoxelStructIds.substance, (tags, value) => {
    tags.setProperty(
      VoxelStructIds.substance,
      SubstanceDataGenerator.palette._map[value as string]
    );
  });

  VoxelDataGenerator.generate(voxels);

  InitalizeChunkTags();
  InitalizeColumnTags();
  InitalizeRegionTags();

  const voxelMaps = VoxelStructBuilder.getMaps();
  const voxelStringMaps = MappedDataRegister.stringMaps.getSegment("voxel");
  for (const key in voxelMaps.stringMaps) {
    voxelStringMaps.add(key, voxelMaps.stringMaps[key]);
  }
  const voxelObjectMaps = MappedDataRegister.objectMaps.getSegment("voxel");
  for (const key in voxelMaps.objectMaps) {
    voxelObjectMaps.add(key, voxelMaps.objectMaps[key]);
  }
  const substanceMaps = SubstanceStructBuilder.getMaps();

  const substanceStringMaps =
    MappedDataRegister.stringMaps.getSegment("substance");
  for (const key in substanceMaps.stringMaps) {
    substanceStringMaps.add(key, substanceMaps.stringMaps[key]);
  }
  const substanceObjectMaps =
    MappedDataRegister.objectMaps.getSegment("substance");
  for (const key in substanceMaps.objectMaps) {
    substanceObjectMaps.add(key, substanceMaps.objectMaps[key]);
  }
  return {
    settings: EngineSettings.settings,
    threads: data.threads,
    modelData: data.voxelModels,
    materials: {
      rendered: materials.map((_) => _.id),
    },
    worldData: {
      chunkStruct: ChunkStatStruct.structData,
      columnStruct: ColumnStateStruct.structData,
      regionStruct: RegionStateStruct.structData,
    },
    voxel: {
      palette: VoxelDataGenerator.palette._palette,
      map: VoxelDataGenerator.palette._map,
      nameToIdMap: VoxelDataGenerator.nameToIdMap,
      idToNameMap: VoxelDataGenerator.idToNameMap,
      ...voxelMaps,
      struct: VoxelStruct.initData,
      index: VoxelStruct.voxelIndex,
    },
    substance: {
      palette: SubstanceDataGenerator.palette._palette,
      map: SubstanceDataGenerator.palette._map,
      ...substanceMaps,
      struct: SubstanceStruct.initData,
    },
  };
}
