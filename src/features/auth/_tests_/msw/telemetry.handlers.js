import { http, HttpResponse } from 'msw';
import { API_CONFIG } from "../../../../config/env";
const API = API_CONFIG.AUTHTEL_API_URL;

export const telemetryHandlers = [
  http.post(`${API}/telemetry`, async () =>{
    return HttpResponse.json({ ok: true }, { status: 204 });
  }),
];
