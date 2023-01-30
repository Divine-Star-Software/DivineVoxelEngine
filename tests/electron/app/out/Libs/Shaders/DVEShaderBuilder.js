import { DVEShader } from "./Classes/DVEShader.js";
export const DVEShaderBuilder = {
    shaders: new Map(),
    functions: new Map(),
    snippets: new Map(),
    buildShader(id) { },
    _process(text) {
        const lines = text.split("\n");
        let foundSnippet = false;
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
                if (char == "@") {
                    foundSnippet = true;
                    continue;
                }
                if (!char || char == " " || char == "\n" || char == "\r")
                    break;
                id += char;
            }
            newShader.push(this.buildSnippet(id));
        }
        let newBody = newShader.join("\n");
        return { newBody, foundSnippet };
    },
    _replaceSnippets(text) {
        let done = false;
        let finalBody = text;
        while (!done) {
            const { newBody, foundSnippet } = this._process(finalBody);
            done = !foundSnippet;
            finalBody = newBody;
        }
        return finalBody;
    },
    _buildFunction(id, data) {
        let paramters = "";
        let count = 0;
        for (const [key, type] of data.inputs) {
            count++;
            if (Array.isArray(type)) {
                paramters += `${type[0]}[${type[1]}] ${key}${count != data.inputs.length ? "," : ""}`;
                continue;
            }
            paramters += `${type} ${key}${count != data.inputs.length ? "," : ""}`;
        }
        return `
${data.output} ${id}(${paramters}){
  ${data.body.GLSL} 
}
`;
    },
    buildFunction(id, data) {
        if (!data) {
            data = this.functions.get(id);
        }
        if (!data)
            return "";
        let functions = "";
        functions += this._buildFunction(id, data);
        if (data.overrides) {
            for (const func of data.overrides) {
                functions += this._buildFunction(id, func);
            }
        }
        return functions;
    },
    buildSnippet(id) {
        const data = this.snippets.get(id);
        if (!data)
            return "";
        return data.GLSL;
    },
    createShader(id) {
        const shader = new DVEShader(id, {
            fragDefines: new Map(),
            vertexDefines: new Map(),
            attributes: new Map(),
            sharedUniforms: new Map(),
            vertexUniforms: new Map(),
            fragxUniforms: new Map(),
            textures: new Map(),
            varying: new Map(),
            localFragFunctions: new Map(),
            localVertexFunctions: new Map(),
            sharedFunctions: [],
            fragFunctions: [],
            vertexFunctions: [],
            fragMain: {
                GLSL: "",
            },
            vertexMain: {
                GLSL: "",
            },
        });
        this.shaders.set(id, shader);
        return shader;
    },
    createFunction(id, data) {
        this.functions.set(id, data);
    },
    createSnippet(id, data) {
        this.snippets.set(id, data);
    },
};
