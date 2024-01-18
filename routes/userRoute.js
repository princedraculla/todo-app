import { Router } from "express";
import verifyToken from "../middleware/authMidleware.js";
import * as controller from "../controller/user.js";
const route = Router();

route.get("/api/user", controller.allUsers);
route.post("/api/user/signup", controller.createUser);
route.delete("/api/user/delete/:id", verifyToken, controller.deleteUser);
route.patch("/api/user/update/:id", verifyToken, controller.updateInfo);

export { route };
