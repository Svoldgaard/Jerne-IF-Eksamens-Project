import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import { globalIgnores, defineConfig } from 'eslint/config';
import { plugin as noStateInView } from './eslint-rules/no-state-in-view.js';


export default defineConfig([
    globalIgnores(['dist']),
    {
        plugins: {
            react,
            'no-state-in-view': noStateInView,
        },
        rules: {
            'no-unused-vars': 'warn',
            'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
            'react/destructuring-assignment' : 'warn',
            'react/hook-use-state': 'warn',
            'no-state-in-view/no-hooks-in-ui': 'error',
        },
        files: ['**/*.{ts,tsx}'],
        extends: [js.configs.recommended, tseslint.configs.recommended],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
]);
