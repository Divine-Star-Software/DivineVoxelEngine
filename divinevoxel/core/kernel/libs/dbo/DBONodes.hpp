#ifndef DBO_Nodes_Module
#define DBO_Nodes_Module
#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <sstream>
#include <stdexcept> // Include for std::runtime_error

#include "../DBODefinitions.hpp"

class DBONode
{
public:
    DBONode(DBOMarkers type) : _type(type) {}

    virtual ~DBONode() = default;

    DBOMarkers type() { return _type; }

    // These methods will be overridden in derived classes.

    virtual std::string string() { throw std::runtime_error("Not a String"); }
    virtual std::map<std::string, DBONode *> *object() { throw std::runtime_error("Not an Object"); }
    virtual std::vector<DBONode *> *array() { throw std::runtime_error("Not an Array"); }

    virtual bool boolean() { throw std::runtime_error("Not a Boolean"); }
    virtual bool undefined() { return false; }

    // numbers
    virtual int8_t int8() { throw std::runtime_error("Not an int8"); }
    virtual uint8_t uint8() { throw std::runtime_error("Not a uint8"); }
    virtual int16_t int16() { throw std::runtime_error("Not an int16"); }
    virtual uint16_t uint16() { throw std::runtime_error("Not a uint16"); }
    virtual int32_t int32() { throw std::runtime_error("Not an int32"); }
    virtual uint32_t uint32() { throw std::runtime_error("Not a uint32"); }
    virtual int64_t int64() { throw std::runtime_error("Not an int64"); }
    virtual uint64_t uint64() { throw std::runtime_error("Not a uint64"); }
    virtual float float32() { throw std::runtime_error("Not a float32"); }
    virtual double float64() { throw std::runtime_error("Not a float64"); }

    // utils
    virtual std::string toString() { throw std::runtime_error("Not an actual object."); }

private:
private:
    DBOMarkers _type;
};

class DBONodeBoolean : public DBONode
{
public:
    DBONodeBoolean(bool value) : DBONode(DBOMarkers_Boolean), _value(value) {}

    bool boolean() override { return _value; }

    std::string toString() override { return _value ? "true" : "false"; }

private:
    bool _value;
};

class DBONodeUndefined : public DBONode
{
public:
    DBONodeUndefined() : DBONode(DBOMarkers_Boolean) {}

    std::string toString() override { return "undefined"; }

    bool undefined() override { return true; }
};

class DBONodeString : public DBONode
{
public:
    DBONodeString(std::string &value) : DBONode(DBOMarkers_String), _value(value) {}

    std::string string() override { return _value; }
    std::string toString() override { return _value; }

private:
    std::string _value;
};

class DBONodeObject : public DBONode
{
public:
    DBONodeObject() : DBONode(DBOMarkers_Object) {}

    std::map<std::string, DBONode *> *object() override { return _object; }

    std::string toString() override
    {
        std::string objectString = "";
        objectString += "{\n";
        for (const auto &pair : *_object)
        {
            objectString += pair.first + ": " + pair.second->toString() + ",\n";
        }
        objectString += "}\n";
        return objectString;
    }

private:
    std::map<std::string, DBONode *> *_object = new std::map<std::string, DBONode *>();
};

class DBONodeArray : public DBONode
{
public:
    DBONodeArray() : DBONode(DBOMarkers_Array) {}

    std::vector<DBONode *> *array() override { return _array; }

    std::string toString() override
    {
        std::string objectString = "";
        objectString += "[\n";
        for (auto &object : *_array)
        {
            objectString += object->toString() + ",\n";
        }
        objectString += "]\n";
        return objectString;
    }

private:
    std::vector<DBONode *> *_array = new std::vector<DBONode *>();
};

class DBOInt8Node : public DBONode
{
public:
    DBOInt8Node(int8_t value) : DBONode(DBOMarkers_Int8), _value(value) {}

    int8_t int8() override { return _value; }
    std::string toString() override { return std::to_string(_value); }

private:
    int8_t _value;
};

class DBOUInt8Node : public DBONode
{
public:
    DBOUInt8Node(uint8_t value) : DBONode(DBOMarkers_UInt8), _value(value) {}

    uint8_t uint8() override { return _value; }
    std::string toString() override { return std::to_string(_value); }

private:
    uint8_t _value;
};

// int16
class DBOInt16Node : public DBONode
{
public:
    DBOInt16Node(int16_t value) : DBONode(DBOMarkers_Int16), _value(value) {}

    int16_t int16() override { return _value; }
    std::string toString() override { return std::to_string(_value); }

private:
    int16_t _value;
};

// uint16
class DBOUInt16Node : public DBONode
{
public:
    DBOUInt16Node(uint16_t value) : DBONode(DBOMarkers_UInt16), _value(value) {}

    uint16_t uint16() override { return _value; }
    std::string toString() override { return std::to_string(_value); }

private:
    uint16_t _value;
};

// int32
class DBOInt32Node : public DBONode
{
public:
    DBOInt32Node(int32_t value) : DBONode(DBOMarkers_Int32), _value(value) {}

    int32_t int32() override { return _value; }
    std::string toString() override { return std::to_string(_value); }

private:
    int32_t _value;
};

// uint32
class DBOUInt32Node : public DBONode
{
public:
    DBOUInt32Node(uint32_t value) : DBONode(DBOMarkers_UInt32), _value(value) {}

    uint32_t uint32() override { return _value; }
    std::string toString() override { return std::to_string(_value); }

private:
    uint32_t _value;
};

// int64
class DBOInt64Node : public DBONode
{
public:
    DBOInt64Node(int64_t value) : DBONode(DBOMarkers_Int64), _value(value) {}

    int64_t int64() override { return _value; }
    std::string toString() override { return std::to_string(_value); }

private:
    int64_t _value;
};

// uint64
class DBOUInt64Node : public DBONode
{
public:
    DBOUInt64Node(uint64_t value) : DBONode(DBOMarkers_UInt64), _value(value) {}

    uint64_t uint64() override { return _value; }
    std::string toString() override { return std::to_string(_value); }

private:
    uint64_t _value;
};

// float
class DBOFloat32Node : public DBONode
{
public:
    DBOFloat32Node(float value) : DBONode(DBOMarkers_Float32), _value(value) {}

    float float32() override { return _value; } // Assuming float32() method name for float
    std::string toString() override { return std::to_string(_value); }

private:
    float _value;
};

// double
class DBOFloat64Node : public DBONode
{
public:
    DBOFloat64Node(double value) : DBONode(DBOMarkers_Float64), _value(value) {}

    double float64() override { return _value; } // Assuming double64() method name for double
    std::string toString() override { return std::to_string(_value); }

private:
    double _value;
};

#endif // DBO_Nodes_Module