// @ts-expect-error -- idk
import pluginJs from '@eslint/js';
// @ts-expect-error -- idk
import next from '@next/eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
// @ts-expect-error -- idk
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
// @ts-expect-error -- idk
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: typescriptParser,
      parserOptions: { project: './tsconfig.json' },
    },
    plugins: {
      next,
      react: pluginReact,
      '@typescript-eslint': tsPlugin,
      prettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      // @ts-expect-error -- idk
      ...tsPlugin.configs.recommended.rules,
      // @ts-expect-error -- idk
      ...pluginReact.configs.flat.recommended.rules,
      ...prettierConfig.rules, // Ensures Prettier conflicts are resolved
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      'prettier/prettier': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
