// vitest.setup.js
import '@testing-library/jest-dom'; // Import jest-dom for custom matchers

import { beforeAll, afterAll } from 'vitest';

beforeAll(() => {
  // Set up MSW or other global mocks here
});

afterAll(() => {
  // Clean up after tests
});
