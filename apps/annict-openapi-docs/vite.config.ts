import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { defineConfig } from "vite"

const require = createRequire(import.meta.url)
const openapiPath = require.resolve("@anicotto/annict-openapi/openapi.yaml")

export default defineConfig({
  plugins: [
    {
      name: "serve-openapi",
      configureServer(server) {
        server.watcher.add(openapiPath)
        server.watcher.on("change", (path) => {
          if (path === openapiPath) {
            server.ws.send({ type: "full-reload" })
          }
        })

        server.middlewares.use("/openapi.yaml", (_req, res) => {
          const content = readFileSync(openapiPath, "utf-8")
          res.setHeader("Content-Type", "application/yaml")
          res.end(content)
        })
      },
    },
  ],
})
