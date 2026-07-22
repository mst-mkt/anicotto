import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  run: {
    tasks: {},
  },
  fmt: {
    ignorePatterns: [],
    semi: false,
    singleQuote: true,
    sortImports: {},
    sortPackageJson: {
      sortScripts: false,
    },
  },
  lint: {
    ignorePatterns: [],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
})
