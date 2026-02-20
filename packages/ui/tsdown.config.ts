import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/ui/button/index.ts'],
  format: 'esm',
  dts: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  noExternal: ['@anicotto/utils'],
})
