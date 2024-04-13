#ifndef DBO_Definitions_Module
#define DBO_Definitions_Module
#include <variant>
#include <string>
#include <optional>
#include <unordered_map>
#include <vector>
namespace DBO
{

    enum DBOMarkers
    {
        DBOMarkers_Start,
        DBOMarkers_End,
        DBOMarkers_Object,
        DBOMarkers_ObjectStart,
        DBOMarkers_ObjectEnd,
        DBOMarkers_Array,
        DBOMarkers_ArrayStart,
        DBOMarkers_ArrayEnd,
        DBOMarkers_Name,
        DBOMarkers_Int8,
        DBOMarkers_UInt8,
        DBOMarkers_UIntClamped8,
        DBOMarkers_Int16,
        DBOMarkers_UInt16,
        DBOMarkers_Float32,
        DBOMarkers_Int32,
        DBOMarkers_UInt32,
        DBOMarkers_Float64,
        DBOMarkers_Int64,
        DBOMarkers_UInt64,
        DBOMarkers_FixedTypedArray,
        DBOMarkers_FixedString,
        DBOMarkers_String,
        DBOMarkers_FixedStringArray,
        DBOMarkers_StringArray,
        DBOMarkers_TypedArray,
        DBOMarkers_JSON,
        DBOMarkers_DBO,
        DBOMarkers_Boolean,
        DBOMarkers_Undefined,
    };
}
#endif // DBO_Definitions_Module