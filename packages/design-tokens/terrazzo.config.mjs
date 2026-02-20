import { defineConfig } from '@terrazzo/cli'
import css from '@terrazzo/plugin-css'
import tailwind from '@terrazzo/plugin-tailwind'

export default defineConfig({
  tokens: ['./tokens.jsonc'],
  outDir: './dist/',
  plugins: [
    css(),
    tailwind({
      filename: 'tailwind-theme.css',
      theme: {
        color: ['color.*'],
        spacing: ['spacing.*'],
        radius: ['radius.*'],
      },
    }),
  ],
})
