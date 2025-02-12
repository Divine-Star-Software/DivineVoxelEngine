import { TextureData } from "@divinevoxel/vlox/Textures/Texture.types";
export const Textures: TextureData[] = [
  {
    id: "dve_debug_box",
    atlas: {
      tiles: [2, 3],
      namedTiles: [
        {
          id: "top",
          index: [0, 0],
        },
        {
          id: "bottom",
          index: [1, 0],
        },
        {
          id: "north",
          index: [0, 1],
        },
        {
          id: "south",
          index: [1, 1],
        },
        {
          id: "east",
          index: [0, 2],
        },
        {
          id: "west",
          index: [1, 2],
        },
      ],
    },
  },
  {
    id: "dve_candle",
    atlas: {
      tiles: [2, 2],
      namedTiles: [
        {
          id: "default",
          index: [0, 0],
        },
        {
          id: "lit",
          index: [1, 0],
        },
      ],
    },
  },
  {
    id: "dve_dream_stone",
    atlas: {
      tiles: [2, 2],
      namedTiles: [
        {
          id: "default",
          index: [0, 0],
        },
        {
          id: "grassy-side",
          index: [1, 0],
        },
        {
          id: "grassy-top",
          index: [1, 0],
        },
      ],
    },
  },
  {
    id: "dve_lever",
  },
  {
    id: "dve_dread_stone",
    atlas: {
      tiles: [2, 2],
      namedTiles: [
        {
          id: "default",
          index: [0, 0],
        },
        {
          id: "grassy-side",
          index: [1, 0],
        },
        {
          id: "grassy-top",
          index: [1, 0],
        },
      ],
    },
  },
  {
    id: "dve_data_holder",
    atlas: {
      tiles: [2, 2],
      namedTiles: [
        {
          id: "default",
          index: [0, 0],
        },
        {
          id: "font",
          index: [1, 0],
        },
      ],
    },
  },
  {
    id: "dve_dream_grass_block",
  },
  {
    id: "dve_dream_stone_pillar",
    atlas: {
      tiles: [2, 2],
      namedTiles: [
        {
          id: "top",
          index: [0, 0],
        },
        {
          id: "default",
          index: [1, 0],
        },
        {
          id: "side-top",
          index: [0, 1],
        },
        {
          id: "side-bottom",
          index: [1, 1],
        },
      ],
    },
  },
  {
    id: "dve_dread_stone_pillar",
    atlas: {
      tiles: [2, 2],
      namedTiles: [
        {
          id: "top",
          index: [0, 0],
        },
        {
          id: "default",
          index: [1, 0],
        },
        {
          id: "side-top",
          index: [0, 1],
        },
        {
          id: "side-bottom",
          index: [1, 1],
        },
      ],
    },
  },
  {
    id: "dve_dream_lamp",
  },
  {
    id: "dve_dread_lamp",
  },
  {
    id: "dve_dream_log",
  },
  {
    id: "dve_dream_grass",
  },
  {
    id: "dve_dread_grass",
  },
  {
    id: "dve_dream_vine",
  },
  {
    id: "dve_dream_leaves",
  },
  {
    id: "dve_liquid_dream_ether",
    variations: [
      {
        id: "still",
        atlas: {
          tiles: [1, 6],
        },
        animated: {
          frameTime: 100,
          pingPong: true,
        },
      },
    ],
  },
  {
    id: "dve_liquid_dread_ether",
    variations: [
      {
        id: "still",
        atlas: {
          tiles: [1, 6],
        },
        animated: {
          frameTime: 100,
          pingPong: true,
        },
      },
    ],
  },
  {
    id: "dve_foam",
    atlas: {
      tiles: [4, 3],
      namedTiles: [
        {
          id: "top",
          index: [0, 0],
        },
        {
          id: "corner-top-right",
          index: [1, 0],
        },
        {
          id: "corner-top-left",
          index: [2, 0],
        },
        {
          id: "corner-top-left-top-right",
          index: [3, 0],
        },
        {
          id: "bottom",
          index: [0, 1],
        },
        {
          id: "corner-bottom-right",
          index: [1, 1],
        },
        {
          id: "corner-bottom-left",
          index: [2, 1],
        },
        {
          id: "corner-bottom-left-bottom-right",
          index: [3, 1],
        },
        {
          id: "right",
          index: [0, 2],
        },
        {
          id: "left",
          index: [1, 2],
        },
      ],
    },
  },
];
