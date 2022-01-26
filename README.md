<h1 align="center">
 ⛯ Divine Voxel Engine ⛯
</h1>

<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>

---
**WARNING:**
Very early development. This is not finalized. Things will keep changing as development goes forward.
Check out the releases for stable working verions. The main repo may be broken at times.


# What is this?

A voxel engine written in TypeScript that uses Babylon.Js. This is for Minecraft like games. Meaning it is for rich voxel worlds not sparse ones. Though there are optimizations included for uses of just rendering.

This engine only handles rendering and creating of meshes. Things like players, world generation, mobs, and complex inter-connected logic is up to you.

This could be used to make any type of game not just a Minecraft clone. 

If you are developing something with it I would love to see it. Send it to me over at twitter : [@DivineSoftware](https://twitter.com/DivineSoftware)

Check out the [Wiki](https://github.com/Divine-Star-Software/DivineVoxelEngine/wiki) to get started.

# Current Features

- Different voxel types and shapes.
- Chunk based rendering and meshing.
- Multi threaded mesh building.
- Ambient occlusion.
- Animated and connected textures.
- Custom shaders and shader effects.
- Vertical and horizontal chunks.

# In Dev

- Same voxel different colors
  - Set a color directly on voxel data. 
  - Options to create shade gradient with neighbors. 
- Pre-Baking Lighting system.
  - Flood fill lighting system for local sources.
  - Suppourt for different colored lights.
  - Sun light calculation for global illumanitation (like minecraft) 
- Dynamic Lighting system.
  - Uses Babylon.Js built in dyamic lights and shadow gen.
  - A way to create a sun light or dynamic light that follows the player. 
  - It will cast shadows. 
- One mesh mode
  - If the world does not need to update a lot all the worlds chunk meshes can be combined into one for each substance.
- World Data API - Easy way to create chunks and the needed data for it.
- Basic physics and collision detection. 
  - Working to develop some helper functions to determine what voxel the player is looking at or touching. 
  - Instead of using collision detection with the actual meshes it will calculate collision in the world thread. 
- Well written wiki with tutorials on how to do anything that you could possibably want.
- Saving the world data.

# Future Ideas

  - Basic voxel collision detection and player example world.
  - More shader effects and custom voxel substances
  - Structure creator software. 
  - Standard data format for the engine either called .dsd or .dved


#### See In Action

See videos of development here:
[Divine Star Software](https://www.youtube.com/channel/UC6n2h7qiuEHI6oLLvod5wdg)

Sceen shots:
![DVE 1](https://portfolio.lucasdamianjohnson.dev/images/portfolio/DVOXEL/ss11.jpg)

![DVE 1](https://portfolio.lucasdamianjohnson.dev/images/portfolio/DVOXEL/ss9.jpg)

![DVE 1](https://portfolio.lucasdamianjohnson.dev/images/portfolio/DVOXEL/ss8.jpg)




#### Test Out

To see how to use the engine look at the TestWorlds folder.

To test out the demos clone the repo and then check out the **electron** folder.

Go into that direcotry and run these commands:

```console
npm i -S
npm run start
```

You can change the world demo in **electron/app/index.html**

One thing to note about the engine is that it runs in four different contexts and must be initialized in each. 

The four contexts being

- Main Thread
  - Renders everything using Babylon.Js.
- World Worker Thread 
  - Holds the world data, voxel data, and does the logic for lighting and so on.
  - All voxels, voxels palettes, and textures must be registered in this thread.
- Builder Worker Thread 
  - Holds the voxel shape data. Solid, flora, and magma custom voxel shapes must be registered in this thread.
  - Given a template from the world thread it will generate a chunk mesh data and then send it to the main thread.
- Fluid Worker Thread 
  - Holds the fluid voxel shape data. Fluid custom voxel shapes must be registered in this thread.
  - Given a template from the world thread it will generate the worlds fluid mesh data and then send it to the main thread.



### Thanks To

- [Simon](https://twitter.com/iced_coffee_dev) for providing inspiration for the project and the starter code for the ambient occlusion.
- [Daivd Catuhe](https://www.linkedin.com/in/dcatuhe/) for creating BabylonJS.

### Want to contribute?

If you would like to contribute please first read the CodeStyles file in the root directory. 

Then get a hold of me through github or other social media. 

I don't need much help but if you want to provide example worlds, more shader effects, and other improvments let me know. 



 
