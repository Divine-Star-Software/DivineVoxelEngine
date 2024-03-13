#ifndef RGBLight_Module
#define RGBLight_Module
#include "../../Data/Data.hpp"
namespace DVE
{
    class RGBLight
    {
    private:
        RGBLight() {}
        RGBLight(const RGBLight &) = delete;
        static const RGBLight *instance;

    public:
        static const RGBLight &getInstance()
        {
            if (!instance)
            {
                instance = new RGBLight();
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
#endif // RGBLight_Module