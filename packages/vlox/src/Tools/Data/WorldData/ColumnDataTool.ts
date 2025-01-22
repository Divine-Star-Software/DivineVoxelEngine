//objects
import { WorldRegister } from "../../../Data/World/WorldRegister.js";
import { DataToolBase } from "../../Classes/DataToolBase.js";
import { Column } from "../../../Data/World/Classes/Column.js";


export class ColumnDataTool extends DataToolBase {
  struct = Column.StateStruct;
  _column = <Column>{};

  loadIn() {
    WorldRegister.instance.setDimension(this.dimension);
    const column = WorldRegister.instance.column.get(this.x, this.y, this.z);
    if (!column) return false;
    this.struct.setBuffer(column.columnState);
    this._c = column.columnState;
    this._column = column;
    return true;
  }

  setColumn(column: Column) {
    this.struct.setBuffer(column.columnState);
    this._c = column.columnState;
    this._column = column;
    return this;
  }

  getColumn() {
    return this._column;
  }

  getNumChunks() {
    return this._column.chunks.length;
  }

  getBufferSizeForWholeColumn() {
    return (
      Column.StateStruct.structSize +
      Column.StateStruct.structSize * this.getNumChunks()
    );
  }

  isStored() {
    return this.getStructValue("dve_is_stored") == 1;
  }

  markAsNotStored() {
    this.setTagValue("dve_is_stored", 0);
    return this;
  }

  markAsStored() {
    this.setTagValue("dve_is_stored", 1);
    return this;
  }

  isPersistent() {
    return this.getStructValue("dve_persistent") == 1;
  }

  setPersistence(value: boolean) {
    this.setTagValue("dve_persistent", value ? 1 : 0);
  }

  isDirty() {
    return this.getStructValue("dve_is_dirty") == 1;
  }

  setDirty(value: boolean) {
    this.setTagValue("dve_is_dirty", value ? 1 : 0);
  }

  getLastSaveTimestamp() {
    return this.getStructValue("dve_last_save_timestamp");
  }

  setLastSaveTimestamp() {
    return this.setTagValue("dve_last_save_timestamp", Date.now());
  }

  getLastAnalyzerUpdateTimestamp() {
    return this.getStructValue("dve_last_analyzer_update_timestamp");
  }

  setLastAnalyzerUpdateTimestamp() {
    return this.setTagValue("dve_last_analyzer_update_timestamp", Date.now());
  }

  hasRichData() {
    return this.getStructValue("dve_has_rich_data") == 1;
  }

  setRichData(value: boolean) {
    this.setTagValue("dve_has_rich_data", value ? 1 : 0);
  }

  hasEntityData() {
    return this.getStructValue("dve_has_entity_data") == 1;
  }

  setEntityData(value: boolean) {
    this.setTagValue("dve_has_entity_data", value ? 1 : 0);
  }
}
