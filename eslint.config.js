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
      "supabase/**",
    ],
  },
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Ported widgets intentionally use dynamic `any` props/config and keep
      // unused interface members (e.g. `id`) as part of the BaseWidgetProps
      // contract. Match the codebase's established style.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);
