import { BinaryNumberTypes, BinaryStruct } from "@amodx/binary/";
import { Column } from "./Column.js";
import { ColumnStructIds } from "./ColumnStructIds.js";
const ColumnStateStruct = new BinaryStruct("column-tags");
ColumnStateStruct.registerProperty(
  {
    id: ColumnStructIds.lastSaveTimestamp,
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint32,
  },
  {
    id: ColumnStructIds.lastAnalyzerUpdateTimestamp,
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint32,
  },
  {
    id: ColumnStructIds.hasRichData,
    type: "boolean",
  },
  {
    id: ColumnStructIds.hasEntityData,
    type: "boolean",
  },
  {
    id: ColumnStructIds.isStored,
    type: "boolean",
  },
  {
    id: ColumnStructIds.isWorldGenDone,
    type: "boolean",
  },
  {
    id: ColumnStructIds.isWorldDecorDone,
    type: "boolean",
  },
  {
    id: ColumnStructIds.isWorldSunDone,
    type: "boolean",
  },
  {
    id: ColumnStructIds.isWorldPropagationDone,
    type: "boolean",
  },
  {
    id: ColumnStructIds.isDirty,
    type: "boolean",
  },
  {
    id: ColumnStructIds.persistent,
    type: "boolean",
  }
);

export function InitalizeColumnTags() {
  const initData = ColumnStateStruct.init({
    indexBufferMode: "shared",
  });

  Column.StateStruct.init(initData);
}
