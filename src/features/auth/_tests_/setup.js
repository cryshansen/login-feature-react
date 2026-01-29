import "@testing-library/jest-dom";
import { setupServer } from 'msw/node';
import { handlers } from './msw/index';

export const server = setupServer();


beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
