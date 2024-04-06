export abstract class URIMeshBase{
 

  abstract setIndicies(indicies: ArrayLike<number>): void;
  abstract getIndicies() : ArrayLike<number>;
  abstract setVertexData(id: string, data: ArrayLike<number>, stride: number, ): void;
  abstract getVertexData(id: string): ArrayLike<number>;
  abstract clearCachedData() : void;
}
