# Code Style

In case anyone wants to contribute to the project here are the guidelines:

## Basic Stying

- Camel case for variables. No capital letters unless it is an acronym.
- Camel case for first char captial of classes. 
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
- Import classes are grouped together in each context. 
    - Their group classes being
        - Divine Voxel Engine - Main Thread
        - Divine Voxel Engine World - World Thread
        - Divine Voxel Engine Builder - Mesh Builder Thread
        - Divine Voxel Engine Fluid Builder - Fluid Mesh Builder Thread
- Import inital logic are set up in speical init functions. 
- If a bunch of contexts need to use some specific code it is attatched to the UTIL class.

## Philosphy 

- Simple
- Elagent 
- Effective 

My aim is to keep the engine as easy to use as possible. All the stuff that can be hidden away should. The user of the engine should not have to do to much
work to get exaclty what they want. 



