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

One thing to note about the engine is that it runs in four different contexts and must be initialized in each. 

The four contexts being

- Main Thread
  - Renders everything using Babylon.Js.
- World Worker Thread 
  - Holds the world data, voxel data, and does the logic for lighting and so on.
  - All voxels, voxels pallets, and textures must be registered in this thread.
- Builder Worker Thread 
  - Holds the voxel shape data. Solid, flora, and magma custom voxel shapes must be registered in this thread.
  - Given a template from the world thread it will generate a chunk mesh data and then send it to the main thread.
- Fluid Worker Thread 
  - Holds the fluid voxel shape data. Fluid custom voxel shapes must be registered in this thread.
  - Given a template from the world thread it will generate the worlds fluid mesh data and then send it to the main thread.



### Thanks To

- [Simon](https://twitter.com/iced_coffee_dev) for providing inspiration for the project and the starter code for the ambient occlusion.
- [Daivd Catuhe](https://www.linkedin.com/in/dcatuhe/) for creating BabylonJS.



 
