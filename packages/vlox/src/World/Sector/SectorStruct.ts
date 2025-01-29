import { BinaryNumberTypes, BinaryStruct } from "@amodx/binary/";
import { Sector } from "./Sector.js";
import { SectorStateStructIds } from "./SectorStructIds.js";
const SectorStateStruct = new BinaryStruct("sector-tags");
SectorStateStruct.registerProperty(
  {
    id: SectorStateStructIds.lastSaveTimestamp,
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint32,
  },
  {
    id: SectorStateStructIds.lastAnalyzerUpdateTimestamp,
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint32,
  },
  {
    id: SectorStateStructIds.hasRichData,
    type: "boolean",
  },
  {
    id: SectorStateStructIds.hasEntityData,
    type: "boolean",
  },
  {
    id: SectorStateStructIds.isStored,
    type: "boolean",
  },
  {
    id: SectorStateStructIds.isWorldGenDone,
    type: "boolean",
  },
  {
    id: SectorStateStructIds.isWorldDecorDone,
    type: "boolean",
  },
  {
    id: SectorStateStructIds.isWorldSunDone,
    type: "boolean",
  },
  {
    id: SectorStateStructIds.isWorldPropagationDone,
    type: "boolean",
  },
  {
    id: SectorStateStructIds.isDirty,
    type: "boolean",
  },
  {
    id: SectorStateStructIds.persistent,
    type: "boolean",
  }
);

export function InitalizeSectorTags() {
  const initData = SectorStateStruct.init({
    indexBufferMode: "shared",
  });

  Sector.StateStruct.init(initData);
}
