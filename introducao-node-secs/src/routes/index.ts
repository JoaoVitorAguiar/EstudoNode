import { Router } from "express";
import { helloWorldRoutes } from "./helloWordRoutes";

const routes = Router();

routes.use("/hello-world", helloWorldRoutes)

export {routes}