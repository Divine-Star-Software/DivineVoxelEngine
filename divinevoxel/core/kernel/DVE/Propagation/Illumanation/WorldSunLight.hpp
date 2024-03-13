#ifndef WorldSunLight_Module
#define WorldSunLight_Module
#include "../../Data/Data.hpp"
namespace DVE
{
    class WorldSunLight
    {
    private:
        WorldSunLight() {}
        WorldSunLight(const WorldSunLight &) = delete;
        static const WorldSunLight *instance;

    public:
        static const WorldSunLight &getInstance()
        {
            if (!instance)
            {
                instance = new WorldSunLight();
            }
            return *instance;
        }

        const Data &data = Data::getInstance();
        void run(VoxelLocation location) const
        {
        }
    };
}
#endif // WorldSunLight_Module