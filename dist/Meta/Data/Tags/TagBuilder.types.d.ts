import type { NumberTypes } from "divine-binary-tags";
declare type TagBuilderNodeBase = {
    id: string;
};
declare type TagBuilderNumberNode = {
    type: "number";
    numberType: NumberTypes;
    default: number;
} & TagBuilderNodeBase;
declare type TagBuilderNumberArrayNode = {
    type: "number-array";
    numberType: NumberTypes;
    length: number;
} & TagBuilderNodeBase;
declare type TagBuilderStringMapNode = {
    type: "string-map";
    allowedComms: string[];
    default?: string;
} & TagBuilderNodeBase;
declare type TagBuilderBooleanNode = {
    type: "boolean";
    default: boolean;
} & TagBuilderNodeBase;
export declare type TagBuilderNodes = TagBuilderNumberNode | TagBuilderNumberArrayNode | TagBuilderStringMapNode | TagBuilderBooleanNode;
export {};
