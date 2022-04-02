type WorldsData = {
 sectionTitle: string;
 sectionDescription: string;
 worlds: { title: string; description: string; world: string }[];
}[];

export const Worlds: WorldsData = [
 {
  sectionTitle: "Worlds",
  sectionDescription: "Simple example worlds to explore.",
  worlds: [
   {
    title: "World 1",
    description: "World 1",
    world: "World1",
   },
   {
    title: "World 2",
    description: "World 2",
    world: "World2",
   },
  ],
 },
 {
    sectionTitle: "Games",
    sectionDescription: "Simple example games made with the engine.",
    worlds: [
     {
      title: "Runner Demo",
      description: "Run a long a long hallway and try to fall into the liquid.",
      world: "RunnerTest",
     },
    ],
   },
 {
  sectionTitle: "Tests",
  sectionDescription: "Worlds used for testing purposes.",
  worlds: [
   {
    title: "Shape Test",
    description: "Used to work on different voxel shapes.",
    world: "ShapeTest",
   },
   {
    title: "Ocean Test",
    description: "Used to test out fluid voxels.",
    world: "OceanTest",
   },
   {
    title: "Sun Light Test",
    description: "Used to test sun light.",
    world: "SunLightTest",
   },
   {
    title: "Lit Fluid Test",
    description: "Used to test the lighting of fluid voxels.",
    world: "LitFluidTest",
   },
   {
    title: "Light Update Test",
    description: "Used to test light updates on voxel add/remove.",
    world: "LitFluidTest",
   },
   {
    title: "Massive Light Test",
    description: "Used to test a lot of light souces.",
    world: "LightTest",
   },
   {
    title: "Light Debug Test",
    description: "Used to debug light gradient issues.",
    world: "LightDebugTest",
   },
  ],
 },
];
