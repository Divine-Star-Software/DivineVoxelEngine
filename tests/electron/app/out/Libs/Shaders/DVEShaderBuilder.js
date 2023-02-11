import { DVEShader } from "./Classes/DVEShader.js";
export const DVEShaderBuilder = {
    buildShader(id) { },
    shaders: {
        _shaders: new Map(),
        create(id) {
            const shader = new DVEShader(id);
            this._shaders.set(id, shader);
            return shader;
        },
    },
    functions: {
        _functions: new Map(),
        _functionSets: new Map(),
        create(id, data) {
            this._functions.set(id, data);
            if (data.setID) {
                let set = this._functionSets.get(data.setID);
                if (!set) {
                    set = [];
                    this._functionSets.set(data.setID, set);
                }
                set.push(id);
            }
        },
        _processFunctinos(id, data) {
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
  ${data.body.GLSL(data.arguments)} 
}
`;
        },
        build(id, data) {
            const set = this._functionSets.get(id);
            if (set) {
                let functions = "";
                for (const key of set) {
                    const data = this._functions.get(key);
                    if (!data)
                        continue;
                    functions += this._processFunctinos(key, data);
                    if (data.overrides) {
                        for (const func of data.overrides) {
                            functions += this._processFunctinos(key, func);
                        }
                    }
                }
                return functions;
            }
            if (!data) {
                data = this._functions.get(id);
            }
            if (!data)
                return "";
            let functions = "";
            functions += this._processFunctinos(id, data);
            if (data.overrides) {
                for (const func of data.overrides) {
                    functions += this._processFunctinos(id, func);
                }
            }
            return functions;
        },
    },
    define: {
        _process(data) {
            return `#define ${data[0]} ${data[1]}`;
        },
        build(data) {
            let output = "";
            if (data instanceof Map) {
                for (const [key, define] of data) {
                    output += this._process(define);
                }
                return output;
            }
            if (Array.isArray(data)) {
                for (const define of data) {
                    output += this._process(define);
                }
                return output;
            }
            return this._process(data);
        },
    },
    uniforms: {
        _process(data) {
            let [name, type, length] = data;
            if (length) {
                name += `[${Number(length)}]`;
            }
            return `uniform ${type} ${name};\n`;
        },
        build(data) {
            let output = "";
            if (data instanceof Map) {
                for (const [key, unfirom] of data) {
                    output += this._process(unfirom);
                }
                return output;
            }
            if (Array.isArray(data)) {
                for (const unfirom of data) {
                    output += this._process(unfirom);
                }
                return output;
            }
            return this._process(data);
        },
    },
    snippets: {
        _snippets: new Map(),
        create(id, data) {
            this._snippets.set(id, data);
        },
        override(id, data) {
            const old = this._snippets.get(id);
            if (!old)
                return false;
            this._snippets.set(id, data);
            return true;
        },
        get(id) {
            const data = this._snippets.get(id);
            if (!data)
                return "";
            return data.GLSL;
        },
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
                newShader.push(this.get(id));
            }
            let newBody = newShader.join("\n");
            return { newBody, foundSnippet };
        },
        build(text) {
            let done = false;
            let finalBody = text;
            while (!done) {
                const { newBody, foundSnippet } = this._process(finalBody);
                done = !foundSnippet;
                finalBody = newBody;
            }
            return finalBody;
        },
    },
};
