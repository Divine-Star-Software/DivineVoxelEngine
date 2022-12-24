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
    title: "Dream Space",
    description: `Explore a world and break/add voxels.`,
    world: "DreamSpace",
   },
   {
    title: "Dream Fountian",
    description: "A dream space with purple light.",
    world: "DreamSpace2",
   },
   {
    title: "Dread Fountian",
    description: "A a dream space red light.",
    world: "DreadSpace",
   },
   {
    title: "Temple",
    description: `A simple temple like structure.`,
    world: "Simple",
   },
   {
    title: "Noise World",
    description: `A world generated using perlin noise.`,
    world: "NoiseWorld",
   },
   {
    title: "Dream Space Classic",
    description: `The origional DVE example world.`,
    world: "DreamSpaceClassic",
   },
  ],
 },
 {
  sectionTitle: "Games",
  sectionDescription: "Simple example games made with the engine.",
  worlds: [
   {
    title: "Dream Space Infinite",
    description: "An infinite dream space.",
    world: "DreamSpaceInfinite",
   },
   {
    title: "Runner",
    description: "",
    world: "RunnerTest",
   },
  ],
 },
 {
  sectionTitle: "Tests",
  sectionDescription: "Worlds used for testing purposes.",
  worlds: [
   {
    title: "Infinite World Gen Test",
    description: "Used to test infinite world generation.",
    world: "InfiniteWorldGenTest",
   },
   {
    title: "Server Test",
    description: "Used to test Divine Voxel Engine Server.",
    world: "ServerTest",
   },
   {
    title: "Break/Add Testing",
    description: "Used to debug breaking/adding voxels.",
    world: "BreakAddTest",
   },
   {
    title: "Debug",
    description: "For some basic debugging.",
    world: "Debug",
   },
   {
    title: "Rich Data Test",
    description: "Used to test rich data",
    world: "RichDatatTest",
   },
   {
    title: "Shape Test",
    description: "Used to test shapes and shape states.",
    world: "ShapeTest",
   },
   {
    title: "Water/Magma Flow Test",
    description: "Used to test water and magma flow.",
    world: "WaterFlowTest",
   },
   {
    title: "World Gen Test",
    description: "Used to test multi-threading world generating.",
    world: "WorldGenTest",
   },
   {
    title: "Data Test",
    description: "Used to test loading in voxel data.",
    world: "DataTest",
   },
   {
    title: "Physics Test",
    description: "Used to test physics.",
    world: "PhysicsTest",
   },
   {
    title: "Light Debug Test",
    description: "Used to debug light gradient issues.",
    world: "LightDebugTest",
   },
   {
    title: "Lit Liquid Test",
    description: "Used to test the lighting of liquid voxels.",
    world: "LitFluidTest",
   },

   {
    title: "Huge Light Test",
    description: "Used to test a lot of light sources",
    world: "HugeLightTest",
   },
   {
    title: "Constant Light Update Test",
    description: "Used to test a lot of constant light updates.",
    world: "LightTest",
   },
   {
    title: "Nexus & Matrix Test",
    description: "Used to test the Nexus and Matrix parts of the engine.",
    world: "NexusMatrixTest",
   },
   {
    title: "Ocean Test",
    description: "Used to test out liquid voxels.",
    world: "OceanTest",
   },
   {
    title: "Crash Test",
    description: "Used to stress test the engine.",
    world: "CrashTest",
   },
   {
    title: "Standard Material Test",
    description: "Used to test standard material, dynamic lights and shadows.",
    world: "ShadowTest",
   },
  ],
 },
];
