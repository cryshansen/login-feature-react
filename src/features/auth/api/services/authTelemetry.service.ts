// features/api/services/authTelemetry.service.ts
import { request } from "./request";
import { API_CONFIG } from "../../../../config/env";
import { AuthTelemetryEvent } from "../schemas/authtelemetry.types";

// destructured version Destructuring is just a shorter way to copy properties out of objects — nothing more.
// take AUTH_BASE_URL and assign (:) it to api_base_url
// const { AUTH_BASE_URL : API_BASE_URL } = API_CONFIG;

const  AUTHTEL_BASE_URL  = API_CONFIG.AUTHTEL_API_URL;

export function emitAuthEvent(
  event: AuthTelemetryEvent,
  metadata: Record<string, any> = {}
) {
  try {
    fetch(`${AUTHTEL_BASE_URL}/telemetry`, {
      method: "POST",
//      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event,
        metadata,
        timestamp: Date.now(),
      }),
      keepalive:true, 
    });
  } catch {
    // Never block auth flows on telemetry
  }
}

/* example Request.ts usage
export function emitAuthEvent(
  event: AuthTelemetryEvent,
  metadata: Record<string, any> = {}
): Promise<MessageResponse> {

    payload = {
        event,
        user_id,
        metadata,
        timestamp: Date.now(),
    }

  return request<MessageResponse>(`${AUTHTEL_BASE_URL}/telemetry`, {
    method: "POST",
    body: JSON.stringify(payload),
    keepalive:true, 
    //credentials: "include"
  });
}
  */
