// matchedData devuelve solo los datos que pasaron por las validaciones (filtra lo que no se valido)
import { matchedData } from "express-validator";
// Person y User se importan para anidar sus datos en las consultas (include)
import { PersonModel } from "../models/person.model.js";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

// CREATE 
// POST /api/tasks
export const createTask = async (req, res) => {

    try {

        // se desestructura el body, solo se toman tres campos y se ignora lo demas
        const {title, description, user_id} = req.body;

        // INSERT en la tabla Tasks (is_complete queda en false por el defaultValue del modelo)
        const task = await TaskModel.create({title, description, user_id});

        // 201 Created
        return res.status(201).json(task);

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

// READ ALL 
// GET /api/tasks
export const getAllTasks = async (req, res) => {

    try {

        // findAll() = SELECT * FROM Tasks, con JOINs anidados
        const tasks = await TaskModel.findAll({

            attributes: {
                // no se devuelve el user_id porque el usuario entero viene en el include
                exclude: ["user_id"],
            },
            include: [
                {
                    model: UserModel, // primer JOIN, cada tarea con su usuario
                    as: "user",       // alias definido en la relacion del modelo
                    attributes: {
                        exclude: ["password", "person_id"] // nunca exponer la password
                    },
                    include: [
                        {
                            // include anidado: dentro del usuario se trae tambien su persona
                            // resultado final: tarea -> usuario -> persona
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

// READ ONE 
// GET /api/tasks/:id
export const getTaskById = async (req, res) => {

    try {

        // el id viene del parametro de la URL (:id), ya validado y convertido a entero
        const {id} = matchedData(req);

        // misma consulta que getAllTasks pero filtrando por clave primaria
        const task = await TaskModel.findByPk(id, {
            attributes: {exclude: ["user_id"]},
            include: [{
                model: UserModel, as: "user",
                attributes: {exclude: ["password", "person_id"]},
                include: [{model: PersonModel, as: "person"}]
            }]
        });

        // si no existe devuelve null 404 Not Found
        if (!task) return res.status(404).json({message: "Tarea no encontrada"});

        return res.status(200).json(task);

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

// UPDATE 
// PUT /api/tasks/:id
export const updateTask = async (req, res) => {

    try {

        // se separa el id (URL) del resto de campos a modificar (body) con el operador rest
        const {id, ...data} = matchedData(req);

        const task = await TaskModel.findByPk(id);

        // se valida que exista antes de actualizar
        if (!task) return res.status(404).json({message: "Tarea no encontrada"});

        // UPDATE solo de los campos que llegaron en la peticion
        await task.update(data);

        return res.status(200).json(task);

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

// DELETE
// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {

    try {

        const {id} = matchedData(req);

        const task = await TaskModel.findByPk(id);

        if (!task) return res.status(404).json({message: "Tarea no encontrada"});

        // destroy() ejecuta el DELETE de ese registro
        await task.destroy();

        return res.status(200).json({message: "Tarea eliminada"});

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};
