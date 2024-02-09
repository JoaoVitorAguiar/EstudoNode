import { Router } from "express";
import { helloWorldRoutes } from "./helloWordRoutes";
import { usersRoutes } from "./usersRoutes";
import { booksRoutes } from "./booksRoutes";
import { authenticateRoutes } from "./authenticateRoutes";
import { loansRoutes } from "./loansRoutes";


const routes = Router();

routes.use("/hello-world", helloWorldRoutes);
routes.use("/users", usersRoutes);
routes.use("/books", booksRoutes);
routes.use("/sessions", authenticateRoutes);
routes.use("/loans", loansRoutes)

export { routes }