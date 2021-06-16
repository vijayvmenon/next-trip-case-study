module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'react-app/jest', 'airbnb', 'prettier'],
  plugins: ['jsx-a11y', 'react', 'react-hooks', 'import'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-eval': 'error',
    'import/first': 'error',
    'object-curly-newline': 'off',
    // change line-break eslint property based on OS
    // 'linebreak-style': [
    //   'error',
    //   process.platform === 'win32' ? 'windows' : 'unix',
    // ],
    // 'jsx-a11y/anchor-is-valid': [
    //   'error',
    //   {
    //     components: ['Link'],
    //     specialLink: ['href'],
    //     //   "aspects": ["noHref", "invalidHref", "preferButton"]
    //   },
    // ],
  },
};
