import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();
const controller = new UsersController();

// Usuário não precisa esta autenticado
usersRoutes.post('/create', controller.create) 

usersRoutes.use(ensureAuthenticate);

// Usuário precisa está autenticado
usersRoutes.get('/list', controller.list) 
usersRoutes.get('/show/:id', controller.show) 
usersRoutes.put('/update/:id', controller.update)
usersRoutes.delete('/delete/:id', controller.delete)  

export {usersRoutes}