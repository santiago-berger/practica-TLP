import { body } from "express-validator";

export const createUserValidation = [

    body("name")
        .notEmpty().withMessage("El nombre no debe estar vacío"),
    body("email")
        .notEmpty().withMessage("El email no debe estar vacío")
        .isEmail().withMessage("El email debe ser válido"),
    body("password")
        .notEmpty().withMessage("La password no debe estar vacía"),
    body("person_id")
        .notEmpty().withMessage("El person_id no debe estar vacío"),
]

export const updateUserValidation = [

    body("name")
        .optional().notEmpty().withMessage("El nombre no debe estar vacío"),
    body("email")
        .notEmpty().withMessage("El email no debe estar vacío")
        .isEmail().withMessage("El email debe ser válido"),
    body("password")
        .notEmpty().withMessage("La password no debe estar vacía"),
    body("person_id")
        .notEmpty().withMessage("El person_id no debe estar vacío"),
]