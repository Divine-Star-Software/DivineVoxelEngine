import { DivineShaderBuilder } from "../DivineShaderBuilder.js";
import {
  ShaderCodeBody,
  ShaderData,
  ShaderDataTypes,
  ShaderFunctionData,
  ShaderTextureData,
  ShaderUniformData,
  ShaderVaryingData,
} from "../Types/ShaderData.types";
import { DivineMesh } from "./DivineMesh.js";

type ShaderTypes = "shared" | "vertex" | "frag";

export class DivineShader {
  data: ShaderData = {
    mesh: new DivineMesh(""),
    snippetArgumentOverrides: new Map(),
    sharedDefines: new Map(),
    fragDefines: new Map(),
    vertexDefines: new Map(),
    sharedUniforms: new Map(),
    vertexUniforms: new Map(),
    fragxUniforms: new Map(),
    textures: new Map(),
    varying: new Map(),
    varyingArgumentOverrides: new Map(),
    localFragFunctions: new Map(),
    localVertexFunctions: new Map(),
    sharedFunctions: [],
    fragFunctions: [],
    vertexFunctions: [],
    functionArgumentOverrides: new Map(),
    fragMain: {
      GLSL: "",
    },
    vertexMain: {
      GLSL: "",
    },
    fragTop: {
      GLSL: "",
    },
    vertexTop: {
      GLSL: "",
    },
    fragBeforeMain: {
      GLSL: "",
    },
    vertexBeforeMain: {
      GLSL: "",
    },
    fragMainTop: {
      GLSL: "",
    },
    vertexMainTop: {
      GLSL: "",
    },
  };
  compiled = {
    vertex: "",
    fragment: "",
  };

  constructor(public id: string) {
    this.data.mesh.id = id;
  }

  setCodeBody(forSharer: ShaderTypes = "shared", text: string) {
    if (forSharer == "vertex") {
      this.data.vertexMain.GLSL = text;
      return this;
    }
    if (forSharer == "frag") {
      this.data.fragMain.GLSL = text;
      return this;
    }
    return this;
  }

  getUniformList() {
    return [
      ...this.data.sharedUniforms.keys(),
      ...this.data.fragxUniforms.keys(),
      ...this.data.vertexUniforms.keys(),
      ...this.data.textures.keys(),
    ];
  }
  getUniformDataList(): [string, ShaderUniformData][] {
    return [
      [...this.data.sharedUniforms],
      [...this.data.fragxUniforms],
      [...this.data.vertexUniforms],
    ].flatMap((_) => _);
  }
  getAttributeList() {
    return this.data.mesh.getAttributeList();
  }

  addAttributes(data: [id: string, type: ShaderDataTypes][]) {
    this.data.mesh.addAttributes(data);
    return this;
  }

  setArgumentOverride(
    type: "function" | "varying" | "snippet",
    id: string,
    data: any
  ) {
    if (type == "function") {
      return this.data.functionArgumentOverrides.set(id, data);
    }
    if (type == "varying") {
      return this.data.varyingArgumentOverrides.set(id, data);
    }
    if (type == "snippet") {
      return this.data.snippetArgumentOverrides.set(id, data);
    }
  }

  addUniform(data: ShaderUniformData[], forSharer: ShaderTypes = "shared") {
    if (forSharer == "shared") {
      for (const uniform of data) {
        this.data.sharedUniforms.set(uniform[0], uniform);
      }
      return this;
    }
    if (forSharer == "vertex") {
      for (const uniform of data) {
        this.data.vertexUniforms.set(uniform[0], uniform);
      }
      return this;
    }
    if (forSharer == "frag") {
      for (const uniform of data) {
        this.data.fragxUniforms.set(uniform[0], uniform);
      }
      return this;
    }
    return this;
  }

  addVarying(data: ShaderVaryingData<any>[]) {
    for (const varying of data) {
      this.data.varying.set(varying.id, varying);
    }
    return this;
  }

  addTextures(data: [id: string, data: ShaderTextureData][]) {
    for (const attributes of data) {
      this.data.textures.set(attributes[0], attributes[1]);
    }
    return this;
  }

  addFunction<T = void>(
    id: string,
    forSharer: ShaderTypes,
    data: ShaderFunctionData<T>
  ) {
    if (forSharer == "shared") {
      return this;
    }
    if (forSharer == "vertex") {
      this.data.localVertexFunctions.set(id, data);
      return this;
    }
    if (forSharer == "frag") {
      this.data.localFragFunctions.set(id, data);
      return this;
    }
    return this;
  }

  loadInFunctions(id: string | string[], forSharer: ShaderTypes = "shared") {
    if (forSharer == "shared") {
      if (Array.isArray(id)) {
        this.data.sharedFunctions.push(...id);
        return this;
      }
      this.data.sharedFunctions.push(id);
      return this;
    }
    if (forSharer == "vertex") {
      if (Array.isArray(id)) {
        this.data.vertexFunctions.push(...id);
        return this;
      }
      this.data.vertexFunctions.push(id);
      return this;
    }
    if (forSharer == "frag") {
      if (Array.isArray(id)) {
        this.data.fragFunctions.push(...id);
        return this;
      }
      this.data.fragFunctions.push(id);
      return this;
    }
    return this;
  }

  compile(
    header = `#version 300 es
  precision highp float;`
  ) {
    const data = this.data;
    const defines = DivineShaderBuilder.define.build(data.sharedDefines);
    const vertexDefines = DivineShaderBuilder.define.build(data.vertexDefines);
    const fragDefines = DivineShaderBuilder.define.build(data.fragDefines);

    const uniforms = DivineShaderBuilder.uniforms.build(data.sharedUniforms);
    const vertexUniforms = DivineShaderBuilder.uniforms.build(
      data.vertexUniforms
    );
    const fragUniforms = DivineShaderBuilder.uniforms.build(data.fragxUniforms);
    let attributes = ``;
    for (const [key, type] of data.mesh.data.attributes) {
      attributes += `in ${type} ${key};\n`;
    }
    let textures = "";
    for (let [key, textureData] of data.textures) {
      let textureType = textureData.type;
      if (textureData.isArray && textureData.arrayLength) {
        key += `[${Number(textureData.arrayLength)}]`;
      }
      textures += `uniform ${textureType} ${key};\n`;
    }
    let vertexVarying = "";
    let fragVarying = "";
    let setVertexVarying = "";
    let count = 0;
    for (const [id, varyingData] of data.varying) {
      const args = this.data.varyingArgumentOverrides.get(id);
      vertexVarying += `out ${varyingData.type} ${id};\n`;
      fragVarying += `in ${varyingData.type} ${id};\n`;
      setVertexVarying += `${varyingData.body.GLSL(
        args ? args : varyingData.arguments
      )}\n`;
      count++;
    }
    let functions = ``;
    let vertexFunctions = ``;
    let fragFunctions = ``;
    //global functions
    for (const id of data.sharedFunctions) {
      functions += `${DivineShaderBuilder.functions.build(id, null, this)}\n`;
    }
    for (const id of data.vertexFunctions) {
      vertexFunctions += `${DivineShaderBuilder.functions.build(
        id,
        null,
        this
      )}\n`;
    }
    for (const id of data.fragFunctions) {
      fragFunctions += `${DivineShaderBuilder.functions.build(
        id,
        null,
        this
      )}\n`;
    }
    //local functions
    for (const [id, fd] of data.localVertexFunctions) {
      vertexFunctions += `${DivineShaderBuilder.functions.build(
        id,
        fd,
        this
      )}\n`;
    }
    for (const [id, fd] of data.localFragFunctions) {
      fragFunctions += `${DivineShaderBuilder.functions.build(id, fd, this)}\n`;
    }

    this.compiled.vertex = DivineShaderBuilder.snippets.build(
      /* glsl  */ `${header}
${this.data.vertexTop.GLSL}

//defines 
${defines}
${vertexDefines}

//uniforms
${uniforms}
${vertexUniforms}

//attributes
${attributes}

//varying
${vertexVarying}

//functions
${functions}
${vertexFunctions}

${data.vertexBeforeMain.GLSL}

void main(void) {
${this.data.vertexMainTop.GLSL}
${setVertexVarying}
${data.vertexMain.GLSL}
}`,
      this
    );
    this.compiled.fragment = DivineShaderBuilder.snippets
      .build(/* glsl  */ `${header}
precision highp sampler2DArray;


${this.data.fragTop.GLSL}

//defines 
${defines}
${fragDefines}

//uniforms
${uniforms}
${fragUniforms}

//textures
${textures}

//varying
${fragVarying}

//functions
${functions}
${fragFunctions}

${data.fragBeforeMain.GLSL}

out vec4 FragColor;  
void main(void) {
${data.fragMainTop.GLSL}
${data.fragMain.GLSL}
}`);
    return this.compiled;
  }

  clone(newID: string) {
    return this.merge(DivineShaderBuilder.shaders.create(newID));
  }

  merge(shader: DivineShader, overrideMesh = true) {
    if (overrideMesh) {
      shader.data.mesh = this.data.mesh.clone(shader.id);
    }
    console.log("MERGE", this.id, "to", shader.id);
    for (const dataKey in this.data) {
      const data = (this as any).data[dataKey];
      if (data instanceof DivineMesh) continue;
      if (data instanceof Map) {
        for (const [key, value] of data) {
          (shader as any).data[dataKey].set(key, value);
        }

        continue;
      }
      if (Array.isArray(data)) {
        for (const node of data) {
          if (!(shader as any).data[dataKey].includes(node)) {
            (shader as any).data[dataKey].push(node);
          }
        }
        if (this.id == "#dve_solid") {
          console.log(dataKey, data, (shader as any).data[dataKey]);
        }
        continue;
      }
      if (this.id == "#dve_solid") {
        console.log(dataKey, data);
      }
      const otherData = (shader as any).data[dataKey];
      if (otherData.GLSL !== "") continue;

      (shader as any).data[dataKey] = JSON.parse(JSON.stringify(data));
    }
    console.log(this.data, shader.data);
    return shader;
  }
}
