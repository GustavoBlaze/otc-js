module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  globals: {
    Size: "readonly",
    Point: "readonly",
  },
  plugins: ["@typescript-eslint", "prettier", "import"],
  rules: {
    "prettier/prettier": "error",
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "no-restricted-syntax": "off",
    "no-bitwise": "off",
    eqeqeq: "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "no-unused-vars": "off",
    "no-shadow": "off",
    "class-methods-use-this": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
  },
  settings: {
    "import/extensions": [".ts", ".js"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
      typescript: {
        project: "./",
      },
    },
  },
};
