import { BinarySchema } from "./Schema/BinarySchema";
import { VoxelSchema } from "./Schema/VoxelSchema";
import { BinarySchemaNodeData, VoxelModelStateSchemaData } from "./State.types";

export class SchemaRegister {
  static modelStaeBaseSchemaData = new Map<
    string,
    VoxelModelStateSchemaData[]
  >();
  static modelStateSchemaData = new Map<string, BinarySchemaNodeData[]>();
  static voxelModSchemaData = new Map<string, BinarySchemaNodeData[]>();
  static modelStaeSchemas = new Map<string, BinarySchema>();
  static voxelModSchemas = new Map<string, BinarySchema>();
  static voxelModelMap = new Map<string, string>();

  static voxelSchemas = new Map<string, VoxelSchema>();

  static hasVoxelSchema(voxelId:string) {
    return this.voxelSchemas.has(voxelId);
  }

  static getVoxelSchemas(voxelId: string) {
    if (this.voxelSchemas.has(voxelId)) {
      return this.voxelSchemas.get(voxelId)!;
    }

    const modelId = this.voxelModelMap.get(voxelId);
    if (!modelId) throw new Error(`Voxel ${voxelId} is not registered`);
    let shapeStateSchema = this.modelStaeSchemas.get(modelId);
    if (!shapeStateSchema) {
      const schemaData = this.modelStateSchemaData.get(modelId);
      if (!schemaData)
        throw new Error(`Model ${modelId} is not registered`);
      shapeStateSchema = new BinarySchema(schemaData);
    }

    let modSchema = this.voxelModSchemas.get(voxelId);
    if (!modSchema) {
      const schemaData = this.voxelModSchemaData.get(voxelId);
      if (!schemaData)
        throw new Error(`Voxel ${voxelId} is not registered`);
      modSchema = new BinarySchema(schemaData);
    }

    const voxelSchema = new VoxelSchema(voxelId, shapeStateSchema, modSchema);

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
    this.modelStateSchemaData.set(id, binaryData);
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
