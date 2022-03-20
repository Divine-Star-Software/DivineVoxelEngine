import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const name = require("./package.json").main.replace(/\.js$/, "");

const coreBundle = (config) => ({
 ...config,
 input: "src/index.ts",
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





];
