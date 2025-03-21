import { BinarySchema } from "./Schema/BinarySchema";
import { VoxelSchema } from "./Schema/VoxelSchema";
import { BinarySchemaNodeData, VoxelModelStateSchemaData } from "./State.types";

export class SchemaRegister {
  static modelStaeBaseSchemaData = new Map<
    string,
    VoxelModelStateSchemaData[]
  >();
  static stateSchemaData = new Map<string, BinarySchemaNodeData[]>([
    ["dve_air", []],
  ]);
  static modSchemaData = new Map<string, BinarySchemaNodeData[]>([
    ["dve_air", []],
  ]);
  static modelStaeSchemas = new Map<string, BinarySchema>();
  static voxelModSchemas = new Map<string, BinarySchema>();
  static voxelModelMap = new Map<string, string>([["dve_air", "dve_air"]]);

  static voxelSchemas = new Map<string, VoxelSchema>();

  static hasVoxelSchema(voxelId: string) {
    if (this.voxelSchemas.has(voxelId)) return true;
    if (
      this.stateSchemaData.has(this.voxelModelMap.get(voxelId) || "") &&
      this.modSchemaData.has(voxelId)
    )
      return true;
    return false;
  }

  static getModelSchema(modelId: string) {
    let stateSchema = this.modelStaeSchemas.get(modelId);
    if (!stateSchema) {
      const schemaData = this.stateSchemaData.get(modelId);
      if (!schemaData) throw new Error(`Model ${modelId} is not registered`);
      stateSchema = new BinarySchema(schemaData);
    }

    return stateSchema;
  }

  static getVoxelModSchema(voxelId: string) {
    let modSchema = this.voxelModSchemas.get(voxelId);
    if (!modSchema) {
      const schemaData = this.modSchemaData.get(voxelId);
      if (!schemaData)
        throw new Error(`Voxel mod sceham [${voxelId}] is not registered`);
      modSchema = new BinarySchema(schemaData);
    }

    return modSchema;
  }

  static getVoxelSchemas(voxelId: string) {
    if (this.voxelSchemas.has(voxelId)) {
      return this.voxelSchemas.get(voxelId)!;
    }

    const modelId = this.voxelModelMap.get(voxelId);
    if (!modelId) throw new Error(`Voxel ${voxelId} is not registered`);
    let stateSchema = this.modelStaeSchemas.get(modelId);
    if (!stateSchema) {
      const schemaData = this.stateSchemaData.get(modelId);
      if (!schemaData) throw new Error(`Model ${modelId} is not registered`);
      stateSchema = new BinarySchema(schemaData);
    }

    let modSchema = this.voxelModSchemas.get(voxelId);
    if (!modSchema) {
      const schemaData = this.modSchemaData.get(voxelId);
      if (!schemaData) throw new Error(`Voxel ${voxelId} is not registered`);
      modSchema = new BinarySchema(schemaData);
    }

    const voxelSchema = new VoxelSchema(voxelId, stateSchema, modSchema);

    this.voxelSchemas.set(voxelId, voxelSchema);

    return voxelSchema;
  }

  static registerModel(id: string, data: VoxelModelStateSchemaData[]) {
    const binaryData: BinarySchemaNodeData[] = [];

    this.modelStaeBaseSchemaData.set(id, data);
    for (const node of data) {
      if (node.type == "binary") {
        binaryData.push(node);
      }
    }
    this.stateSchemaData.set(id, binaryData);
  }

  static registerVoxel(
    id: string,
    modelId: string,
    data: VoxelModelStateSchemaData[]
  ) {
    this.voxelModelMap.set(id, modelId);
    const binaryData: BinarySchemaNodeData[] = [];
    for (const node of data) {
      if (node.type == "binary") {
        binaryData.push(node);
      }
    }
    this.modSchemaData.set(id, binaryData);
  }
}
