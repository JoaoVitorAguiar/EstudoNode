import { Router } from "express";
import { TasksController } from "../controllers/TasksController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const tasksRoutes = Router();
const controller = new TasksController();


tasksRoutes.use(ensureAuthenticate);

tasksRoutes.post('/', controller.create); 
tasksRoutes.get('/', controller.list);
tasksRoutes.get('/:id', controller.show); 
tasksRoutes.put('/:id', controller.update);
tasksRoutes.delete('/:id', controller.delete);  

export {tasksRoutes}