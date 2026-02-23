import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/classname.ts', 'src/result.ts'],
  format: 'esm',
  dts: true,
})
