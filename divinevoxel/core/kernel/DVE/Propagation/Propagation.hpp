#ifndef Propagation_Module
#define Propagation_Module
#include "../Spaces/Location.hpp"
#include "./Illumanation/Illumanation.hpp"

namespace DVE
{
    class Propagation
    {
    private:
        Propagation() {}
        Propagation(const Propagation &) = delete;

        static const Propagation *instance;

    public:
        const Illumanation &illumanation = Illumanation::getInstance();

        static const Propagation &getInstance()
        {
            if (!instance)
            {
                instance = new Propagation();
            }
            return *instance;
        }
    };
}
#endif // Propagation_Module