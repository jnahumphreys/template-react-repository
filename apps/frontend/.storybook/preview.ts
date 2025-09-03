import type { Preview } from "@storybook/react-vite";
import "@/styles/globals.css";

const tailwindCssViewports = {
  sm: {
    name: "sm",
    styles: {
      width: "40rem",
      height: "100%",
    },
  },
  md: {
    name: "md",
    styles: {
      width: "48rem",
      height: "100%",
    },
  },
  lg: {
    name: "lg",
    styles: {
      width: "64rem",
      height: "100%",
    },
  },
  xl: {
    name: "xl",
    styles: {
      width: "80rem",
      height: "100%",
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    viewport: {
      options: {
        ...tailwindCssViewports,
      },
    },
  },
};

export default preview;
