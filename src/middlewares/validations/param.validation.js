import { param } from "express-validator";

export const idParamValidation = [
    paramram("id")
        .isInt().withMessage("El id debe ser un número entero").toInt(),
];