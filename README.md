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

A voxel engine written in TypeScript that uses Babylon.Js.

This is meant to handle only the rendering and creating of meshes. Things like players, mobs, and complex inter-connected logic is up to you.

# Why?

Divine Star has several other projects that need to use a voxel engine. So, I am making a
public version of the engine for creators to use. It will not include things like world
generation and so on. So you can fill out those things yourself.

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

##### Change Log

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
