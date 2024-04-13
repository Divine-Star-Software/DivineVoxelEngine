#ifndef Location_Module
#define Location_Module
#include <cmath>
#include <string>
namespace DVE
{

    class VoxelLocation
    {
    public:
        float x, y, z;
        std::string dimension;

        VoxelLocation() : dimension("main"), x(0), y(0), z(0) {}
        VoxelLocation(std::string dimension, float x, float y, float z) : dimension(dimension), x(x), y(y), z(z) {}
        VoxelLocation(const VoxelLocation &other) : dimension(other.dimension), x(other.x), y(other.y), z(other.z) {}

        VoxelLocation &operator=(const VoxelLocation &other)
        {
            if (this != &other)
            {
                x = other.x;
                y = other.y;
                z = other.z;
            }
            return *this;
        }

        VoxelLocation operator+(const VoxelLocation &other) const
        {
            return VoxelLocation(dimension, x + other.x, y + other.y, z + other.z);
        }

        VoxelLocation operator-(const VoxelLocation &other) const
        {
            return VoxelLocation(dimension, x - other.x, y - other.y, z - other.z);
        }

        VoxelLocation operator*(float scalar) const
        {
            return VoxelLocation(dimension, x * scalar, y * scalar, z * scalar);
        }

        float dot(const VoxelLocation &other) const
        {
            return x * other.x + y * other.y + z * other.z;
        }

        VoxelLocation cross(const VoxelLocation &other) const
        {
            return VoxelLocation(
                dimension,
                y * other.z - z * other.y,
                z * other.x - x * other.z,
                x * other.y - y * other.x);
        }

        void normalize()
        {
            float mag = std::sqrt(x * x + y * y + z * z);
            if (mag > 0)
            {
                x /= mag;
                y /= mag;
                z /= mag;
            }
        }

        float magnitude() const
        {
            return std::sqrt(x * x + y * y + z * z);
        }
    };

}
#endif