// body valida campos del cuerpo de la peticion, param valida los de la URL
import { body, param } from "express-validator";

// validaciones para crear un usuario: aca todos los campos son obligatorios
export const createUserValidation = [

    body("name")
        .notEmpty().withMessage("El nombre no debe estar vacío"),
    body("email")
        .notEmpty().withMessage("El email no debe estar vacío")
        // isEmail verifica que tenga formato de correo valido
        .isEmail().withMessage("El email debe ser válido"),
    body("password")
        .notEmpty().withMessage("La password no debe estar vacía"),
    body("person_id")
        .notEmpty().withMessage("El person_id no debe estar vacío")
        // la FK tiene que ser un entero, toInt lo castea para que Sequelize lo reciba como number
        .isInt().withMessage("El person_id debe ser un número entero").toInt(),
]

// validaciones para actualizar: se usa optional() porque en un update
// se pueden mandar solo algunos campos, pero los que se manden deben ser validos
export const updateUserValidation = [

    // el id viene por la URL, no por el body
    param("id").isInt().withMessage("El id debe ser un número entero").toInt(),
    body("name")
        .optional().notEmpty().withMessage("El nombre no debe estar vacío"),
    body("email")
        .optional().notEmpty().withMessage("El email no debe estar vacío").isEmail().withMessage("El email debe ser válido"),
    body("password")
        .optional().notEmpty().withMessage("La password no debe estar vacía"),
    body("person_id")
        .optional().isInt().withMessage("El person_id debe ser un número entero").toInt(),
]
