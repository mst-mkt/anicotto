import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  dts: true,
  inlineOnly: ["openapi-fetch", "openapi-typescript-helpers"],
})
