

 export type DimensionSyncData = {
  id: string;
  index: number;
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
