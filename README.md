<h1 align="center">
 ⛯ Divine Voxel Engine ⛯
</h1>

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

---

**WARNING:**
Very early development. This is not finalized. Things will keep changing as development goes forward.
Fluid mesh is a little broke right now because I am working on the light engine. Should be fixed soon though. Developing an easy way to add sun light
and voxel light sources with multi colored light!

# What is this?

A voxel engine written in TypeScript that uses Babylon.Js. This is for Minecraft like games. Meaning it is for rich voxel worlds not sparse ones. Though there are optimizations included for uses of just rendering.

This engine only handles rendering and creating of meshes. Things like players, world generation, mobs, and complex inter-connected logic is up to you.

# Current Features

- Different voxel types and shapes.
- Chunk based rendering and meshing.
- Multi threaded mesh building.
- Ambient occlusion.
- Animated and connected textures.
- Custom shaders and shader effects.
- Vertical and horizontal chunks.

# In Dev

- Saving Data
- Lighting system.
  - Flood fill lighting system.
  - Suppourt for different colored lights.
- World Data API - Easy way to create chunks and the needed data for it.

#### See In Action

See videos of development here:
[Divine Star Software](https://www.youtube.com/channel/UC6n2h7qiuEHI6oLLvod5wdg)

Sceen shots:
![DVE 1](https://portfolio.lucasdamianjohnson.dev/images/portfolio/DVOXEL/ss11.jpg)

![DVE 1](https://portfolio.lucasdamianjohnson.dev/images/portfolio/DVOXEL/ss9.jpg)

![DVE 1](https://portfolio.lucasdamianjohnson.dev/images/portfolio/DVOXEL/ss8.jpg)




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



 
