import { BinarySchema } from "./BinarySchema";

export class VoxelSceham {
  constructor(
    public id:string,
    public shapeState: BinarySchema,
    public modState: BinarySchema
  ) {}


}
