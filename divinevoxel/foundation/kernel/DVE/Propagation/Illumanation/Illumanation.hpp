#ifndef Illumanation_Module
#define Illumanation_Module
#include "./RGBLight.hpp"
#include "./SunLight.hpp"
#include "./WorldSunLight.hpp"
namespace DVE
{
    class Illumanation
    {
    private:
        Illumanation() {}
        Illumanation(const Illumanation &) = delete;
        static const Illumanation *instance;

    public:
        const RGBLight &rgb = RGBLight::getInstance();
        const SunLight &sun = SunLight::getInstance();
        const WorldSunLight &worldSun = WorldSunLight::getInstance();
        static const Illumanation &getInstance()
        {
            if (!instance)
            {
                instance = new Illumanation();
            }
            return *instance;
        }

        void rgbRemove(VoxelLocation location) const
        {
            rgb.removeLight(location);
        }
        void rgbUpdate(VoxelLocation location) const
        {
            rgb.updateLight(location);
        }
        void sunUpdate(VoxelLocation location) const
        {
            sun.updateLight(location);
        }
        void sunRemove(VoxelLocation location) const
        {
            sun.removeLight(location);
        }
        void runWorldSun(VoxelLocation location) const
        {
            worldSun.run(location);
        }
    };
}
#endif // Illumanation_Module