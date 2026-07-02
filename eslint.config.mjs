import nextPlugin from "@next/eslint-plugin-next";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },

  ...tseslint.configs.recommended,

  {
    plugins: {
      "@next/next": nextPlugin,
      "@tanstack/query": tanstackQuery,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },

    rules: {
      // Next.js recommended + core web vitals rules
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      // TanStack Query
      "@tanstack/query/exhaustive-deps": "warn",
      "@tanstack/query/no-rest-destructuring": "warn",
      "@tanstack/query/stable-query-client": "warn",
      "@tanstack/query/no-unstable-deps": "warn",
      "@tanstack/query/infinite-query-property-order": "warn",
      "@tanstack/query/no-void-query-fn": "warn",
      "@tanstack/query/mutation-property-order": "warn",

      // Imports
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",

      // Unused imports / variables
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // TypeScript
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // General quality
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
      "prefer-const": "warn",
    },

    settings: {
      next: {
        rootDir: ["./"],
      },
    },
  },
];

export default eslintConfig;