#ifndef Chunk_Module
#define Chunk_Module
#include <vector>
class Chunk
{
public:
    std::vector<uint8_t> *stateBuffer;
    std::vector<uint16_t> *voxelIds;
    std::vector<uint16_t> *voxelLight;
    std::vector<uint16_t> *voxelState;
    std::vector<uint16_t> *voxelSecondaryIds;
    Chunk(
        std::vector<uint8_t> *_stateBuffer,
        std::vector<uint16_t> *_voxelIds,
        std::vector<uint16_t> *_voxelLight,
        std::vector<uint16_t> *_voxelState,
        std::vector<uint16_t> *_voxelSecondaryIds) : stateBuffer(_stateBuffer),
                                                     voxelIds(_voxelIds),
                                                     voxelLight(_voxelLight),
                                                     voxelState(_voxelState),
                                                     voxelSecondaryIds(_voxelSecondaryIds)
    {
    }
};

#endif // Chunk_Module