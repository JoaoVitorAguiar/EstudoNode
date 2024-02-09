import 'express-async-errors';
import express from "express";
import { routes } from "./routes/";
import { errorInterceptor } from './errors/errorInterceptor';
import { setupSwagger } from './docs/swagger';


const app = express();

app.use(express.json());
setupSwagger(app);
app.use(routes);
app.use(errorInterceptor);
app.listen(3333, () => {
    console.log("Server started on port 3333")
 });