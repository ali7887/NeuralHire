import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  {
    ignores: [
  ".next/**",
  "node_modules/**",
  "dist/**",
  "build/**",

  "*.js",
  "scripts/**",
  "playwright.config.ts",
  "vitest.config.ts",
  "vitest.api.config.ts",
  "**/*.test.ts",
    ],
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
      settings: {
    react: {
      version: "detect",
    },
  },

    rules: {
  ...tsPlugin.configs.recommended.rules,
  ...reactPlugin.configs.recommended.rules,
  ...reactHooks.configs.recommended.rules,
  ...nextPlugin.configs.recommended.rules,

  "no-undef": "off",
  "@typescript-eslint/no-unused-vars": "warn",
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/triple-slash-reference": "off",

  "react/react-in-jsx-scope": "off",
    },
  },
];
