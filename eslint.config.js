import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "apps/**",
      "packages/**",
      "tests/**",
      "docs/**",
      "dist/**",
      "node_modules/**",
    ],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {},
  }
);
