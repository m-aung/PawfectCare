import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/vitest'

// Global cleanup after each test to remove rendered components from the DOM
afterEach(() => {
  cleanup();
});
