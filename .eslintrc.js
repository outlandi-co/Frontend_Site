// eslint-disable-next-line no-undef
module.exports = {
  env: {
      browser: true, // To recognize browser globals like window and document
      node: true, // To recognize Node.js globals like module and process
      es2021: true, // To enable ES2021 features
  },
  parserOptions: {
      ecmaVersion: 12, // Support ES2021 syntax
      sourceType: 'module', // Use ES modules
  },
  extends: [
      'eslint:recommended', // Use recommended ESLint rules
      'plugin:react/recommended', // Enable React-specific linting rules
  ],
  settings: {
      react: {
          version: 'detect', // Automatically detect the version of React
      },
  },
  globals: {
      import: 'readonly', // Allow `import.meta.env` used in Vite
      process: 'readonly', // In case process is needed in some contexts
  },
  rules: {
      // Add or override custom rules as needed
      'no-unused-vars': ['warn'], // Warn about unused variables instead of erroring
      'react/prop-types': 'off', // Disable prop-types rule (useful if you're using TypeScript)
  },
};
