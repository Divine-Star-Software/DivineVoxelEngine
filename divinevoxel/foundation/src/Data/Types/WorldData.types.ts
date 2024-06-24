export class AddVoxelData {
  static Create(data: Partial<AddVoxelData>) {
    return new AddVoxelData(
      data.id,
      data.state,
      data.shapeState,
      data.level,
      data.levelState,
      data.secondaryVoxelId,
      data.secondaryState
      
    );
  }
  private constructor(
    public id: string = "dve_air",
    public state: number = 0,
    public shapeState: number = 0,
    public level: number = 0,
    public levelState: number = 0,
    public secondaryVoxelId: string = "dve_air",
    public secondaryState: number = 0
  ) {}
}
