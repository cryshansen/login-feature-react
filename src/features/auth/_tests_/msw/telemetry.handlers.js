import { http, HttpResponse } from 'msw';

const API = 'http://localhost';

export const telemetryHandlers = [
  http.post(`${API}/telemetry`, () =>
    new HttpResponse(null, { status: 204 })
  ),
];
