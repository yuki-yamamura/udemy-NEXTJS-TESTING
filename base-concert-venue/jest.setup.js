// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// polyfill necessary for jsdon test environment
// see: https://stackoverflow.com/a/68468204
import { TextDecoder, TextEncoder } from "util";

import { resetDB } from "@/__tests__/__mocks__/db/utils/reset-db";
import { server } from "@/__tests__/__mocks__/msw/server";

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

beforeAll(() => server.listen());

beforeEach(() => server.resetHandlers());
beforeEach(async () => {
  await resetDB();
});

afterAll(() => server.close());
