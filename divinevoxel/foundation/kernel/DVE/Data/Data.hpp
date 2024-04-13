#ifndef DVEData_Module
#define DVEData_Module
#include "./Voxels/VoxelDataRegister.hpp"
#include "./World/WorldDataRegister.hpp"
namespace DVE
{
    class Data
    {
    private:
        Data() {}
        Data(const Data &) = delete;

        static const Data *instance;

    public:
        const VoxelDataRegister &voxels = VoxelDataRegister::getInstance();
        WorldDataRegister &world = WorldDataRegister::getInstance();

        static const Data &getInstance()
        {
            if (!instance)
            {
                instance = new Data();
            }
            return *instance;
        }
    };

}
#endif // DVEData_Module