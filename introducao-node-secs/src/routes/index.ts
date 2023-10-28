import { Router } from "express";
import { helloWorldRoutes } from "./helloWordRoutes";
import { usersRoutes } from "./usersRoutes";
import { authenticateRoutes } from "./authenticateRoutes";


const routes = Router();

routes.use("/hello-world", helloWorldRoutes);
routes.use("/users", usersRoutes);
routes.use("/sessions", authenticateRoutes);

export {routes}