import { matchedData } from "express-validator";
import { PersonModel } from "../models/person.model.js";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

export const createTask = async (req, res) => {

    try {

        const {title, description, user_id} = req.body;

        const task = await TaskModel.create({title, description, user_id});

        return res.status(201).json(task);

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const getAllTasks = async (req, res) => {

    try {

        const tasks = await TaskModel.findAll({

            attributes: {
                exclude: ["user_id"],
            },
            include: [
                {
                    model: UserModel,
                    as: "user",
                    attributes: {
                        exclude: ["password", "person_id"]
                    },
                    include: [
                        {
                            model: PersonModel,
                            as: "person"
                        }
                    ]
                }
            ]
        });

        return res.status(200).json(tasks);

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const getTaskById = async (req, res) => {

    try {

        const {id} = matchedData(req);

        const task = await TaskModel.findByPk(id, {
            attributes: {exclude: ["user_id"]},
            include: [{
                model: UserModel, as: "user",
                attributes: {exclude: ["password", "person_id"]},
                include: [{model: PersonModel, as: "person"}]
            }]
        });

        if (!task) return res.status(404).json({message: "Tarea no encontrada"});

        return res.status(200).json(task);

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const updateTask = async (req, res) => {

    try {

        const {id, ...data} = matchedData(req);

        const task = await TaskModel.findByPk(id);

        if (!task) return res.status(404).json({message: "Tarea no encontrada"});

        await task.update(data);

        return res.status(200).json(task);

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const deleteTask = async (req, res) => {

    try {

        const {id} = matchedData(req);

        const task = await TaskModel.findByPk(id);

        if (!task) return res.status(404).json({message: "Tarea no encontrada"});

        await task.destroy();

        return res.status(200).json({message: "Tarea eliminada"});

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};
