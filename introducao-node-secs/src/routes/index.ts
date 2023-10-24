import { Router } from "express";
import { helloWorldRoutes } from "./helloWordRoutes";
import { usersRoutes } from "./usersRoutes";

const routes = Router();

routes.use("/hello-world", helloWorldRoutes);
routes.use("/users", usersRoutes);

export {routes}