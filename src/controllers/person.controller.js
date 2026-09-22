import { matchedData } from "express-validator";
import { PersonModel } from "../models/person.model.js";

export const createPerson = async (req, res) => {

    try {
        const vatidatedData = matchedData(req);

        const person = await PersonModel.create(vatidatedData);

        return res.status(201).json(person);

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};