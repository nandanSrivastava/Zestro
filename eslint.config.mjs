// Minimal ESLint flat config for JS-only project.
// We avoid extending Next's built-in configs because they include
// TypeScript-specific overrides that require the 'typescript' package.
// Provide parserOptions so JSX in .js files is parsed correctly.
const eslintConfig = [
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
