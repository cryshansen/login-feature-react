import { http, HttpResponse } from 'msw';
import { AUTH_API } from "@/config/env";
const API = AUTH_API;

export const telemetryHandlers = [
  http.post(`${API}/telemetry`, async () =>{
    return HttpResponse.json({ ok: true }, { status: 204 });
  }),
];
