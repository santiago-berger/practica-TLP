// body valida los campos que vienen en el cuerpo (body) de la peticion
import { body } from "express-validator";

// array de validaciones que se aplica antes de crear una persona
export const createPersonValidation = [
    // notEmpty: el campo tiene que venir y no puede ser cadena vacia
    body("name").notEmpty().withMessage("El nombre no debe estar vacío"),
    body("last_name").notEmpty().withMessage("El apellido no debe estar vacío")
];
