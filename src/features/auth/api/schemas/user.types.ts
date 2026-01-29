
export interface ProfileUpdate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// endpoint for the signup flow land on the site and verify email. 
export interface ChangeEmail {
  email: string;
  newemail : string;
  token: string;
}


// general response typed output
export interface MessageResponse {
  message: string;
  success?: boolean;
}