module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["off"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    semi: ["error", "always"],
    "comma-dangle": ["error", "never"],
    "no-console": "off"
  }
};
