export type IWGGeneratorData = {
  id: string;
  positionWatch:
    | number[]
    | Float32Array
    | Float64Array
    | Int32Array
    | Int16Array;
  velocityWatch?:
    | number[]
    | Float32Array
    | Float64Array
    | Int32Array
    | Int16Array;
  velocityScale?: number;
} & IWGSettignsData;

export type IWGSettignsData = {
  renderDistance: number;
  generateDistance: number;
  saveWorldData?: boolean;
  maxDistance?: number;
  generateLeadDistance?: number;
  anaylzerDistance?: number;
};



export enum IWGTasksTypes {
  WorldGen = "world-gen",
  Rendering = "rendering",
  Saving = "saving",
  Updating = "updating",
}
