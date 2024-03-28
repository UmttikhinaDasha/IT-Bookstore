module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["airbnb", "prettier"],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "./tsconfig.json",
    "ecmaVersion": 6,
    "sourceType": "module",
  },
  plugins: ["jsdoc", "@typescript-eslint", "prettier", "simple-import-sort"],
  rules: {
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "": "never",
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never",
      },
    ],
    "react/function-component-definition": "off",
    "react/no-array-index-key": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react/jsx-filename-extension": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/no-unresolved": "off",
    "no-undef": "off",
    "no-param-reassign": "off",
    "arrow-body-style": "off",
    "no-shadow": "off",
    "react/jsx-props-no-spreading": "warn",
    "@typescript-eslint/no-shadow": "warn",
    "no-restricted-syntax": ["off", "ForOfStatement"],
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/no-empty-interface": [
      "error",
      {
        "allowSingleExtends": false,
      },
    ],
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": false,
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
      },
    ],
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",
    "@typescript-eslint/comma-dangle": "off",
    "jsdoc/require-description-complete-sentence": [
      "error",
      {
        "tags": ["see", "copyright"],
      },
    ],
    "jsdoc/require-param": [
      "error",
      {
        "checkDestructured": false,
        "enableFixer": false,
      },
    ],
    "jsdoc/require-param-name": "error",
    "jsdoc/require-param-description": "error",
    "jsdoc/check-tag-names": "error",
    "jsdoc/no-types": "error",
    "func-style": [
      "error",
      "declaration",
      {
        "allowArrowFunctions": true,
      },
    ],
    "jsdoc/check-alignment": "error",

    "jsdoc/no-bad-blocks": "error",
  },
  overrides: [
    // override "simple-import-sort" config
    {
      "files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
      "rules": {
        "simple-import-sort/imports": [
          "error",
          {
            "groups": [
              // Packages `react` related packages come first.
              ["^react", "^@?\\w"],
              // Internal packages.
              ["^(@|components)(/.*|$)"],

              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Side effect imports.
              ["^\\u0000"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"],
            ],
          },
        ],
      },
    },
  ],
}
