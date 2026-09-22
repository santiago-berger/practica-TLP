// Router permite definir rutas en un archivo aparte y montarlas despues en app.js
import {Router} from "express";
// se importan los controladores, cada uno resuelve una operacion del CRUD
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";
// middleware que corta la peticion si alguna validacion fallo
import { validate } from "../middlewares/validate.js";
// cadenas de validacion propias de usuario
import { createUserValidation, updateUserValidation } from "../middlewares/validations/user.validation.js";
// validacion generica del :id de la URL
import { idParamValidation } from "../middlewares/validations/param.validation.js";

// se crea el router de usuarios
export const userRouter = Router();

// users es la configuracion de la ruta, post get put delete son metodos y el callback es la funcionalidad 

// orden de ejecucion: validaciones -> validate -> controlador
userRouter.post("/users", createUserValidation, validate, createUser);
// GET de todos no lleva validaciones porque no recibe datos del cliente
userRouter.get("/users", getAllUsers);
// :id es un parametro dinamico de la URL, se lee con req.params.id
userRouter.get("/users/:id", idParamValidation , validate, getUserById);
// PUT valida el id de la URL y ademas los campos del body
userRouter.put("/users/:id", updateUserValidation, validate, updateUser);
userRouter.delete("/users/:id", idParamValidation, validate, deleteUser);
