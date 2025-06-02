import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import stylistic from '@stylistic/eslint-plugin';
import prettierPlugin from "eslint-plugin-prettier";

export default [
	js.configs.recommended,
	prettier,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: ['./tsconfig.json'],
			},
			globals: {
				console: 'readonly',
				process: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
			'@stylistic': stylistic,
			prettier: prettierPlugin,
		},
		rules: {
			...tseslint.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': ['warn'], // <-- set to 'warn'
			'@stylistic/max-len': ['error', { code: 120, ignoreComments: true, ignoreTrailingComments: true }],
			'no-unused-vars': 'off',
			'no-unsafe-optional-chaining': 'off',
			'no-constant-condition': 'off',
			"prettier/prettier": "error",
		},
	},
];
