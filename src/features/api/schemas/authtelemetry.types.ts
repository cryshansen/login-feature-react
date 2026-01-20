//authtelemetry.types.ts
// endpoint for the telemetry flow to record activities security requirement 

export type AuthTelemetryEvent =
  | "login_success"
  | "login_failure"
  | "idle_logout"
  | "signup_success"
  | "signup_failure"
  | "token_expired"
  | "password_reset_requested"
  | "password_reset_requested_failure"
  | "password_reset_submit" 
  | "password_reset_submit_failure" 
  | "user_logout"
  | "logout_failure"
  | "verify_email"
  | "verify_email_failure";


// general response typed output
export interface MessageResponse {
  message: string;
  success?: boolean;
}
