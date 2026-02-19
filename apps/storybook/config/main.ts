import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"
import { mergeConfig } from "vite"

const config = {
  stories: [
    // apps/web
    "../../web/**/*.stories.tsx",
    // packages/ui
    "../../../packages/ui/src/**/*.stories.tsx",
  ],
  framework: "@storybook/react-vite",
  viteFinal: (config) => {
    return mergeConfig(config, {
      plugins: [tailwindcss()],
    })
  },
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"]
} satisfies StorybookConfig

export default config
