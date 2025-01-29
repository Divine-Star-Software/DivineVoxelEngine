
export type DimensionOptions = {
  liquidFlowSpeed: number;
  magmaFlowSpeed: number;
  sunLight: boolean;
 };
 export type DimensionData = {
  id: string;
  options: DimensionOptions;
 };
 
 

export type RichDataSchema = Record<string, Record<string, any>>;

export type RichSector =  {
 data: RichDataSchema
}

export type RichRegion = {
 sectors: Map<string, RichSector>;
};
export type RichWorldDimensions = Map<string, Map<string, RichRegion>>;

export type SetRichVoxel = [
 id: string,
 dimesnion: string,
 x: number,
 y: number,
 z: number
];
