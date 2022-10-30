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
    description: `A dream like location filled with liquid dream ether. 
    You can break and place voxels.`,
    world: "DreamSpace",
   },
   {
    title: "Dream Space 2",
    description: "A dream space with light.",
    world: "DreamSpace2",
   },
   {
    title: "Dread Space",
    description: "A world with red light.",
    world: "DreadSpace",
   },
   {
    title: "Simple",
    description: `A simple 9 chunk area with different voxel types.`,
    world: "Simple",
   },
   {
    title: "Noise World",
    description: `A world generated using perlin noise.`,
    world: "NoiseWorld",
   },
  ],
 },
 {
  sectionTitle: "Games",
  sectionDescription: "Simple example games made with the engine.",
  worlds: [
   {
    title: "Runner Demo",
    description:
     "Run along a long hallway and try not to fall into the liquid.",
    world: "RunnerTest",
   },
  ],
 },
 {
  sectionTitle: "Tests",
  sectionDescription: "Worlds used for testing purposes.",
  worlds: [
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
    title: "Lit Fluid Test",
    description: "Used to test the lighting of fluid voxels.",
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
    description: "Used to test out fluid voxels.",
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
