import { Router } from "express";
import { helloWordController } from "../controllers/HelloWorldController";

const helloWorldRoutes = Router();
const controller = new helloWordController();

helloWorldRoutes.get('/', controller.Show) 

export {helloWorldRoutes}