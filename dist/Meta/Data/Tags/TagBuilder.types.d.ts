import type { NumberTypes } from "divine-binary-tags";
type TagBuilderNodeBase = {
    id: string;
};
type TagBuilderNumberNode = {
    type: "number";
    numberType: NumberTypes;
    default: number;
} & TagBuilderNodeBase;
type TagBuilderNumberArrayNode = {
    type: "number-array";
    numberType: NumberTypes;
    length: number;
} & TagBuilderNodeBase;
type TagBuilderStringMapNode = {
    type: "string-map";
    allowedComms: string[];
    default?: string;
} & TagBuilderNodeBase;
type TagBuilderBooleanNode = {
    type: "boolean";
    default: boolean;
} & TagBuilderNodeBase;
export type TagBuilderNodes = TagBuilderNumberNode | TagBuilderNumberArrayNode | TagBuilderStringMapNode | TagBuilderBooleanNode;
export {};
