// matchedData devuelve solo los datos que pasaron por las validaciones (filtra lo que no se valido)
import { matchedData } from "express-validator";
import { PersonModel } from "../models/person.model.js";

// el controlador recibe la peticion (req) y arma la respuesta (res)
export const createPerson = async (req, res) => {

    // try/catch para atrapar errores de la base y no tirar abajo el servidor
    try {
        // se toman los datos ya validados por el middleware createPersonValidation
        const vatidatedData = matchedData(req);

        // create() hace el INSERT en la tabla y devuelve el registro creado
        const person = await PersonModel.create(vatidatedData);

        // 201 Created, se devuelve la persona creada ya con su id
        return res.status(201).json(person);

    } catch (error) {
        // se loguea el error real para poder depurarlo
        console.log(error)
        // al cliente se le devuelve un mensaje generico 500 error interno del servidor
        return res.status(500).json({message: "Error interno del servidor"})
    }
};
