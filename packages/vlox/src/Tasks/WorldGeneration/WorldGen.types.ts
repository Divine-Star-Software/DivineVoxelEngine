
export type WorldGenInterface = {
  generate(
    dimensionId: number,
    x: number,
    y: number,
    z: number
  ): Promise<any | void>;
  decorate(
    dimensionId: number,
    x: number,
    y: number,
    z: number
  ): Promise<any | void>;
};
