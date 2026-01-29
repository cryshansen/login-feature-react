import { loginHandlers } from './login.handlers';
import { emailHandlers } from './verify-email.handlers';
import { signupHandlers } from './signup.handlers';
import { passwordHandlers } from './password.handlers';
import {telemetryHandlers} from "./telemetry.handlers";
import { meHandlers } from "./me.handlers";

export const handlers =[
    ...meHandlers,
    ...loginHandlers, 
    ...emailHandlers, 
    ...signupHandlers, 
    ...passwordHandlers,
    ...telemetryHandlers
];