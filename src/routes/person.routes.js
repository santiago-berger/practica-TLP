import {Router} from "express";
import { createPerson } from "../controllers/person.controller.js";
import { createPersonValidation } from "../middlewares/validations/person.validation.js";
import { validate } from "../middlewares/validate.js";

export const personRouter = Router();

// users es la configuracion de la ruta, post get put delete son metodos y el callback es la funcionalidad 

personRouter.post("/people", createPersonValidation, validate, createPerson);
