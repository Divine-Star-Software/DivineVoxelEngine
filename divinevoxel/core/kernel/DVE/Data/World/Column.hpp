#ifndef Column_Module
#define Column_Module
#include <vector>
#include "./Chunk.hpp"
class Column
{
public:
    Column(std::vector<uint8_t> *_stateBuffer) : stateBuffer(_stateBuffer) {}
    std::vector<uint8_t> *stateBuffer;
    std::vector<Chunk *> *chunks = new std::vector<Chunk *>();
};

#endif // Column_Module