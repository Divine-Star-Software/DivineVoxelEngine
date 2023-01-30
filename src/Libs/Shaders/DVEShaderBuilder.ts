import { DVEShader } from "./Classes/DVEShader.js";
import type {
 ShaderCodeBody,
 ShaderFunctionData,
} from "./Types/ShaderData.types";

export const DVEShaderBuilder = {
 shaders: <Map<string, DVEShader>>new Map(),
 functions: <Map<string, ShaderFunctionData>>new Map(),
 snippets: <Map<string, ShaderCodeBody>>new Map(),

 buildShader(id: string) {},

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
   newShader.push(this.buildSnippet(id));
  }
  let newBody = newShader.join("\n");
  return { newBody, foundSnippet };
 },

 _replaceSnippets(text: string) {
  let done = false;
  let finalBody = text;
  while (!done) {
   const { newBody, foundSnippet } = this._process(finalBody);
   done = !foundSnippet;
   finalBody = newBody;
  }
  return finalBody;
 },

 _buildFunction(id: string, data: ShaderFunctionData) {
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

 buildFunction(id: string, data?: ShaderFunctionData) {
  if (!data) {
   data = this.functions.get(id)!;
  }
  if (!data) return "";
  let functions = "";
  functions += this._buildFunction(id, data);
  if (data.overrides) {
   for (const func of data.overrides) {
    functions += this._buildFunction(id, func);
   }
  }
  return functions;
 },

 buildSnippet(id: string) {
  const data = this.snippets.get(id);
  if (!data) return "";
  return data.GLSL;
 },

 createShader(id: string) {
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

 createFunction(id: string, data: ShaderFunctionData) {
  this.functions.set(id, data);
 },

 createSnippet(id: string, data: ShaderCodeBody) {
  this.snippets.set(id, data);
 },
};
