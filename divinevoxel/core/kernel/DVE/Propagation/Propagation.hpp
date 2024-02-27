#ifndef Propagation_Module
#define Propagation_Module
#include "../Spaces/Location.hpp"
#include "../DVEKernel.hpp"
#include "./Illumanation/Illumanation.hpp"
class Propagation
{

public:
    DVEKernel const &DVE;
    Illumanation *illumanation;
    Propagation(DVEKernel const &_DVE) : DVE(_DVE)
    {
        illumanation = new Illumanation(DVE);
    }
};

#endif // Propagation_Module