import { body } from "express-validator";

export const createPersonValidation = [
    body("name").notEmpty().withMessage("El nombre no debe estar vacío"),
    body("last_name").notEmpty().withMessage("El apellido no debe estar vacío")
];