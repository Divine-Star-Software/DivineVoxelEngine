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
namespace DVE
{
    class WorldDataRegister
    {

    private:
        WorldDataRegister() {}
        WorldDataRegister(const WorldDataRegister &) = delete;

        static WorldDataRegister *instance;

    public:
        static WorldDataRegister &getInstance()
        {
            if (!instance)
            {
                instance = new WorldDataRegister();
            }
            return *instance;
        }

        std::unordered_map<std::string, Dimension *> *_register = new std::unordered_map<std::string, Dimension *>();

        Dimension *addDimension(std::string id) const
        {
            Dimension *newDimension = new Dimension(id);
            _register->insert({id, newDimension});
            return newDimension;
        }
        std::optional<Dimension *> getDimension(std::string id) const
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

        Region *addRegion(VoxelLocation location, Region *region) const
        {
            return region;
        }
        std::optional<Region *> getRegion(VoxelLocation location) const
        {
            return std::nullopt;
        }
        bool removeRegion(VoxelLocation location)
        {
            return true;
        }

        Column *addColumn(VoxelLocation location, Column *column) const
        {
            return column;
        }
        std::optional<Column *> getColumn(VoxelLocation location) const
        {
            return std::nullopt;
        }
        bool removeColumn(VoxelLocation location)
        {
            return true;
        }

        Chunk *addChunk(VoxelLocation location, Chunk *chunk) const
        {
            return chunk;
        }
        std::optional<Chunk *> getChunk(VoxelLocation location) const
        {
            return std::nullopt;
        }
        bool removeChunk(VoxelLocation location) const
        {
            return true;
        }
    };
}
#endif // WorldDataRegister_Module