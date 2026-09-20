import {Router} from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/task.controller.js";

export const taskRouter = Router();

// users es la configuracion de la ruta, post get put delete son metodos y el callback es la funcionalidad 

taskRouter.post("/tasks", createTask);
taskRouter.get("/tasks", getAllTasks);
taskRouter.get("/tasks/:id", getTaskById);
taskRouter.put("/tasks/:id", updateTask);
taskRouter.delete("/tasks/:id", deleteTask);