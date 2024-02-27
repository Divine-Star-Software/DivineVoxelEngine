#ifndef Region_Module
#define Region_Module
#include <vector>
#include <unordered_map>
class Region
{

public:
    Region(std::vector<uint8_t> *_stateBuffer) : stateBuffer(_stateBuffer) {}
    std::vector<uint8_t> *stateBuffer;
    std::unordered_map<uint16_t, Region *> *columns = new std::unordered_map<uint16_t, Region *>();
};

#endif // Region_Module