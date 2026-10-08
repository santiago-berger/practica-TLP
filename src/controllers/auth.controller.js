import { matchedData } from "express-validator";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {

    try {

        const {name, last_name, username, email, password} = matchedData(req, {locations: ["body"]});
        
        // const {name, last_name, username, email, password} = req.body;

        // const newPerson = await PersonModel.create(validatedData);

        const newPerson = await PersonModel.create({name, last_name});

        const hashedPassword = await hashPassword(password);

        // validacion para ver si el username o email ya existen 

        await UserModel.create({username, email, password: hashedPassword, person_id: newPerson.id});

        // 201 Created
        return res.status(201).json({
            message: "Usuario creado correctamente"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const login = async (req, res) => {

    try {

        const {username, password} = matchedData(req, {locations: ["body"]});

        const userExists = await UserModel.findOne({
            where: {
                username
            }
        });

        if(!userExists) {
            return res.status(401).json({message: "Credenciales incorrectas"});
        }

        const validPassword = await comparePassword(password, userExists.password);

        if(!validPassword) {
            return res.status(401).json({message: "Credenciales incorrectas"});
        }

        // despues de pasar las validaciones hay que generar el token

        // se usa la funcion que genera el token, esa funcion pide datos y despues devuelve el token ya con esos datos

        const token = generateToken({idUser: userExists.id});

        // Enviar token como cookie

        res.cookie("token", token, {
            httpOnly: true, // No accesible desde JavaScript
            maxAge: 1000 * 60 * 60, // 1 hora
        });

        return res.status(201).json({
            message: "Usuario logueado correctamente"
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error interno del servidor"})
    }
};

export const logout = (req, res) => {
    res.clearCookie("token"); // Eliminar cookie del navegador
    return res.json({ message: "Logout exitoso" });
};