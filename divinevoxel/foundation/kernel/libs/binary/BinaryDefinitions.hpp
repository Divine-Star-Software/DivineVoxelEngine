#ifndef BinaryDefinitions_Module
#define BinaryDefinitions_Module

namespace Binary
{
    enum ByteCounts
    {
        ByteCounts_Int8 = 1,
        ByteCounts_UInt8 = 1,
        ByteCounts_UIntClamped8 = 1,
        ByteCounts_Int16 = 2,
        ByteCounts_UInt16 = 2,
        ByteCounts_Float32 = 4,
        ByteCounts_Int32 = 4,
        ByteCounts_UInt32 = 4,
        ByteCounts_Float64 = 8,
        ByteCounts_UInt64 = 8,
        ByteCounts_Int64 = 8,
    };

    enum BinaryTypes
    {
        BinaryTypes_Int8,
        BinaryTypes_UInt8,
        BinaryTypes_UIntClamped8,
        BinaryTypes_Int16,
        BinaryTypes_UInt16,
        BinaryTypes_Float32,
        BinaryTypes_Int32,
        BinaryTypes_UInt32,
        BinaryTypes_Float64,
        BinaryTypes_UInt64,
        BinaryTypes_Int64,
    };

}
#endif // BinaryDefinitions_Module