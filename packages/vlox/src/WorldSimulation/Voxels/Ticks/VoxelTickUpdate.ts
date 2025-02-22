export class VoxelTickUpdate<Data extends any = null> {
  constructor(
    public type: string,
    public x: number,
    public y: number,
    public z: number,
    public data: Data
  ) {}
}
