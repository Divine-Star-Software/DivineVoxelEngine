#ifndef BufferToDBO_Module
#define BufferToDBO_Module
#include "../../binary/DataView.hpp"
#include "../DBONodes.hpp"
namespace DBO
{
    class BufferToDBO
    {
    public:
        BufferToDBO();
        DBONode *create(Binary::DataView *view);
    };
}
#endif // BufferToDBO_Module