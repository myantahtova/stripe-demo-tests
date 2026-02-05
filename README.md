# Stripe Demo Tests

API testing framework for Stripe Sandbox API using Playwright.

## Project Structure

```
stripe-demo-tests/
├── src/
│   ├── api-schemas/      # TypeScript interfaces for Stripe API objects
│   ├── asserters/        # Asserter classes for response validation
│   ├── builders/         # Builder classes for request payloads
│   ├── controllers/      # API controller classes
│   │   └── base-controller.ts
│   ├── fixtures/         # Playwright test fixtures
│   │   └── api-fixtures.ts
│   └── helpers/          # Utility functions
│       └── api-logger.ts
├── tests/                # Test specifications
├── .env.local            # Local environment config
├── .env.dev              # Dev environment config
├── playwright.config.ts  # Playwright configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure your Stripe API key:
   - Get your test mode secret key from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
   - Update `.env.local` with your key:
     ```
     STRIPE_SECRET_KEY=sk_test_your_actual_key_here
     ```

3. Install Playwright browsers (if needed for debugging):
   ```bash
   npx playwright install
   ```

## Running Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests for specific environment
ENV=dev npm test
```

## Stripe API Base URL

- **Base URL**: `https://api.stripe.com`
- **API Version**: Uses the latest Stripe API version
- **Authentication**: Bearer token via `Authorization` header

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
```

## Adding New Controllers

1. Create a new controller in `src/controllers/` extending `BaseController`
2. Create corresponding asserter in `src/asserters/`
3. Add request/response schemas in `src/api-schemas/`
4. Add builder classes in `src/builders/`
5. Register the controller as a fixture in `src/fixtures/api-fixtures.ts`

## Stripe API Resources

- [Stripe API Documentation](https://docs.stripe.com/api)
- [Stripe Test Mode](https://docs.stripe.com/testing)
- [Test Card Numbers](https://docs.stripe.com/testing#cards)
