#include <iostream>
#include <map>
#include <vector>
#include <functional>
#include <string>

#include "../DBONodes.hpp"
#include "../DBODefinitions.hpp"
#include "../../binary/DataView.hpp"
#include "../../binary/BinaryDefinitions.hpp"

#include "BufferToDBO.hpp"

#include <stdexcept> // Include for std::runtime_error

class DBOBuilder
{
public:
    std::string name;

    DBONode *current;
    std::vector<DBONode *> parents;

    DataView *view;

    DBOBuilder(DataView *externalView) : view(externalView)
    {
    }
    void assign(DBONode *value)
    {
        if (current->type() == DBOMarkers_Object)
        {
            current->object()->insert({name, value});
        }
        if (current->type() == DBOMarkers_Array)
        {
            current->array()->push_back(value);
        }
    }

    void increment(int index)
    {
        _index = index + _index;
    }

    int index()
    {
        return _index;
    }

private:
    int _index;
};

std::map<DBOMarkers, std::function<void(DBOBuilder *builder)>> makrerMap;

DBONode *BufferToDBO::create(DataView *view)
{
    if (view->size() < 4)
    {
        throw std::runtime_error("Error while creating DBO from buffer. The provided buffer is too small. Size = " + std::to_string(view->size()));
    }
    DBOBuilder *builder = new DBOBuilder(view);

    int length = view->size();
    while (builder->index() < length)
    {
        DBOMarkers marker = static_cast<DBOMarkers>(view->getUint8(builder->index()));
        makrerMap[marker](builder);
    }

    if (builder->parents.size() == 0)
    {
        throw std::runtime_error("Error while creating DBO from buffer. There were no objects.");
    }

    return builder->parents.front();
}

BufferToDBO::BufferToDBO()
{
    makrerMap[DBOMarkers_Start] = [](DBOBuilder *builder) -> void
    {
        builder->increment(ByteCounts_UInt8);
    };
    makrerMap[DBOMarkers_End] = [](DBOBuilder *builder) -> void
    {
        builder->increment(ByteCounts_UInt8);
    };
    makrerMap[DBOMarkers_Name] = [](DBOBuilder *builder) -> void
    {
        int length = builder->view->getUint8(builder->index() + ByteCounts_UInt8);
        builder->increment(ByteCounts_UInt8 * 2);
        builder->name = "";
        for (int i = builder->index(); i < builder->index() + length * ByteCounts_UInt16; i += ByteCounts_UInt16)
        {
            builder->name += static_cast<char>(builder->view->getUint8(i + 1));
        }
        builder->increment(length * ByteCounts_UInt16);
    };
    makrerMap[DBOMarkers_Object] = [](DBOBuilder *builder) -> void
    { builder->increment(ByteCounts_UInt8); };
    makrerMap[DBOMarkers_ObjectStart] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBONodeObject();
        if (builder->parents.size() > 0)
        {
            builder->assign(node);
        }
        builder->parents.push_back(node);
        builder->current = node;
        builder->increment(ByteCounts_UInt8);
    };

    makrerMap[DBOMarkers_ObjectEnd] = [](DBOBuilder *builder) -> void
    {
        builder->increment(ByteCounts_UInt8);
        if (builder->parents.size() == 1)
            return;
        builder->parents.pop_back();
        builder->current = builder->parents.back();
    };

    makrerMap[DBOMarkers_Array] = [](DBOBuilder *builder) -> void
    { builder->increment(ByteCounts_UInt8); };
    makrerMap[DBOMarkers_ArrayStart] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBONodeArray();
        if (builder->parents.size() > 0)
        {
            builder->assign(node);
        }
        builder->parents.push_back(node);
        builder->current = node;
        builder->increment(ByteCounts_UInt8);
    };
    makrerMap[DBOMarkers_ArrayEnd] = [](DBOBuilder *builder) -> void
    {
        builder->increment(ByteCounts_UInt8);
        if (builder->parents.size() == 1)
            return;
        builder->parents.pop_back();
        builder->current = builder->parents.back();
    };
    makrerMap[DBOMarkers_Boolean] = [](DBOBuilder *builder) -> void
    {
        int value = builder->view->getUint8(
            builder->index() + ByteCounts_UInt8);
        DBONode *node = new DBONodeBoolean(value ? true : false);
        builder->increment(ByteCounts_UInt8 * 2);
        builder->assign(node);
    };
    makrerMap[DBOMarkers_Undefined] = [](DBOBuilder *builder) -> void
    {
        builder->increment(ByteCounts_UInt8);
        DBONode *node = new DBONodeUndefined();
        builder->assign(node);
    };
    makrerMap[DBOMarkers_Int8] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOInt8Node(builder->view->getInt8(builder->index() + ByteCounts_UInt8));
        builder->assign(node);
        builder->increment(ByteCounts_UInt8 + ByteCounts_Int8);
    };
    makrerMap[DBOMarkers_UInt8] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOUInt8Node(builder->view->getUint8(builder->index() + ByteCounts_UInt8));
        builder->assign(node);
        builder->increment(ByteCounts_UInt8 * 2);
    };
    makrerMap[DBOMarkers_Int16] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOInt16Node(builder->view->getInt16(builder->index() + ByteCounts_UInt8));
        builder->assign(node);
        builder->increment(ByteCounts_UInt8 + ByteCounts_Int16);
    };
    makrerMap[DBOMarkers_UInt16] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOUInt16Node(builder->view->getUint16(builder->index() + ByteCounts_UInt8));
        builder->assign(node);
        builder->increment(ByteCounts_UInt8 + ByteCounts_UInt16);
    };
    makrerMap[DBOMarkers_UInt32] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOUInt32Node(builder->view->getUint32(builder->index() + ByteCounts_UInt8));
        builder->assign(node);
        builder->increment(ByteCounts_UInt8 + ByteCounts_UInt32);
    };
    makrerMap[DBOMarkers_Int32] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOInt32Node(builder->view->getInt32(builder->index() + ByteCounts_UInt8));
        builder->assign(node);
        builder->increment(ByteCounts_UInt8 + ByteCounts_Int32);
    };
    makrerMap[DBOMarkers_Float32] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOFloat32Node(builder->view->getFloat32(builder->index() + ByteCounts_UInt8));
        builder->assign(node);
        builder->increment(ByteCounts_UInt8 + ByteCounts_Float32);
    };

    makrerMap[DBOMarkers_UInt64] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOUInt64Node(builder->view->getFloat64(builder->index() + ByteCounts_UInt8));
        builder->assign(node);
        builder->increment(ByteCounts_UInt8 + ByteCounts_Float64);
    };
    makrerMap[DBOMarkers_Int64] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOInt64Node(builder->view->getFloat64(builder->index() + ByteCounts_UInt8));
        builder->assign(node);
        builder->increment(ByteCounts_UInt8 + ByteCounts_Float64);
    };
    makrerMap[DBOMarkers_Float64] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOFloat64Node(builder->view->getFloat64(builder->index() + ByteCounts_UInt8));
        builder->assign(node);
        builder->increment(ByteCounts_UInt8 + ByteCounts_Float64);
    };
    // unused
    makrerMap[DBOMarkers_FixedTypedArray] = [](DBOBuilder *builder) -> void
    { builder->increment(ByteCounts_UInt8); };
    // unused
    makrerMap[DBOMarkers_FixedString] = [](DBOBuilder *builder) -> void
    { builder->increment(ByteCounts_UInt8); };
    // unused
    makrerMap[DBOMarkers_StringArray] = [](DBOBuilder *builder) -> void
    { builder->increment(ByteCounts_UInt8); };
    makrerMap[DBOMarkers_String] = [](DBOBuilder *builder) -> void
    {
        int length = builder->view->getUint32(builder->index() + ByteCounts_UInt8);
        builder->increment(ByteCounts_UInt8 * ByteCounts_UInt32);
        std::string newString;
        for (int i = builder->index(); i < builder->index() + length * ByteCounts_UInt16; i += ByteCounts_UInt16)
        {
            newString += std::to_string(builder->view->getUint16(i));
        }
        DBONode *node = new DBONodeString(newString);
        builder->assign(node);
        builder->increment(length * ByteCounts_UInt16);
    };
    makrerMap[DBOMarkers_TypedArray] = [](DBOBuilder *builder) -> void
    {
        builder->increment(ByteCounts_UInt8);
    };
    // unused
    makrerMap[DBOMarkers_JSON] = [](DBOBuilder *builder) -> void
    { builder->increment(ByteCounts_UInt8); };
    // unused
    makrerMap[DBOMarkers_DBO] = [](DBOBuilder *builder) -> void
    { builder->increment(ByteCounts_UInt8); };
};
