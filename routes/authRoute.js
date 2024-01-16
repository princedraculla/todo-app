import { Router } from "express";
import * as controller from "../controller/auth.js";

const authRoute = Router();

authRoute.post("/api/user/register", controller.register);
authRoute.post("/api/user/login", controller.login);

export { authRoute };
