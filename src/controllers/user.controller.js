// matchedData devuelve solo los datos que pasaron por las validaciones (filtra lo que no se valido)
import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
// se importa Person para poder traer los datos de la persona junto con el usuario (include)
import { PersonModel } from "../models/person.model.js";

// CREATE 
// POST /api/users
export const createUser = async (req, res) => {

    try {
        // const {name, email, password, person_id} = req.body;
        // (forma manual, se reemplazo por matchedData que ya trae los datos validados y casteados)

        const validatedData = matchedData(req);

        // INSERT en la tabla Users
        const user = await UserModel.create(validatedData);

        // 201 Created
        return res.status(201).json(user);

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

// READ ALL 
// GET /api/users
export const getAllUsers = async (req, res) => {

    try {

        // findAll() = SELECT * FROM Users
        const users = await UserModel.findAll({
            // exclude: campos que no se devuelven (la password por seguridad,
            // person_id porque el dato de la persona ya viene completo en el include)
            attributes: {exclude: ["password", "person_id"]},
            // include hace el JOIN con People, "person" es el alias definido en el modelo
            include: [{model: PersonModel, as: "person"}]
        })

        // 200 OK, devuelve el array de usuarios
        return res.status(200).json(users);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

// READ ONE
// GET /api/users/:id
export const getUserById = async (req, res) => {

    try {

        // el id viene del parametro de la URL (:id), ya validado y convertido a entero
        const {id} = matchedData(req);
        // findByPk = buscar por Primary Key (clave primaria)
        const user = await UserModel.findByPk(id, {
            attributes: {exclude: ["password"]},
            include: [{model: PersonModel, as: "person"}]
        })

        // si no existe, findByPk devuelve null, 404 Not Found
        if (!user) return res.status(404).json({message: "Usuario no encontrado"});

        return res.status(200).json(user);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

// UPDATE
// PUT /api/users/:id
export const updateUser = async (req, res) => {

    try {

        // se separa el id (viene en la URL) del resto de los campos a actualizar (vienen en el body)
        // el operador rest (...) junta todo lo demas en el objeto data
        const {id, ...data} = matchedData(req);

        const user = await UserModel.findByPk(id);

        // primero se verifica que exista antes de intentar modificarlo
        if (!user) return res.status(404).json({message: "Usuario no encontrado"});

        // update() hace el UPDATE en la base solo con los campos enviados
        await user.update(data);

        return res.status(200).json(user);
  
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

// DELETE
// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
    
    try {

        const {id} = matchedData(req);

        const user = await UserModel.findByPk(id);

        if (!user) return res.status(404).json({message: "Usuario no encontrado"});

        // destroy() ejecuta el DELETE de ese registro
        await user.destroy();

        return res.status(200).json({message: "Usuario eliminado"});
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};
