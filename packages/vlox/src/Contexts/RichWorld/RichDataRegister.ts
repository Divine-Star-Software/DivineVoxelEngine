import type {
  RichColumn,
  RichRegion,
  RichWorldDimensions,
} from "../../Data/Types/RichWorldData.types";
import type { LocationData } from "../../Math";
import { WorldSpaces } from "../../Data/World/WorldSpaces.js";

export class RichDataRegister {
  _dimensions: RichWorldDimensions = new Map([["main", new Map()]]);

  releaeeAll() {
    this._dimensions.clear();
    this._dimensions = new Map([["main", new Map()]]);
  }

  dimensions = {
    get: (dimensionId: string) => {
      const dimension = this._dimensions.get(dimensionId);
      if (!dimension) return false;
      return dimension;
    },
    add: (dimensionId: string) => {
      const newdimension = new Map();
      this._dimensions.set(dimensionId, newdimension);
      return newdimension;
    },
  };

  region = {
    _getRegionData(): RichRegion {
      return {
        columns: new Map(),
      };
    },
    add: (location: LocationData) => {
      let dimension = this.dimensions.get(location[0]);
      if (!dimension) {
        dimension = this.dimensions.add(location[0]);
      }
      const region = this.region._getRegionData();
      dimension.set(
        WorldSpaces.region.getKeyXYZ(location[1], location[2], location[3]),
        region
      );
      return region;
    },
    get: (location: LocationData) => {
      const dimension = this.dimensions.get(location[0]);
      if (!dimension) return false;
      const region = dimension.get(
        WorldSpaces.region.getKeyXYZ(location[1], location[2], location[3])
      );
      if (!region) return false;
      return region;
    },
    remove: (location: LocationData) => {
      const dimension = this.dimensions.get(location[0]);
      if (!dimension) return false;
      const key = WorldSpaces.region.getKeyXYZ(
        location[1],
        location[2],
        location[3]
      );
      const region = dimension.get(key);
      if (!region) return false;
      dimension.delete(key);
      return region;
    },
  };
  column = {
    _getColumnData(): RichColumn {
      return {
        data: {
          voxels: {},
        },
      };
    },
    add: (location: LocationData) => {
      let region = this.region.get(location);
      if (!region) {
        region = this.region.add(location);
      }

      const column = this.column._getColumnData();
      region.columns.set(
        WorldSpaces.column.getKeyXYZ(location[1], location[2], location[3]),
        column
      );
      return column;
    },
    get: (location: LocationData) => {
      const region = this.region.get(location);
      if (!region) return false;
      const column = region.columns.get(
        WorldSpaces.column.getKeyXYZ(location[1], location[2], location[3])
      );
      if (!column) return false;
      return column;
    },
    update: (location: LocationData, data: any) => {
      const region = this.region.get(location);
      if (!region) return false;
      const column = region.columns.get(
        WorldSpaces.column.getKeyXYZ(location[1], location[2], location[3])
      );
      if (!column) return false;
      column.data = data;
    },
    remove: (location: LocationData) => {
      const region = this.region.get(location);
      if (!region) return false;
      const key = WorldSpaces.column.getKeyXYZ(
        location[1],
        location[2],
        location[3]
      );
      const column = region.columns.get(key);
      if (!column) return false;
      region.columns.delete(key);
      if (region.columns.size == 0) {
        this.region.remove(location);
      }
      return column;
    },
  };
  getKey(location: LocationData) {
    return `${WorldSpaces.chunk.getKeyXYZ(
      location[1],
      location[2],
      location[3]
    )}_${WorldSpaces.voxel.getKeyXYZ(location[1], location[2], location[3])}`;
  }
}
