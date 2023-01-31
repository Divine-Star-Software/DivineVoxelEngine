import { DVEShader } from "./Classes/DVEShader.js";
import type {
 ShaderCodeBody,
 ShaderFunctionData,
} from "./Types/ShaderData.types";

export const DVEShaderBuilder = {
 buildShader(id: string) {},

 shaders: {
  _shaders: <Map<string, DVEShader>>new Map(),
  create(id: string) {
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
   this._shaders.set(id, shader);
   return shader;
  },
 },

 functions: {
  _functions: <Map<string, ShaderFunctionData>>new Map(),
  _functionSets: <Map<string, string[]>>new Map(),
  create(id: string, data: ShaderFunctionData) {
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

  _processFunctinos(id: string, data: ShaderFunctionData) {
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
   return `
${data.output} ${id}(${paramters}){
  ${data.body.GLSL} 
}
`;
  },

  build(id: string, data?: ShaderFunctionData) {
   const set = this._functionSets.get(id);
   if (set) {
    let functions = "";
    for (const key of set) {
     const data = this._functions.get(key);
     if (!data) continue;
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
    data = this._functions.get(id)!;
   }
   if (!data) return "";
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

 snippets: {
  _snippets: <Map<string, ShaderCodeBody>>new Map(),
  create(id: string, data: ShaderCodeBody) {
   this._snippets.set(id, data);
  },
  override(id: string, data: ShaderCodeBody) {
   const old = this._snippets.get(id);
   if (!old) return false;
   this._snippets.set(id, data);
   return true;
  },
  get(id: string) {
   const data = this._snippets.get(id);
   if (!data) return "";
   return data.GLSL;
  },
  _process(text: string) {
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
    newShader.push(this.get(id));
   }
   let newBody = newShader.join("\n");
   return { newBody, foundSnippet };
  },

  build(text: string) {
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
