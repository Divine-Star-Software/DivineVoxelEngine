#ifndef DVEData_Module
#define DVEData_Module
#include "./Voxels/VoxelDataRegister.hpp"
#include "./World/WorldDataRegister.hpp"
class DVEData
{
    public:
    VoxelDataRegister *voxels = new VoxelDataRegister();
    WorldDataRegister *world = new WorldDataRegister();
};

#endif // DVEData_Module