
import { request } from "./request";
import { MessageResponse, ProfileUpdate, ChangeEmail } from "../schemas/user.types";
import { API_CONFIG } from "../../../config/env";


// destructured version Destructuring is just a shorter way to copy properties out of objects — nothing more.
// take AUTH_BASE_URL and assign (:) it to api_base_url
// const { AUTH_BASE_URL : API_BASE_URL } = API_CONFIG;
const  API_BASE_URL  = API_CONFIG.USER_API_URL;

/**
 * 
 * Update Profile first last name
 * API needs handling in backend profileupdate
 * 
 */
export async function updateProfile(
  payload:ProfileUpdate
): Promise<MessageResponse> {

    return request<MessageResponse>(`${API_BASE_URL}/profileupdate`, {
      method: "PUT",
      body: JSON.stringify(payload),
      credentials: "include"
    });
}
/**
 *  '/changeemail' endpoint needed
 *  * @param payload(email, newEmail)
 * @returns 
 * 
 */

export async function changeProfileEmail(
  payload:ChangeEmail
): Promise<MessageResponse> {

    return request<MessageResponse>(`${API_BASE_URL}/changeemail`, {
      method: "POST",
      body: JSON.stringify(payload),
      credentials: "include"
    });
}