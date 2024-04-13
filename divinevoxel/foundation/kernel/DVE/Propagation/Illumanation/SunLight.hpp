#ifndef SunLight_Module
#define SunLight_Module
#include "../../Data/Data.hpp"
namespace DVE
{
    class SunLight
    {
    private:
        SunLight() {}
        SunLight(const SunLight &) = delete;
        static const SunLight *instance;

    public:
        static const SunLight &getInstance()
        {
            if (!instance)
            {
                instance = new SunLight();
            }
            return *instance;
        }
        const Data &data = Data::getInstance();
        void removeLight(VoxelLocation location) const
        {
        }

        void updateLight(VoxelLocation location) const
        {
        }
    };
}
#endif // SunLight_Module