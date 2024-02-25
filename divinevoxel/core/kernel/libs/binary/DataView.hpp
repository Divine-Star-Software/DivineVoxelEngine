
#ifndef DataView_Module
#define DataView_Module

#include <vector>
#include <iostream>
#include <cstring>
#include <algorithm>
#include <stdexcept>

class DataView
{

private:
    std::vector<uint8_t> buffer;

    template <typename T>
    T read(size_t offset, bool littleEndian) const
    {
        T value;
        const size_t size = sizeof(T);
        if (offset + size > buffer.size())
        {
            throw std::out_of_range("Offset is out of the buffer's bounds");
        }
        uint8_t temp[size];
        std::copy(buffer.begin() + offset, buffer.begin() + offset + size, temp);
        if (!littleEndian && size > 1)
        {
            std::reverse(temp, temp + size);
        }
        std::memcpy(&value, temp, size);
        return value;
    }

    template <typename T>
    void write(size_t offset, T value, bool littleEndian)
    {
        const size_t size = sizeof(T);
        if (offset + size > buffer.size())
        {
            buffer.resize(offset + size);
        }
        uint8_t temp[size];
        std::memcpy(temp, &value, size);
        if (!littleEndian && size > 1)
        {
            std::reverse(temp, temp + size);
        }
        std::copy(temp, temp + size, buffer.begin() + offset);
    }

public:
    DataView(std::vector<uint8_t> &externalBuffer) : buffer(externalBuffer) {}

    // Signed integers
    int8_t getInt8(size_t offset) const
    {
        return read<int8_t>(offset, true); // Endianness doesn't matter for 1 byte
    }

    int16_t getInt16(size_t offset, bool littleEndian = true) const
    {
        return read<int16_t>(offset, littleEndian);
    }

    int32_t getInt32(size_t offset, bool littleEndian = true) const
    {
        return read<int32_t>(offset, littleEndian);
    }

    // Unsigned integers
    uint8_t getUint8(size_t offset) const
    {
        return read<uint8_t>(offset, true); // Endianness doesn't matter for 1 byte
    }

    uint16_t getUint16(size_t offset, bool littleEndian = true) const
    {
        return read<uint16_t>(offset, littleEndian);
    }

    uint32_t getUint32(size_t offset, bool littleEndian = true) const
    {
        return read<uint32_t>(offset, littleEndian);
    }

    // Floating point
    float getFloat32(size_t offset, bool littleEndian = true) const
    {
        return read<float>(offset, littleEndian);
    }

    double getFloat64(size_t offset, bool littleEndian = true) const
    {
        return read<double>(offset, littleEndian);
    }

  
    void setInt8(size_t offset, int8_t value)
    {
        write<int8_t>(offset, value, true); // Endianness doesn't matter for 1 byte
    }

    void setUint8(size_t offset, uint8_t value)
    {
        write<uint8_t>(offset, value, true); // Endianness doesn't matter for 1 byte
    }

    void setInt16(size_t offset, int16_t value, bool littleEndian = true)
    {
        write<int16_t>(offset, value, littleEndian);
    }

    void setUint16(size_t offset, uint16_t value, bool littleEndian = true)
    {
        write<uint16_t>(offset, value, littleEndian);
    }

    void setInt32(size_t offset, int32_t value, bool littleEndian = true)
    {
        write<int32_t>(offset, value, littleEndian);
    }

    void setUint32(size_t offset, uint32_t value, bool littleEndian = true)
    {
        write<uint32_t>(offset, value, littleEndian);
    }

    void setFloat32(size_t offset, float value, bool littleEndian = true)
    {
        write<float>(offset, value, littleEndian);
    }

    void setFloat64(size_t offset, double value, bool littleEndian = true)
    {
        write<double>(offset, value, littleEndian);
    }

    
    size_t size() const
    {
        return buffer.size();
    }
};

#endif // DataView_Module