import {Router} from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/task.controller.js";
import { createTaskValidation, updateTaskValidation } from "../middlewares/validations/task.validation.js";
import { validate } from "../middlewares/validate.js";
import { idParamValidation } from "../middlewares/validations/param.validation.js";

export const taskRouter = Router();

// users es la configuracion de la ruta, post get put delete son metodos y el callback es la funcionalidad 

taskRouter.post("/tasks", createTaskValidation, validate, createTask);
taskRouter.get("/tasks", getAllTasks);
taskRouter.get("/tasks/:id", idParamValidation, validate, getTaskById);
taskRouter.put("/tasks/:id", updateTaskValidation, validate, updateTask);
taskRouter.delete("/tasks/:id", idParamValidation, validate, deleteTask);