import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const name = require("./package.json").main.replace(/\.js$/, "");

const coreBundle = (config) => ({
 ...config,
 input: "src/Core/DivineVoxelEngine.ts",
 external: (id) => !/^[./]/.test(id),
});
const worldBundle = (config) => ({
 ...config,
 input: "src/World/DivineVoxelEngineWorld.ts",
 external: (id) => !/^[./]/.test(id),
});
const builderBundle = (config) => ({
 ...config,
 input: "src/Builder/DivineVoxelEngineBuilder.ts",
 external: (id) => !/^[./]/.test(id),
});
const fluidBuilderBundle = (config) => ({
 ...config,
 input: "src/Builder/FluidBuilder/DivineVoxelEngineFluidBuilder.ts",
 external: (id) => !/^[./]/.test(id),
});
export default [
 coreBundle({
  plugins: [esbuild()],
  output: [
   {
    file: `${name}.js`,
    format: "cjs",
    sourcemap: true,
   },
   {
    file: `${name}.mjs`,
    format: "es",
    sourcemap: true,
   },
  ],
 }),
 coreBundle({
  plugins: [dts()],
  output: {
   file: `${name}.d.ts`,
   format: "es",
  },
 }),
 worldBundle({
  plugins: [esbuild()],
  output: [
   {
    file: `${name}.js`,
    format: "cjs",
    sourcemap: true,
   },
   {
    file: `${name}.mjs`,
    format: "es",
    sourcemap: true,
   },
  ],
 }),
 worldBundle({
  plugins: [dts()],
  output: {
   file: `${name}.d.ts`,
   format: "es",
  },
 }),

 builderBundle({
  plugins: [esbuild()],
  output: [
   {
    file: `${name}.js`,
    format: "cjs",
    sourcemap: true,
   },
   {
    file: `${name}.mjs`,
    format: "es",
    sourcemap: true,
   },
  ],
 }),
 builderBundle({
  plugins: [dts()],
  output: {
   file: `${name}.d.ts`,
   format: "es",
  },
 }),

 fluidBuilderBundle({
  plugins: [esbuild()],
  output: [
   {
    file: `${name}.js`,
    format: "cjs",
    sourcemap: true,
   },
   {
    file: `${name}.mjs`,
    format: "es",
    sourcemap: true,
   },
  ],
 }),
 fluidBuilderBundle({
  plugins: [dts()],
  output: {
   file: `${name}.d.ts`,
   format: "es",
  },
 }),
];
