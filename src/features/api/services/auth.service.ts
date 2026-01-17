/** Frontend services replace controllers when the backend is external */
// same as auth.api.ts but black box connection

import { request } from "./request";
import { LoginRequest, AuthResponse, RegisterRequest, RequestPasswordReset, PasswordReset,
  VerifyEmail, MessageResponse, AuthUser } from "../schemas/auth.types";
import { API_CONFIG } from "../../../config/env";


// destructured version Destructuring is just a shorter way to copy properties out of objects — nothing more.
// take AUTH_BASE_URL and assign (:) it to api_base_url
// const { AUTH_BASE_URL : API_BASE_URL } = API_CONFIG;
const  AUTH_BASE_URL  = API_CONFIG.AUTH_BASE_URL;

export function meApi(
): Promise<MessageResponse> {

  return request<MessageResponse>(`${AUTH_BASE_URL}/me`, {
    method: "GET",
    credentials: "include"
  });
}

/**
 * Login
 * POST /users/signin
 *  
 */
export function login(
  payload: LoginRequest
): Promise<AuthResponse> {
  return request<AuthResponse>(`${AUTH_BASE_URL}/signin`, {
    method: "POST",
    body: JSON.stringify(payload),
    //credentials: "include"
  });
}


/**
 * Register
 * POST /users/signup
 * 
 * 
 */

export async function register(
  payload: RegisterRequest
): Promise<AuthResponse> {
  
  return request<AuthResponse>(`${AUTH_BASE_URL}/signup`, {
    method: "POST",
    body: JSON.stringify(payload),
    //credentials: "include"
  });
}



/**
 * Request password reset -- RequestPasswordReset
 * POST /users/resetpassword
 * @param payload (email)
 * @returns 
 */
export async function requestPasswordResetApi(
  payload: RequestPasswordReset,
): Promise<MessageResponse> {
     console.log(payload);

  return request<MessageResponse>(`${AUTH_BASE_URL}/resetpassword`, {
    method: "POST",
    body: JSON.stringify(payload),
//    credentials: "include"
  });

}

/**
 * Confirm password reset - handles the data of a password change form.
 * POST /users/resetnewpass
 * @param payload (password, token, email, tokenUrl) -- tokenUrl = jwttoken
 * @returns 
 */

export async function confirmPasswordResetApi(
  payload: PasswordReset
): Promise<AuthResponse> {

  return request<AuthResponse>(`${AUTH_BASE_URL}/resetnewpass`, {
    method: "POST",
    body: JSON.stringify(payload),
//    credentials: "include"
  });


}
/**
 * This validates the account 
 * @param payload /users/verifyemail
 * @returns 
 */

export async function verifyEmailApi(
  payload: VerifyEmail
): Promise<MessageResponse> {

  return request<MessageResponse>(`${AUTH_BASE_URL}/verifyemail`, {
    method: "POST",
    body: JSON.stringify(payload),
//    credentials: "include"
  });

}