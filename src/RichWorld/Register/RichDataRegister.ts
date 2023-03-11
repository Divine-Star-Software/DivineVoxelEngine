import type {

 RichColumn,
 RichRegion,
 RichWorldDimensions,
} from "Meta/Data/RichWorldData.types.js";
import type { LocationData, LocationNode } from "voxelspaces";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";

export const RichDataRegister = {
 _dimensions: <RichWorldDimensions>new Map(),

 dimensions: {
  get(dimensionId: string) {
   const dimension = RichDataRegister._dimensions.get(dimensionId);
   if (!dimension) return false;
   return dimension;
  },
  add(dimensionId: string) {
   const newdimension = new Map();
   RichDataRegister._dimensions.set(dimensionId, newdimension);
   return newdimension;
  },
 },

 region: {
  _getRegionData(): RichRegion {
   return {
    columns: new Map(),
   };
  },
  add(location: LocationData) {
   let dimension = RichDataRegister.dimensions.get(location[0]);
   if (!dimension) {
    dimension = RichDataRegister.dimensions.add(location[0]);
   }
   const region = this._getRegionData();
   dimension.set(WorldSpaces.region.getKeyLocation(location), region);
   return region;
  },
  get(location: LocationData) {
   const dimension = RichDataRegister.dimensions.get(location[0]);
   if (!dimension) return false;
   const region = dimension.get(WorldSpaces.region.getKeyLocation(location));
   if (!region) return false;
   return region;
  },
  remove(location: LocationData) {
   const dimension = RichDataRegister.dimensions.get(location[0]);
   if (!dimension) return false;
   const key = WorldSpaces.region.getKeyLocation(location);
   const region = dimension.get(key);
   if (!region) return false;
   dimension.delete(key);
   return region;
  },
 },
 column: {
  _getColumnData(): RichColumn {
   return {
    data: {}
   };
  },
  add(location: LocationData) {
   let region = RichDataRegister.region.get(location);
   if (!region) {
    region = RichDataRegister.region.add(location);
   }
   const column = this._getColumnData();
   region.columns.set(WorldSpaces.column.getKeyLocation(location), column);
   return column;
  },
  get(location: LocationData) {
   const region = RichDataRegister.region.get(location);
   if (!region) return false;
   const column = region.columns.get(
    WorldSpaces.column.getKeyLocation(location)
   );
   if (!column) return false;
   return column;
  },
  remove(location: LocationData) {
   const region = RichDataRegister.region.get(location);
   if (!region) return false;
   const key = WorldSpaces.column.getKeyLocation(location);
   const column = region.columns.get(key);
   if (!column) return false;
   region.columns.delete(key);
   return column;
  },
 },
 getKey(location : LocationData) {
    return `${WorldSpaces.chunk.getKeyLocation(
        location
       )}_${WorldSpaces.voxel.getKeyLocation(location)}`;
 }
};
