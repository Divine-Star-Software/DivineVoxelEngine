export const DVEShaderBuilder = {
    shaders: new Map(),
    functions: new Map(),
    snippets: new Map(),
    buildShader(id) {
        const data = this.shaders.get(id);
        if (!data)
            return false;
        let uniforms = ``;
        for (const [key, type] of data.sharedFunctions) {
            uniforms += `uniform ${key} ${type};\n`;
        }
        let vertexUniforms = ``;
        for (const [key, type] of data.vertexFunctions) {
            vertexUniforms += `uniform ${key} ${type};\n`;
        }
        let fragUniforms = ``;
        for (const [key, type] of data.fragFunctions) {
            fragUniforms += `uniform ${key} ${type};\n`;
        }
        let attributes = ``;
        for (const [key, type] of data.attributes) {
            attributes += `attribute ${key} ${type};\n`;
        }
        let textures = "";
        for (const [key, textureData] of data.textures) {
            let textureType = textureData.type;
            if (textureData.isArray && textureData.arrayLength) {
                textureType += `[${Number(textureData.arrayLength)}]`;
            }
            textures += `uniform ${key} ${textureType};\n`;
        }
        let varying = "";
        let vertexVarying = "";
        for (const [key, [type, set]] of data.varying) {
            varying += `varying ${key} ${type};\n`;
            vertexVarying += set.GLSL;
        }
        let functions = ``;
        for (const id of data.sharedFunctions) {
            functions += this.buildFunction(id);
        }
        let vertexFunctions = ``;
        for (const id of data.vertexFunctions) {
            vertexFunctions += this.buildFunction(id);
        }
        let fragFunctions = ``;
        for (const id of data.fragFunctions) {
            fragFunctions += this.buildFunction(id);
        }
        return {
            vertex: this._replaceSnippets(`
  ${uniforms}
  ${vertexUniforms}
  ${attributes}
  ${varying}
  ${functions}
  ${vertexFunctions}
  void main(void) {
    ${vertexVarying}
    ${data.vertexMain}
}
  `),
            frag: this._replaceSnippets(`
  ${uniforms}
  ${fragUniforms}
  ${textures}
  ${varying}
  ${functions}
  ${fragFunctions}
  void main(void) {
    ${data.fragMain}
}
  `),
        };
    },
    _replaceSnippets(text) {
        const lines = text.split("\n");
        const newShader = [];
        for (const line of lines) {
            const l = line.trim();
            if (l[0] != "@") {
                newShader.push(line);
                continue;
            }
            let id = "";
            for (let i = 0; i < l.length; i++) {
                const char = l[i];
                if (char == "@")
                    continue;
                if (!char || char == " " || char == "\n" || char == "\r")
                    break;
                id += char;
            }
            newShader.push(this.buildSnippet(id));
        }
    },
    buildFunction(id) {
        const data = this.functions.get(id);
        if (!data)
            return "";
        let paramters = "";
        let count = 0;
        for (const [key, type] of data.inputs) {
            count++;
            paramters += `${type} ${key}${count != data.inputs.length ? "," : ""}`;
        }
        return `${data.output} ${id}(${paramters}){
${data.body.GLSL} 
}`;
    },
    buildSnippet(id) {
        const data = this.snippets.get(id);
        if (!data)
            return "";
        return data.GLSL;
    },
    createShader(id, data) {
        this.shaders.set(id, data);
    },
    createFunction(id, data) {
        this.functions.set(id, data);
    },
    createSnippet(id, data) {
        this.snippets.set(id, data);
    },
};
