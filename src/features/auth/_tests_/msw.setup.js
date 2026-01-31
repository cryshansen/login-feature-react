import "@testing-library/jest-dom";
import { setupServer } from 'msw/node';
import { handlers } from './msw';

export const server = setupServer(...handlers);


beforeAll(() => { 
    process.env.VITE_AUTH_API_URL = "http://localhost";
    process.env.VITE_USER_API_URL = "http://localhost";
    process.env.VITE_AUTHTEL_API_URL = "http://localhost";
    server.listen({ onUnhandledRequest: 'error' }) 
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
