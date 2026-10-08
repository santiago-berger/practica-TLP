import { body } from "express-validator";
import { validate } from "../validate.js";

export const registerValidation = [
    body("name")
        .notEmpty().withMessage("El nombre es obligatorio")
        .trim(),
    body("last_name")
        .notEmpty().withMessage("El apellido es obligatorio")
        .trim(),
    body("username")
        .notEmpty().withMessage("El usuario es obligatorio")
        .trim(),
    body("email")
        .isEmail().withMessage("Formato de email inválido")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    validate
];

export const loginValidation = [
    body("username")
        .notEmpty().withMessage("El usuario es obligatorio")
        .trim(),
    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria"),
    validate // middleware que ejecuta formatWith y frena la petición si hay errores
];