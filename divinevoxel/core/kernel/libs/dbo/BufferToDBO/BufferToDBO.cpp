#include <iostream>
#include <unordered_map>
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

std::unordered_map<DBOMarkers, std::function<DBONode *(DBOBuilder *builder, uint32_t length)>> typedArrayMap;

std::unordered_map<DBOMarkers, std::function<void(DBOBuilder *builder)>> makrerMap;

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

        if (makrerMap.find(marker) == makrerMap.end())
        {
            std::string errorMarker = std::to_string(marker);
            std::string errorIndex = std::to_string(builder->index());
            std::string errorMessage = "Marker with number id: " + errorMarker + " does not exist. Index at: " + errorIndex;
            throw std::runtime_error(errorMessage);
        }
        builder->increment(ByteCounts_UInt8);
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
    typedArrayMap[DBOMarkers_Int8] = [](DBOBuilder *builder, uint32_t length) -> DBONode *
    {
        DBONode *node = new DBOInt8ArrayNode();
        auto *array = node->int8Array();
        for (int i = builder->index(); i < builder->index() + length; i += ByteCounts_Int8)
        {
            array->push_back(builder->view->getInt8(i));
        }
        builder->increment(ByteCounts_Int8 * length);
        return node;
    };
    typedArrayMap[DBOMarkers_UInt8] = [](DBOBuilder *builder, uint32_t length) -> DBONode *
    {
        DBONode *node = new DBOUInt8ArrayNode();
        auto *array = node->uint8Array();
        for (int i = builder->index(); i < builder->index() + length; i += ByteCounts_UInt8)
        {
            array->push_back(builder->view->getUint8(i));
        }

        builder->increment(ByteCounts_UInt8 * length);
        return node;
    };
    typedArrayMap[DBOMarkers_Int16] = [](DBOBuilder *builder, uint32_t length) -> DBONode *
    {
        DBONode *node = new DBOInt16ArrayNode();
        auto *array = node->int16Array();
        for (int i = builder->index(); i < builder->index() + length * ByteCounts_Int16; i += ByteCounts_Int16)
        {
            array->push_back(builder->view->getInt16(i));
        }
        builder->increment(ByteCounts_Int16 * length);
        return node;
    };
    typedArrayMap[DBOMarkers_UInt16] = [](DBOBuilder *builder, int32_t length) -> DBONode *
    {
        DBONode *node = new DBOUInt16ArrayNode();
        auto *array = node->uint16Array();
        for (int i = builder->index(); i < builder->index() + length * ByteCounts_UInt16; i += ByteCounts_UInt16)
        {
            array->push_back(builder->view->getInt16(i));
        }
        builder->increment(ByteCounts_UInt16 * length);
        return node;
    };

    typedArrayMap[DBOMarkers_Int32] = [](DBOBuilder *builder, uint32_t length) -> DBONode *
    {
        DBONode *node = new DBOInt32ArrayNode();
        auto *array = node->int32Array();
        for (int i = builder->index(); i < builder->index() + length * ByteCounts_Int32; i += ByteCounts_Int32)
        {
            array->push_back(builder->view->getInt32(i));
        }
        builder->increment(ByteCounts_Int32 * length);
        return node;
    };
    typedArrayMap[DBOMarkers_UInt32] = [](DBOBuilder *builder, uint32_t length) -> DBONode *
    {
        DBONode *node = new DBOUInt32ArrayNode();
        auto *array = node->uint32Array();
        for (int i = builder->index(); i < builder->index() + length * ByteCounts_UInt32; i += ByteCounts_UInt32)
        {
            array->push_back(builder->view->getInt32(i));
        }
        builder->increment(ByteCounts_UInt32 * length);
        return node;
    };
    typedArrayMap[DBOMarkers_Float32] = [](DBOBuilder *builder, uint32_t length) -> DBONode *
    {
        DBONode *node = new DBOUInt32ArrayNode();
        auto *array = node->float32Array();
        for (int i = builder->index(); i < builder->index() + length * ByteCounts_Float32; i += ByteCounts_Float32)
        {
            array->push_back(builder->view->getFloat32(i));
        }
        builder->increment(ByteCounts_Float32 * length);
        return node;
    };

    typedArrayMap[DBOMarkers_Int64] = [](DBOBuilder *builder, uint32_t length) -> DBONode *
    {
        DBONode *node = new DBOInt64ArrayNode();
        auto *array = node->int64Array();
        for (int i = builder->index(); i < builder->index() + length * ByteCounts_Int64; i += ByteCounts_Int64)
        {
            array->push_back(builder->view->getFloat64(i));
        }
        builder->increment(ByteCounts_Int64 * length);
        return node;
    };
    typedArrayMap[DBOMarkers_UInt64] = [](DBOBuilder *builder, uint32_t length) -> DBONode *
    {
        DBONode *node = new DBOUInt64ArrayNode();
        auto *array = node->uint64Array();
        for (int i = builder->index(); i < builder->index() + length * ByteCounts_UInt64; i += ByteCounts_UInt64)
        {
            array->push_back(builder->view->getFloat64(i));
        }
        builder->increment(ByteCounts_UInt64 * length);
        return node;
    };
    typedArrayMap[DBOMarkers_Float64] = [](DBOBuilder *builder, uint32_t length) -> DBONode *
    {
        DBONode *node = new DBOUInt64ArrayNode();
        auto *array = node->float64Array();
        for (int i = builder->index(); i < builder->index() + length * ByteCounts_Float64; i += ByteCounts_Float64)
        {
            array->push_back(builder->view->getFloat64(i));
        }
        builder->increment(ByteCounts_Float64 * length);
        return node;
    };

    makrerMap[DBOMarkers_Start] = [](DBOBuilder *builder) -> void {

    };
    makrerMap[DBOMarkers_End] = [](DBOBuilder *builder) -> void {

    };
    makrerMap[DBOMarkers_Name] = [](DBOBuilder *builder) -> void
    {
        int length = builder->view->getUint8(builder->index());
        builder->increment(ByteCounts_UInt8);
        builder->name = "";
        for (int i = builder->index(); i < builder->index() + length * ByteCounts_UInt16; i += ByteCounts_UInt16)
        {
            builder->name += static_cast<char>(builder->view->getUint8(i + 1));
        }
        builder->increment(length * ByteCounts_UInt16);
    };
    makrerMap[DBOMarkers_Object] = [](DBOBuilder *builder) -> void {};
    makrerMap[DBOMarkers_ObjectStart] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBONodeObject();
        if (builder->parents.size() > 0)
        {
            builder->assign(node);
        }
        builder->parents.push_back(node);
        builder->current = node;
    };

    makrerMap[DBOMarkers_ObjectEnd] = [](DBOBuilder *builder) -> void
    {
        if (builder->parents.size() == 1)
            return;
        builder->parents.pop_back();
        builder->current = builder->parents.back();
    };

    makrerMap[DBOMarkers_Array] = [](DBOBuilder *builder) -> void {};
    makrerMap[DBOMarkers_ArrayStart] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBONodeArray();
        if (builder->parents.size() > 0)
        {
            builder->assign(node);
        }
        builder->parents.push_back(node);
        builder->current = node;
    };
    makrerMap[DBOMarkers_ArrayEnd] = [](DBOBuilder *builder) -> void
    {
        if (builder->parents.size() == 1)
            return;
        builder->parents.pop_back();
        builder->current = builder->parents.back();
    };
    makrerMap[DBOMarkers_Boolean] = [](DBOBuilder *builder) -> void
    {
        int value = builder->view->getUint8(builder->index());
        DBONode *node = new DBONodeBoolean(value ? true : false);
        builder->increment(ByteCounts_UInt8);
        builder->assign(node);
    };
    makrerMap[DBOMarkers_Undefined] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBONodeUndefined();
        builder->assign(node);
    };
    makrerMap[DBOMarkers_Int8] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOInt8Node(builder->view->getInt8(builder->index()));
        builder->assign(node);
        builder->increment(ByteCounts_Int8);
    };
    makrerMap[DBOMarkers_UInt8] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOUInt8Node(builder->view->getUint8(builder->index()));
        builder->assign(node);
        builder->increment(ByteCounts_UInt8);
    };
    makrerMap[DBOMarkers_Int16] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOInt16Node(builder->view->getInt16(builder->index()));
        builder->assign(node);
        builder->increment(ByteCounts_Int16);
    };
    makrerMap[DBOMarkers_UInt16] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOUInt16Node(builder->view->getUint16(builder->index()));
        builder->assign(node);
        builder->increment(ByteCounts_UInt16);
    };
    makrerMap[DBOMarkers_UInt32] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOUInt32Node(builder->view->getUint32(builder->index()));
        builder->assign(node);
        builder->increment(ByteCounts_UInt32);
    };
    makrerMap[DBOMarkers_Int32] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOInt32Node(builder->view->getInt32(builder->index()));
        builder->assign(node);
        builder->increment(ByteCounts_Int32);
    };
    makrerMap[DBOMarkers_Float32] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOFloat32Node(builder->view->getFloat32(builder->index()));
        builder->assign(node);
        builder->increment(ByteCounts_Float32);
    };

    makrerMap[DBOMarkers_UInt64] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOUInt64Node(builder->view->getFloat64(builder->index()));
        builder->assign(node);
        builder->increment(ByteCounts_Float64);
    };
    makrerMap[DBOMarkers_Int64] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOInt64Node(builder->view->getFloat64(builder->index()));
        builder->assign(node);
        builder->increment(ByteCounts_Float64);
    };
    makrerMap[DBOMarkers_Float64] = [](DBOBuilder *builder) -> void
    {
        DBONode *node = new DBOFloat64Node(builder->view->getFloat64(builder->index()));
        builder->assign(node);
        builder->increment(ByteCounts_Float64);
    };
    // unused
    makrerMap[DBOMarkers_FixedTypedArray] = [](DBOBuilder *builder) -> void {};
    // unused
    makrerMap[DBOMarkers_FixedString] = [](DBOBuilder *builder) -> void {};
    // unused
    makrerMap[DBOMarkers_StringArray] = [](DBOBuilder *builder) -> void {};
    makrerMap[DBOMarkers_String] = [](DBOBuilder *builder) -> void
    {
        int length = builder->view->getUint32(builder->index());
        builder->increment(ByteCounts_UInt32);
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
        DBOMarkers type = static_cast<DBOMarkers>(builder->view->getUint8(builder->index()));
        auto length = builder->view->getUint32(builder->index() + ByteCounts_UInt8);
        builder->increment(ByteCounts_UInt32 + ByteCounts_UInt8);
        builder->assign(typedArrayMap[type](builder, length));
    };
    // unused
    makrerMap[DBOMarkers_JSON] = [](DBOBuilder *builder) -> void {};
    // unused
    makrerMap[DBOMarkers_DBO] = [](DBOBuilder *builder) -> void {};
};
