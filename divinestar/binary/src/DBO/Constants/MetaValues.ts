

import { DBOMarks } from "../Types/DBO.types";

const markers: DBOMarks[] = [
  "start",
  "end",
  "object",
  "object-start",
  "object-end",
  "array",
  "array-start",
  "array-end",
  "name",
  "8i",
  "8ui",
  "8uic",
  "16i",
  "16ui",
  "32f",
  "32i",
  "32ui",
  "64f",
  "bigi",
  "bigui",
  "fixed-typed-array",
  "fixed-string",
  "string",
  "fixed-string-array",
  "string-array",
  "typed-array",
  "json",
  "DBO",
  "boolean",
  "undefined",
];

const metaValues: any = {};

for (let i = 0; i < markers.length; i++) {
  metaValues[markers[i]] = i;
}

export const MetaValues: Record<DBOMarks, number> = metaValues;
export const MetaMapValues: Record<number, DBOMarks> = {};
for (const key of Object.keys(MetaValues)) {
  //@ts-ignore
  MetaMapValues[Number(MetaValues[key])] = key;
}

 
