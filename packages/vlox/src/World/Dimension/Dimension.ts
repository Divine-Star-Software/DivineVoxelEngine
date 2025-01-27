import { Column } from "../Column";

export interface DimensionData {
  id: string;
  columns: Map<string, Column>;
}
export interface Dimension extends DimensionData {}

export class Dimension {
  static CreateNew(id: string) {
    return new Dimension({
      id,
      columns: new Map<string, Column>(),
    });
  }
  constructor(data: DimensionData) {
    return Object.assign(this, data);
  }

  set(columnId: string, region: Column) {
    this.columns.set(columnId, region);
  }
  delete(columnId: string) {
    this.columns.delete(columnId);
  }
  get(columnId: string) {
    return this.columns.get(columnId);
  }
}
