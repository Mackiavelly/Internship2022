module.exports = {
	env: {
		es2021: true,
	},
	extends: 'airbnb-base',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': ['error', {
			allowIndentationTabs: true,
		}],
		'no-console': ['error', {
			allow: ['warn', 'error', 'log'],
		}],
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: ['const', 'let', 'var'],
				next: '*',
			},
			{
				blankLine: 'any',
				prev: ['const', 'let', 'var'],
				next: ['const', 'let', 'var'],
			},
			{
				blankLine: 'always',
				prev: '*',
				next: 'return',
			},
		],
		'object-curly-newline': ['error', {
			ExportDeclaration: {
				multiline: true,
				minProperties: 5,
			},
		}],
	},
};
