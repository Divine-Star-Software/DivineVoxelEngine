const markers = [
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
    "mmd",
];
const metaValues = {};
for (let i = 0; i < markers.length; i++) {
    metaValues[markers[i]] = i;
}
export const MetaValues = metaValues;
export const MetaMapValues = {};
for (const key of Object.keys(MetaValues)) {
    //@ts-ignore
    MetaMapValues[Number(MetaValues[key])] = key;
}
