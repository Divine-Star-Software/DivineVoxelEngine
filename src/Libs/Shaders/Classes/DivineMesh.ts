import type { ShaderDataTypes } from "../Types/ShaderData.types";

export class DivineMesh {
 data = {
  attributes: new Map(),
 };
 constructor(public id: string) {}

 getAttributeList() {
  return [...this.data.attributes.keys()];
 }
 addAttributes(data: [id: string, type: ShaderDataTypes][]) {
  for (const attributes of data) {
   this.data.attributes.set(attributes[0], attributes[1]);
  }
  return this;
 }

 clone(id: string) {
  const mesh = new DivineMesh(id);
  for (const dataKey in this.data) {
   const data = (this as any).data[dataKey];
   if (data instanceof Map) {
    for (const [key, value] of data) {
     (mesh as any).data[dataKey].set(key, value);
    }
    continue;
   }
   if (Array.isArray(data)) {
    for (const node of data) {
     if (!(mesh as any).data[dataKey].includes(node)) {
      (mesh as any).data[dataKey].push(node);
     }
    }
   }
  }
  return mesh;
 }
}
