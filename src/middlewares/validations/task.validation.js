// body valida campos del cuerpo de la peticion, param valida los de la URL
import { body, param } from "express-validator"

// validaciones para crear una tarea: todos los campos son obligatorios
export const createTaskValidation = [

    body("title")
        .notEmpty().withMessage("El título no debe estar vacío"),
    body("description")
        .notEmpty().withMessage("La descripción no debe estar vacía"),
    body("user_id")
        .notEmpty().withMessage("El user_id no debe estar vacío")
        // la FK debe ser entero, toInt lo convierte a number antes de llegar al controlador
        .isInt().withMessage("El user_id debe ser un número entero").toInt(),
]

// validaciones para actualizar: con optional() se permite enviar solo los campos a cambiar
export const updateTaskValidation = [

    param("id").isInt().withMessage("El id debe ser un número entero").toInt(),
    body("title")
        .optional().notEmpty().withMessage("El título no debe estar vacío"),
    body("description")
        .optional().notEmpty().withMessage("La descripción no debe estar vacía"),
    body("is_complete")
        // isBoolean acepta true/false, toBoolean lo castea al tipo booleano real
        .optional().isBoolean().withMessage("is_complete debe ser booleano").toBoolean(),
    body("user_id")
        .optional().isInt().withMessage("El user_id debe ser un número entero").toInt(),
]
