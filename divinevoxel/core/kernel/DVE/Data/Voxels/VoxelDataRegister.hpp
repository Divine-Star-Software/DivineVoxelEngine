
#ifndef VoxelDataRegister_Module
#define VoxelDataRegister_Module
#include "./VoxelPalette.hpp"
#include "./VoxelSubstancePalette.hpp"

class VoxelDataRegister
{
public:
    VoxelPalette *voxelPalette = new VoxelPalette();
    VoxelSubstancePalette *voxelSubstancePalette = new VoxelSubstancePalette();
};

#endif // DVEKernel_Module
