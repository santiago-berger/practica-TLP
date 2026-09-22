// Router permite definir rutas en un archivo aparte y montarlas despues en app.js
import {Router} from "express";
// se importan los controladores, cada uno resuelve una operacion del CRUD
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/task.controller.js";
// cadenas de validacion propias de tarea
import { createTaskValidation, updateTaskValidation } from "../middlewares/validations/task.validation.js";
// middleware que corta la peticion si alguna validacion fallo
import { validate } from "../middlewares/validate.js";
// validacion generica del :id de la URL
import { idParamValidation } from "../middlewares/validations/param.validation.js";

// se crea el router de tareas
export const taskRouter = Router();

// orden de ejecucion: validaciones -> validate -> controlador
taskRouter.post("/tasks", createTaskValidation, validate, createTask);
// GET de todos no lleva validaciones porque no recibe datos del cliente
taskRouter.get("/tasks", getAllTasks);
// :id es un parametro dinamico de la URL, se lee con req.params.id
taskRouter.get("/tasks/:id", idParamValidation, validate, getTaskById);
// PUT valida el id de la URL y los campos del body
taskRouter.put("/tasks/:id", updateTaskValidation, validate, updateTask);
taskRouter.delete("/tasks/:id", idParamValidation, validate, deleteTask);
