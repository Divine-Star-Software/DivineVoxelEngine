
#ifndef VoxelDataRegister_Module
#define VoxelDataRegister_Module
#include "./VoxelPalette.hpp"
#include "./VoxelSubstancePalette.hpp"
namespace DVE
{
    class VoxelDataRegister
    {
    private:
        VoxelDataRegister() {}
        VoxelDataRegister(const VoxelDataRegister &) = delete;

        static const VoxelDataRegister *instance;

    public:
        static const VoxelDataRegister &getInstance()
        {
            if (!instance)
            {
                instance = new VoxelDataRegister();
            }
            return *instance;
        }

        VoxelPalette &voxelPalette = VoxelPalette::getInstance();
        VoxelSubstancePalette &voxelSubstancePalette = VoxelSubstancePalette::getInstance();
    };

}
#endif // DVEKernel_Module
