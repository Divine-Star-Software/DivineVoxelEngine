export abstract class VoxelShapeBase {
  abstract id: string;
  numberId: number = -Infinity;

  abstract init(): void;
}
