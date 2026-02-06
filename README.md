# Stripe Demo Tests

API testing framework for Stripe Sandbox API using Playwright with TypeScript.

## Project Structure

```
stripe-demo-tests/
├── src/
│   ├── api-schemas/          # Zod schemas for runtime validation
│   │   ├── objects/          # Stripe object schemas
│   │   ├── requests/         # Request payload schemas
│   │   └── responses/        # Response schemas
│   ├── asserters/            # Fluent assertion classes
│   ├── builders/             # Builder pattern for test data
│   │   ├── object-builders/  # Builders for nested objects
│   │   └── request-builders/ # Builders for API requests
│   ├── controllers/          # API controller classes
│   ├── constants/            # Test data sets and enums
│   ├── fixtures/             # Playwright test fixtures
│   └── helpers/              # Utility functions
├── tests/                    # Test specifications
├── playwright-report/        # HTML test reports
├── test-results/             # Test execution artifacts
└── [config files]            # Configuration files
```

## Architecture

### Design Patterns

- **Controller-Asserter Pattern**: Controllers handle API calls, Asserters validate responses
- **Builder Pattern**: Fluent API for constructing test data with faker.js
- **Fixture Pattern**: Playwright fixtures for dependency injection
- **Dual-Generic BaseController**: `BaseController<TController, TAsserter>` for type-safe chaining

### Key Features

- **Zod Schema Validation**: Runtime validation with automatic TypeScript type inference
- **Path Aliases**: Clean imports using `@controllers/*`, `@builders/*`, etc.
- **Parameterized Tests**: Data-driven tests using `forEach` with centralized test data
- **Test Tags**: Organize tests with `@smoke`, `@negative`, `@e2e` tags
- **Fresh Test Data**: Builder getters ensure unique faker data on each build

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure your Stripe API key:
   - Get your test mode secret key from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
   - Create a secrets file for your environment:
     ```bash
     # For local development
     echo "STRIPE_SECRET_KEY=sk_test_your_actual_key_here" > .env.local.secrets

     # Or for dev environment
     echo "STRIPE_SECRET_KEY=sk_test_your_actual_key_here" > .env.dev.secrets
     ```
   - **Important**: `.secrets` files are gitignored and will not be committed

3. **Recommended VS Code Extensions**:
   - **ESLint** (`dbaeumer.vscode-eslint`) - JavaScript/TypeScript linting
   - **dprint** (`dprint.dprint`) - Code formatting
   - **Playwright Test for VS Code** (`ms-playwright.playwright`) - Test running and debugging

   VS Code settings are configured to:
   - Format on save using dprint
   - Auto-fix ESLint issues on save
   - Use non-relative import paths (path aliases)

## Running Tests

```bash
# Run all tests
npm run test

# Run tests with UI mode
npm run test:ui

# Run tests by tag
npm run test:smoke      # Smoke tests only
npm run test:negative   # Negative tests only
npm run test:e2e        # E2E tests only

# Run tests for specific environment (default: local)
ENV=dev npm run test
ENV=prod npm run test
```

## Development

```bash
# Type checking
npm run type:check

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
npm run format:check

# Pre-commit checks (all quality checks)
npm run pre:commit
```

## Code Quality

- **ESLint**: Enforces code standards and path alias usage (no relative imports allowed)
- **dprint**: Consistent code formatting (100 character line width)
- **TypeScript Strict Mode**: Maximum type safety
- **Husky**: Git hooks for pre-commit quality checks

## Environment Configuration

The project uses a template + secrets pattern:

- `.env.local` / `.env.dev`: Templates with non-sensitive defaults (committed)
- `.env.local.secrets` / `.env.dev.secrets`: Actual secrets (gitignored)
- Both files are loaded and merged at runtime

## Stripe API Resources

- [Stripe API Documentation](https://docs.stripe.com/api)
- [Stripe Test Mode](https://docs.stripe.com/testing)
- [Test Card Numbers](https://docs.stripe.com/testing#cards)
- **Base URL**: `https://api.stripe.com`
- **Authentication**: Bearer token via `Authorization` header
