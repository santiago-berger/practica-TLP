// Router permite definir rutas en un archivo aparte y montarlas despues en app.js
import {Router} from "express";
import { createPerson } from "../controllers/person.controller.js";
import { createPersonValidation } from "../middlewares/validations/person.validation.js";
import { validate } from "../middlewares/validate.js";

// se crea el router de personas
export const personRouter = Router();

// orden de ejecucion: validaciones -> validate (corta si hay errores) -> controlador
// ruta final: POST /api/people
personRouter.post("/people", createPersonValidation, validate, createPerson);
