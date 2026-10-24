import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    execArgv: ["--experimental-strip-types"],
    experimental: {
      viteModuleRunner: false,
      nodeLoader: false,
    },
  },
});
