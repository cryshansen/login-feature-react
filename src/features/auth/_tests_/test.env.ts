import { vi } from 'vitest';

vi.stubEnv('VITE_API_URL', 'http://localhost');
vi.stubEnv('VITE_TELEMETRY_URL', 'http://localhost');
vi.stubEnv('VITE_AUTH_URL', 'http://localhost/auth');