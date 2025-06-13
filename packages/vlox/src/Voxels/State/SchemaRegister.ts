import { BinarySchema } from "./Schema/BinarySchema";
import { VoxelSchema } from "./Schema/VoxelSchema";
import {
  VoxelStateSchemaData,
  VoxelBinaryStateSchemaNode,
} from "./State.types";

export class SchemaRegister {
  static modelStaeBaseSchemaData = new Map<string, VoxelStateSchemaData>();
  static stateSchemaData = new Map<string, VoxelBinaryStateSchemaNode[]>([
    ["dve_air", []],
  ]);
  static modSchemaData = new Map<string, VoxelBinaryStateSchemaNode[]>([
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

  static registerModel(id: string, data: VoxelStateSchemaData) {
    this.modelStaeBaseSchemaData.set(id, data);
    this.stateSchemaData.set(id, data.binary);
  }

  static registerVoxel(
    id: string,
    modelId: string,
    data: VoxelStateSchemaData
  ) {
    this.voxelModelMap.set(id, modelId);
    this.modSchemaData.set(id, data.binary);
  }
}
