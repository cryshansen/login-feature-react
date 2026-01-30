import { http, HttpResponse } from 'msw';

const API = 'http://localhost';

export const telemetryHandlers = [
  http.post(`${API}/telemetry`, async () =>{
    return HttpResponse.json({ ok: true }, { status: 204 });
  }),
];
