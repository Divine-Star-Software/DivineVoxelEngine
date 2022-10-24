/*
export const DebugItemShape: ItemShapeData = {
 id: "debug",
 faces: [
  {
   dimensions: [0.5, 0.5, 0.5],
   uvs: [0, 1, 0, 1],
   direction: "top",
   position: [0.5, 0.5, 0.5],
  },
  {
   dimensions: [0.5, 0.5, 0.5],
   uvs: [0, 1, 0, 1],
   direction: "bottom",
   position: [0.5, 0.5, 0.5],
  },
  {
   dimensions: [0.5, 0.5, 0.5],
   uvs: [0, 1, 0, 1],
   direction: "east",
   position: [0.5, 0.5, 0.5],
  },
  {
   dimensions: [0.5, 0.5, 0.5],
   uvs: [0, 1, 0, 1],
   direction: "west",
   position: [0.5, 0.5, 0.5],
  },
  {
   dimensions: [0.5, 0.5, 0.5],
   uvs: [0, 1, 0, 1],
   direction: "north",
   position: [0.5, 0.5, 0.5],
  },
  {
   dimensions: [0.5, 0.5, 0.5],
   uvs: [0, 1, 0, 1],
   direction: "south",
   position: [0.5, 0.5, 0.5],
  },
 ],
};
 */
export const DebugItemShape = {
    id: "debug",
    faces: [
        {
            direction: "south",
            uvs: [0, 1, 0, 1],
            dimensions: [0.5, 0, 0.5],
            position: [0.5, 0.5, -1 / 16],
        },
        {
            direction: "north",
            uvs: [0, 1, 0, 1],
            dimensions: [0.5, 0, 0.5],
            position: [0.5, 0.5, 1 / 16],
        },
        {
            direction: "top",
            uvs: [0, 1, 0, 0.0625],
            dimensions: [0.5, 0.0625, 0],
            position: [0.5, 1, 0],
        },
        {
            direction: "west",
            uvs: [0, 0.0625, 0, 1],
            dimensions: [0, 0.0625, 0.5],
            position: [0, 0.5, 0],
        },
        {
            direction: "east",
            uvs: [0.9375, 1, 0, 1],
            dimensions: [0, 0.0625, 0.5],
            position: [1, 0.5, 0],
        },
        {
            direction: "bottom",
            uvs: [0, 1, 0.9375, 1],
            dimensions: [0.5, 0.0625, 0],
            position: [0.5, 0, 0],
        },
    ],
};
