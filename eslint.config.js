import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      "coverage/**",
      "artifacts/**",
      "docs/reports/**",
      "test-results/**",
      "playwright-report/**"
    ]
  },
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    rules: {
      "no-console": "off"
    }
  },
  {
    files: ["tests/**/*.ts", "playwright.config.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      }
    }
  }
];
