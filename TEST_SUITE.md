# Test Suite Documentation

## Overview

This portfolio website now includes a comprehensive test suite demonstrating professional testing practices. The test suite achieves **100% test pass rate** with 65 passing tests across unit, component, and integration testing levels.

## Test Framework

- **Vitest** - Fast test runner optimized for Vite/Next.js projects
- **React Testing Library** - Component testing with user-centric queries
- **jsdom** - Browser environment simulation
- **Testing Library Jest DOM** - Extended matchers for DOM assertions

## Test Structure

```
portfolio/
├── src/
│   ├── app/
│   │   └── __tests__/        # Page tests
│   │       ├── page.test.tsx (Home page - 9 tests)
│   │       ├── blog/__tests__/page.test.tsx (3 tests)
│   │       ├── cooking/__tests__/page.test.tsx (5 tests)
│   │       └── poker/
│   │           ├── __tests__/page.test.tsx (4 tests)
│   │           └── casinos/__tests__/page.test.tsx (9 tests)
│   └── components/
│       └── __tests__/         # Component tests
│           ├── Header.test.tsx (5 tests)
│           ├── Footer.test.tsx (5 tests)
│           ├── Layout.test.tsx (5 tests)
│           ├── PageTransition.test.tsx (3 tests)
│           └── ParticleBackground.test.tsx (2 tests)
└── test/
    ├── integration/           # Integration tests
    │   ├── navigation.test.tsx (8 tests)
    │   └── poker-flow.test.tsx (7 tests)
    ├── setup.ts              # Test configuration & mocks
    └── utils.tsx             # Test utilities

Total: 12 test files, 65 tests
```

## Test Coverage

### Component Tests (35 tests)
Tests individual React components in isolation:

- **Header** - Navigation rendering, links, home icon functionality
- **Footer** - Social links, copyright, external link behavior
- **Layout** - Component composition, children rendering
- **PageTransition** - Animation wrapper functionality
- **ParticleBackground** - Background effect rendering

### Page Tests (30 tests)
Tests entire page components:

- **Home** - Bio content, external links, contact information
- **Poker** - Hub page with casino navigation
- **Casinos** - Location lists, map integration, thoughts section
- **Cooking** - Adventure list, navigation links
- **Blog** - Coming soon placeholder

### Integration Tests (15 tests)
Tests user flows and cross-component interactions:

- **Navigation Flow** - Header/footer consistency, link behavior
- **Poker Flow** - Hub → Casinos navigation, data consistency

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Key Testing Patterns

### 1. Component Mocking
Essential Next.js and third-party components are mocked:
- `next/image` - Image optimization
- `next/link` - Client-side navigation
- `next/navigation` - Routing hooks
- `framer-motion` - Animations
- `@tsparticles/react` - Particle effects

### 2. User-Centric Testing
Tests focus on user-visible behavior rather than implementation details:
```typescript
// Good: Testing what users see
expect(screen.getByRole('link', { name: /Blog/i })).toHaveAttribute('href', '/blog')

// Avoided: Testing internal state or implementation
```

### 3. Accessibility-First Queries
Uses semantic queries that promote accessible markup:
- `getByRole` - Semantic HTML roles
- `getByText` - Visible text content
- `getByAltText` - Image alternatives

### 4. Realistic User Interactions
Tests verify actual user experiences:
- Link navigation
- External link behavior (target="_blank")
- Hover states
- Content rendering

## Test Configuration

### vitest.config.ts
- jsdom environment for browser APIs
- Path aliases matching Next.js config (`@/*`)
- PostCSS disabled for test performance
- Coverage reporting (v8 provider)

### test/setup.ts
Global test setup:
- Auto-cleanup after each test
- Mock Next.js components
- Mock animation libraries
- Mock CSS imports

## What's NOT Tested

Intentionally excluded from testing:
- Visual styling (CSS class assertions)
- Animation timing/easing
- Dynamic map rendering (PostCSS conflicts)
- Build-time optimizations
- Server-side rendering behavior

## CI/CD Integration

Tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage
```

## Benefits for Public Repository

This test suite demonstrates:

1. **Professional Standards** - Industry-standard testing practices
2. **Code Quality** - Confidence in functionality and regressions
3. **Documentation** - Tests serve as usage examples
4. **Maintainability** - Safe refactoring with test coverage
5. **Best Practices** - Separation of concerns, mocking, isolation

## Future Enhancements

Potential additions:
- E2E tests with Playwright
- Visual regression testing
- Performance testing
- Accessibility auditing (axe-core)
- Coverage thresholds enforcement

## Maintenance

When adding new features:
1. Write tests alongside new components/pages
2. Update mocks if adding new dependencies
3. Maintain user-centric testing approach
4. Keep tests simple and focused
5. Avoid testing implementation details

---

**Test Status**: ✅ 65/65 passing (100%)
**Last Updated**: November 2025
