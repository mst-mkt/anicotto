import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/work.ts', 'src/media.ts', 'src/season.ts', 'src/pagination.ts'],
  format: 'esm',
  dts: true,
})
