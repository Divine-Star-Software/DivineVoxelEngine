import { DVEKernelWASM as WASMModule } from "./kernel.js";

interface WASMModule {
  ccall(
    name: string,
    returnType: string,
    argumentTypes: string[],
    argument: any[]
  ): any;
}

export enum DVEKernelFunctions {
  SABTest = "sabTest",
  DBOToBuffer = "dboToBuffer",
  DVE_BRIDGE_RUN_WORLD_SUN_LIGHT = "DVE_BRIDGE_RUN_WORLD_SUN_LIGHT",
  DVE_BRIDGE_REMOVE_RGB_LIGHT = "DVE_BRIDGE_REMOVE_RGB_LIGHT",
  DVE_BRIDGE_UPDATE_RGB_LIGHT = "DVE_BRIDGE_UPDATE_RGB_LIGHT",
  DVE_BRIDGE_REMOVE_SUN_LIGHT = "DVE_BRIDGE_REMOVE_SUN_LIGHT",
  DVE_BRIDGE_UPDATE_SUN_LIGHT = "DVE_BRIDGE_UPDATE_SUN_LIGHT",
  DVE_BRIDGE_SYNC_VOXEL_TAGS = "DVE_BRIDGE_SYNC_VOXEL_TAGS",
  DVE_BRIDGE_SYNC_VOXEL_PALETTE = "DVE_BRIDGE_SYNC_VOXEL_PALETTE",
  DVE_BRIDGE_SYNC_VOXEL_SUBSTANCE_PALETTE = "DVE_BRIDGE_SYNC_VOXEL_SUBSTANCE_PALETTE",
  DVE_BRIDGE_SYNC_VOXEL_SUBSTANCE_TAGS = "DVE_BRIDGE_SYNC_VOXEL_SUBSTANCE_TAGS",
  DVE_BRIDGE_SYNC_CHUNK_TAGS = "DVE_BRIDGE_SYNC_CHUNK_TAGS",
  DVE_BRIDGE_SYNC_CHUNK = "DVE_BRIDGE_SYNC_CHUNK",
  DVE_BRIDGE_UN_SYNC_CHUNK = "DVE_BRIDGE_UN_SYNC_CHUNK",
  DVE_BRIDGE_SYNC_COLUMN_TAGS = "DVE_BRIDGE_SYNC_COLUMN_TAGS",
  DVE_BRIDGE_SYNC_COLUMN = "DVE_BRIDGE_SYNC_COLUMN",
  DVE_BRIDGE_UN_SYNC_COLUMN = "DVE_BRIDGE_UN_SYNC_COLUMN",
  DVE_BRIDGE_SYNC_REGION_TAGS = "DVE_BRIDGE_SYNC_REGION_TAGS",
  DVE_BRIDGE_SYNC_REGION = "DVE_BRIDGE_SYNC_REGION",
  DVE_BRIDGE_UN_SYNC_REGION = "DVE_BRIDGE_UN_SYNC_REGION",
}
interface FunctionWrapData {
  name: DVEKernelFunctions;
  returnType: string;
  arguments: string[];
}
interface FunctionWrap extends FunctionWrapData {}

class FunctionWrap {
  constructor(data: FunctionWrapData) {
    return Object.assign(this, data);
  }
  call(args: any[]) {
 
    return module.ccall(this.name, this.returnType, this.arguments, args);
  }
}
let module: WASMModule;
let functionsMap: Record<DVEKernelFunctions, FunctionWrap> = {} as any;
export class DVEKernel {
  static call(funcionName: DVEKernelFunctions, ...args: any[]) {

    return functionsMap[funcionName].call(args);
  }

  static init() {
  

    return new Promise(async (resolve) => {
      const resoledModule = await WASMModule();
 
      module = resoledModule;
      resolve(true);
    });
  }
}

const functions: FunctionWrapData[] = [
  {
    name: DVEKernelFunctions.DBOToBuffer,
    arguments: ["array", "number"],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.SABTest,
    arguments: ["number", "number"],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_RUN_WORLD_SUN_LIGHT,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_REMOVE_RGB_LIGHT,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_UPDATE_RGB_LIGHT,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_REMOVE_SUN_LIGHT,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_UPDATE_SUN_LIGHT,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_SYNC_VOXEL_TAGS,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_SYNC_VOXEL_PALETTE,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_SYNC_VOXEL_SUBSTANCE_PALETTE,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_SYNC_VOXEL_SUBSTANCE_TAGS,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_SYNC_CHUNK_TAGS,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_SYNC_CHUNK,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_UN_SYNC_CHUNK,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_SYNC_COLUMN_TAGS,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_SYNC_COLUMN,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_UN_SYNC_COLUMN,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_SYNC_REGION_TAGS,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_SYNC_REGION,
    arguments: [],
    returnType: "number",
  },
  {
    name: DVEKernelFunctions.DVE_BRIDGE_UN_SYNC_REGION,
    arguments: [],
    returnType: "number",
  },
];

for (const func of functions) {
  functionsMap[func.name] = new FunctionWrap(func);
}
