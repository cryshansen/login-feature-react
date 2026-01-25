/*=========================
DEFINE APP VARIABLE MAPPINGS
===========================*/

export interface AuthContextValue {
  authuser: AuthUser | null;
  authReady: boolean;
  loading: boolean;
  authMessage: AuthMessageMap | null;

  login: (args: LoginArgs) => Promise<MessageResponse>;
  logout: () => Promise<MessageResponse>;
  signup: (args: SignupArgs) => Promise<MessageResponse>;
  requestPasswordReset: (args: RequestPasswordResetArgs) => Promise<MessageResponse>;
  resetPassword: (args: PasswordResetArgs) => Promise<MessageResponse>;
  verifyEmailAccount: (args: VerifyEmailArgs) => Promise<MessageResponse>;
  clearAuthMessage: () => void;
}

export type AuthMessageType =
  | "success"
  | "error"
  | "info"
  | "warning";

export interface AuthMessageMap {
  type: AuthMessageType;
  text: string;
}

/*=======================
  DEFINE  UI Arguements
========================*/
export interface SignupArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
}

export interface LoginArgs {
  email:string; ///  email field;
  password: string;
  token:string; //captcha
}

// endpoint for the signup flow land on the site url and verify email. 
export interface VerifyEmailArgs {
  email: string;
  token: string; //captcha
  tokenUrl: string; //url token
}
// submit the reset password form 3 fields. email in url parameter
export interface PasswordResetArgs {
  email: string;  //addition added to back end
  password: string;
  confirm:string;
  tokenUrl: string; //
  token: string; //captcha 
}

export interface RequestPasswordResetArgs{
  email:string;
}


/*=======================
  DEFINE API PAYLOADS TAGGED REQUEST
========================*/

/** API Request Type payload what the api should expect*/
export interface LoginRequest {
  username:string; ///  email field;
  password: string;
  token:string; //captcha
}


/** API Request Type payload what the api should expect*/
export interface RegisterRequest {
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  token: string; //captcha
  domain:string;
}
// {"email":"test@test.com","token":"0cAFcWeA7bPVPx7Z4YDe1MBQY5q7uVx7YoXSqDBkoqc5u_iecVQJqWfzc4bBbEfS8MpX8bOUb1dEp3TO_4l_bLJex5NP7qo-a2GZSwKF2dBcjxObv6tnHgJ6inhUD_s27jslV9KRDjnUbVOkgdlTTe6w57sBzqMYwjDm610jSz7frNWjEfOJVjBrhqGPjHtqHlwedxVe7ssB2JAIbbfAWmso-whLDOtz9EcbEKg94n9aKLof2jRSoCcvLr1U9GUUomWxn_hZwNSdT8qTF-0bWpLOyu2DMbHPG_k9QEZp1SqUCB2YLO-WQaHjqFe3AUqylGGS6U86Ul27lTMckV0HlIqb-oT3nV1yZUs9UgSXIGQtASXiPZPn6N5ao7108IQTNnavLQt6ibpA8fmKvmRzdUPt29Ag7bMeILTRh_p1e_o9KfJulO1T3ztm3tNie9SBsCXVYpY2C8B-vvwednq62mkLe-4q8zW8Llwlc-jkf5kfoemn3GIOPY784auh27Sj3w3sOjZw926j4hoZX1dVVzu_e37Tm-Grein3wBKTTelCHLfyHcE-6v_y1kNLAdA-ro8uVBZY2BoNSR1crYPMyX4yTlngYK9J5vI_rLiZRnU0uXWAUyeqHhrOyY_AABtNpS7hMMAs1kftdBLgHh5SYrNCvNF1yp0YCx7nv94HZDok-RXczdpOdNKzPxscp_ksRYcZhF_crA1-iS3gtZJBGPKYtOz6D11x6qe27yPJ5YNmzgIzn9F72Wak4ZcK3E0Y6RpUq4o3WH3Sz7yOKDwYiSl2tqROSF65cZw4Ip9ysc-zXaYoNtQx7IRoSqYjiR62wol_mQwMm8e9o-7WBKpwU7FDA5bu5pPxsbzdGCdgUxiedxkAkI8QDqDg5CukGvXXF1ioOBgmCt8S_rjQGj4k0Ak-2BTHhIbVW_wYoJZ-YHDuf6vw8RbP1c83SsBXd8cc-UK9Dfb1XLCWiP9j5R4ai7Q-43vHKGe3rE62q2btsRxXjGtw3MOAp23NapEcN5taD9LON8nY-4pDNA3aTWJPcZG0wVaIuur181L5FZVQZRvoUoAgvCCBWLE_rsKbYheWRZGyfGjZV8RN17qyUVA5TCDykwWE2tUw4vVON7dWp8Wh6xDn-LaOguLWK4lm4zL7ZEp8iYzKeosmBM1ibaSEjThzwmXYBmN89gcpcg3_w4ggVG9YWK23UWUfr5r8aZmoZch7U8KU3r7dx3V0-PXZ-EIB6yfim-_nNlPDMlJxWuNqEl07NbGcI-XTL92VVS6EA43xBNWC7qDkBKfRSEKV11gbZfHMeDYaUHY80QT9USuxSmOOe-S8UwE46MThlbVCdrxdu3h2GIW0XxE6kaCD6BOSfsy6u5TNFDHXF6M0dc6LyWc4nweUriWfNwUAXwFeUeh5Oa6g7JCsPKMKmnzvclJVtyFta10vXzVhYFc3ZNrlp2rHnseLf0p3gN-sDNRUxJ3uBZWs2p29VyxVQ7-imACWmM7PZaQiXXPUt7C39d4ZHIn0j9RQkkX_p53Bps1Iswu5Vnjg480ZWumOFLQP7VBSUPvRMCjRkJh_V9WEWNJzGuMx2JneF8Ejx9xIQlhD_ifPs3ZdvSGOt_EAA3FU2Idk-ToFuyxcetwLsAlRjU-eMmb4gntx-b_zHESdIj37jJllJlx2kqH0ZbRSxSWEQ2rqBQRsD4loMJDY8YUzw_tjotM_oqt9_8XxI"}
// captcha token
export interface RequestPasswordResetRequest{
    email:string;
    token:string;
}
// submit the reset password form 3 fields. email in url parameter
export interface PasswordResetRequest{
  email: string;  
  password: string; //new password
  tokenUrl: string; //url token sent from backend system to email
  token: string; //captcha 
}

export interface VerifyEmailRequest {
  email: string;
  token: string; //captcha
  jwttoken: string; //url token
}
/*=======================
  DEFINE API RESPONSE TAGGED RESPONSE
========================*/

export interface AuthUser {
  id: number;
  email: string;
  emailVerified:boolean;
}

// general response typed output
export interface MessageResponse {
  message: string;
  success?: boolean; //this is a problem as some respond with success true and the success field as "error" instead. 
}

/** new user from /me endpoint  reponse*/
export type MeResponse=AuthUser;

/** old version of login returning params but new code changes /me endpoint cookie retrieving the user. */
export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

/** new login response from cookie sessions */
export interface LoginResponse {
  message: string;
}
