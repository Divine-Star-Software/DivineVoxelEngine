#ifndef TypedArray_Module
#define TypedArray_Module
#include "./BinaryDefinitions.hpp"
#include "./DataView.hpp"
#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>
#include <sstream>
#include <stdexcept> // Include for std::runtime_error

#include <vector>
#include <stdexcept>
#include <cstring>
#include <iostream>
namespace Binary
{
    // Assume DataView is defined as before

    template <typename T>
    class TypedArray
    {
    public:
        // Proxy class for element access
        class ElementProxy
        {
        private:
            TypedArray &array;
            size_t index;

        public:
            ElementProxy(TypedArray &arr, size_t idx) : array(arr), index(idx) {}

            // Assignment operator for writing through the proxy
            ElementProxy &operator=(T value)
            {
                array.set(index, value);
                return *this;
            }

            // Type conversion operator for reading through the proxy
            operator T() const
            {
                return array.get(index);
            }
        };

    private:
        DataView &dataView;
        size_t length;

    public:
        TypedArray(DataView &dv, size_t len = 0) : dataView(dv), length(len)
        {
            if (length == 0)
            {
                length = dv.size() / sizeof(T);
            }
        }

        T get(size_t index) const
        {
            if (index >= length)
            {
                throw std::out_of_range("Index is out of the array's bounds");
            }
            return dataView.read<T>(index * sizeof(T));
        }

        void set(size_t index, T value)
        {
            if (index >= length)
            {
                throw std::out_of_range("Index is out of the array's bounds");
            }
            dataView.write<T>(index * sizeof(T), value);
        }

        // Overload the [] operator to use the ElementProxy
        ElementProxy operator[](size_t index)
        {
            return ElementProxy(*this, index);
        }

        size_t size() const
        {
            return length;
        }
    };
}
#endif