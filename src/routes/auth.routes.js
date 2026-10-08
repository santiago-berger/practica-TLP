// Router permite definir rutas en un archivo aparte y montarlas despues en app.js
import {Router} from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { loginValidation, registerValidation } from "../middlewares/validations/auth.validation.js";


// se crea el router de auth
export const authRouter = Router();

authRouter.post("/login", loginValidation, login);
authRouter.post("/register", registerValidation, register);

authRouter.get("/logout", logout);
// personRouter.post("/profile", idParamValidation, validate, deletePerson);