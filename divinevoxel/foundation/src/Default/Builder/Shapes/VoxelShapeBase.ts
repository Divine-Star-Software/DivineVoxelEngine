export abstract class VoxelShapeBase {
  abstract id: string;
  numberId: number = -1;

  abstract init(): void;
}
