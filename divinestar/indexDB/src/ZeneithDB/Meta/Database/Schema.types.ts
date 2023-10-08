export type ZeneithSchemaNodeValueTypes =
 | "string"
 | "boolean"
 | "number"
 | "any"
 | "any[]"
 | "string[]"
 | "number[]"
 | "object";
export type ZeneithSchemaNode = {
 name: string;
 valueType : ZeneithSchemaNodeValueTypes;
 index ?: boolean;
 isUnique ?: boolean;
 children ?: ZeneithSchema;
};

export type ZeneithSchemaNodes = ZeneithSchemaNode | ZeneithSchemaNode[] | ZeneithSchema[];
export type ZeneithSchema = ZeneithSchemaNodes[];

