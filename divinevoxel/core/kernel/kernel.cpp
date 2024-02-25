#include "./libs/binary/DataView.hpp"
#include "./libs/dbo/DBO.hpp"
#include <variant>
#include <iostream>
#include <string>
#include <cstdio>

DataView *sabToDataView(void *buffer, int size)
{
    std::vector<uint8_t> bufferVector(static_cast<uint8_t *>(buffer), static_cast<uint8_t *>(buffer) + size);
    DataView *view = new DataView(bufferVector);
    return view;
}

int main()
{
    return 0;
}

extern "C"
{
    void setSharedBuffer(void *buffer, int size)
    {
        sabToDataView(buffer, size);
    }
    void bufferToDBO(void *buffer, int size)
    {
        auto view = *sabToDataView(buffer, size);
        DBO dbo;
        auto object = dbo.bufferToDBO.create(&view);

        printf(object->toString().c_str());
    }
}
