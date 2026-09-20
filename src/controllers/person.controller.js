import { PersonModel } from "../models/person.model.js";

export const createPerson = async (req, res) => {

    try {
        const {name, last_name} = req.body;

        const person = await PersonModel.create({name, last_name});

        return res.status(201).json(person);

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};