#ifndef WorldDataRegister_Module
#define WorldDataRegister_Module
#include <unordered_map>
#include <string>
#include <optional>
#include "./Dimension.hpp"
#include "./Region.hpp"
#include "./Column.hpp"
#include "./Chunk.hpp"
#include "../../Spaces/Location.hpp"
class WorldDataRegister
{

public:
    std::unordered_map<std::string, Dimension *> *_register = new std::unordered_map<std::string, Dimension *>();

    Dimension *addDimension(std::string id)
    {
        Dimension *newDimension = new Dimension(id);
        _register->insert({id, newDimension});
        return newDimension;
    }
    std::optional<Dimension *> getDimension(std::string id)
    {
        auto it = _register->find(id); // Use find() to search for the key
        if (it != _register->end())
        {
            return it->second;
        }
        else
        {
            return std::nullopt;
        }
    }

    Region *addRegion(VoxelLocation location, Region *region)
    {
    }
    std::optional<Region *> getRegion(VoxelLocation location)
    {
    }
    bool removeRegion(VoxelLocation location)
    {
    }

    Column *addColumn(VoxelLocation location, Column *column)
    {
    }
    std::optional<Column *> getColumn(VoxelLocation location)
    {
    }
    bool removeColumn(VoxelLocation location)
    {
    }

    Chunk *addChunk(VoxelLocation location, Chunk *chunk)
    {
    }
    std::optional<Chunk *> getChunk(VoxelLocation location)
    {
    }
    bool removeChunk(VoxelLocation location)
    {
    }
};

#endif // WorldDataRegister_Module