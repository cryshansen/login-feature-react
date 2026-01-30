import { loginHandlers } from './login.handlers';
import { emailHandlers } from './verify-email.handlers';
import { signupHandlers } from './signup.handlers';
import { passwordHandlers } from './password.handlers';
import { telemetryHandlers } from "./telemetry.handlers";
import { meHandlers } from "./me.handlers";
import {logoutHandlers} from "./logout.handlers";
import {newpasswordHandlers} from "./newpassword.handlers";

export const handlers =[
    ...meHandlers,
    ...loginHandlers, 
    ...logoutHandlers,
    ...emailHandlers, 
    ...signupHandlers, 
    ...passwordHandlers,
    ...newpasswordHandlers,
    ...telemetryHandlers
];