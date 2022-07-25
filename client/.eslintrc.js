module.exports = {
  "root": true,
  "plugins": [
    "@typescript-eslint",
    "prettier",
    "import"
  ],
  "extends": [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "eslint-config-prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname
  },
  "ignorePatterns": ['.eslintrc.js', 'webpack.config.js'],
  "rules": {
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-empty-function": "off",
    "react-hooks/exhaustive-deps": "warn",
    "import/prefer-default-export": "off",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        "selector": "variable",
        "format": ["camelCase", "PascalCase"]
      },
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      },
      {
        "selector": "typeAlias",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^T[A-Z]",
          "match": true
        }
      },
      
    ]
  },
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    }
  }
}
