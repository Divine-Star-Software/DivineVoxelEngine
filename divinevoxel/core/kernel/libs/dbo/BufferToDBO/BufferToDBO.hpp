#ifndef BufferToDBO_Module
#define BufferToDBO_Module
#include "../../binary/DataView.hpp"
#include "../DBONodes.hpp"
class BufferToDBO
{
public:
    BufferToDBO();
    DBONode *create(DataView* view);


};

#endif // BufferToDBO_Module