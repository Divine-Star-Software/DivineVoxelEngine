# Getting Started With Divine Voxel Engine

This guide takes you from an existing Babylon.js scene to a generating, rendering
voxel world in the browser. Once it works, the collapsible sections at the bottom
go deeper on each part of the engine (textures, voxels, models, world generation,
and more).

By the end you will have a flat plane of voxels generating around the origin and
rendering in your scene.

## Requirements

This guide assumes you already have the basics in place:

- **A Babylon.js scene.** The engine attaches to a `Scene` you have already
  created — this guide starts from that scene and does not cover Babylon setup
  (canvas, `Engine`, render loop). If you need that, see the
  [Babylon.js docs](https://doc.babylonjs.com/).
- **A bundler that supports module workers.** The setup below creates workers
  with `new Worker(new URL("./path/", import.meta.url), { type: "module" })`.
  This is supported out of the box by Vite and webpack 5. If your bundler does
  not resolve module workers this way, the workers will not load.

## Install

```console
npm install @babylonjs/core
npm install @amodx/suite @divinevoxel/vlox @divinevoxel/vlox-babylon
```

## Setup

The engine is multi-threaded, so a basic setup is split across a few files: a
main file that wires the engine into your scene, and web workers for the world,
generator, and mesher. You supply the engine with texture data, voxel data, and
those workers, and it handles meshing and generation in parallel.

The five files below are the whole setup. They live in a small tree, since the
main file creates each worker by path:

```console
src/
├── index.ts                # main file: wires the engine into your scene
└── Contexts/
    ├── World/
    │   └── index.ts        # world worker
    ├── Generator/
    │   ├── index.ts        # generator worker
    │   └── WorldGen.ts     # your world generator
    └── Mesher/
        └── index.ts        # mesher worker
```

Create each one, then run your app to see the world generate.

### Main file

Wires the engine into an existing scene: creates the web workers, declares one
texture and one voxel, starts the renderer, and tells the world worker to begin.
Call `init` with a Babylon `Scene` you have already created.

```ts
import InitDVErenderer from "@divinevoxel/vlox-babylon/Init/Classic/InitDVEBRClassic";
import { StartRenderer } from "@divinevoxel/vlox/Init/StartRenderer";
import type { TextureData } from "@divinevoxel/vlox/Textures/Texture.types";
import type { VoxelData } from "@divinevoxel/vlox/Voxels";
import type { Scene } from "@babylonjs/core/scene";
import { InitSkybox } from "@divinevoxel/vlox-babylon/Init/Skybox/InitSkybox";
async function init(scene: Scene){
  //create web workers
  const worldWorker = new Worker(
    new URL("./Contexts/World/", import.meta.url),
    {
      type: "module",
    },
  );

  // split the remaining cores between mesher and generator workers
  const cores = navigator.hardwareConcurrency || 4;
  const halfThreads = Math.max(1, Math.ceil((cores - 3) / 2));

  const mesherWorkers: Worker[] = [];
  for (let i = 0; i < halfThreads; i++) {
    mesherWorkers.push(
      new Worker(new URL("./Contexts/Mesher/", import.meta.url), {
        type: "module",
      }),
    );
  }
  const generatorWorkers: Worker[] = [];
  for (let i = 0; i < halfThreads; i++) {
    generatorWorkers.push(
      new Worker(new URL("./Contexts/Generator/", import.meta.url), {
        type: "module",
      }),
    );
  }

  //setup texture and voxel data
  const textureData: TextureData = [
       {
        id: "dve_box",
        path: "assets/textures/dve_box.png", // see the Textures section
      },
  ];
  const voxels: VoxelData = [
      {
      id: "dve_box",
      properties: {
        dve_model_data: {
          id: "dve_simple_cube",
          modSchema: [],
          modRelationSchema: [],
          inputs: {
            "*": {
              texture: "dve_box",
            },
          },
        },
      },
      },
  ];


  //init babylon renderer
  const renderer = await InitDVErenderer({
    textureTypes: [],
    substances: [],
    scene: scene,
    textureData
  });

  //init voxel renderer
  const DVER = await StartRenderer({
    renderer,
    worldWorker,
    mesherWorkers,
    generatorWorkers,
    voxels
  });

  InitSkybox({
    renderer,
  });

 //tell the world worker to start
 DVER.threads.world.runTask("start-world", []);

}
```

### World

Runs the world simulation. It starts the world, sets up the simulation with the
worker threads, preloads the starting area, creates a generator at the origin,
and starts the tick loop.

```ts
import { StartWorld } from "@divinevoxel/vlox/Init/StartWorld";
import { WorldSimulation } from "@divinevoxel/vlox/WorldSimulation";
import { TickInterval } from "@divinevoxel/vlox/Util/TickInterval";
import { Threads } from "@amodx/threads";

const DVEW = await StartWorld();

//setup world sim
WorldSimulation.init({
  parent: DVEW.threads.parent,
  meshers: DVEW.threads.meshers,
  generators: DVEW.threads.generators,
});

const tickInterval = new TickInterval(() => WorldSimulation.tick(), 50);

//register task in the world worker to start the world.
Threads.registerTask("start-world", async () => {
  const position = { x: 0, y: 0, z: 0 };
  WorldSimulation.doTickUpdates = false;
  await WorldSimulation.Procedures.InitalLoad({
    genData: {
      position,
      renderRadius: 150,
      generationRadius: 250,
      maxRadius: 300,
    },
  });
  const generator = WorldSimulation.createGenerator({
    position,
    renderRadius: 150,
    generationRadius: 250,
    maxRadius: 300,
  });

  WorldSimulation.addGenerator(generator);
  tickInterval.start();
});
```

### Generator

Registers your world generator on the generator thread and starts it.

```ts
import { StartGenerator } from "@divinevoxel/vlox/Init/StartGenerator";
import { WorldGen } from "./WorldGen";
import { WorldGeneration } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGeneration";
const gen = new WorldGen();
WorldGeneration.setWorldGen(gen);
gen.init();
await StartGenerator({});
```

### World Gen

Your generator. This one paints a flat plane of `dve_box` across each sector at a
fixed height, which is what produces the floor you spawn on. The empty
`decorate` pass leaves it at that.

```ts
import { WorldGeneration } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGeneration";
import { WorldGenInterface } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGen.types";
import { WorldGenBrush } from "@divinevoxel/vlox/Tasks/WorldGeneration/WorldGenBrush";
import { WorldSpaces } from "@divinevoxel/vlox/World/WorldSpaces";

export class WorldGen implements WorldGenInterface {
  static instance: WorldGen;
  brush: WorldGenBrush;
  constructor() {
    if (WorldGen.instance) return WorldGen.instance;
    WorldGen.instance = this;
  }
  init() {
    this.brush = WorldGeneration.getBrush();
  }

  async generate(
    dimension: number,
    cx: number,
    y: number,
    cz: number,
  ): Promise<any> {
    const brush = this.brush;
    brush.start(dimension, cx, y, cz);
    const chunkWidth = WorldSpaces.section.bounds.x;
    const chunkDepth = WorldSpaces.section.bounds.z;
    const startY = 60;
    brush.setId("dve_box");
    for (let x = cx; x < cx + chunkWidth; x++) {
      for (let z = cz; z < cz + chunkDepth; z++) {
        brush.setXYZ(x, startY + y, z)!.paint();
      }
    }

    brush.stop();
  }

  async decorate(
    dimension: number,
    cx: number,
    y: number,
    cz: number,
  ): Promise<any> {}
}
```

### Mesher

Starts the mesher, which turns generated voxels into renderable meshes. No setup
needed.

```ts
import { StartMesher } from "@divinevoxel/vlox/Init/StartMesher";
await StartMesher({});
```

<details>
  <summary>Textures</summary>

Every voxel references textures by id. You supply textures in the `textureData`
array passed to `InitDVErenderer`, and the engine combines them into a single
texture to render from.

The simplest texture is just an id and either a path or a base64 string. If no `basePath` is provided the engine defaults to `assets/textures`.

### A single texture

```ts
const textureData: TextureData = [
  {
    id: "dve_box",
    // Load from a file. The engine looks for the image using the id/path.
    path: "assets/textures/dve_box.png",
  },
];
```

You can also inline the image as base64 instead of loading a file.

```ts
{
  id: "dve_box",
  base64: "data:image/png;base64,iVBORw0KGgo...",
}
```


### Referencing a texture from a voxel

Once registered, a voxel points at the texture by its id (this is the `texture`
input you saw in the setup code):

```ts
inputs: {
  "*": { texture: "dve_box" },
}
```

### Atlases

If one image contains multiple tiles, describe it as an atlas by giving the tile
grid. You can then reference individual tiles.

```ts
{
  id: "dve_stone",
  path: "assets/textures/dve_stone.png",
  atlas: {
    tiles: [4, 4], // 4x4 grid of tiles
  },
}
```

To make specific tiles easy to use, name them. A named tile is referenced by
appending `:` and the name to the texture id such as `dve_dream_stone:grassy-top`:

```ts
{
  id: "dve_dream_stone",
  path: "assets/textures/dve_dream_stone.png",
  atlas: {
    tiles: [4, 4],
    namedTiles: [
      { id: "grassy-top", index: [0, 0] },
      { id: "side",       index: [1, 0] },
    ],
  },
}
```

### Variations

A texture can hold multiple variations under one id.

```ts
{
  id: "dve_liquid_dream_ether",
  variations: [
    {
      id: "still",
      atlas: {
        tiles: [1, 6],
      },
      animated: {
        frameTime: 100, // ms per frame
        pingPong: true,
      },
    },
    {
      id: "flowing",
      atlas: {
        tiles: [1, 6],
      },
      animated: {
        frameTime: 100, // ms per frame
        pingPong: true,
      },
    },
  ],
}
```

Texture ids: `dve_liquid_dream_ether:still` and `dve_liquid_dream_ether:flowing`

Folder setup:
```console
dve_liquid_dream_ether/
├── still.png      # the "still" variation
└── flowing.png    # the "flowing" variation
```

### Animated textures

Only atlas textures can be animated. Give a `frameTime` and, optionally, the
frames to play:

```ts
{
  id: "dve_water",
  path: "assets/textures/dve_water.png",
  atlas: { tiles: [1, 32] },
  animated: {
    frameTime: 100, // ms per frame
    pingPong: true, // play forwards then backwards
    // frames: [0, 1, 2, 3], // optional: specific frame order/timing
  },
}
```

### Texture types

By default textures are combined into the `dve_voxel` texture. The `type` field
lets you group textures into separate combined textures.

---

For the full set of options — including every field on `TextureData`, see
[Texture.types.ts](https://github.com/Divine-Star-Software/divinevoxel-vlox/blob/main/src/Textures/Texture.types.ts).

</details>
<details>
  <summary>Voxels</summary>

A voxel is registered by adding a `VoxelData` entry to the `voxels` array passed
to `StartRenderer`. At minimum a voxel needs an `id` and some `properties`.

### A minimal voxel

This is the voxel from the setup code. A single cube that uses the built-in
`dve_simple_cube` model and one texture:

```ts
const voxels: VoxelData = [
  {
    id: "dve_box",
    properties: {
      dve_model_data: {
        id: "dve_simple_cube",
        modSchema: [],
        modRelationSchema: [],
        inputs: {
          "*": { texture: "dve_box" },
        },
      },
    },
  },
];
```

### id, name, and title

These three look similar but serve different purposes:

- **`id`**: the permanent, unique identifier. **Do not change it** once voxels
  exist in saved worlds. It's what the engine uses to reference the voxel at
  runtime and what gets stored when world data is archived.
- **`name`**: an optional, unique reference that can change. Can be used in
  runtime code.
- **`title`**: a human-facing display label.

### Properties

`properties` is where a voxel's behavior and appearance are defined. The two you
will use most:

- **`dve_model_data`**: how the voxel looks. Covered in the
  **Models & Geometry** section.
- **`dve_named_states`**: states of a voxel that are named and used for things
  like creating a display index of all the voxels.

Alongside those, `properties` also carries the voxel's **tags** (below), which
control how the voxel looks and behaves in the world.

### Voxel tags

Tags are individual properties set directly on `properties`. None are required.
Set only the ones a voxel needs. They can be accessed at runtime in all threads.
The most common, grouped by what they affect:

**Substance & material**

- **`dve_substance`**: the voxel's substance (e.g. solid or liquid). The voxel
  inherits behavior from its substance, so this is the tag that most changes how
  a voxel acts in the world. Referenced by id. The engine ships built-in
  substances, and you can define your own.
- **`dve_rendered_material`**: which render material the mesh is assigned to.
- **`dve_voxel_material`**: a descriptive material label. Not used by the engine
  directly.

**Appearance**

- **`dve_is_transparent`**: whether light passes through it.
- **`dve_no_ao`**: disables ambient occlusion for this voxel when `true`.

**Light**

- **`dve_is_light_source`**: marks the voxel as emitting light.
- **`dve_light_value`**: the emitted light as `[r, g, b]`.

**Secondary voxels**

- **`dve_can_have_secondary`**: allows a secondary voxel in the same cell (used
  for things like water-logged blocks).

Example of a glowing, solid, collidable voxel:

```ts
{
  id: "dve_dream_lamp",
  properties: {
    dve_substance: "dve_solid",
    dve_collider_id: "dve_cube",
    dve_check_collisions: true,
    dve_voxel_material: "stone",
    dve_is_light_source: true,
    dve_light_value: [15, 0, 15],
    dve_model_data: {
      // ...see Models & Geometry
    },
  },
}
```

### Named states

`dve_named_states` lets a single voxel expose multiple named variations that can
be indexed and referenced individually. Each state has an `id`, an optional
human-facing `name`, and a `display` describing how that state is drawn.

A `display` is one of two kinds.

**Texture display** draws the state from a texture directly:

```ts
display: {
  type: "texture",
  source: "dve_box",
  // textureType: "dve_voxel", // optional: which combined texture to pull from
}
```

**Model display** draws the state using the voxel's model, optionally pinned to
a specific `mod` and `state`:

```ts
display: {
  type: "model",
  mod: "*",
  state: "*",
}
```

Here's a voxel with two named states (see **Voxel State** for what `mod` and
`state` mean):

```ts
{
  id: "dve_dread_stone",
  properties: {
    dve_named_states: [
      {
        id: "dve_dread_stone",
        name: "Dread Stone",
        mod: "grassy=false",
        state: "*",
        properties: {},
        display: { type: "model", mod: "grassy=false", state: "*" },
      },
      {
        id: "dve_grassy_dread_stone",
        name: "Grassy Dread Stone",
        mod: "grassy=true",
        state: "*",
        properties: {},
        display: { type: "model", mod: "grassy=true", state: "*" },
      },
    ],
    dve_model_data: {
    },
  },
}
```

For the full set of options, see
[Voxel.types.ts](https://github.com/Divine-Star-Software/divinevoxel-vlox/blob/main/src/Voxels/Types/Voxel.types.ts) and [VoxelTag.types.ts](https://github.com/Divine-Star-Software/divinevoxel-vlox/blob/main/src/Voxels/Data/VoxelTag.types.ts).

</details>
<details>
  <summary>Voxel State</summary>

A voxel's appearance can change based on its state. That state comes from two
separate layers:

- **State** changes the **model** itself (the geometry). Its schema lives on the
  model.
- **Mod** changes the **inputs** to the model (things like which textures get
  used). Its schema lives on the voxel's `dve_model_data`.

The short version: **state is the model, mod is the inputs to the model.** A
voxel can use either layer, both, or neither.

### State strings

Both layers are described the same way, with a list of named fields packed into
bits:

```ts
{
  name: "rotation",
  bitIndex: 3,
  bitSize: 2,
  values: ["0", "90", "180", "270"],
}
```

`bitSize` sets how many bits the field takes (so how many values fit), and
`values` names each one. Several fields pack together into a single number.

You refer to a specific combination with a **state string** in the form
`name=value,name=value`:

```
placement=down,rotation=90
grassy=true
```

A `*` means "any" or "default" and is used when there is no schema, or to match
every state at once.

### Mod: changing the inputs

Mod state is defined on the voxel's `dve_model_data`. You give a `modSchema`,
then a set of `inputs` for each mod string. The model stays the same; only what
you feed into it changes.

Here `dve_dread_stone` has a single `grassy` mod that swaps which textures the
cube uses:

```ts
dve_model_data: {
  id: "dve_full_texture_cube",
  modSchema: [
    {
      name: "grassy",
      bitIndex: 0,
      bitSize: 1,
      values: ["false", "true"],
    },
  ],
  modRelationSchema: [],
  inputs: {
    "grassy=false": {
      upTex: "dve_dread_stone:default",
      downTex: "dve_dread_stone:default",
      northTex: "dve_dread_stone:default",
      southTex: "dve_dread_stone:default",
      westTex: "dve_dread_stone:default",
      eastTex: "dve_dread_stone:default",
    },
    "grassy=true": {
      upTex: "dve_dread_stone:grassy-top",
      downTex: "dve_dread_stone:default",
      northTex: "dve_dread_stone:grassy-side",
      southTex: "dve_dread_stone:grassy-side",
      westTex: "dve_dread_stone:grassy-side",
      eastTex: "dve_dread_stone:grassy-side",
    },
  },
}
```

Both mod states render the same cube geometry. The only difference is the
textures passed in.

### State: changing the geometry

State is defined on the **model** with a `stateSchema`, and each state string
maps to one or more geometry links in `stateNodes`. This is how a model produces
different geometry for different states.

The built-in `dve_oriented_cube` uses state to place and rotate a cube based on
how it was placed. Its schema has two fields:

```ts
stateSchema: [
  {
    name: "placement",
    bitIndex: 0,
    bitSize: 3,
    values: ["down", "up", "north", "south", "east", "west"],
  },
  {
    name: "rotation",
    bitIndex: 3,
    bitSize: 2,
    values: ["0", "90", "180", "270"],
  },
],
```

Each state string then maps to a geometry link. Two of the entries from
`stateNodes` (the rest follow the same pattern for every placement and rotation):

```ts
stateNodes: {
  "placement=down,rotation=0": [
    {
      geometryId: "dve_cube",
      inputs: {
        upTex: "@upTex",
        upTexRotation: 0,
        downTex: "@downTex",
        downTexRotation: 0,
        northTex: "@northTex",
        southTex: "@southTex",
        eastTex: "@eastTex",
        westTex: "@westTex",
      },
    },
  ],
  "placement=down,rotation=90": [
    {
      geometryId: "dve_cube",
      inputs: {
        upTex: "@upTex",
        upTexRotation: 180,
        // ...same geometry, rotated inputs
      },
    },
  ],
}
```

The `@upTex` values are references to the model's `arguments`, which is how the
voxel's own inputs flow through into the geometry.

### How the layers meet

A `dve_named_states` entry can pin a `mod`, a `state`, or both, and its `display`
points at the combination to draw. This is how a single voxel exposes several
distinct, indexable looks:

```ts
dve_named_states: [
  {
    id: "dve_dread_stone",
    name: "Dread Stone",
    mod: "grassy=false",
    state: "*",
    properties: [],
    display: { type: "model", mod: "grassy=false", state: "*" },
  },
  {
    id: "dve_grassy_dread_stone",
    name: "Grassy Dread Stone",
    mod: "grassy=true",
    state: "*",
    properties: [],
    display: { type: "model", mod: "grassy=true", state: "*" },
  },
]
```

Here `state: "*"` means the geometry does not vary, and only the mod changes.

### Choosing a state on placement

The oriented cube also has a `dve_placing_strategy` that picks which state to
use based on the face the player placed against and the direction they were
facing. Placing strategies are their own topic; for now it is enough to know
that this is what selects a `state` at placement time.

### Advanced: relational state

Both layers also accept a relation schema (`relationsSchema` on the model,
`modRelationSchema` on the voxel) that derives state from neighboring voxels,
using conditions like `same-voxel` or `any-voxel` in a given direction. This is
what drives neighbor-aware looks such as connected blocks. It is left out here
to keep things focused.

For the full set of options, see
[VoxelModel.types.ts](https://github.com/Divine-Star-Software/divinevoxel-vlox/blob/main/src/Voxels/Models/VoxelModel.types.ts) and [State.types.ts](https://github.com/Divine-Star-Software/divinevoxel-vlox/blob/main/src/Voxels/State/State.types.ts).

</details>
<details>
  <summary>Models & Geometry</summary>

A voxel's shape is built from two pieces:

- **Geometry** defines a reusable shape out of boxes, quads, and triangles. It
  does not belong to any one voxel.
- **A model** wires geometry together for a voxel, supplies its inputs, and
  defines the voxel's states.

You will often reuse one geometry (like `dve_cube`) across many models.

### How inputs flow

The most important thing to understand is how a value gets from a voxel down
into the actual geometry. It travels through three levels, and each level pulls
from the one above it using an `@` reference:

```
voxel inputs  ->  model arguments  ->  geometry arguments  ->  geometry
```

- A **geometry** declares `arguments` (like `upTex`) and its nodes reference them
  with `@upTex`.
- A **model** declares its own `arguments`, and when it links a geometry it maps
  the geometry's arguments to either a model argument (`@texture`) or a literal
  value (`0`, `90`).
- A **voxel** supplies the actual values for the model's arguments through the
  `inputs` on its `dve_model_data`.

So `@` always means "pull this from the arguments of the thing one level up."

### Geometry

Geometry is authored in the voxel's local space, where a full voxel runs from
`0` to `1` on each axis. A basic cube spans the whole cell:

```ts
{
  type: "box",
  points: [
    [0, 0, 0],
    [1, 1, 1],
  ],
  faces: {
    up:    { texture: "@upTex",    uv: "@upUvs",    rotation: "@upTexRotation" },
    down:  { texture: "@downTex",  uv: "@downUvs",  rotation: "@downTexRotation" },
    north: { texture: "@northTex", uv: "@northUvs", rotation: "@northTexRotation" },
    south: { texture: "@southTex", uv: "@southUvs", rotation: "@southTexRotation" },
    east:  { texture: "@eastTex",  uv: "@eastUvs",  rotation: "@eastTexRotation" },
    west:  { texture: "@westTex",  uv: "@westUvs",  rotation: "@westTexRotation" },
  },
}
```

There are four node types:

- **`box`**: two corner points and a face per side. The simplest way to build
  cubic and rectangular shapes.
- **`quad`**: four points forming a single face. Good for flat pieces like
  cross-shaped plants or decals.
- **`triangle`**: three points forming one triangle, for fully custom shapes.
- **`custom`**: references another geometry by id with its own inputs.

Each face (or quad, or triangle) takes a `texture`, a `uv`, and an optional
`rotation`. Any of these can be a literal value or an `@` reference to an
argument.

#### Geometry arguments

A geometry lists the inputs it accepts in `arguments`. Each has a type:

- **`texture`**: a texture id.
- **`box-uv`**: a UV box as `[x1, y1, x2, y2]`.
- **`uv`**: a list of UV points for finer control.
- **`int`**, **`float`**, **`boolean`**, **`vector3`**: plain values, each with a
  `default`.
- **`arg-list`**: sets several arguments at once. Whatever value is passed in is
  applied to every argument named in the list. This is how a cube can expose a
  single "set all faces" input on top of its per-face ones.

```ts
arguments: {
  upTex:          { type: "texture" },
  upUvs:          { type: "box-uv", default: [0, 0, 1, 1] },
  upTexRotation:  { type: "int", default: 0 },
  // ...one set per face
}
```

#### Culling and non-cubic shapes

By default the engine culls faces between solid voxels so hidden faces are not
drawn. You can override this per geometry or per face with a `cullingProcedure`
of `default`, `none`, or `transparent`.

For shapes that are not simple cubes, set `doNotBuildRules: true` on the
geometry. Per the type, this keeps the geometry out of the automatic face rules
and falls back to custom inputs, which is what you want for advanced or
non-cubic models.

### Models

A model ties geometry to a voxel. Its core fields:

- **`id`**: the model id, referenced by a voxel's `dve_model_data`.
- **`arguments`**: the inputs the model accepts (the values a voxel supplies).
- **`stateSchema`**: the model's state fields (see **Voxel State**). Use an empty
  array for a model with no geometry states.
- **`stateNodes`**: maps each state string to the geometry it should build.

Here is the built-in `dve_simple_cube`. It takes one `texture` argument and feeds
it to every face of `dve_cube`:

```ts
{
  id: "dve_simple_cube",
  relationsSchema: [],
  stateSchema: [],
  arguments: {
    texture: { type: "texture" },
  },
  conditonalNodes: {},
  properties: {
    dve_placing_strategy: "*",
    dve_full_block: true,
  },
  stateNodes: {
    "*": [
      {
        geometryId: "dve_cube",
        inputs: {
          upTex: "@texture",
          downTex: "@texture",
          northTex: "@texture",
          southTex: "@texture",
          eastTex: "@texture",
          westTex: "@texture",
        },
      },
    ],
  },
}
```

The `"*"` state means the model has no geometry states, so it always builds the
same nodes.

#### Linking geometry

Each entry in `stateNodes` is a geometry link. Besides `geometryId` and
`inputs`, a link can transform the geometry it places:

- **`position`**, **`rotation`**, **`scale`**: move, rotate, and size the
  geometry.
- **`rotationPivot`**: the point to rotate around.
- **`flip`**: mirror on the x, y, or z axis, as `[0 | 1, 0 | 1, 0 | 1]`.
- **`divisor`**: author the transform values in a larger grid (see above).
- **`cullingProcedure`**: override culling for this linked geometry.

Because a model can list several geometry links in one state, you can compose a
voxel out of multiple shapes, each transformed independently.

#### Model defaults and effects

A model can also carry `properties` (default voxel tags applied to any voxel
using it, like `dve_full_block` above) and `effects` for things like particle
emitters. 

### Putting it together

Tracing the minimal `dve_box` voxel through all three levels:

1. The **voxel** sets `dve_model_data.inputs` to `{ "*": { texture: "dve_box" } }`.
   This supplies the model's `texture` argument.
2. The **model** `dve_simple_cube` passes `@texture` into every face argument of
   `dve_cube`.
3. The **geometry** `dve_cube` draws a unit box, using that texture on all six
   faces.

For deeper or non-cubic shapes, look at the built-in models here:
[Models/Defaults](https://github.com/Divine-Star-Software/divinevoxel-vlox/tree/main/src/Voxels/Models/Defaults)

For the full set of options, see
[VoxelModel.types.ts](https://github.com/Divine-Star-Software/divinevoxel-vlox/blob/main/src/Voxels/Models/VoxelModel.types.ts) and [VoxelGeometry.types.ts](https://github.com/Divine-Star-Software/divinevoxel-vlox/blob/main/src/Voxels/Geometry/VoxelGeometry.types.ts).

</details>
<details>
  <summary>World Simulation</summary>

The world simulation is what loads,
generates, and updates the world. It keeps a region of the world active around
one or more generators, moves new sectors through a fixed pipeline, and runs
ongoing updates like world updates and liquid flow.

### Generators

A generator is a loading point in the world. It has a position and a set of
radii, and the simulation keeps sectors loaded and generated around it. Move a
generator (for example, to follow the player) and the world loads in front and
unloads behind. This is what makes the world effectively infinite.

You create a generator with `createGenerator`, then add it with `addGenerator`:

```ts
const generator = WorldSimulation.createGenerator({
  position: { x: 0, y: 0, z: 0 },
  renderRadius: 150,
  generationRadius: 250,
  maxRadius: 300,
});

WorldSimulation.addGenerator(generator);
```

The radii control how far out each kind of work happens:

- **`renderRadius`**: how far out sectors are meshed and rendered.
- **`tickRadius`**: how far out ongoing tick updates run (see Simulation
  behavior below).
- **`generationRadius`**: how far out terrain is generated. This is larger than
  the render radius so terrain exists before it comes into view.
- **`maxRadius`**: the outer bound. Sectors past this are unloaded and saved.

You can run more than one generator at once, and more than one dimension. New
dimensions are added with `WorldSimulation.addDimension(id)`; dimension `0`
exists by default.

### The sector pipeline

As sectors come into range they move through a fixed set of stages in order:

1. **Generation**: the base terrain is created. This is where your world
   generator's `generate` runs.
2. **Decoration**: features are added on top of the base terrain, like trees or
   ores. This is where `decorate` runs.
3. **Sun light**: sunlight is calculated for the sector.
4. **Propagation**: light propagates through and between sectors.
5. **Build**: the sector is meshed so it can be rendered.

Generation and decoration are where the **World Generation** section's brush
code does its work. The remaining stages are handled by the engine.


### The tick loop

All of the above is driven by calling `WorldSimulation.tick()` on an interval.
Each tick advances the pipeline, updates generators, and runs any pending work.
`TickInterval` is a small helper for running it on a timer:

```ts
const tickInterval = new TickInterval(() => WorldSimulation.tick(), 50);
tickInterval.start();
```

Here `50` is the interval in milliseconds. Nothing loads, generates, or updates
unless the tick loop is running.

### Setting it up

The simulation runs in the world worker. The full flow is: start the world, init
the simulation with the worker threads, preload the starting area, create a
generator, then start ticking.

```ts
import { StartWorld } from "@divinevoxel/vlox/Init/StartWorld";
import { WorldSimulation } from "@divinevoxel/vlox/WorldSimulation";
import { TickInterval } from "@divinevoxel/vlox/Util/TickInterval";
import { Threads } from "@amodx/threads";

const DVEW = await StartWorld();

// give the simulation its worker threads
WorldSimulation.init({
  parent: DVEW.threads.parent,
  meshers: DVEW.threads.meshers,
  generators: DVEW.threads.generators,
});

const tickInterval = new TickInterval(() => WorldSimulation.tick(), 50);

Threads.registerTask("start-world", async () => {
  const position = { x: 0, y: 0, z: 0 };
  WorldSimulation.doTickUpdates = false;

  // preload the starting area before the tick loop begins
  await WorldSimulation.Procedures.InitalLoad({
    genData: {
      position,
      renderRadius: 150,
      generationRadius: 250,
      maxRadius: 300,
    },
  });

  const generator = WorldSimulation.createGenerator({
    position,
    renderRadius: 150,
    generationRadius: 250,
    maxRadius: 300,
  });

  WorldSimulation.addGenerator(generator);
  tickInterval.start();
});
```

The `InitalLoad` procedure preloads the area around the starting position so the
world is ready before the first tick. 
### Simulation behavior

`WorldSimulation.doTickUpdates` controls whether voxels run their per-tick
behavior. This is tied to the `dve_simulation_behavior` tag from the **Voxels**
section: when tick updates are on, voxels with a simulation behavior update each
tick, so liquids flow and similar effects run. In the setup above it is turned
off during the initial load and can be turned on once the world is ready.

There is also `doBuildUpdate`, which controls whether sectors are meshed each
tick. 

### Saving & world storage

Saving is pluggable. You implement a small storage interface, hand it to the
engine, and the simulation calls it automatically as sectors move in and out of
range. The engine handles turning a sector into binary data for you, so your
storage only has to move opaque blobs to and from wherever you want to keep them
(IndexedDB, the file system, a server, and so on).

#### The interface

A world storage is any object implementing `WorldStorageInterface`:

```ts
export interface WorldStorageInterface {
  saveSector(location: LocationData): Promise<void>;
  loadSector(location: LocationData): Promise<boolean>;
  unloadSector(location: LocationData): Promise<void>;
}
```

`LocationData` is `[dimension, x, y, z]`. Each sector covers a region of the
world, so a voxel location maps to one sector.

- **`loadSector`**: called when a sector needs to come in. Return `true` if you
  had saved data for it (and imported it), or `false` if there was nothing
  stored, in which case the engine generates the sector fresh.
- **`saveSector`**: write a sector's current data out to your store.
- **`unloadSector`**: the sector is leaving the active area. Typically save it,
  then drop it.


#### Serializing a sector

You do not serialize voxels yourself. The engine exposes binary archive and
import as thread tasks that run on the generators pool:

- `archive-sector-binary` turns a sector into binary data.
- `import-sector-binary` loads binary data back into a sector.

So a storage implementation calls `archive-sector-binary` to get bytes, stores
them under a key, and later calls `import-sector-binary` with the bytes it read
back.

#### Wiring it up

Create your storage, pass it to `StartWorld`, init it, and pass it to
`WorldSimulation.init`:

```ts
const worldStorage = new WorldStorage();

const DVEW = await StartWorld({ worldStorage });

// give the storage the generators pool so it can run the archive tasks
await worldStorage.init("divine-craft", DVEW.threads.generators);

WorldSimulation.init({
  worldStorage,
  parent: DVEW.threads.parent,
  meshers: DVEW.threads.meshers,
  generators: DVEW.threads.generators,
});
```

#### Example: IndexedDB storage

A browser implementation that keeps each sector as a binary blob in IndexedDB.
Sectors are keyed by their sector position:

```ts
const getKey = (location: LocationData) => {
  const pos = WorldSpaces.sector.getPosition(
    location[1],
    location[2],
    location[3],
  );
  return `${location[0]}-${pos.x}-${pos.y}-${pos.z}`;
};

export class WorldStorage implements WorldStorageInterface {
  _dataBase: DataBase;
  _sectors: ObjectStore<any>;
  _threads: ThreadPool;

  async init(databaseName: string, threads: ThreadPool) {
    await IndexDB.init();
    const dataBase = await IndexDB.createOrGetDataBase({
      databaseName,
      objectStores: [{ name: "sectors", schema: [] }],
    });
    this._threads = threads;
    this._dataBase = dataBase;
    this._sectors = await this._dataBase.getObjectStore("sectors");
  }

  async saveSector(location: LocationData): Promise<void> {
    const sector = WorldRegister.sectors.get(
      location[0], location[1], location[2], location[3],
    );
    if (!sector)
      throw new Error(`Could not save a sector that does not exist`);

    // ask the engine to serialize the sector to binary
    const sectorData = await this._threads.runTaskAsync(
      "archive-sector-binary",
      location,
    );
    this._sectors.set(getKey(location), sectorData);
    sector.setStored(true);
  }

  async loadSector(location: LocationData): Promise<boolean> {
    const data = await this._sectors.get(getKey(location));
    if (!data) return false; // nothing stored; let the engine generate it
    await this._threads.runTaskAsync("import-sector-binary", [location, data]);
    return true;
  }

  async unloadSector(location: LocationData): Promise<void> {
    await this.saveSector(location);
    WorldRegister.sectors.remove(
      location[0], location[1], location[2], location[3],
    );
  }
}
```

#### Saving everything at once

To flush the whole loaded world (for example when the player quits), use the
`SaveAllSectors` procedure:

```ts
await WorldSimulation.Procedures.SaveAllSectors();
```


</details>
<details>
  <summary>World Generation</summary>

World generation runs on the generator threads. When the simulation needs a
sector, it hands your generator the sector's position and asks it to fill in
voxels. Generation happens in two passes:

1. **Generate**: lay down the base terrain for a sector on its own.
2. **Decorate**: add features on top, like grass, trees, or ores. By this point
   the base terrain exists, so decoration can read what generate produced and
   build on it.

You paint voxels in both passes with a **brush**.

### The generator interface

A world generator implements two methods, one per pass. Each is given a
dimension and the sector's `x, y, z`:

```ts
export type WorldGenInterface = {
  generate(dimensionId: number, x: number, y: number, z: number): Promise<any | void>;
  decorate(dimensionId: number, x: number, y: number, z: number): Promise<any | void>;
};
```

You register your generator on the generator thread and grab a brush from the
engine:

```ts
export class WorldGen implements WorldGenInterface {
  brush: WorldGenBrush;

  init() {
    this.brush = WorldGeneration.getBrush();
    WorldGeneration.setWorldGen(this);
  }

  async generate(dimension: number, sx: number, sy: number, sz: number) {
    this.brush.start(dimension, sx, sy, sz);
    // ...paint terrain...
    this.brush.stop();
  }

  async decorate(dimension: number, sx: number, sy: number, sz: number) {
    this.brush.start(dimension, sx, sy, sz);
    // ...paint features...
    this.brush.stop();
  }
}
```

Always call `brush.start(dimension, x, y, z)` at the top of a pass to point the
brush at the sector, and `brush.stop()` when you are done.

### The brush

The brush is a small fluent API for placing voxels. You set what to paint, set
where, and call `paint`:

```ts
brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
```

The common calls:

- **`setId(id)`**: the voxel to paint (by id). There is also `setName(name)`.
- **`setXYZ(x, y, z)`**: the position to paint at.
- **`paint()`**: place the current voxel at the current position.
- **`erase()`**: clear the voxel at the current position.
- **`setLevel(n)`**: set the voxel level, used for things like liquid depth.

Every setter returns the brush, so calls chain. Setting a value sticks until you
change it, so you can set an id once and paint it many times in a loop.

### Sector bounds

A pass covers one sector. `WorldSpaces` gives you the sector size so you can loop
over exactly the region you were handed:

```ts
const width = WorldSpaces.sector.bounds.x;
const depth = WorldSpaces.sector.bounds.z;
const height = WorldSpaces.sector.bounds.y;

for (let x = sx; x < sx + width; x++) {
  for (let z = sz; z < sz + depth; z++) {
    // ...
  }
}
```

### Generate: base terrain

The generate pass builds the sector on its own, with no knowledge of its
neighbors. A simple height-mapped terrain using Perlin noise:

```ts
async generate(sx: number, sy: number, sz: number, brush: WorldGenBrush) {
  const width = WorldSpaces.sector.bounds.x;
  const depth = WorldSpaces.sector.bounds.z;

  for (let x = sx; x < sx + width; x++) {
    for (let z = sz; z < sz + depth; z++) {
      const height = this.noiseHeight(x, z); // your noise function
      for (let y = sy; y < height; y++) {
        brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
      }
    }
  }
}
```

### Decorate: reading terrain back

The decorate pass runs after generate, so it can read the voxels already placed
and react to them. Use the brush's `dataCursor` to look at voxels:

```ts
async decorate(sx: number, sy: number, sz: number, brush: WorldGenBrush) {
  const width = WorldSpaces.sector.bounds.x;
  const depth = WorldSpaces.sector.bounds.z;
  const height = WorldSpaces.sector.bounds.y;
  const cursor = brush.dataCursor;

  for (let x = sx; x < sx + width; x++) {
    for (let z = sz; z < sz + depth; z++) {
      for (let y = 0; y < height; y++) {
        const voxel = cursor.getVoxel(x, y, z);

        // put grass on top of exposed stone
        if (voxel?.getStringId() == "dve_dream_stone") {
          const above = cursor.getVoxel(x, y + 1, z);
          if (above?.isAir()) {
            brush.setXYZ(x, y + 1, z).setId("dve_dream_grass").paint();
          }
        }
      }
    }
  }
}
```

The cursor is how the `Forest` biome does everything from growing grass, to
filling low air pockets with liquid, to scattering trees only on top of stone.

`getVoxel` returns a reader with helpers like `isAir()` and `getStringId()`, and
you can also edit a voxel in place. For example, swapping stone for its grassy
mod without repainting:

```ts
const raw = PaintVoxelData.ToRaw(
  PaintVoxelData.Populate({ id: "dve_dream_stone", modString: "grassy=true" }),
)[0];

cursor.getVoxel(x, y, z)!.setId(raw);
```

### Painting states, mods, and levels

Because the brush understands states and mods, you can paint any voxel variant
generation needs. Set an id, then a level for liquids, or a mod string through
`PaintVoxelData` for stateful voxels. Levels are useful for flowing liquids:

```ts
brush.setId("dve_liquid_dream_ether").setLevel(7).setXYZ(x, y, z).paint();
```

### Switching generators

If you want multiple biomes or terrain types, a common pattern is to keep the
`WorldGen` class thin and delegate to a swappable generator, as the demos do
with a `genType`:

```ts
setGenType(genType: GenType) {
  this.genType = genType;
}

async generate(dimension, sx, sy, sz) {
  this.brush.start(dimension, sx, sy, sz);
  if (this.genType) return this.genType.generate(sx, sy, sz, this.brush);
  // ...fallback...
}
```

Each `genType` implements its own `generate` and `decorate`, so terrain types
stay isolated. Choosing which one to use for a given sector (biomes) is its own
topic. 

For the full set of brush options, see
[WorldGenBrush](https://github.com/Divine-Star-Software/divinevoxel-vlox/blob/main/src/Tasks/WorldGeneration/WorldGenBrush.ts).

</details>
<details>
  <summary>World Archiving</summary>

Archiving exports a region of the world as a single portable blob and imports it
back later. This is separate from world storage: storage streams sectors in and
out as the player moves, while archiving captures an area as one artifact you can
download, ship, or load whole. It is how you save a prebuilt level, share a
build, or seed a world.

You can archive in two formats:

- **Binary**: compact and fast. The default, and what you want for real saves.
- **JSON**: larger but human-readable and easy to move between tools. Useful for
  debugging, inspection, or interop.

Both round-trip: anything you export in a format imports back from the same
format.

### Archiving and importing single sectors

The per-sector work is done by two engine tasks that run on the generators pool.
They ship with the engine, so there is nothing to set up. Run them with
`runTaskAsync`:

- **`archive-sector`**: takes `[dimension, x, y, z]` and returns that sector's
  `ArchivedSectorData`.
- **`import-sector`**: takes an `ArchivedSectorData` and loads it back into the
  world.

```ts
const generators = DivineVoxelEngineRender.instance.threads.generators;

// archive one sector
const sectorData = await generators.runTaskAsync(
  "archive-sector",
  [dimension, x, y, z],
  [],
);

// import one sector
await generators.runTaskAsync("import-sector", sectorData, []);
```

### Building a whole area

An area is just the sectors of a dimension collected together. Archive each
sector, then pass them to `ArchiveArea` to get one `ArchivedAreaData`:

```ts
import ArchiveArea from "@divinevoxel/vlox/World/Archive/Functions/Area/ArchiveArea";
import { WorldRegister } from "@divinevoxel/vlox/World/WorldRegister";

async function archive(dimension: number) {
  const generators = DivineVoxelEngineRender.instance.threads.generators;

  const sectors = [];
  for (const [, sector] of WorldRegister.dimensions.get(dimension)!.sectors) {
    sectors.push(
      await generators.runTaskAsync("archive-sector", [dimension, ...sector.position], []),
    );
  }

  return ArchiveArea({ sectors, dimension });
}
```

Loading reverses it. `CreateSectorsFromArea` walks an `ArchivedAreaData` and
yields its sectors, and each goes back through `import-sector`:

```ts
import { CreateSectorsFromArea } from "@divinevoxel/vlox/World/Archive/Functions/Area/ImportArea";

async function load(area: ArchivedAreaData) {
  const generators = DivineVoxelEngineRender.instance.threads.generators;

  for (const sector of CreateSectorsFromArea(area)) {
    await generators.runTaskAsync("import-sector", sector, []);
  }
}
```

### Files: binary and JSON

`ArchiveArea` gives you an `ArchivedAreaData` object in memory. To turn that into
a file you serialize it, and the format is your choice.

Binary, compact and compressed:

```ts
import { BinaryObject } from "@amodx/binary";
import { Compressor } from "@amodx/core/Compression";

const compressed = await Compressor.core.compressArrayBuffer(
  BinaryObject.objectToBuffer(area),
);
downloadFile("archived-world.bin", compressed.buffer);
```

JSON, readable and portable:

```ts
import ExportArchivedAreaJSON from "@divinevoxel/vlox/World/Archive/Functions/JSON/ExportArchivedAreaJSON";

const json = await ExportArchivedAreaJSON(area);
downloadFile("archived-world.json", JSON.stringify(json));
```

Importing mirrors it. Decode in the matching format to get an `ArchivedAreaData`,
then pass it to `load` above:

```ts
// binary
const buffer = (await Compressor.core.decompressArrayBuffer(binary)).buffer;
const area = BinaryObject.bufferToObject(buffer);

// json
import ImportArchivedAreaJSON from "@divinevoxel/vlox/World/Archive/Functions/JSON/ImportArchivedAreaJSON";
const area = await ImportArchivedAreaJSON(JSON.parse(jsonString));
```

The format has to match: load a `.bin` through the binary path and a `.json`
through the JSON path.

For the full set of types, see
[Archive.types.ts](https://github.com/Divine-Star-Software/divinevoxel-vlox/blob/main/src/World/Archive/Types/Archive.types.ts).

</details>
<details>
  <summary>Runtime Building (VoxelBuildSpace)</summary>

`VoxelBuildSpace` is the runtime way to place and erase voxels in a live world.
Where the world generation brush paints voxels on the generator thread while a
sector is being created, a build space paints them at runtime in response to
input, so it is what you use for a player placing and breaking blocks, or for an
in-game editor. It also handles picking (raycasting into the world to find the
voxel a player is looking at).

### Setup

There are two pieces, matching the engine's thread split:

- On the **world thread**, create a `VoxelBuildSpaceWorld` once. This registers
  the build tasks. There is nothing to configure.

  ```ts
  import { VoxelBuildSpaceWorld } from "@divinevoxel/vlox/Builder/World/VoxelBuildSpaceWorld";

  new VoxelBuildSpaceWorld();
  ```

- On the **render side**, create a `VoxelBuildSpace`, passing the renderer and a
  ray provider (below):

  ```ts
  import { VoxelBuildSpace } from "@divinevoxel/vlox/Builder/VoxelBuildSpace";

  const space = new VoxelBuildSpace(DVER, rayProvider);
  ```

### The ray provider

Picking needs to know where the player is aiming. A ray provider is any object
with an origin, a direction, and a length:

```ts
export interface RayProvider {
  origin: Vector3Like;
  direction: Vector3Like;
  length: number;
}
```

Typically you back this with your camera and update it each frame. A minimal
version:

```ts
class CameraRay implements RayProvider {
  origin = Vector3Like.Create();
  direction = Vector3Like.Create();
  length = 100;

  update(camera) {
    // copy the camera's position into origin and its forward vector into direction
  }
}
```

### Placing and erasing

The two core calls are `paintVoxel` and `eraseVoxel`. `paintVoxel` takes a
position and a `PaintVoxelData` (the same voxel description used elsewhere):

```ts
import { PaintVoxelData } from "@divinevoxel/vlox/Voxels";

await space.paintVoxel([x, y, z], PaintVoxelData.Create({ id: "dve_box" }));

await space.eraseVoxel([x, y, z]);
```

Positions can be a `[x, y, z]` array or a `Vector3Like`.

### Picking

`pick` casts a ray into the world and returns what it hits, or `null` for a
miss. With no arguments it uses the ray provider:

```ts
const picked = await space.pick();
if (picked) {
  // picked.position       : the voxel that was hit
  // picked.normal         : the face that was hit
  // picked.normalPosition : position + normal, the cell to build into
  // picked.voxel          : a reader for the hit voxel (isAir, getStringId, getMod, ...)
  // picked.distance       : distance from the ray origin to the hit
}
```

Picking and building combine into the usual place-and-break loop. To place
against the face you are pointing at, add the normal to the hit position:

```ts
const picked = await space.pick();
if (!picked) return;

if (holdingVoxel) {
  // normalPosition is already position + normal
  await space.paintVoxel(picked.normalPosition, voxelData);
} else {
  await space.eraseVoxel(picked.position);
}
```

A pick result also carries the ray it came from, `unitNormalFace` (which of the
six voxel faces was hit), and more, but the four above cover most building.

### Oriented voxels on placement

For voxels that use placement state (see **Voxel State**, like the oriented
cube), `getPlaceState` sets the correct `state` on the voxel data from the pick
and the voxel's placing strategy. It mutates the `PaintVoxelData` in place, so
call it just before painting:

```ts
space.getPlaceState(voxelData, picked);
await space.paintVoxel(picked.normalPosition, voxelData);
```

A voxel with no placing strategy is left unchanged, so this is safe to call for
any voxel.

### Limiting the build area

By default a build space is unbounded. You can pass a min and max to constrain
where building is allowed, which is useful for an editor working inside a fixed
region:

```ts
const space = new VoxelBuildSpace(DVER, rayProvider, min, max);
```

`space.clear()` erases everything inside the current bounds.

### Update hooks

Every build operation runs through a single `update` path, and you can hook it
with `beforeUpdate`, `duringUpdate`, and `afterUpdate` callbacks. `duringUpdate`
runs alongside the operation with `Promise.all`. These are handy for reacting to
edits, for example playing effects or syncing changes elsewhere:

```ts
space.afterUpdate = async (data) => {
  // data.type is "paint-voxel", "erase-voxel", etc.
};
```

### Beyond single voxels

A build space can also work with larger pieces. These are more advanced and have
their own topic, but in short:

- **Templates**: capture a region of voxels and paint or erase it as a unit
  (`createTemplate`, `paintTemplate`, `eraseTemplate`). Good for copy and paste,
  or stamping prefabs.
- **Selections**: compute a set of voxels to act on, such as a surface selection
  or a flood-fill (`getSurfaceSelection`, `getBFSSelection`), then erase or
  extrude them.


For the full set of options, see
[VoxelBuildSpace.ts](https://github.com/Divine-Star-Software/divinevoxel-vlox/blob/main/src/Builder/VoxelBuildSpace.ts).

</details>
<details>
  <summary>Templates & Selections</summary>

Templates and selections let a build space work with many voxels at once instead
of one at a time. They solve two different halves of the same problem:

- A **template** is a captured block of voxel data. It holds the actual voxels
  (ids, light, level, secondary) for a region, so you can stamp it down or clear
  it anywhere. Think copy and paste, or prefabs.
- A **selection** is a set of positions, with no voxel data of its own. It only
  answers "is this cell included?" for each position in its bounds, so you can
  act on an arbitrary shape rather than a solid box.

You typically make a selection to decide *where*, then turn it into a template to
capture *what*.

### Templates

There are two forms of template, and knowing which is which saves confusion:

- **`FullVoxelTemplate`** holds the region as plain typed arrays in memory (ids,
  light, level, secondary). This is the live, editable form you get when you
  capture part of the world.
- **`ArchivedVoxelTemplate`** is the compressed, palette-based form, meant for
  saving and sharing. It has JSON export and import, mirroring how world
  archiving works. You convert a full template to an archived one when you want
  to persist it.

So the pattern is: capture into a full template, archive it to store or ship it,
and import it back to a template when you want to paint it again.

A build space captures a region for you:

```ts
const template = await space.createTemplate({ min, max });
```

Then paint it (or erase it) at a position:

```ts
await space.paintTemplate(position, template);
await space.eraseTemplate(position, template);
```

A template exposes its `bounds` and per-cell readers keyed by a flat index:

```ts
const index = template.getIndex(x, y, z);
template.isAir(index);   // is this cell empty
template.getId(index);   // voxel id at this cell
template.getRaw(index);  // full raw voxel data [id, light, level, secondary]
```

A template can also carry a **mask**: a bit per cell marking which cells are
actually part of it. `isIncluded(index)` reports it. This is how a template can
hold a non-box shape (a sphere, a flood-filled blob) inside its rectangular
bounds, leaving the rest out when painted.

### Selections

A selection describes which cells in a region are included, through a single
`isSelected(x, y, z)`. The engine ships a few kinds:

- **Point** (`VoxelPointSelection`): a single cell. The simplest selection.
- **Flood-fill** (`VoxelBFSSelection`): starting from a cell, spread to
  connected cells of the same voxel, bounded by a `maxSize`. Good for selecting a
  whole connected object.
- **Template** (`VoxelTemplateSelection`): use a template's own shape as the
  selection, so a captured shape can be reused to mask further edits.

The build space can compute selections from the world for you:

```ts
// the connected surface from a point, extruded outward
const surface = await space.getSurfaceSelection(position, normal, extrusion, maxSize);

// connected cells of the same voxel, flood-filled from a point
const region = await space.getBFSSelection(position, maxSize);
```

Once you have a selection you can act on it, for example erase everything in it:

```ts
await space.eraseSelection(selection);
```


### Custom templates and selections

Both are interfaces, so you can implement your own. A template implements
`IVoxelTemplate` (bounds, indexing, per-cell readers, `isIncluded`, and
`toJSON`/`fromJSON`); a selection implements `IVoxelSelection` (origin, bounds,
and `isSelected`). The build space accepts anything matching these, so custom
shapes and generators work exactly like the built-in ones.

For the full set of options, see
[VoxelTemplates.types.ts](https://github.com/Divine-Star-Software/divinevoxel-vlox/blob/main/src/Templates/VoxelTemplates.types.ts) and [VoxelSelection.ts](https://github.com/Divine-Star-Software/divinevoxel-vlox/blob/main/src/Templates/Selection/VoxelSelection.ts).

</details>
<details>
  <summary>Compacting Textures</summary>
You can compact the textures beforehand and tell the engine to use them.

The engine will produce a single atlas texture and json data file that can be used instead of loading the textures one by one.
### Create Compact Textures
```ts
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
//Do this after initing the babylon renderer
const compactedImages = await TextureManager.createCompactedTextures(
  "assets/textures",
  [16, 16]
);
for (const image of compactedImages) {
  await downloadFile(`${image.data.type}.png`, image.image, "image/png");
  await downloadFile(
    `${image.data.type}.json`,
    JSON.stringify(image.data),
    "application/json"
  );
}
```

### Use Compact Textures
```ts
import { TextureManager } from "@divinevoxel/vlox/Textures/TextureManager";
//register textures beforehand
TextureManager.registerTexture(Textures);
const paths: string[] = [
  "assets/compacted/dve_voxel",
  "assets/compacted/dve_item",
];
for (const path of paths) {
  const json = await (await fetch(`${path}.json`)).json();
  await TextureManager.readCompactedTexture( json, `${path}.png`);
}
```
</details>
<details>
  <summary>How Meshing Works: Faces and the LUTs</summary>

This section is about how the engine turns voxels into meshes. You do not need
it to use the engine, but it is the core of what makes it fast, and worth reading
if you want to understand or extend the mesher.

### The idea

The engine does not mesh blocks. It explodes every voxel model down into
individual **faces**, and faces are the atomic unit the whole mesher works with.
All the expensive relationships between faces, which faces cull which, and which
neighbors darken which vertex for ambient occlusion, are worked out **once at
registration** and baked into flat lookup tables (LUTs). At mesh time the engine
is doing cheap array lookups against those tables, not recomputing geometry.

Two things happen at different times, and keeping them separate is the whole
trick:

- **At registration (once):** build the LUTs. Explode models into faces,
  deduplicate them, and precompute the culling and AO *rules* for every face.
- **At mesh time (per section, on the mesher threads):** for each voxel, look up
  its faces in the LUTs and, for each face, do fast neighbor checks against the
  precomputed rules to decide if the face is drawn and how it is shaded.

### The LUTs

Registration produces two lookup tables.

**`VoxelLUT`** resolves a voxel's full state down to a numeric id and back. It
handles the combinatorial explosion of state and mod (and their relational
versions) by precomputing every combination into typed-array records, so at
runtime `getVoxelId` / `getGeometryIndex` are just index math. This is what lets
a voxel have many states without the mesher ever doing per-voxel branching to
figure out which variant it is.

**`GeometryLUT`** holds the face-level data: the compiled geometry for each
geometry id, its culling procedure, and the two precomputed occlusion indexes:

- **`faceCullIndex`**: given a face and a neighbor direction, does the neighbor's
  face cull this one? Precomputed for every face-to-neighbor pair.
- **`aoIndex`**: given a face, a vertex, and a neighbor direction, does that
  neighbor contribute ambient occlusion to that vertex? Also precomputed.

Because both are keyed by geometry id, face, direction, and vertex, the mesher
never works out face relationships at runtime. It asks the table.

### The per-section neighbor cache

When a section is meshed, the mesher uses a `VoxelGeometryBuilderCacheSpace`, a
scratch space sized to the section plus a padding border (so edge voxels can see
their neighbors in adjacent sections).

The important property: each neighbor voxel is resolved **once**. The first time
a position is touched, `hashState` reads that voxel and caches everything the
mesher will need about it, its true id, voxel id, relational id, relational
state, whether it has a secondary voxel, whether it is opaque, full-block, and
whether it casts AO, into parallel typed arrays. Every face that later asks about
that neighbor reads the cache instead of re-resolving the voxel. So a voxel
shared by many neighboring faces is only decoded once per section.

### Meshing a voxel

Putting it together, here is the path for one voxel (`BuildVoxelBase`):

1. Resolve the voxel through `VoxelLUT` to get its geometry index and input
   index.
2. Look up its faces in `GeometryLUT` and, for each face node, call `add`.
3. Each face first calls `CullRulledFace`. This walks the face's relevant
   neighbor directions (from the precomputed cull map), reads each neighbor from
   the cache, and checks `faceCullIndex`. If a neighbor's face culls this one,
   the face is skipped entirely.
4. If the face survives, `ShadeRulledFace` computes its lighting and AO. Light is
   interpolated per vertex; AO is accumulated by checking the precomputed
   `aoIndex` against cached neighbors (up to the point where a vertex is fully
   occluded).
5. The surviving, shaded face is written into the mesh buffer.

Voxels that opt out of the rule system (`doNotBuildRules`, for non-cubic or
custom shapes) skip the cull/AO lookups and take a simpler path
(`ShadeRulelessFace`), which is why irregular models can exist alongside the fast
cubic path.

### Why it is built this way

The payoff is that the mesher's hot loop is almost entirely table lookups and
cached reads. The costly work, enumerating state combinations, compiling
geometry into faces, and figuring out every culling and AO relationship, is done
once when voxels are registered, not per section and not per frame. Meshing many
sections in parallel across the mesher workers is then cheap, because each worker
is doing lookups rather than geometry math.

Both LUTs also export and import as plain data (`VoxelLUT.export()`,
`GeometryLUT.export()`), so the registered voxel set can be built once and shared
across threads (or serialized) rather than rebuilt everywhere.

### What "precomputed" means here

To be precise about the split, since it is the detail that matters: the
**geometry tests** are what get precomputed, not the final shading. At
registration, `BuildRules` takes every face and tests it against every other
geometry's faces in all 27 relative neighbor positions, computing two things by
actual geometry:

- Does the neighbor face **cover** this face (so this face can be culled)?
- Does a small occlusion box at each **vertex** intersect the neighbor face (so
  that vertex gets ambient occlusion)?

Each answer is a single bit, packed into bit buffers keyed by geometry, neighbor
direction, face, and (for AO) vertex. It also records, per face, the short list
of neighbor directions that can possibly matter, so the mesher never checks
neighbors that are irrelevant to a face.

At mesh time the mesher does **no geometry math** for culling or AO. It reads
these precomputed bits against the cached neighbors and adds up the result. So
the expensive part, the actual geometric "does this occlude that" for every
face-neighbor-vertex combination, happens once when voxels are registered, per
section, per frame, it is bit lookups.

</details>