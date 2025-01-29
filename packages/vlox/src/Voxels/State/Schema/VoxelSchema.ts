import { BinarySchema } from "./BinarySchema";

export class VoxelSchema {
  constructor(
    public id: string,
    public state: BinarySchema,
    public mod: BinarySchema
  ) {}
}
