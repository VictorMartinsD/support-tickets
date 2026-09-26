import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "coverage/**"],
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      // Code quality: força uso de const/let, nunca var
      "no-var": "error",
      "prefer-const": "warn",

      // Code quality: detecta código não utilizado
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Logs de inicialização e erros são úteis no processo do servidor.
      "no-console": [
        "warn",
        {
          allow: ["info", "warn", "error"],
        },
      ],

      // Code quality: evita lógica desnecessária
      "no-unreachable": "error",
      "no-duplicate-imports": "error",
    },
  },
  prettier,
];
