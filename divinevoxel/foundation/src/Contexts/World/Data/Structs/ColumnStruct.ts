import { BinaryNumberTypes, BinaryStruct } from "@divinestar/binary/";

import { WorldDataStructProperties } from "../../../../Data/Constants/Structs/WorldDataStructProperties.js";
import { Column } from "../../../../Data/World/Classes/Column.js";
export const ColumnStateStruct = new BinaryStruct("column-tags");
ColumnStateStruct.registerProperty(
  {
    id: WorldDataStructProperties.header,
    type: "header",
    numberType: BinaryNumberTypes.Uint16,
  },
  {
    id: WorldDataStructProperties.dataType,
    type: "header",
    numberType: BinaryNumberTypes.Uint16,
  },
  {
    id: WorldDataStructProperties.dimensionId,
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint16,
  },
  {
    id: WorldDataStructProperties.positionX,
    type: "typed-number",
    numberType: BinaryNumberTypes.Int32,
  },
  {
    id: WorldDataStructProperties.positionY,
    type: "typed-number",
    numberType: BinaryNumberTypes.Int32,
  },
  {
    id: WorldDataStructProperties.positionZ,
    type: "typed-number",
    numberType: BinaryNumberTypes.Int32,
  },
  {
    id: "#dve_last_save_timestamp",
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint32,
  },
  {
    id: "#dve_last_analyzer_update_timestamp",
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint32,
  },
  {
    id: "#dve_has_rich_data",
    type: "boolean",
  },
  {
    id: "#dve_has_entity_data",
    type: "boolean",
  },
  {
    id: "#dve_is_stored",
    type: "boolean",
  },
  {
    id: "#dve_is_world_gen_done",
    type: "boolean",
  },
  {
    id: "#dve_is_world_decor_done",
    type: "boolean",
  },
  {
    id: "#dve_is_world_sun_done",
    type: "boolean",
  },
  {
    id: "#dve_is_world_propagation_done",
    type: "boolean",
  },
  {
    id: "#dve_is_dirty",
    type: "boolean",
  },
  {
    id: "#dve_persistent",
    type: "boolean",
  }
);

export function InitalizeColumnTags() {
  const initData = ColumnStateStruct.init({
    indexBufferMode: "shared",
  });

  Column.StateStruct.init(initData);
}
