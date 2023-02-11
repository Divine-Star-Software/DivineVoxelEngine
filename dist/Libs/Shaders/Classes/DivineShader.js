import { DivineShaderBuilder } from "../DivineShaderBuilder.js";
import { DivineMesh } from "./DivineMesh.js";
export class DivineShader {
    id;
    data = {
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
    };
    compiled = {
        vertex: "",
        fragment: "",
    };
    constructor(id) {
        this.id = id;
        this.data.mesh.id = id;
    }
    setCodeBody(forSharer = "shared", text) {
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
    getAttributeList() {
        return this.data.mesh.getAttributeList();
    }
    addAttributes(data) {
        this.data.mesh.addAttributes(data);
        return this;
    }
    setArgumentOverride(type, id, data) {
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
    addUniform(data, forSharer = "shared") {
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
    addVarying(data) {
        for (const varying of data) {
            this.data.varying.set(varying.id, varying);
        }
        return this;
    }
    addTextures(data) {
        for (const attributes of data) {
            this.data.textures.set(attributes[0], attributes[1]);
        }
        return this;
    }
    addFunction(id, forSharer, data) {
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
    loadInFunctions(id, forSharer = "shared") {
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
    compile() {
        const data = this.data;
        const defines = DivineShaderBuilder.define.build(data.sharedDefines);
        const vertexDefines = DivineShaderBuilder.define.build(data.vertexDefines);
        const fragDefines = DivineShaderBuilder.define.build(data.fragDefines);
        const uniforms = DivineShaderBuilder.uniforms.build(data.sharedUniforms);
        const vertexUniforms = DivineShaderBuilder.uniforms.build(data.vertexUniforms);
        const fragUniforms = DivineShaderBuilder.uniforms.build(data.fragxUniforms);
        let attributes = ``;
        for (const [key, type] of data.mesh.data.attributes) {
            attributes += `attribute ${type} ${key};\n`;
        }
        let textures = "";
        for (let [key, textureData] of data.textures) {
            let textureType = textureData.type;
            if (textureData.isArray && textureData.arrayLength) {
                key += `[${Number(textureData.arrayLength)}]`;
            }
            textures += `uniform ${textureType} ${key};\n`;
        }
        let varying = "";
        let vertexVarying = "";
        for (const [id, varyingData] of data.varying) {
            const args = this.data.varyingArgumentOverrides.get(id);
            varying += `varying ${varyingData.type} ${id};\n`;
            vertexVarying += `${varyingData.body.GLSL(args ? args : varyingData.arguments)}\n`;
        }
        let functions = ``;
        let vertexFunctions = ``;
        let fragFunctions = ``;
        //global functions
        for (const id of data.sharedFunctions) {
            functions += `${DivineShaderBuilder.functions.build(id, null, this)}\n`;
        }
        for (const id of data.vertexFunctions) {
            vertexFunctions += `${DivineShaderBuilder.functions.build(id, null, this)}\n`;
        }
        for (const id of data.fragFunctions) {
            fragFunctions += `${DivineShaderBuilder.functions.build(id, null, this)}\n`;
        }
        //local functions
        for (const [id, fd] of data.localVertexFunctions) {
            vertexFunctions += `${DivineShaderBuilder.functions.build(id, fd, this)}\n`;
        }
        for (const [id, fd] of data.localFragFunctions) {
            fragFunctions += `${DivineShaderBuilder.functions.build(id, fd, this)}\n`;
        }
        this.compiled.vertex = DivineShaderBuilder.snippets.build(`
precision highp float;
//defines 
${defines}
${vertexDefines}

//uniforms
${uniforms}
${vertexUniforms}

//attributes
${attributes}

//varying
${varying}

//functions
${functions}
${vertexFunctions}

void main(void) {
${vertexVarying}
${data.vertexMain.GLSL}
}`, this);
        this.compiled.fragment = DivineShaderBuilder.snippets.build(`
precision highp float;
precision highp sampler2DArray;
//defines 
${defines}
${fragDefines}

//uniforms
${uniforms}
${fragUniforms}

//textures
${textures}

//varying
${varying}

//functions
${functions}
${fragFunctions}

void main(void) {
${data.fragMain.GLSL}
}`, this);
        return this.compiled;
    }
    clone(newID) {
        return this.merge(DivineShaderBuilder.shaders.create(newID));
    }
    merge(shader, overrideMesh = true) {
        if (overrideMesh) {
            shader.data.mesh = this.data.mesh.clone(shader.id);
        }
        for (const dataKey in this.data) {
            const data = this.data[dataKey];
            if (data instanceof Map) {
                for (const [key, value] of data) {
                    shader.data[dataKey].set(key, value);
                }
                continue;
            }
            if (Array.isArray(data)) {
                for (const node of data) {
                    if (!shader.data[dataKey].includes(node)) {
                        shader.data[dataKey].push(node);
                    }
                }
            }
        }
        return shader;
    }
}
