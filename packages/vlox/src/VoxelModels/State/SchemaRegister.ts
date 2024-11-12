import { BinarySchema } from "./Schema/BinarySchema";
import { BinarySchemaNodeData, VoxelModelStateSchemaData } from "./State.types";

export class SchemaRegister {
  static modelStaeSchemaData = new Map<string, BinarySchemaNodeData[]>();
  static voxelModSchemaData = new Map<string, BinarySchemaNodeData[]>();
  static modelStaeSchemas = new Map<string, BinarySchema>();
  static voxelModSchemas = new Map<string, BinarySchema>();
  static voxelModelMap = new Map<string, string>();
  static getVoxelSchemas(id: string) {
    const modelId = this.voxelModelMap.get(id);
    if (!modelId) throw new Error(`Voxel with ${id} is not registered`);
    let modelSchema = this.modelStaeSchemas.get(modelId);
    if (!modelSchema) {
      const schemaData = this.modelStaeSchemaData.get(modelId);
      if (!schemaData)
        throw new Error(`Model with ${modelId} is not registered`);
      modelSchema = new BinarySchema(schemaData);
    }

    let voxelSchema = this.voxelModSchemas.get(modelId);
    if (!voxelSchema) {
      const schemaData = this.voxelModSchemaData.get(id);
      if (!schemaData) throw new Error(`Voxel with ${id} is not registered`);
      voxelSchema = new BinarySchema(schemaData);
    }

    return {
      modelSchema,
      voxelSchema,
    };
  }

  static registerModel(id: string, data: VoxelModelStateSchemaData[]) {
    const binaryData: BinarySchemaNodeData[] = [];

    for (const node of data) {
      if (node.type == "binary") {
        binaryData.push(node);
      }
    }
    this.modelStaeSchemaData.set(id, binaryData);
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
    this.voxelModSchemaData.set(id, binaryData);
  }
}
