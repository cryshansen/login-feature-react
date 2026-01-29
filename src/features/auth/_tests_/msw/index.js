import { loginHandlers } from './login.handlers';
import { emailHandlers } from './verify-email.handlers';
import { signupHandlers } from './signup.handlers';
import { passwordHandlers } from './password.handlers';
import {telemetryHandlers} from "./telemetry.handlers";

export const handlers =[
    ...loginHandlers, 
    ...emailHandlers, 
    ...signupHandlers, 
    ...passwordHandlers,
    ...telemetryHandlers
];