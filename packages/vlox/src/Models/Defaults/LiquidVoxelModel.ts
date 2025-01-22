import { VoxelGeometryData, VoxelModelData } from "../VoxelModel.types";
export type LiquidVoxelModelArgs = {
  stillTexture: number;
  flowTexture: number;
};
export const liquidGeometry: VoxelGeometryData = {
  id: "dve_liquid",
  arguments: {
    stillTexture: {
      type: "texture",
    },
    flowTexture: {
      type: "texture",
    },
  },
  nodes: [
    {
      type: "custom",
      id: "liquid",
      inputs: {
        stillTexture: "@stillTexture",
        flowTexture: "@flowTexture",
      },
    },
  ],
};

export const liquidModel: VoxelModelData = {
  id: "dve_liquid",
  relationsSchema: [],
  shapeStateSchema: [],
  arguments: {
    stillTexture: {
      type: "texture",
    },
    flowTexture: {
      type: "texture",
    },
  },
  shapeStatesConditonalNodes: {},
  shapeStatesNodes: {
    "*": [
      {
        id: "liquid",
        geometryId: "dve_liquid",
        inputs: {
          "@stillTexture": "@stillTexture",
          "@flowTexture": "@flowTexture",
        },
      },
    ],
  },
};
