
#ifndef VoxelPalette_Module
#define VoxelPalette_Module
#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>
#include <sstream>
#include <stdexcept> // Include for std::runtime_error
class VoxelPalette
{

public:
    void setData(std::unordered_map<uint16_t, std::string> palette,
                 std::unordered_map<std::string, uint16_t> paletteMap)
    {
        _palette = palette;
        _paletteMap = paletteMap;
    };

    std::string stringFromNumber(uint16_t id)
    {
        return _palette[id];
    };

    uint16_t numberFromString(std::string id)
    {
        return _paletteMap[id];
    };

    uint16_t getPaletteId(std::string voxelId, uint16_t voxelState)
    {

        uint16_t numericID = _paletteMap[voxelId];
        uint16_t stateId = voxelState + numericID;
        if (_palette[stateId] != voxelId)
        {
            throw std::runtime_error("State or ID for voxel lool up was not correct.");
        }
        if (stateId)
        {
            return stateId;
        }

        throw std::runtime_error("State or ID for voxel lool up was not correct.");
    };

    uint16_t baseNumeric(uint16_t id)
    {
        if (id < 2)
            return id;
        uint16_t vid = numberFromString(stringFromNumber(id));
        if (!vid)
            return -1;
        return vid;
    };

private:
    std::unordered_map<uint16_t, std::string> _palette;
    std::unordered_map<std::string, uint16_t> _paletteMap;
};

#endif // VoxelPalette_Module
