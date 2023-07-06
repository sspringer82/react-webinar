import '@testing-library/jest-dom';
import { afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// Matcher erweitern
expect.extend(matchers);

// nach jedem Test aufräumen
afterEach(() => {
  cleanup();
});
