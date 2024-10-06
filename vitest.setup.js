// vitest.setup.js
import '@testing-library/jest-dom'; // Custom matchers for jest-dom

// Optional: If you have a global mock or configuration, you can add it here.
// For example, if you're using a mock service worker (MSW) for API calls,
// you can set it up here.

import { beforeAll, afterAll } from 'vitest';

// Optionally, you can set up a mock service worker (if you're using MSW)
beforeAll(() => {
  // Set up MSW or other global mocks here
  // For example, start the service worker
  // worker.start();
});

afterAll(() => {
  // Clean up after tests
  // For example, stop the service worker
  // worker.stop();
});

// You can also include any other global configurations or polyfills here.
// For example, if you're using React Router or any other libraries that
// need to be set up globally for your tests, do it here.
