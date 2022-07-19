import { CullFaceOverride } from "Meta/Constructor/OverRide.types";
import { VoxelShapeInterface } from "Meta/index";
import { DirectionNames } from "Meta/Util.types";
import { stairBuildData } from "./StairBuilder";

export const StairData: Record<
 number,
 Record<DirectionNames, stairBuildData>
> = {
 0: {
  top: {
   type: "stair-top",
   transform2: {
    x: 0,
    y: -0.5,
    z: 0.5,
   },
  },
  bottom: {
   type: "normal",
  },
  east: {
   type: "side",
   transform2: {
    x: 0,
    y: 0.5,
    z: 0,
   },
  },
  west: {
   type: "side",
   transform2: {
    x: 0,
    y: 0.5,
    z: 0,
   },
  },
  south: {
   type: "normal",
  },
  north: {
   type: "stair-side",
   transform2: {
    x: 0,
    y: 0.5,
    z: -0.5,
   },
  },
 },
 1: {
  top: {
   type: "stair-top",
   _2dDimensionType: true,
   transform2: {
    x: 0.5,
    y: -0.5,
    z: 0,
   },
  },
  bottom: {
   type: "normal",
  },
  east: {
   type: "stair-side",
   transform2: {
    x: -0.5,
    y: 0.5,
    z: 0,
   },
  },
  west: {
   type: "normal",
  },

  south: {
   type: "side",
   _2dDimensionType: true,
   transform2: {
    x: 0,
    y: 0.5,
    z: 0,
   },
  },

  north: {
   type: "side",
   _2dDimensionType: true,
   transform2: {
    x: 0,
    y: 0.5,
    z: 0,
   },
  },
 },

 2: {
  top: {
   type: "stair-top",
   reverse: true,
   transform1: {
    x: 0,
    y: -0.5,
    z: 0,
   },
   transform2: {
    x: 0,
    y: 0,
    z: 0.5,
   },
  },
  bottom: {
   type: "normal",
  },
  east: {
   type: "side",
   transform2: {
    x: 0,
    y: 0.5,
    z: 0.5,
   },
  },
  west: {
   type: "side",
   transform2: {
    x: 0,
    y: 0.5,
    z: 0.5,
   },
  },
  south: {
   type: "stair-side",
   transform2: {
    x: 0,
    y: 0.5,
    z: 0.5,
   },
  },
  north: {
   type: "normal",
  },
 },

 3: {
  top: {
   type: "stair-top",
   _2dDimensionType: true,
   reverse: true,
   transform1: {
    x: 0,
    y: -0.5,
    z: 0,
   },
   transform2: {
    x: 0.5,
    y: 0,
    z: 0,
   },
  },
  bottom: {
   type: "normal",
  },
  east: {
   type: "normal",
  },
  west: {
   type: "stair-side",
   transform2: {
    x: 0.5,
    y: 0.5,
    z: 0,
   },
  },

  south: {
   type: "side",
   _2dDimensionType: true,
   transform2: {
    x: 0.5,
    y: 0.5,
    z: 0,
   },
  },

  north: {
   type: "side",
   _2dDimensionType: true,
   transform2: {
    x: 0.5,
    y: 0.5,
    z: 0,
   },
  },
 },
};

export const exposedChecks: Record<
 number,
 (
  data : CullFaceOverride
 ) => boolean
> = {
 0: (data) => {
  if (data.face == "top" || data.face == "north") {
   return true;
  }
  if (data.neighborVoxelShape.id == "Stair") {
   if (data.face == "east" || data.face == "west") {
    if (data.shapeState == data.neighborVoxelShapeState) return false;
   }
  }
  if (data.face == "bottom" || data.face == "south") {
   if (data.neighborVoxelShape.id == "Box") {
    if (data.shapeState == data.neighborVoxelShapeState) return false;
   }
  }
  return true;
 },
};
