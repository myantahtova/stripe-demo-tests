import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      'import/internal-regex':
        '^@(controllers|api-schemas|asserters|fixtures|builders|constants|helpers)/',
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*', './*'],
              message:
                'Relative imports are not allowed. Use path aliases (@controllers/*, @builders/*, etc.) instead.',
            },
          ],
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-ins
            'external', // Third-party packages
            'internal', // Internal aliased imports (@/..., ~/...)
            'parent', // Parent relative imports (../)
            'sibling', // Same-folder relative imports (./)
            'index', // Index imports
            'object',
            'type',
          ],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    ignores: ['node_modules', 'dist', 'build', 'playwright-report', 'test-results'],
  },
);
