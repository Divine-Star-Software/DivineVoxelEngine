import type { NumberTypes } from "@divinestar/binary/";
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
type TagBuilderObjectMapNode = {
 type: "object-map";
 allowedComms: string[];
 default?: any;
} & TagBuilderNodeBase;
type TagBuilderBooleanNode = {
 type: "boolean";
 default: boolean;
} & TagBuilderNodeBase;

export type TagBuilderNodes =
 | TagBuilderNumberNode
 | TagBuilderNumberArrayNode
 | TagBuilderStringMapNode
 | TagBuilderBooleanNode
 | TagBuilderObjectMapNode;
