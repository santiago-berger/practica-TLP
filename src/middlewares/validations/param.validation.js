// param valida los parametros de ruta (:parametro de la URL), no el body
import { param } from "express-validator";

// array de validaciones reutilizable para cualquier ruta que reciba /:id
// se usa en GET /users/:id, DELETE /users/:id, GET /tasks/:id, DELETE /tasks/:id
export const idParamValidation = [
    // "id" es el nombre del parametro tal como se declaro en la ruta (":id")
    param("id")
        // isInt: el valor de la URL siempre llega como string, asi que se
        // verifica que ese string represente un numero entero ("5" si, "abc" no)
        .isInt().withMessage("El id debe ser un número entero")
        // toInt (sanitizador): convierte req.params.id de string a number,
        // para que el controlador reciba 5 y no "5" al consultar la base
        .toInt(),
];
