import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["create-vold-app.ts", "helpers/**/*.ts"],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
});
