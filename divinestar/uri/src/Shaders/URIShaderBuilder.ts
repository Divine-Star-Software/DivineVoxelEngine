import { URIShader } from "./Classes/URIShader.js";
import type {
  ShaderDefinesData,
  ShaderFunctionData,
  ShaderSnippetData,
  ShaderUniformData,
} from "./Types/ShaderData.types.js";

export const URIShaderBuilder = {
  shaders: {
    _shaders: <Map<string, URIShader>>new Map(),
    create(id: string) {
      const shader = new URIShader(id);
      this._shaders.set(id, shader);
      return shader;
    },
  },

  functions: {
    _functions: <Map<string, ShaderFunctionData<any>>>new Map(),
    _functionSets: <Map<string, string[]>>new Map(),
    create(id: string, data: ShaderFunctionData<any>) {
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

    _processFunctinos(
      id: string,
      data: ShaderFunctionData<any>,
      shader: URIShader | null = null
    ) {
      let paramters = "";
      let count = 0;
      for (const [key, type] of data.inputs) {
        count++;
        if (Array.isArray(type)) {
          paramters += `${type[0]}[${type[1]}] ${key}${
            count != data.inputs.length ? "," : ""
          }`;
          continue;
        }
        paramters += `${type} ${key}${count != data.inputs.length ? "," : ""}`;
      }
      let trueArgs = data.arguments;
      if (shader) {
        trueArgs =
          shader.data.functionArgumentOverrides.get(id) || data.arguments;
      }

      return `
${data.output} ${id}(${paramters}){
  ${data.body.GLSL(trueArgs)} 
}
`;
    },

    build(
      id: string,
      data: ShaderFunctionData<any> | null = null,
      shader: URIShader | null = null,
      predicate: (id: string, type: ShaderFunctionData<any>) => boolean = () =>
        true
    ) {
      const set = this._functionSets.get(id);
      if (set) {
        let functions = "";
        for (const key of set) {
          const data = this._functions.get(key);
          if (!data || !predicate(key, data)) continue;
          functions += this._processFunctinos(key, data, shader);
          if (data.overrides) {
            for (const func of data.overrides) {
              if (!predicate(key, func)) continue;
              functions += this._processFunctinos(key, func, shader);
            }
          }
        }
        return functions;
      }

      if (!data) {
        data = this._functions.get(id)!;
      }
      if (!data || !predicate(id, data)) return "";
      let functions = "";
      functions += this._processFunctinos(id, data, shader);
      if (data.overrides) {
        for (const func of data.overrides) {
          if (!predicate(id, func)) continue;
          functions += this._processFunctinos(id, func, shader);
        }
      }
      return functions;
    },
  },

  define: {
    _process(data: ShaderDefinesData) {
      return `#define ${data[0]} ${data[1]}`;
    },
    build(
      data:
        | ShaderDefinesData
        | ShaderDefinesData[]
        | Map<string, ShaderDefinesData>
    ) {
      let output = "";
      if (data instanceof Map) {
        for (const [key, define] of data) {
          output += this._process(define as ShaderDefinesData);
        }
        return output;
      }
      if (Array.isArray(data)) {
        for (const define of data) {
          output += this._process(define as ShaderDefinesData);
        }
        return output;
      }
      return this._process(data);
    },
  },

  uniforms: {
    _process(data: ShaderUniformData) {
      let [name, type, length] = data;
      if (length) {
        name += `[${Number(length)}]`;
      }
      if (type == "ignore") return "\n";
      return `uniform ${type} ${name};\n`;
    },
    build(
      data: ShaderUniformData[] | Map<string, ShaderUniformData>,
      predicate: (id: string, type: ShaderUniformData) => boolean = () => true
    ) {
      let output = "";
      if (data instanceof Map) {
        for (const [key, unfirom] of data) {
          if (!predicate(key, unfirom)) continue;
          output += this._process(unfirom as ShaderUniformData);
        }
        return output;
      }
      if (Array.isArray(data)) {
        for (const unfirom of data) {
          if (!predicate(unfirom[0], unfirom)) continue;
          output += this._process(unfirom as ShaderUniformData);
        }
        return output;
      }
      return this._process(data);
    },
  },

  snippets: {
    _snippets: <Map<string, ShaderSnippetData<any>>>new Map(),
    create(data: ShaderSnippetData<any>) {
      this._snippets.set(data.id, data);
    },
    override(id: string, data: ShaderSnippetData<any>) {
      const old = this._snippets.get(id);
      if (!old) return false;
      this._snippets.set(id, data);
      return true;
    },
    get(id: string, args?: any) {
      const data = this._snippets.get(id);
      if (!data) return "";
      return data.body.GLSL(args ? args : data.arguments);
    },
    _process(text: string, shader?: URIShader) {
      const lines = text.split("\n");
      let foundSnippet = false;
      const newShader: string[] = [];
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
          if (!char || char == " " || char == "\n" || char == "\r") break;
          id += char;
        }
        let args;
        if (shader) {
          args = shader.data.snippetArgumentOverrides.get(id);
        }
        newShader.push(this.get(id, args));
      }
      let newBody = newShader.join("\n");
      return { newBody, foundSnippet };
    },

    build(text: string, shader?: URIShader) {
      let done = false;
      let finalBody = text;
      while (!done) {
        const { newBody, foundSnippet } = this._process(finalBody, shader);
        done = !foundSnippet;
        finalBody = newBody;
      }
      return finalBody;
    },
  },
};
