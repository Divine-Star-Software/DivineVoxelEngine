#ifndef Dimension_Module
#define Dimension_Module
#include <unordered_map>
#include <string>
#include "./Region.hpp"
class Dimension
{
public:
    std::string id;
    Dimension(std::string _id) : id(_id) {}
    std::unordered_map<std::string, Region*> *regions = new std::unordered_map<std::string, Region*>();
};

#endif // Dimension_Module