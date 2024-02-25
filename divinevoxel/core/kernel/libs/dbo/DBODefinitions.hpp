#ifndef DBO_Definitions_Module
#define DBO_Definitions_Module
#include <variant>
#include <string>
#include <optional>
#include <map>
#include <vector>


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

enum DBOPrimitive {
    DBOPrimitive_Int8,
    DBOPrimitive_UInt8,
    DBOPrimitive_UIntClamped8,
    DBOPrimitive_Int16,
    DBOPrimitive_UInt16,
    DBOPrimitive_Float32,
    DBOPrimitive_Int32,
    DBOPrimitive_UInt32,
    DBOPrimitive_Float64,
    DBOPrimitive_BigInt,
    DBOPrimitive_BigUInt,
};
enum DBORich {
    DBORich_FixedTypedArray,
    DBORich_FixedString,
    DBORich_String,
    DBORich_FixedStringArray,
    DBORich_StringArray,
    DBORich_TypedArray,
    DBORich_JSON,
    DBORich_DBO,
    DBORich_Boolean,
    DBORich_Undefined,
};
#endif // DBO_Definitions_Module