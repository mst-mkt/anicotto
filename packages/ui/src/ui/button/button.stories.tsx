import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button"

const meta = {
  title: "ui/button",
  component: Button,
  args: {
    children: "button",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "disabled",
  },
}

export const AsLink: Story = {
  args: {
    render: <a href="#" />,
    children: "as Link",
  },
}
