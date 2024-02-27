#ifndef Illumanation_Module
#define Illumanation_Module
#include "../../DVEKernel.hpp"
#include "./Functions/RGBLight.hpp"
#include "./Functions/SunLight.hpp"
#include "./Functions/WorldSunLight.hpp"
class Illumanation
{
public:
    DVEKernel const &DVE;
    
    Illumanation(DVEKernel const &_DVE) : DVE(_DVE)
    {
    }

    void rgbRemove(VoxelLocation location)
    {
        RGBLightRemove(location, DVE);
    }
    void rgbUpdate(VoxelLocation location)
    {
        RGBLightUpdate(location, DVE);
    }
    void sunUpdate(VoxelLocation location)
    {
        SunLightUpdate(location, DVE);
    }
    void sunRemove(VoxelLocation location)
    {
        SunLightRemove(location, DVE);
    }
    void runWorldSun(VoxelLocation location)
    {
        RunWorldSunLight(location, DVE);
    }
};

#endif // Illumanation_Module