# Code Style and Contributions

In case anyone wants to contribute to the project here are the guidelines:

## Contributions

It must be relevant to the project and be generally useful to different types of projects.
Also, any direct code contrubtion must not hinder performance. The optimal chunk build/rebuild time is below 100ms. 

But if you want to help you could work on one or more of the following:

- Documentation 
- Example worlds 
- Voxel shapes
- Shaders and materials
- Engine improvments and features 

You can also help by providing feedback and reporting bugs. 

## Code Style Guide Lines

To keep the code consistent and understandable I follow some guidlines. 

## Basic Stying

- Camel case for variables. No capital letters unless it is an acronym.
- Camel case with first char capitalized for classes and imported functions.
- A class that handles many functions and actions must be called a Manager. 
- All files that just have types must have .types in the file name. 
- All files that have an interface must have .interface in the name. 
- Each function and variable name must make sense and actually describe what it is and what it does. 
    
## Project Structure

- The source code is split up between the different contexts. 
  - The exception being the Fluid Mesh Builder which is nested in the Builder Context folder.
- The Meta folder is just for types and interfaces. 
- Functions with a $ sign are meant to be called only once.
    - Such is the case with all the main contexts main managers.
    - Each have an "$INIT" function. 
- Important classes are grouped together into a parent class in each context. 
    - Their parent classes for each context are:
        - Divine Voxel Engine - **DVE** - Main Thread
        - Divine Voxel Engine World - **DVEW** - World Thread
        - Divine Voxel Engine Builder - **DVEB** - Mesh Builder Thread
        - Divine Voxel Engine Fluid Builder - **DVEFB** - Fluid Mesh Builder Thread
- Important inital logic are set up in speical init functions. 
- If a bunch of contexts need to use some specific code it is attatched to the UTIL class.
- If in a context there needs to be a lot of interaction between several classes then it must be broke out into a function.

## Philosphy 

- Simple
- Elagent 
- Effective 

My aim is to keep the engine as easy to use as possible (as anything like this could be). 

All the stuff that can be hidden away should. The user of the engine should not have to do to much
work to get exaclty what they want. You should just be able to make a few files and import a few things to get a beautiful voxel world of your design in twenty or less minutes. 

Everything you could want as an artist and a developer should be eaisly aviable. 


