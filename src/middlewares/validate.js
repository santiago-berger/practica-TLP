// validationResult junta todos los errores que dejaron las cadenas de validacion en la request
import { validationResult } from "express-validator";

// el middleware se ejecuta entre las validaciones y el controlador
// next es la funcion que le pasa el control al siguiente paso
export const validate = (req, res, next) => {
    // se recolectan los errores acumulados por las validaciones previas
    const errors = validationResult(req);
    // si el array de errores no esta vacio la peticion no es valida
    if (!errors.isEmpty()) {

        // custom manejo de errores
        // formatWith cambia el formato de cada error, en vez del objeto completo 
        // (msg, path, location, value) se devuelve solo el mensaje
        const custom = errors.formatWith((err) => {
            return `${err.msg}`;
        });

        // 400 Bad Request, se corta el flujo y no se llega al controlador
        return res.status(400).json(custom.array());
    }
    // si no hubo errores next deja pasar la peticion al controlador
    next();
}; 
