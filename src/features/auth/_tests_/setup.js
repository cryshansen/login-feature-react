import "@testing-library/jest-dom";
import { setupServer } from 'msw/node';
import { authHandlers } from './msw/handlers';

export const server = setupServer(...authHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
