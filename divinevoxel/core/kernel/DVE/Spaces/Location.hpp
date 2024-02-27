#ifndef Location_Module
#define Location_Module
#include <cmath>
#include <string>
class VoxelLocation
{
public:
    float x, y, z;
    std::string dimension;

    // Constructors
    VoxelLocation() : dimension("main"), x(0), y(0), z(0) {}
    VoxelLocation(std::string dimension, float x, float y, float z) : dimension(dimension), x(x), y(y), z(z) {}

    // Copy constructor
    VoxelLocation(const VoxelLocation &other) : x(other.x), y(other.y), z(other.z) {}

    // Assignment operator
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

    // Vector addition
    VoxelLocation operator+(const VoxelLocation &other) const
    {
        return VoxelLocation(dimension, x + other.x, y + other.y, z + other.z);
    }

    // Vector subtraction
    VoxelLocation operator-(const VoxelLocation &other) const
    {
        return VoxelLocation(dimension, x - other.x, y - other.y, z - other.z);
    }

    // Scalar multiplication
    VoxelLocation operator*(float scalar) const
    {
        return VoxelLocation(dimension, x * scalar, y * scalar, z * scalar);
    }

    // Dot product
    float dot(const VoxelLocation &other) const
    {
        return x * other.x + y * other.y + z * other.z;
    }

    // Cross product
    VoxelLocation cross(const VoxelLocation &other) const
    {
        return VoxelLocation(
            dimension,
            y * other.z - z * other.y,
            z * other.x - x * other.z,
            x * other.y - y * other.x);
    }

    // Normalize the vector
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

    // Magnitude of the vector
    float magnitude() const
    {
        return std::sqrt(x * x + y * y + z * z);
    }
};

#endif