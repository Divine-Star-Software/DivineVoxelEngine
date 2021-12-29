<h1 align="center">
 ⛯ Divine Voxel Engine ⛯
</h1>
 
<p align="center">
<img src="https://divinestarapparel.com/wp-content/uploads/2021/02/logo-small.png"/>
</p>


---

__WARNING:__
Very early development. It is very bugy and broken. Please don't download and complain that
it does not work. As of this writing this project is only about two weeks old.

# What is this?

A voxel engine written in TypeScript that uses Babylon.Js. 

# Why?

Divine Star has several other projects that need to use a voxel engine. So, I am making a 
public version of the engine for creators to use. It will not include things like world 
generation and so on. So you can fill out those things yourself. 

# Current Features

- Chunk based rendering and meshing
- Multi Threaded - World Gen and Chunk Creation happens in workers
- Ambient Occulsion - Nice shadows for the voxel 
- - Please thank this guy for it: https://twitter.com/iced_coffee_dev
- Infinite Generation
- Animated Textures
- Custom Shaders

# In Dev

- Greedy Meshing
- Different Block Types
- Saving Data

# Features Looking Ahead 

- Lighting System 
- Water Physics
- Entities
- Mob Starter Base
- Particles 

## Coming Changes

The development on this project is moving slow but is coming along. Below you will find changes and features that are partially implemented. 

## Textures

The voxel’s textures are stitched together at the start of the program. The raw data is then sent to a 2D texture array in the shader. The vertex shader is built based on the textures and their required animations. All texture animations are calculated by the vertex shader. 

## Lighting

Currently the only lighting is done in the shader. I will work on a lighting system that simulates a sky light level and a block light level . The sky light will be it’s only value that is calculated and passed through the shader. So, for instance you could change the sky light from day to night by just changing the light value in the shader. This of course would not affect the block light level. 
The voxel themselves will just store a sky light level and a block light level. The chunk processor will then calculate the light gradients for the mesh. Much like it does for the ambient occlusion shading. 

## Registering Blocks

Blocks will have to be registered in the worker’s that the data is needed. For instance the world generator will need to know what the voxels textures index is and how to calculate it. While the logic operator will need to know what blocks need logic updates and the actual logic that runs them. 

The way the main rendering currently works is based on creating “chunk templates” or the bare minimum amount of information needed to represent the chunk visually. The chunk template is generated in the world worker and sent to a chunk builder worker. The chunk builder worker will generate the necessary data from the template to build a mesh for the chunk. 

The way logic is done will be done in the same way. The logic worker will run the logic for the respective chunk and trigger any changes to the visual representation if needed. 



