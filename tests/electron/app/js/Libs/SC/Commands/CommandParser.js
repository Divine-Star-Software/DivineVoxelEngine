import { Commands } from "./Commands.js";
const GetValue = {
    boolean: (input, index, arg) => {
        return { value: true, index: index };
    },
    data: (input, index, arg) => {
        let string = "";
        for (let i = index; i < input.length; i++) {
            index = i;
            let c = input[i];
            if (c == "-")
                break;
            string += c;
        }
        try {
            let value = JSON.parse(string);
            return { value: value, index: index };
        }
        catch (error) {
            Commands.error(`${arg.fullId} could not be parsed into data.`);
            return { value: undefined, index: index };
        }
    },
    number: (input, index, arg) => {
        let numString = "";
        for (let i = index; i < input.length; i++) {
            index = i;
            let c = input[i];
            if (c == " ")
                break;
            numString += c;
        }
        let value = parseFloat(numString);
        if (typeof value != "number" || Number.isNaN(value)) {
            Commands.error(`${arg.fullId} must be a number`);
            value = undefined;
        }
        return { value: value, index: index };
    },
    string: (input, index, arg) => {
        let string = "";
        for (let i = index; i < input.length; i++) {
            index = i;
            let c = input[i];
            if (c == "-")
                break;
            string += c;
        }
        let value = String(string);
        if (typeof value != "string") {
            Commands.error(`${arg.fullId} must be a string`);
            value = undefined;
        }
        return { value: value, index: index };
    },
    "number-array": (input, index, arg) => {
        let arrayLength = arg.length;
        const returnValue = [];
        let processing = true;
        while (processing) {
            let numString = "";
            for (let i = index; i < input.length; i++) {
                index = i;
                let c = input[i];
                if (c == " ")
                    break;
                if (c == "-") {
                    processing = false;
                    break;
                }
                numString += c;
            }
            index++;
            if (index >= input.length)
                processing = false;
            if (numString.length == 0)
                continue;
            let value = parseFloat(numString);
            if (typeof value != "number" || Number.isNaN(value)) {
                Commands.error(`${arg.fullId} must be a number`);
                return { value: null, index: index };
            }
            returnValue.push(value);
        }
        if (returnValue.length != arrayLength) {
            Commands.error(`${arg.fullId} must be at least ${arrayLength} numbers`);
            return { value: null, index: index };
        }
        return { value: returnValue, index: index };
    },
};
export const CommandParser = {
    getCommandId(input) {
        let index = 0;
        let commandId = "";
        for (let i = 0; i < input.length; i++) {
            let char = input[i];
            index = i;
            if (char == " " || char == undefined)
                break;
            commandId += char;
        }
        return {
            id: commandId,
            index: index,
        };
    },
    parseArgs(input, args, index) {
        const data = {};
        const map = new Map();
        for (const arg of args) {
            map.set("-" + arg.fullId, arg);
            map.set("-" + arg.shortId, arg);
        }
        let currentFlag = "";
        let currentType = "";
        let mode = "none";
        for (let i = index; i < input.length; i++) {
            let char = input[i];
            index = i;
            if (char == " ") {
                if (currentType != "boolean" && mode != "none") {
                    mode = "value";
                }
            }
            if (char == "-" && mode == "none") {
                currentFlag = "";
                for (let k = i; k < input.length; k++) {
                    let c = input[k];
                    index = k;
                    if (c == " ")
                        break;
                    currentFlag += c;
                }
                index++;
                const arg = map.get(currentFlag);
                if (!arg) {
                    Commands.error(`Flag with ID "${currentFlag}" does not exists for this command.`);
                    return null;
                }
                const valueData = GetValue[arg.type](input, index, arg);
                if (valueData.value == undefined)
                    return null;
                index = valueData.index;
                data[arg.fullId] = valueData.value;
            }
        }
        return data;
    },
};
