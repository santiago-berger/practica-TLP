export const createTaskValidation = [

    body("title")
        .notEmpty().withMessage("El título no debe estar vacío"),
    body("description")
        .notEmpty().withMessage("La descripción no debe estar vacía"),
    body("user_id")
        .notEmpty().withMessage("El user_id no debe estar vacío")
        .isInt().withMessage("El user_id debe ser un número entero").toInt(),
]

export const updateTaskValidation = [

    param("id"),isInt().withMessage("El id debe ser un número entero").toInt(),
    body("title")
        .optional().notEmpty().withMessage("El título no debe estar vacío"),
    body("description")
        .optional().notEmpty().withMessage("La descripción no debe estar vacía"),
    body("is_complete")
        .optional().isBoolean().withMessage("is_complete debe ser booleano").toBoolean(),
    body("user_id")
        .optional().isInt().withMessage("El user_id debe ser un número entero").toInt(),
]