import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { PersonModel } from "../models/person.model.js";

export const createUser = async (req, res) => {

    try {
        // const {name, email, password, person_id} = req.body;

        const validatedData = matchedData(req);

        const user = await UserModel.create(validatedData);

        return res.status(201).json(user);

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const getAllUsers = async (req, res) => {

    try {

        const users = await UserModel.findAll({
            attributes: {exclude: ["password", "person_id"]},
            include: [{model: PersonModel, as: "person"}]
        })

        return res.status(200).json(users);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const getUserById = async (req, res) => {

    try {

        const {id} = matchedData(req);
        const user = await UserModel.findByPk(id, {
            attributes: {exclude: ["password"]},
            include: [{model: PersonModel, as: "person"}]
        })

        if (!user) return res.status(404).json({message: "Usuario no encontrado"});

        return res.status(200).json(user);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const updateUser = async (req, res) => {

    try {

        const {id, ...data} = matchedData(req);

        const user = await UserModel.findByPk(id);

        if (!user) return res.status(404).json({message: "Usuario no encontrado"});

        await user.update(data);

        return res.status(200).json(user);
  
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const deleteUser = async (req, res) => {
    
    try {

        const {id} = matchedData(req);

        const user = await UserModel.findByPk(id);

        if (!user) return res.status(404).json({message: "Usuario no encontrado"});

        await user.destroy();

        return res.status(200).json({message: "Usuario eliminado"});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};
