import { body, param } from "express-validator";

export const createUserValidation = [

    body("name")
        .notEmpty().withMessage("El nombre no debe estar vacío"),
    body("email")
        .notEmpty().withMessage("El email no debe estar vacío")
        .isEmail().withMessage("El email debe ser válido"),
    body("password")
        .notEmpty().withMessage("La password no debe estar vacía"),
    body("person_id")
        .notEmpty().withMessage("El person_id no debe estar vacío")
        .isInt().withMessage("El person_id debe ser un número entero").toInt(),
]

export const updateUserValidation = [

    param("id"),isInt().withMessage("El id debe ser un número entero").toInt(),
    body("name")
        .optional().notEmpty().withMessage("El nombre no debe estar vacío"),
    body("email")
        .optional().notEmpty().withMessage("El email no debe estar vacío").isEmail().withMessage("El email debe ser válido"),
    body("password")
        .optional().notEmpty().withMessage("La password no debe estar vacía"),
    body("person_id")
        .optional().isInt().withMessage("El person_id debe ser un número entero").toInt(),
]