#ifndef DVEKernel_Module
#define DVEKernel_Module
#include "./Data/DVEData.hpp"
#include "./Propagation/Propagation.hpp"
#include "./Spaces/Location.hpp"
class DVEKernel
{
public:
    DVEData *data = new DVEData();
    Propagation *propagation;
    DVEKernel()
    {
        propagation = new Propagation(*this);
    }
};

#endif // DVEKernel_Module