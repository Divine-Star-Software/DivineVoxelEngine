import type { ShaderDataTypes } from "../Types/ShaderData.types";

export class URIMeshShaderAttributes {
  data = {
    attributes: new Map<string, ShaderDataTypes>(),
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
    const mesh = new URIMeshShaderAttributes(id);
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

  getAttributes() {
    const data: [id: string, stride: number][] = [];
    for (const [id, type] of this.data.attributes) {
      let stride = 1;
      if (type == "vec2") stride = 2;
      if (type == "vec3") stride = 3;
      if (type == "vec4") stride = 4;
      data.push([id, stride]);
    }
    return data;
  }
}
