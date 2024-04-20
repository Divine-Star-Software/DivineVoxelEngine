import { URIShaderBuilder } from "../URIShaderBuilder.js";
import {
  ShaderCodeBody,
  ShaderCodeSections,
  ShaderData,
  ShaderDataTypes,
  ShaderFunctionData,
  ShaderTextureData,
  ShaderUniformData,
  ShaderVaryingData,
} from "../Types/ShaderData.types.js";
import { URIMeshShaderAttributes } from "./URIMeshShaderAttributes.js";

type ShaderTypes = "shared" | "vertex" | "frag";

const GetShaderSections = (): ShaderCodeSections => {
  return {
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
};

enum ShaderVersions {
  GLSL2,
  GLSL3,
  WGSL,
}

export class URIShader {
  static ShaderVersions = ShaderVersions;
  data: ShaderData = {
    mesh: new URIMeshShaderAttributes(""),
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
    ...GetShaderSections(),
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

  compileDefines() {
    const defines = URIShaderBuilder.define.build(this.data.sharedDefines);
    const vertexDefines = URIShaderBuilder.define.build(
      this.data.vertexDefines
    );
    const fragDefines = URIShaderBuilder.define.build(this.data.fragDefines);
    return {
      vertex: `
        ${defines}
        ${vertexDefines}
        `,
      fragment: `
      ${defines}
      ${fragDefines}
      `,
    };
  }

  compileUniforms(
    predicate: (id: string, type: ShaderUniformData) => boolean = () => true
  ) {
    const uniforms = URIShaderBuilder.uniforms.build(
      this.data.sharedUniforms,
      predicate
    );
    const vertexUniforms = URIShaderBuilder.uniforms.build(
      this.data.vertexUniforms,
      predicate
    );
    const fragUniforms = URIShaderBuilder.uniforms.build(
      this.data.fragxUniforms,
      predicate
    );
    return {
      vertex: `
        ${uniforms}
        ${vertexUniforms}
        `,
      fragment: `
      ${uniforms}
      ${fragUniforms}
      `,
    };
  }

  compileAttributes(
    predicate: (id: string, type: ShaderDataTypes) => boolean = () => true,
    version = ShaderVersions.GLSL3
  ) {
    let attributes = ``;
    const inKeyWord = version == ShaderVersions.GLSL3 ? "in" : "varying";
    for (const [key, type] of this.data.mesh.data.attributes) {
      if (!predicate(key, type)) continue;
      attributes += `${inKeyWord} ${type} ${key};\n`;
    }
    return {
      vertex: `${attributes}`,
    };
  }

  compileFunctinos(
    predicate: (id: string, type: ShaderFunctionData<any>) => boolean = () =>
      true
  ) {
    let functions = ``;
    let vertexFunctions = ``;
    let fragFunctions = ``;
    //global functions
    for (const id of this.data.sharedFunctions) {
      functions += `${URIShaderBuilder.functions.build(
        id,
        null,
        this,
        predicate
      )}\n`;
    }
    for (const id of this.data.vertexFunctions) {
      vertexFunctions += `${URIShaderBuilder.functions.build(
        id,
        null,
        this,
        predicate
      )}\n`;
    }
    for (const id of this.data.fragFunctions) {
      fragFunctions += `${URIShaderBuilder.functions.build(
        id,
        null,
        this,
        predicate
      )}\n`;
    }
    //local functions
    for (const [id, fd] of this.data.localVertexFunctions) {
      vertexFunctions += `${URIShaderBuilder.functions.build(
        id,
        fd,
        this,
        predicate
      )}\n`;
    }
    for (const [id, fd] of this.data.localFragFunctions) {
      fragFunctions += `${URIShaderBuilder.functions.build(id, fd, this)}\n`;
    }
    return {
      vertex: `
        ${functions}
        ${vertexFunctions}
        `,
      fragment: `
      ${functions}
      ${fragFunctions}
      `,
    };
  }
  getTextureDataList() {
    const textures: [string, ShaderTextureData][] = [];
    for (let [key, textureData] of this.data.textures) {
      textures.push([key, textureData]);
    }
    return textures;
  }
  getTextureList() {
    const textures: string[] = [];
    for (let [key, textureData] of this.data.textures) {
      textures.push(key);
    }
    return textures;
  }

  compileTextures() {
    let textures = "";
    for (let [key, textureData] of this.data.textures) {
      let textureType = textureData.type;
      if (textureData.isArray && textureData.arrayLength) {
        key += `[${Number(textureData.arrayLength)}]`;
      }
      textures += `uniform ${textureType} ${key};\n`;
    }
    return {
      fragment: `${textures}`,
    };
  }

  compileVarying(version = ShaderVersions.GLSL3) {
    let vertexVarying = "";
    let fragVarying = "";
    let setVertexVarying = "";
    let count = 0;
    const inKeyWord = version == ShaderVersions.GLSL3 ? "in" : "varying";
    const outKeyWord = version == ShaderVersions.GLSL3 ? "out" : "varying";
    for (const [id, varyingData] of this.data.varying) {
      const args = this.data.varyingArgumentOverrides.get(id);
      vertexVarying += `${outKeyWord} ${varyingData.type} ${id};\n`;
      fragVarying += `${inKeyWord} ${varyingData.type} ${id};\n`;
      setVertexVarying += `${varyingData.body.GLSL(
        args ? args : varyingData.arguments
      )}\n`;
      count++;
    }
    return {
      fragTop: `${fragVarying}`,
      vertexTop: `${vertexVarying}`,
      vertexMainTop: `${setVertexVarying}`,
    };
  }
  compile(
    header = `#version 300 es
  precision highp float;`
  ) {
    const data = this.data;

    const defines = this.compileDefines();
    const uniforms = this.compileUniforms();
    const textures = this.compileTextures();
    const varying = this.compileVarying();
    const attributes = this.compileAttributes();
    const functions = this.compileFunctinos();

    this.compiled.vertex = URIShaderBuilder.snippets.build(
      /* glsl  */ `${header}
${this.data.vertexTop.GLSL}

//defines 
${defines.vertex}


//uniforms
${uniforms.vertex}

//attributes
${attributes.vertex}

//varying
${varying.vertexTop}

//functions
${functions.vertex}

${data.vertexBeforeMain.GLSL}

void main(void) {
${this.data.vertexMainTop.GLSL}
${varying.vertexMainTop}
${data.vertexMain.GLSL}
}`,
      this
    );
    this.compiled.fragment = URIShaderBuilder.snippets
      .build(/* glsl  */ `${header}
precision highp sampler2DArray;
${this.data.fragTop.GLSL}

//defines 
${defines.fragment}

//uniforms
${uniforms.fragment}

//textures
${textures.fragment}

//varying
${varying.fragTop}

//functions
${functions.fragment}

${data.fragBeforeMain.GLSL}

out vec4 FragColor;  
void main(void) {
${data.fragMainTop.GLSL}
${data.fragMain.GLSL}
}`);
    return this.compiled;
  }

  clone(newID: string) {
    return this.merge(URIShaderBuilder.shaders.create(newID));
  }

  merge(shader: URIShader, overrideMesh = true) {
    if (overrideMesh) {
      shader.data.mesh = this.data.mesh.clone(shader.id);
    }
    for (const dataKey in this.data) {
      const data = (this as any).data[dataKey];
      if (data instanceof URIMeshShaderAttributes) continue;
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

        continue;
      }

      const otherData = (shader as any).data[dataKey];
      if (otherData.GLSL !== "") continue;

      (shader as any).data[dataKey] = JSON.parse(JSON.stringify(data));
    }
    return shader;
  }
}
