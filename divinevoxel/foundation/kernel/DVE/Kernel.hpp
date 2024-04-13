#ifndef DVEKernel_Module
#define DVEKernel_Module
#include "./Data/Data.hpp"
#include "./Propagation/Propagation.hpp"
#include "./Spaces/Location.hpp"
namespace DVE
{
    class Kernel
    {
    private:
        Kernel() {}
        Kernel(const Kernel &) = delete;
        Kernel &operator=(const Kernel &) = delete;

        static const Kernel *instance;

    public:
        const Data &data = Data::getInstance();
        const Propagation &propagation = Propagation::getInstance();

        static const Kernel &getInstance() 
        {
            if (!instance)
            {
                instance = new Kernel();
            }
            return *instance;
        }
    };

}
#endif // DVEKernel_Module