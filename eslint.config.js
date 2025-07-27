import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    env: { "browser": true, "es2021": true },
    files: ['**/*.{ts,tsx}'],
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "airbnb",
      "airbnb/hooks"
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
