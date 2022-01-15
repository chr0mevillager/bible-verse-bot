module.exports = {
	root: true,
	env: {
		node: true,
	},
	plugins: [
		"@typescript-eslint",
	],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-tabs": ["warn", {
			allowIndentationTabs: true,
		}],
		"indent": ["warn", "tab", {
			SwitchCase: 1,
		}],
		"quotes": ["warn", "single", {
			avoidEscape: true,
			allowTemplateLiterals: true,
		}],
		"semi": ["warn", "always"],
		"space-before-function-paren": ["warn", {
			anonymous: "never",
			named: "never",
			asyncArrow: "always",
		}],
		"no-multiple-empty-lines": 0,
		"comma-dangle": ["warn", {
			arrays: "always-multiline",
			objects: "always-multiline",
			imports: "always-multiline",
			exports: "always-multiline",
			functions: "ignore",
		}],
		"padded-blocks": 0,
		"keyword-spacing": ["warn", {
			overrides: {
				"if": { after: false },
				"for": { after: false },
				"while": { after: false },
				"catch": { after: false },
				"switch": { after: false },
			},
		}],
		"promise/param-names": 0,
		"space-unary-ops": ["warn", {
			words: true,
			nonwords: false,
			overrides: {
				typeof: false,
				void: false,
				yield: false,
			},
		}],
		"operator-linebreak": ["warn", "before", {
			overrides: {
				"=": "after",
			},
		}],
		"lines-between-class-members": 0,
		"curly": 0,
		"no-prototype-builtins": 0,
		"no-trailing-spaces": ["warn"],
		"no-return-assign": 0,
		"no-use-before-define": 0, // TypeScript does this better
		"generator-star-spacing": ["warn", {
			before: false,
			after: true,
		}],
		"no-undef": 0, // Causes issues with TypeScript, which already implements this
		"import/first": 0,
		"space-in-parens": 0,
		"space-infix-ops": 0,
		"standard/no-callback-literal": 0,
		"no-multi-spaces": 0,
		"no-case-declarations": 0,
		"no-empty": ["warn", {
			"allowEmptyCatch": true,
		}],
	},
	overrides: [
		{
			files: [
				"*.ts",
			],
			rules: {

				// Typescript-only rules

				// Necessary in some cases where the TypeScript team is being arrogant and not fixing bugs
				"@typescript-eslint/ban-ts-comment": 0,

				"@typescript-eslint/no-inferrable-types": 0,
				"@typescript-eslint/no-non-null-assertion": 0,
				"@typescript-eslint/no-explicit-any": 0,
				"@typescript-eslint/camelcase": 0,
				"@typescript-eslint/explicit-module-boundary-types": 0,
				"@typescript-eslint/ban-types": 0,
				"@typescript-eslint/no-namespace": 0,

				// TypeScript-specific rule extensions

				"func-call-spacing": 0,
				"@typescript-eslint/func-call-spacing": ["warn"],

				"semi": 0,
				"@typescript-eslint/semi": ["warn"],

				"no-unused-vars": 0,
				"@typescript-eslint/no-unused-vars": ["warn", {
					args: "none",
				}],

				"space-before-function-paren": 0,
				"@typescript-eslint/space-before-function-paren": ["warn", {
					anonymous: "never",
					named: "never",
					asyncArrow: "always",
				}],

			},
		},
	],
};
