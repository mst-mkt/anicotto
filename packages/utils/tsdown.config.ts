import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/classname.ts'],
  format: 'esm',
  dts: true,
})
