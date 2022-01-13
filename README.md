<h1 align="center">
 ⛯ Divine Voxel Engine ⛯
</h1>

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

---

**WARNING:**
Very early development. This is not finalized. Things will keep changing as development goes forward.

# What is this?

A voxel engine written in TypeScript that uses Babylon.Js. This is for Minecraft like games. Meaning it is for rich voxel worlds not sparse ones. Though there are optimizations included for uses of just rendering.

This engine only handles rendering and creating of meshes. Things like players, world generation, mobs, and complex inter-connected logic is up to you.

# Current Features

- Different Voxel Types
- Different Voxel Shapes
- Chunk based rendering and meshing
- Multi Threaded - World Gen and Chunk Creation happens in workers
- Ambient Occlusion - Nice shadows for the voxel
- Animated Textures
- Custom Shaders

# In Dev

- Any easy way to add voxels and shapes.
- Saving Data
- Lighting System

#### Test Out

To see how to use the engine look at the TestWorlds folder.

To test out the demos clone the repo and then run:

```console
npm i -S
npm run start
```

You can change the world demo in **app/index.html**

One thing to note about the engine is that it runs in three different contexts and must be initialized in each. 

The three contexts being

- Main Thread
  - Renders everything using Babylon.Js.
- World Thread ]
  - Holds the world data, voxel data, and does the logic for lighting and so on.
  - All voxels, voxels pallets, and textures must be registered in this thread.
- Builder Thread 
  - Holds the voxel shape data. All custom shapes must be registered in this thread.
  - Given a template from the world thread it will generate a chunk mesh data and then send it to the main thread.

##### Change Log

1-12-2022

- Voxel data is now stored in the chunk as a number. This number is used to access the real information about the voxel which is stored in something called a Voxel Pallet.  

  - A voxel pallet can either be "global" or "per-chunk". Global means there is one voxel pallet at a given time for the world generation. While per-chunk means that the voxel pallet is stored with the chunk data. 
  - Per chunk voxel pallets are good for Minecraft type games where the world data is saved and may have voxels added on later.
  - Global voxel pallets are good for when the world data is not saved and everything is just generated. 

- A set of functions are being developed to make it easy to develop a voxel pallet. They will in a new class called "WorldGeneration" which is just meant to assist in generating data. 

- If you want to add a block now you have to do different things based on the voxel pallete mode:

  - If it is global you must get the index number from the global voxel pallet and insert that into the chunk voxel data. 
  - If it is per-chunk first you must check to see if the voxel pallet id exists in the chunk pallet and add it there if it does not exist. Then you get the index number from that which you will then insert into the chunk voxel data. 

The naming convection for voxels and their voxel pallet states is as follows:

```ts
const voxleParentGroup = "dve";
const voxelName = "dreamstone";
const voxelid = `${voxleParentGroup}:${voxelName}`;
//create palletid for default voxel state
const voxelPalletIdDefault = `${voxelid}:default`;
//Add another states like this
const voxelState = `rotated`;
const voxelPalletIdRotated = `${voxelid}:${voxelState}`;
```

 

1-10-2022 

- Focus of this project is now defined as building a voxel engine that handles rendering only.
  - There will be ways to handle world generation, players, game logic, and so on.
- Actual voxel data is stored as an array. The chunk itself is stored in a 3d array. 
  - The current structure for voxel data is not finalized but currently the first index of the array will always be the voxel's id.  
- Support for different voxel types and shapes was finally added.
  - Shapes are defined in the mesh builder thread. They hold the information to build the actual voxel mesh. 
  - Voxels are defined in the world thread. They hold the basic template information such as the shape type and the texture indexes for the faces.
- Moved repeated complex logic into a shared function. 
- Decided to move liquids to its own mesh rather than including it in the chunk mesh.
- Greedy meshing is no longer being considered right now. 
  - Decided it was not worth it right now to add. Reason being this engine may be used to create voxel worlds with many different textures rather repetitive ones that can be easily combined.

### Thanks To

- [Simon](https://twitter.com/iced_coffee_dev) for providing inspiration for the project and the starter code for the ambient occlusion.
- [Daivd Catuhe](https://www.linkedin.com/in/dcatuhe/) for creating BabylonJS.

#### Notes

This engine was developed on top of the V8 engine through severing it as an Electron app. So, it may not be computable with all browsers.

#### Chunk Data

The currently loaded chunks are stored in a object with the chunk's X and Z as they keys. Each chunk is an object with several properties. 

The main data it stores are the voxels which is stored as a 3D array. Each voxel is represented by an array of numbers. 

Currently the first number is the voxel id from the global or chunk level voxel pallet map. The second number is used for a voxel state. And finally the three numbers are for the calculated block AO, block light and sky light values. 

If the voxel pallet mode is set to per chunk the chunk will have its local pallet map. Which is a way to get the true id and state of the voxel. 

Metrics so far for total world data size is at calculated to be at worst ~28 mb for 200 chunks of full blocks. With compression you can store that to be only about 200kb.  

 
