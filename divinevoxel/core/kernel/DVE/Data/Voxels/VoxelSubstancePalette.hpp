
#ifndef VoxelSubstancePalette_Module
#define VoxelSubstancePalette_Module
#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>
#include <sstream>
#include <stdexcept> // Include for std::runtime_error
class VoxelSubstancePalette
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
private:
    std::unordered_map<uint16_t, std::string> _palette;
    std::unordered_map<std::string, uint16_t> _paletteMap;
};

#endif // VoxelSubstancePalette_Module
