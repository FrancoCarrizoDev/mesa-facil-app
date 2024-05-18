const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    "eslint-config-turbo",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "simple-import-sort/imports": "off",
    "simple-import-sort/exports": "off",
    camelcase: "off",
    "no-console": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/require-await": "off",
    "unicorn/filename-case": "off",
    "import/no-cycle": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "no-implicit-coercion": "off",
    "no-unused-vars": 2,
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    "no-case-declarations": "off",
    "@typescript-eslint/prefer-reduce-type-parameter": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    " @typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "no-useless-catch": "off",
    "@typescript-eslint/no-useless-template-literals": "off",
    "prefer-named-capture-group": "off",
    "@typescript-eslint/no-unused-vars": 2,
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
    "@typescript-eslint/no-floating-promises": "off",
  },
};
