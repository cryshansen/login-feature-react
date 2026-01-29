import { loginHandlers } from './msw/login.handlers';
import { emailHandlers } from './msw/verify-email.handlers';
import { signupHandlers } from './msw/signup.handlers';
import { passwordHandlers } from './msw/password.handlers';
import {telemetryHandlers} from "./msw/telemetry.handlers";

export const handlers =[
    ...loginHandlers, 
    ...emailHandlers, 
    ...signupHandlers, 
    ...passwordHandlers,
    ...telemetryHandlers
]