import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    parser: '@typescript-eslint/parser',
    extends: [
      'airbnb',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'linebreak-style': 0,
      'import/prefer-default-export': 0,
      'import/extensions': 0,
      'no-use-before-define': 0,
      'import/no-unresolved': 0,
      'react/react-in-jsx-scope': 0,
      'import/no-extraneous-dependencies': 0,
      'react/prop-types': 0,
      'react/jsx-filename-extension': [
        2,
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      'react/require-default-props': 'warn',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
);
