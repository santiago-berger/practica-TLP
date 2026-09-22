import {Router} from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { createUserValidation, updateUserValidation } from "../middlewares/validations/user.validation.js";
import { idParamValidation } from "../middlewares/validations/param.validation.js";

export const userRouter = Router();

// users es la configuracion de la ruta, post get put delete son metodos y el callback es la funcionalidad 

userRouter.post("/users", createUserValidation, validate, createUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", idParamValidation , validate, getUserById);
userRouter.put("/users/:id", updateUserValidation, validate, updateUser);
userRouter.delete("/users/:id", idParamValidation, validate, deleteUser);